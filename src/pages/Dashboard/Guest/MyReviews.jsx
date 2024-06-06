import { Helmet } from "react-helmet-async";
import useAuth from "./../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "./../../../components/Shared/LoadingSpinner";
import ReviewDataRow from "../../../components/TableRows/ReviewDataRow";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews", user?.displayName],
    enabled: !!user?.displayName,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/searchMeal?reviewsBy=${user?.displayName}`
      );
      return data;
    },
  });
  // console.log(reviews);
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (!reviews.length) return <p>No review made yet</p>;
  return (
    <>
      <Helmet>
        <title>My Reviews</title>
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
                      Sl
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
                      Review
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    ></th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    ></th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Table Row Data */}
                  {reviews.map((meal, idx) => (
                    <ReviewDataRow
                      key={meal._id}
                      idx={idx}
                      meal={meal}
                      refetch={refetch}
                      name={user?.displayName}
                    ></ReviewDataRow>
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

export default MyReviews;
