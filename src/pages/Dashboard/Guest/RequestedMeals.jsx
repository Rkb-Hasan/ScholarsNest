import { Helmet } from "react-helmet-async";
import useAuth from "./../../../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import RequestedDataRow from "../../../components/TableRows/RequestedDataRow";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
const RequestedMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/searchMeal?requestsBy=${user?.email}`
      );
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (cancelQuery) => {
      try {
        const { data } = await axiosSecure.delete(`/cancelRequest`, {
          data: cancelQuery,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    onSuccess: async (data) => {
      await refetch();
      console.log(data);
      toast.success("request deleted successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete: " + error.message);
    },
  });

  const handleCancel = async (mealId, requestedUserEmail) => {
    const cancelQuery = { mealId, requestedUserEmail };

    Swal.fire({
      title: "Are you sure?",
      text: "Delete request For this meal",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await mutateAsync(cancelQuery);
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  // console.log(reviews);
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (requests.length === 0) return <p>No requests made yet</p>;

  return (
    <>
      <Helmet>
        <title>Requested Meals</title>
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
                  {requests.map((meal, idx) => (
                    <RequestedDataRow
                      key={meal._id}
                      idx={idx}
                      refetch={refetch}
                      meal={meal}
                      handleCancel={handleCancel}
                    ></RequestedDataRow>
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

export default RequestedMeals;
