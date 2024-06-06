import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRoleBadge = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  // fetch user info using logged in user email
  const { data: dbUser, isLoading } = useQuery({
    queryKey: ["roleBadge", user?.email],
    // enabled the fetch if the loading  is false and user email is true
    // note: enable always requires a Bool value
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user?.email}`);
      return data;
    },
  });

  return [dbUser, isLoading];
};

export default useRoleBadge;
