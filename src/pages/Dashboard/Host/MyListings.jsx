import { useMutation, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import RoomDataRow from "../../../components/TableRows/RoomDataRow";
import { toast } from "react-hot-toast";

const MyListings = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  // fetch rooms data
  const {
    data: rooms = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["rooms", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-listings/${user?.email}`);
      return data;
    },
  });

  // delete room from db
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = axiosSecure.delete(`/room/${id}`);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("deleted successfully");
      // refetch from the useQuery
      refetch();
    },
  });

  // handle delete
  const handleDelete = async (id) => {
    try {
      await mutateAsync(id);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading || loading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <>
      <Helmet>
        <title>My Listings</title>
      </Helmet>
      {rooms && rooms.length > 0 ? (
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
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        From
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        To
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Delete
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Update
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Room row data */}
                    {rooms.map((room) => (
                      <RoomDataRow
                        key={room._id}
                        room={room}
                        handleDelete={handleDelete}
                      ></RoomDataRow>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="font-bold text-red-500">No Rooms are added by you</p>
      )}
    </>
  );
};

export default MyListings;
