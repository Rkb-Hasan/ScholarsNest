import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import useRoleBadge from "./../../../hooks/useRoleBadge";
import MenuItem from "./Menu/MenuItem";
import GuestMenu from "./Menu/GuestMenu";
import AdminMenu from "./Menu/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import logo from "../../../assets/images/school.png";

const Sidebar = () => {
  const { logOut, user } = useAuth();
  const handleLogOut = () => {
    logOut()
      .then(async (result) => {
        toast.success("Logged Out successfully!");
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/logout`,
          user,
          {
            withCredentials: true,
          }
        );
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const [isActive, setActive] = useState(false);
  const [dbUser] = useRoleBadge();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block  p-4 font-bold">
            <Link
              to="/"
              className="text-purple-900 cursor-pointer text-xl flex items-center gap-2"
            >
              <img src={logo} alt="" className="w-12 " />
              <span> ScholarsNest </span>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-violet-200 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex gap-2 px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-purple-100 bg-opacity-10 mx-auto font-bold">
              <Link
                to="/"
                className="text-purple-900 text-xl flex items-center gap-2"
              >
                <img src={logo} alt="" className="w-12 " />
                <span> ScholarsNest</span>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {dbUser?.role === "guest" && <GuestMenu></GuestMenu>}
              {dbUser?.role === "admin" && <AdminMenu></AdminMenu>}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <MenuItem
            label={dbUser?.role !== "admin" ? "My Profile" : "Admin Profile"}
            address="/dashboard"
            icon={FcSettings}
          ></MenuItem>

          <button
            onClick={handleLogOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-purple-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
