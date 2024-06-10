import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import MenuItem from ".//MenuItem";

import HostRequestModal from "../../../Modals/HostRequestModal";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import useRoleBadge from "../../../../hooks/useRoleBadge";

const GuestMenu = () => {
  const [dbUser] = useRoleBadge();
  // for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalHandler = async () => {
    try {
      const currentUser = {
        email: user?.email,
        role: "guest",
        status: "requested",
      };
      const { data } = await axiosSecure.put("/user", currentUser);
      console.log(data);
      if (data.modifiedCount > 0) {
        toast.success("Success! Please wait for admin confirmation");
      } else {
        toast.success(" Please wait for admin approval");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label="Requested Meals"
        address="requestedMeals"
      />
      <MenuItem icon={BsFingerprint} label="My Reviews" address="myReviews" />
      <MenuItem
        icon={BsFingerprint}
        label="Payment History"
        address="paymentHistory"
      />
    </>
  );
};

export default GuestMenu;
