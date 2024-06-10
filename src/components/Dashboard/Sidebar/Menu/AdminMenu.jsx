import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { IoMdAddCircleOutline } from "react-icons/io";
import { GiMeal } from "react-icons/gi";
import { GoCodeReview } from "react-icons/go";
import { MdFastfood } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
      <MenuItem
        icon={IoMdAddCircleOutline}
        label="Add Meal"
        address="add-meal"
      />
      <MenuItem icon={GiMeal} label="All Meals" address="all-meals" />
      <MenuItem icon={GoCodeReview} label="All Reviews" address="all-reviews" />
      <MenuItem icon={MdFastfood} label="Serve Meals" address="serve-meals" />
      <MenuItem
        icon={MdOutlineWatchLater}
        label="Upcoming Meals"
        address="all-upcoming-meals"
      />
    </>
  );
};

export default AdminMenu;
