import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  // fetch user info using logged in user email
  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    // enabled the fetch if the loading  is false and user email is true
    // note: enable always requires a Bool value
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user?.email}`);
      return data.role;
    },
  });

  return [role, isLoading];
};

export default useRole;
