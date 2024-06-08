import { Helmet } from "react-helmet-async";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import UpcomingMealsDataRow from "../../../components/TableRows/UpcomingMealsDataRow";
import UpcomingMealModal from "../../../components/ModalButtons/UpcomingMealModal";

const AllUpcomingMeals = () => {
  const mealStat = "upcoming";
  const axiosCommon = useAxiosCommon();
  // const axiosSecure = useAxiosSecure();

  const {
    data: upcomingMeals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["upcomingMeals", mealStat],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/meals/${mealStat}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (upcomingMeals?.length === 0)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-50px)]">
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-red-500 font-bold">No Upcoming Meals to show.</p>
          <UpcomingMealModal refetch={refetch}></UpcomingMealModal>
        </div>
      </div>
    );
  return (
    <>
      <Helmet>
        <title>Upcoming Meals</title>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <UpcomingMealModal refetch={refetch}></UpcomingMealModal>
          </div>

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
                      Added By
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Table Row Data */}
                  {upcomingMeals.map((meal, idx) => (
                    <UpcomingMealsDataRow
                      key={meal._id}
                      idx={idx}
                      meal={meal}
                      // handleDeleteMeal={handleDeleteMeal}
                    ></UpcomingMealsDataRow>
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

export default AllUpcomingMeals;
