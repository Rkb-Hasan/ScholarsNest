import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner/Banner";
import MealsByCategory from "../../components/MealsByCategory/MealsByCategory";
import Membership from "../../components/Membership/Membership";
import Feature from "../../components/Feature/Feature";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>ScholarsNest | Home</title>
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
