import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import useRoleBadge from "../../../hooks/useRoleBadge";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAllMeal from "./../../../hooks/useAllMeal";

const Profile = () => {
  const { user, loading } = useAuth() || {};
  const [dbUser, isLoading] = useRoleBadge();
  const [meals, , ,] = useAllMeal();
  // console.log(meals);
  let mealsAdded = null;
  if (meals && meals?.length > 0 && dbUser?.role === "admin") {
    mealsAdded = meals.filter((meal) => meal?.adminEmail === dbUser?.email);
  }
  // console.log(mealsAdded);
  // console.log(user);
  if (loading || isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-2xl w-3/5">
        <img
          alt="profile"
          src="https://wallpapercave.com/wp/wp10784415.jpg"
          className="w-full mb-4 rounded-t-lg h-36"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
            />
          </a>

          <p
            className={`p-2 capitalize px-4 text-xs text-white bg-pink-500 rounded-full ${
              dbUser?.role === "admin" ? "hidden" : "block"
            }`}
          >
            {dbUser?.role !== "admin" && dbUser.badge}
          </p>

          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-black ">
                  {user?.displayName}
                </span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black ">{user?.email}</span>
              </p>
              <p
                className={`flex flex-col ${
                  dbUser?.role === "admin" ? "block" : "hidden"
                }`}
              >
                {dbUser?.role === "admin" && (
                  <p className="flex flex-col">
                    {" "}
                    <span>Meals Added</span>{" "}
                    <span className="font-bold ms-10 text-black ">
                      {mealsAdded?.length}
                    </span>
                  </p>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
