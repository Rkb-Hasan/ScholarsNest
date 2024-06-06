import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);
import { useLocation } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";

const Payment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const badge = queryParams.get("badge");

  return (
    <div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckOutForm badge={badge}></CheckOutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
