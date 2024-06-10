import { BsFingerprint } from "react-icons/bs";
import MenuItem from ".//MenuItem";
import { MdFoodBank } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import { MdManageHistory } from "react-icons/md";
const GuestMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdFoodBank}
        label="Requested Meals"
        address="requestedMeals"
      />
      <MenuItem
        icon={MdOutlineRateReview}
        label="My Reviews"
        address="myReviews"
      />
      <MenuItem
        icon={MdManageHistory}
        label="Payment History"
        address="paymentHistory"
      />
    </>
  );
};

export default GuestMenu;
