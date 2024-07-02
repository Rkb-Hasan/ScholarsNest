import { Helmet } from "react-helmet-async";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ServeMealsDataRow from "../../../components/TableRows/ServeMealsDataRow";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ServeMeals = () => {
  const axiosSecure = useAxiosSecure();
  const axiosCommon = useAxiosCommon();
  const mealStat = "present";

  const {
    data: meals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(
        `/meals/${mealStat}?getBy=request`
      );
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (reqQuery) => {
      try {
        const { data } = await axiosSecure.put(
          "/updateRequestStatus",
          reqQuery
        );
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    onSuccess: async (data) => {
      await refetch();
      console.log(data);
      toast.success("Meal served successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to serve meal: " + error.message);
    },
  });

  const handleServeMeal = (mealId, requestedUserEmail) => {
    const requestQuery = { mealId, requestedUserEmail };

    Swal.fire({
      title: "Are you sure?",
      text: "Meal is ready to be served!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Serve",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await mutateAsync(requestQuery);
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (!meals.length) return <p>No request made yet</p>;

  return (
    <>
      <Helmet>
        <title>Serve Meals</title>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
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
                      User Email
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      User Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Table Row Data */}
                  {meals.map((meal, idx) => (
                    <ServeMealsDataRow
                      key={meal._id}
                      idx={idx}
                      meal={meal}
                      handleServeMeal={handleServeMeal}
                    ></ServeMealsDataRow>
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

export default ServeMeals;
