// import { useQuery } from "@tanstack/react-query";
// import useAxiosCommon from "./useAxiosCommon";

// const useAllMeal = () => {
//   const axiosCommon = useAxiosCommon();

//   const { data: upcomingMeals = [], isLoading } = useQuery({
//     queryKey: ["upcomingMeals"],
//     queryFn: async () => {
//       const { data } = await axiosCommon.get("/upcomingMeals");
//       return data;
//     },
//   });

//   return [upcomingMeals, isLoading];
// };

// export default useAllMeal;
