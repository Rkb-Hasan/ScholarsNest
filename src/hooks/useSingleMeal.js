import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useSingleMeal = (id) => {
  const axiosCommon = useAxiosCommon();
  const {
    data: meal = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/meal/${id}`);
      return data;
    },
  });
  return [meal, isLoading, refetch];
};

export default useSingleMeal;
