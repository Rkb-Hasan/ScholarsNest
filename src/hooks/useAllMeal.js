import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useAllMeal = () => {
  const axiosCommon = useAxiosCommon();

  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/meals");
      return data;
    },
  });

  return [meals, isLoading];
};

export default useAllMeal;
