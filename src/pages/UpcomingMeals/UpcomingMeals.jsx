import { Helmet } from "react-helmet-async";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// import UpcomingMealModal from "../../components/ModalButtons/UpcomingMealModal";
import Card from "../../components/Home/Card";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
// import useUpcomingMeal from "../../hooks/useUpcomingMeal";
// import Card from "./../../components/Home/Card";
// import LoadingSpinner from "./../../components/Shared/LoadingSpinner";

const UpcomingMeals = () => {
  const axiosCommon = useAxiosCommon();
  const mealStat = "upcoming";
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/meals";
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

  const handlePublish = async (meal) => {
    try {
      const mealStatusRequest = {
        _id: meal?._id,
        mealStatus: "present",
        mealStatusUpdate: true,
      };
      await axiosSecure.put(`/saveMeal`, mealStatusRequest);
      navigate(from);
      toast.success(`Published ${meal?.meal_name} for getting 10 likes!!`);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish: " + error.message);
    }
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (upcomingMeals?.length === 0)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-50px)]">
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-red-500 font-bold">No Upcoming Meals to show.</p>
          {/* <UpcomingMealModal refetch={refetch}></UpcomingMealModal> */}
        </div>
      </div>
    );

  return (
    <div>
      <Helmet>
        <title>Upcoming Meals</title>
      </Helmet>

      <h2 className="lg:text-5xl md:text-4xl text-3xl text-[#8A2BE2] font-bold text-center mt-10">
        Upcoming Meals
      </h2>
      <div className="divider bg-[#8A2BE2] lg:h-1 h-[2px]"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4  bg-gradient-to-r from-[#8A2BE24D] from-0% via-[#8A2BE219] via-50% to-[#8A2BE20D] to-100% border-gradient-right p-5  rounded-2xl my-6">
        {upcomingMeals.map((meal) => (
          <Card
            key={meal._id}
            meal={meal}
            handlePublish={handlePublish}
            like="like"
            refetch={refetch}
          ></Card>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMeals;
