import PropTypes from "prop-types";
// import { useState } from "react";
// import UpdateUserModal from "../Modals/UpdateUserModal";
// import { useMutation } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { toast } from "react-hot-toast";
// import useAuth from "../../hooks/useAuth";

const UserDataRow = ({ user, idx, handleMakeAdmin }) => {
  // const { user: loggedInUser } = useAuth();

  // const axiosSecure = useAxiosSecure();
  // const [isOpen, setIsOpen] = useState(false);

  // update user role
  // const { mutateAsync } = useMutation({
  //   mutationFn: async (role) => {
  //     const { data } = await axiosSecure.patch(
  //       `/users/update/${user?.email}`,
  //       role
  //     );
  //     return data;
  //   },
  //   onSuccess: (data) => {
  //     refetch();
  //     console.log(data);
  //     toast.success("user role updated");
  //     setIsOpen(false);
  //   },
  // });

  //   modal handler
  // const modalHandler = async (selected) => {
  //   // if (user?.status === "verified") {
  //   //   toast.success("User not requested to change the role");
  //   //   setIsOpen(false);
  //   //   return;
  //   // }

  //   // admin can not change self role
  //   if (loggedInUser?.email === user?.email) {
  //     toast.error("Action not allowed");
  //     return setIsOpen(false);
  //   }
  //   const userRole = {
  //     role: selected,
  //     status: "verified",
  //   };
  //   try {
  //     const data = await mutateAsync(userRole);
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(err.message);
  //   }
  // };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{idx + 1}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => handleMakeAdmin(user)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">
            {user?.role === "admin" ? "Admin" : "Make Admin"}
          </span>
        </button>
        {/* Update User Modal */}
        {/* <UpdateUserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalHandler={modalHandler}
          user={user}
        ></UpdateUserModal> */}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {user?.badge ? (
          <p
            className={`${user?.badge === "silver" ? "text-slate-500" : ""}
  ${user?.badge === "gold" ? "text-orange-600" : ""}
  ${user?.badge === "platinum" ? "text-purple-900" : ""}
  font-bold capitalize`}
          >
            {user?.badge}
          </p>
        ) : (
          <p className="text-red-500 whitespace-no-wrap">Unavailable</p>
        )}
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRow;
