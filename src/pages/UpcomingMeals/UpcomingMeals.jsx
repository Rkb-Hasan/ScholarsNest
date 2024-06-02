import { Helmet } from "react-helmet-async";
import useUpcomingMeal from "../../hooks/useUpcomingMeal";
import Card from "./../../components/Home/Card";
import LoadingSpinner from "./../../components/Shared/LoadingSpinner";

const Meals = () => {
  const [upcomingMeals, isLoading] = useUpcomingMeal();

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      <Helmet>
        <title>Best Taste|All Meals</title>
      </Helmet>

      <h2 className="lg:text-5xl md:text-4xl text-3xl text-[#8A2BE2] font-bold text-center mt-10">
        Upcoming Meals
      </h2>
      <div className="divider bg-[#8A2BE2] lg:h-1 h-[2px]"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4  bg-gradient-to-r from-[#8A2BE24D] from-0% via-[#8A2BE219] via-50% to-[#8A2BE20D] to-100% border-gradient-right p-5  rounded-2xl my-6">
        {upcomingMeals.map((meal) => (
          <Card key={meal._id} meal={meal} like="like"></Card>
        ))}
      </div>
    </div>
  );
};

export default Meals;
