import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
// import useCart from "./../../../hooks/useCart";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import useRoleBadge from "../../hooks/useRoleBadge";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

const CheckOutForm = ({ badge }) => {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [dbUser, isLoading] = useRoleBadge();
  let totalPrice = 0;
  if (badge === "silver") {
    totalPrice = 300;
  }
  if (badge === "gold") {
    totalPrice = 600;
  }
  if (badge === "platinum") {
    totalPrice = 900;
  }

  console.log(totalPrice, dbUser);
  // const [cart, refetch] = useCart();
  // const totalPrice = cart.reduce((total, item) => total + item?.price, 0);
  const navigate = useNavigate();

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  useEffect(() => {
    if (dbUser?.badge === badge) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `You are already a ${badge} user`,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/dashboard/paymentHistory");
      });
    }
  }, [dbUser, badge, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // now save the payment in the db
        const payment = {
          email: user?.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(), //utc date convert,use moment js
          badge,
          // cartId: cart.map((item) => item._id),
          // menuItemId: cart.map((item) => item.menuId),
          // status: "pending",
        };

        const res = await axiosSecure.post("/payments", payment);
        console.log("payment saved", res.data);
        // refetch();
        if (res.data?.badgeResult?.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Congratulations! You are now a ${badge} user`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/paymentHistory");
        } else if (!res.data?.badgeResult?.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `You are already a ${badge} user`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/paymentHistory");
        }
      }
    }
  };
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  // console.log({ stripe, clientSecret });
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        className="btn btn-sm btn-primary my-4"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-500"> {error}</p>
      {transactionId && (
        <p className="text-green-500">Your transaction id : {transactionId}</p>
      )}
    </form>
  );
};

export default CheckOutForm;
