import Card from "../Home/Card";

const Meals = ({ meals, category }) => {
  const breakfastMeals = meals.filter((meal) => meal.category === "Breakfast");
  const lunchMeals = meals.filter((meal) => meal.category === "Lunch");
  const dinnerMeals = meals.filter((meal) => meal.category === "Dinner");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {category === "All" &&
        meals.map((meal) => <Card key={meal._id} meal={meal}></Card>)}

      {category === "Breakfast" &&
        breakfastMeals.map((meal) => <Card key={meal._id} meal={meal}></Card>)}

      {category === "Lunch" &&
        lunchMeals.map((meal) => <Card key={meal._id} meal={meal}></Card>)}

      {category === "Dinner" &&
        dinnerMeals.map((meal) => <Card key={meal._id} meal={meal}></Card>)}
    </div>
  );
};

export default Meals;
