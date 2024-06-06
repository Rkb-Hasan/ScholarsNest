import { Helmet } from "react-helmet-async";
import Heading from "../Shared/Heading";
import MembershipCard from "../MembershipCard/MembershipCard";
import { Link } from "react-router-dom";

const Membership = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro | Order</title>
      </Helmet>

      <Heading title={"Membership"} center={true}></Heading>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        <Link to="/payment?badge=silver">
          <MembershipCard badge="silver"></MembershipCard>
        </Link>
        <Link to="/payment?badge=gold">
          <MembershipCard badge="gold"></MembershipCard>
        </Link>
        <Link to="/payment?badge=platinum">
          <MembershipCard badge="platinum"></MembershipCard>
        </Link>
      </div>
    </div>
  );
};

export default Membership;
