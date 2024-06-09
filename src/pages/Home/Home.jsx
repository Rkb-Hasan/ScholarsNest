import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner/Banner";
import MealsByCategory from "../../components/MealsByCategory/MealsByCategory";
import Membership from "../../components/Membership/Membership";
import Feature from "../../components/Feature/Feature";
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

      {/* feature section  */}
      <Feature></Feature>
    </div>
  );
};

export default Home;
