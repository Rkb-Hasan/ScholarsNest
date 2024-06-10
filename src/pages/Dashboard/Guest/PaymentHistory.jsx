import { useQuery } from "@tanstack/react-query";
import useAuth from "./../../../hooks/useAuth";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  console.log(user);
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pay/${user?.email}`);
      return res.data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <Helmet>
        <title>Payment History</title>
      </Helmet>
      {payments && !payments.length ? (
        <p className="text-red font-bold">No payment made yet!</p>
      ) : (
        <div>
          {" "}
          <h2>Total Payments : {payments.length}</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Price</th>
                  <th>Transaction Id</th>
                  <th>Badge</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, idx) => (
                  <tr key={payment._id}>
                    <th>{idx + 1}</th>
                    <td>${payment.price}</td>
                    <td>{payment.transactionId}</td>
                    <td
                      className={`${
                        payment.badge === "silver" ? "text-slate-500" : ""
                      }
              ${payment.badge === "gold" ? "text-orange-600" : ""}
              ${payment.badge === "platinum" ? "text-purple-900" : ""}
              font-bold capitalize`}
                    >
                      {payment.badge}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
