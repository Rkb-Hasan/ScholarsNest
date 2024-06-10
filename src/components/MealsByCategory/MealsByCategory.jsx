import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Heading from "../Shared/Heading";
import LoadingSpinner from "../Shared/LoadingSpinner";

import Meals from "./Meals";
import useAllMeal from "../../hooks/useAllMeal";

const MealsByCategory = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const [meals, isLoading, ,] = useAllMeal();

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="mt-10">
      <Heading title={"Meals by Category"} center={true}></Heading>
      <Tabs
        className=""
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
