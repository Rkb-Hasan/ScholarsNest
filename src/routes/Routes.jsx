import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
// import RoomDetails from "../pages/RoomDetails/RoomDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Statistics from "./../pages/Dashboard/Common/Statistics";
import MyListings from "../pages/Dashboard/Host/MyListings";
import AddRoom from "../pages/Dashboard/Host/AddRoom";
import Profile from "../pages/Dashboard/Common/Profile";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AdminRoute from "./AdminRoute";
import HostRoute from "./HostRoute";
import ManageBookings from "../pages/Dashboard/Host/ManageBookings";
import MealDetails from "../pages/MealDetails/MealDetails";
import Meals from "../pages/Meals/Meals";
import UpcomingMeals from "../pages/UpcomingMeals/UpcomingMeals";
import RequestedMeals from "../pages/Dashboard/Guest/RequestedMeals";
import MyReviews from "../pages/Dashboard/Guest/MyReviews";
import PaymentHistory from "../pages/Dashboard/Guest/PaymentHistory";
import Payment from "../pages/Payment/Payment";
import AddMeal from "../pages/Dashboard/Admin/AddMeal";
import AllMeals from "../pages/Dashboard/Admin/AllMeals";
import AllReviews from "../pages/Dashboard/Admin/AllReviews";
import ServeMeals from "../pages/Dashboard/Admin/ServeMeals";
import AllUpcomingMeals from "../pages/Dashboard/Admin/AllUpcomingMeals";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/meal/:id",
        element: <MealDetails />,
      },
      {
        path: "/meals",
        element: <Meals />,
      },
      {
        path: "/upcomingMeals",
        element: <UpcomingMeals />,
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics></Statistics>
          </PrivateRoute>
        ),
      },
      {
        path: "requestedMeals",
        element: (
          <PrivateRoute>
            <RequestedMeals></RequestedMeals>
          </PrivateRoute>
        ),
      },
      {
        path: "myReviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
      {
        path: "paymentHistory",
        element: (
          <PrivateRoute>
            <PaymentHistory></PaymentHistory>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-bookings",
        element: (
          <PrivateRoute>
            {/* <HostRoute> */} <ManageBookings></ManageBookings>
            {/* </HostRoute> */}
          </PrivateRoute>
        ),
      },
      {
        path: "add-room",
        element: (
          <PrivateRoute>
            {/* <HostRoute> */} <AddRoom></AddRoom>
            {/* </HostRoute> */}
          </PrivateRoute>
        ),
      },
      {
        path: "my-listings",
        element: (
          <PrivateRoute>
            {/* <HostRoute> */}
            <MyListings></MyListings>
            {/* </HostRoute> */}
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            {/* <AdminRoute> */} <ManageUsers></ManageUsers>
            {/* </AdminRoute> */}
          </PrivateRoute>
        ),
      },
      {
        path: "add-meal",
        element: (
          <PrivateRoute>
            {/* <AdminRoute> */} <AddMeal></AddMeal>
            {/* </AdminRoute> */}
          </PrivateRoute>
        ),
      },
      {
        path: "all-meals",
        element: (
          <PrivateRoute>
            {/* <AdminRoute> */} <AllMeals></AllMeals>
            {/* </AdminRoute> */}
          </PrivateRoute>
        ),
      },
      {
        path: "all-reviews",
        element: (
          <PrivateRoute>
            {/* <AdminRoute> */} <AllReviews></AllReviews>
            {/* </AdminRoute> */}
          </PrivateRoute>
        ),
      },
      {
        path: "serve-meals",
        element: (
          <PrivateRoute>
            {/* <AdminRoute> */} <ServeMeals></ServeMeals>
            {/* </AdminRoute> */}
          </PrivateRoute>
        ),
      },
      {
        path: "all-upcoming-meals",
        element: (
          <PrivateRoute>
            {/* <AdminRoute> */} <AllUpcomingMeals></AllUpcomingMeals>
            {/* </AdminRoute> */}
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
