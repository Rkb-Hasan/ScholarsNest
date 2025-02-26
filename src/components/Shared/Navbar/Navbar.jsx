import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./../../../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { IconContext } from "react-icons";
import { FaBell } from "react-icons/fa";
import logo from "../../../assets/images/school.png";
const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
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
  const navLinks = (
    <>
      <li>
        <NavLink
          className="text-[#8A2BE2]"
          to="/"
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: "#8A2BE2",
              borderBottom: isActive ? "3px solid #8A2BE2" : "white",
              backgroundColor: "inherit",
              viewTransitionName: isTransitioning ? "slide" : "",
              transition: "all 0.3s ease-out",
            };
          }}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className="text-[#8A2BE2]"
          to="/meals"
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: "#8A2BE2",
              borderBottom: isActive ? "3px solid #8A2BE2" : "white",
              backgroundColor: "inherit",
              viewTransitionName: isTransitioning ? "slide" : "",
              transition: "all 0.5s ease-out",
            };
          }}
        >
          Meals
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/upcomingMeals"
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: "#8A2BE2",
              borderBottom: isActive ? "3px solid #8A2BE2" : "white",
              backgroundColor: "inherit",
              viewTransitionName: isTransitioning ? "slide" : "",
              transition: "all 0.5s ease-out",
            };
          }}
        >
          Upcoming Meals
        </NavLink>
      </li>
      <li className="mt-1">
        <NavLink
          to="/dashboard"
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: "#8A2BE2",
              borderBottom: isActive ? "3px solid #8A2BE2" : "white",
              backgroundColor: "inherit",
              viewTransitionName: isTransitioning ? "slide" : "",
              transition: "all 0.5s ease-out",
            };
          }}
        >
          <IconContext.Provider value={{ color: "#8A2BE2", size: "25px" }}>
            <FaBell />
          </IconContext.Provider>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="">
      <div className="navbar  mx-auto px-4  ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow font-semibold bg-purple-300 text-white rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <div className="flex gap-2">
            <img src={logo} alt="logo" className="w-12 hidden lg:inline" />
            <Link
              to="/"
              className="btn px-0 btn-ghost lg:text-4xl font-Permanent text-[#8A2BE2] md:text-3xl font-bold text-2xl"
            >
              ScholarsNest
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold text-lg">
            {navLinks}
          </ul>
        </div>
        <div className="navbar-end items-center gap-2">
          {user ? (
            <div className="flex items-center ">
              <div className="dropdown  dropdown-bottom dropdown-end bg-inherit hover:bg-inherit border-0">
                <div tabIndex={0} role="button" className="  border-0  m-1">
                  <img
                    alt="User"
                    className=" rounded-full w-12"
                    src={user.proactiveRefresh.user?.photoURL}
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content  z-[1000] menu p-0  bg-purple-800 border-2  rounded-none w-52"
                >
                  <li className="font-bold p-2 border-b-2 cursor-text bg-purple-950  text-white ">
                    {" "}
                    {user?.displayName}
                  </li>

                  <Link to="/dashboard" className="border-b-2">
                    <li className="font-bold p-2 border-b-2 cursor-pointer bg-purple-950 hover:bg-opacity-50 text-white  ">
                      Dashboard
                    </li>
                  </Link>

                  <li className="font-bold p-2 border-b-2 cursor-pointer bg-purple-950 hover:bg-opacity-50 text-white ">
                    <button
                      onClick={handleLogOut}
                      className="btn  font-bold  bg-[#7D3C98] text-white hover:bg-purple-900 "
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : loading ? (
            <div className="text-center mr-10">
              {" "}
              <span className="loading loading-spinner loading-md text-white "></span>
            </div>
          ) : (
            <div className="space-x-2">
              <Link to="/login">
                <button className="btn  font-bold lg:text-lg bg-[#7D3C98] text-white hover:bg-purple-900 ">
                  Join Us
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
