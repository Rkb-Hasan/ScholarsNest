import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import UserDataRow from "../../../components/TableRows/UserDataRow";
import { useState } from "react";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [showUser, setShowUser] = useState([]);
  const [error, setError] = useState();

  // fetch users data
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users`);
      return data;
    },
  });
  // console.log(users);

  // search related
  const handleUserSearch = async (e) => {
    e.preventDefault();
    const form = e.target;
    const userName = form.name.value.trim();
    const userEmail = form.email.value.trim();

    try {
      const { data } = await axiosSecure.get(`/user/${userEmail}`, {
        params: {
          userName,
          reqBy: "admin",
        },
      });
      if (data?.length !== 0) {
        setShowUser([...showUser, data]);
        setError("");
      } else {
        setShowUser([]);
        setError("No user found with that name and email");
      }
    } catch (err) {
      setShowUser([]);
      setError(err.message);
    } finally {
      form.reset();
    }
  };

  // make admin related
  const handleMakeAdmin = (user) => {
    if (user?.role === "admin") {
      return Swal.fire({
        title: "Action not permitted!!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ok",
      });
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, go ahead!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Updated!",
              text: "Updated the role of the user",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  console.log(showUser);
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <Helmet>
          <title>Manage Users</title>
        </Helmet>
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="my-5">
              <form onSubmit={handleUserSearch} className=" flex  ">
                <input
                  type="submit"
                  value="Search By"
                  className="btn bg-violet-950 text-white hover:bg-violet-800  rounded-r-none font-bold "
                />
                <label className="input border border-r-0 input-bordered rounded-l-none  rounded-r-none flex items-center gap-2">
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="User name . . ."
                  />
                </label>
                <label className="input border  input-bordered rounded-l-none   flex items-center gap-2">
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="User email . . ."
                  />
                </label>
              </form>
            </div>
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Sl
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Email
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    ></th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Subscription Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* User data table row */}

                  {showUser.length > 0 ? (
                    showUser.map((user, idx) => (
                      <UserDataRow
                        key={user._id}
                        user={user}
                        refetch={refetch}
                        idx={idx}
                        handleMakeAdmin={handleMakeAdmin}
                      ></UserDataRow>
                    ))
                  ) : error ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center text-red-500 font-bold"
                      >
                        {error || "No users found"}
                      </td>
                    </tr>
                  ) : (
                    users.map((user, idx) => (
                      <UserDataRow
                        key={user._id}
                        user={user}
                        refetch={refetch}
                        idx={idx}
                        handleMakeAdmin={handleMakeAdmin}
                      ></UserDataRow>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
