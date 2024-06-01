import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner/Banner";
import MealsByCategory from "../../components/MealsByCategory/MealsByCategory";
import Membership from "../../components/Membership/Membership";
// import Rooms from "../../components/Home/Rooms";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>StayVista | Vacation Homes & Condo Rentals</title>
      </Helmet>

      {/* banner */}
      <Banner></Banner>

      {/* meals by category */}
      <MealsByCategory></MealsByCategory>

      {/* membership */}
      <Membership></Membership>

      {/* Categories section  */}

      {/* Rooms section */}
      {/* <Rooms /> */}
    </div>
  );
};

export default Home;
