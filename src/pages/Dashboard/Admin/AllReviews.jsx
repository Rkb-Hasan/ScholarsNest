import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import AllReviewDataRow from "../../../components/TableRows/AllReviewDataRow";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const AllReviews = () => {
  // const [meals, isLoading, refetch] = useAllMeal();
  const mealStat = "present";

  const axiosSecure = useAxiosSecure();
  const axiosCommon = useAxiosCommon();
  // sort related
  const {
    data: meals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/meals/${mealStat}?getBy=review`);
      return data;
    },
  });

  // delete a meal from db
  const handleDeleteMeal = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/deleteMeal/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Deleted the Meal",
              icon: "success",
            });
          }
        });
      }
    });
  };
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <>
      <Helmet>
        <title>All Reviews</title>
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
                      Reviews Count
                    </th>

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
                  {meals.map((meal, idx) => (
                    <AllReviewDataRow
                      key={meal._id}
                      idx={idx}
                      meal={meal}
                      handleDeleteMeal={handleDeleteMeal}
                    ></AllReviewDataRow>
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

export default AllReviews;
