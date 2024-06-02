import { useState } from "react";
// import orderImg from "../../../assets/shop/banner2.jpg";
// import Cover from "../../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
// import useMenu from "../../../hooks/useMenu";
// import OrderTAb from "./OrderTab/OrderTAb";
// import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Heading from "../Shared/Heading";
import LoadingSpinner from "../Shared/LoadingSpinner";

import Meals from "./Meals";
import useAllMeal from "../../hooks/useAllMeal";

const MealsByCategory = () => {
  // const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
  // const { category } = useParams();
  // const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(0);
  // const [menu] = useMenu();

  // console.log(category);
  // const desserts = menu.filter((item) => item.category === "dessert");
  // const soups = menu.filter((item) => item.category === "soup");
  // const salads = menu.filter((item) => item.category === "salad");
  // const pizzas = menu.filter((item) => item.category === "pizza");
  // const drinks = menu.filter((item) => item.category === "drinks");

  const [meals, isLoading] = useAllMeal();

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      <Helmet>
        <title>Bistro | Order</title>
      </Helmet>
      {/* <Cover img={orderImg} title={"Order Food"}></Cover> */}
      <Heading title={"Meals by Category"} center={true}></Heading>
      <Tabs
        className="my-10"
        defaultIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList>
          <Tab>All meals</Tab>
          <Tab>Breakfast</Tab>
          <Tab>Lunch</Tab>
          <Tab>Dinner</Tab>
        </TabList>
        <TabPanel>
          <Meals meals={meals} category="All"></Meals>
        </TabPanel>
        <TabPanel>
          <Meals meals={meals} category="Breakfast"></Meals>
        </TabPanel>
        <TabPanel>
          <Meals meals={meals} category="Lunch"></Meals>
        </TabPanel>
        <TabPanel>
          <Meals meals={meals} category="Dinner"></Meals>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default MealsByCategory;
