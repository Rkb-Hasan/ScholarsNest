import { Helmet } from "react-helmet-async";
import useAuth from "./../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import RequestedDataRow from "../../../components/TableRows/RequestedDataRow";
const RequestedMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/searchMeal?requestsBy=${user?.email}`
      );
      return data;
    },
  });
  // console.log(reviews);
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (!requests.length) return <p>No requests made yet</p>;

  return (
    <>
      <Helmet>
        <title>Requested Meals</title>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      SL
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Meal Title
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Likes
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Reviews
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Table Row Data */}
                  {requests.map((meal, idx) => (
                    <RequestedDataRow
                      key={meal._id}
                      idx={idx}
                      refetch={refetch}
                      meal={meal}
                    ></RequestedDataRow>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestedMeals;
