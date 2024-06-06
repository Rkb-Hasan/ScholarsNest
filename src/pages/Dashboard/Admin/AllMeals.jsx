import { Helmet } from "react-helmet-async";
import useAllMeal from "../../../hooks/useAllMeal";
import LoadingSpinner from "./../../../components/Shared/LoadingSpinner";
import AllMealsDataRow from "../../../components/TableRows/AllMealsDataRow";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useState } from "react";

const AllMeals = () => {
  // const [meals, isLoading, refetch] = useAllMeal();
  const [sortQuery, setSortQuery] = useState();
  const axiosSecure = useAxiosSecure();
  const axiosCommon = useAxiosCommon();
  // sort related
  const {
    data: meals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/meals?sortBy=${sortQuery}`);
      return data;
    },
  });

  // delete a meal from db
  const handleDeleteMeal = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/deleteMeal/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Deleted the Meal",
              icon: "success",
            });
          }
        });
      }
    });
  };
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <>
      <Helmet>
        <title>All Meals</title>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="dropdown w-full  dropdown-bottom dropdown-end bg-inherit hover:bg-inherit border-0 ">
            <div
              tabIndex={0}
              role="button"
              className="w-full flex justify-end "
            >
              <div className="  font-bold p-2 rounded-md cursor-pointer bg-purple-950 hover:bg-opacity-90 text-white ">
                {" "}
                <button>Sort By</button>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content  z-[1000] menu p-0  bg-purple-800 border-2  rounded-none w-52"
            >
              <li
                onClick={() => setSortQuery("likesCount")}
                className="font-bold p-2 border-b-2 cursor-pointer bg-purple-950 hover:bg-opacity-50 text-white  "
              >
                Likes
              </li>

              <li
                onClick={() => setSortQuery("reviewsCount")}
                className="font-bold p-2 border-b-2 cursor-pointer bg-purple-950 hover:bg-opacity-50 text-white "
              >
                Reviews Count
              </li>
            </ul>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      SL
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Meal Title
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Likes
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Reviews
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Distributor Name
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    ></th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    ></th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Table Row Data */}
                  {meals.map((meal, idx) => (
                    <AllMealsDataRow
                      key={meal._id}
                      idx={idx}
                      meal={meal}
                      handleDeleteMeal={handleDeleteMeal}
                    ></AllMealsDataRow>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllMeals;
