import { Helmet } from "react-helmet-async";
import Heading from "../Shared/Heading";
import MembershipCard from "../MembershipCard/MembershipCard";

const Membership = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro | Order</title>
      </Helmet>

      <Heading title={"Membership"} center={true}></Heading>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        <MembershipCard badge="silver"></MembershipCard>
        <MembershipCard badge="gold"></MembershipCard>
        <MembershipCard badge="platinum"></MembershipCard>
      </div>
    </div>
  );
};

export default Membership;
