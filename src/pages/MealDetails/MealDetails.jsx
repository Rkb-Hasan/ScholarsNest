import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import Review from "./Review";

const MealDetails = () => {
  const { id } = useParams();
  const axiosCommon = useAxiosCommon();

  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/meal/${id}`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  const {
    _id,
    meal_name,
    category,
    meal_image,
    price,
    like_count,
    rating,
    post_time,
    description,
    admin_name,
    ingredients,
  } = meal;

  return (
    <section>
      <Helmet>
        <title>Best Taste|Single Food</title>
      </Helmet>
      <div className="bg-[#31174a]">
        <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 text-gray-50">
          <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold leading-none xl:max-w-3xl text-gray-50">
            {meal_name}
          </h1>
          <div className="divider m-0 lg:mt-4 mt-2 bg-[#8A2BE2] md:h-1 h-[2px]"></div>
          <p className=" text-left lg:text-lg font-bold  lg:mt-6 mt-4  text-gray-50">
            {description}
          </p>
          <div className="flex w-full lg:text-base text-sm lg:justify-center items-center gap-2 mt-4">
            <p className="font-bold">Category : {category}</p> |
            <p>
              <span className="font-bold ">Price</span> :{" "}
              <span className="font-semibold">{price}$</span>
            </p>{" "}
            |
            <p>
              <span className="font-bold ">Likes</span> :{" "}
              <span className="font-semibold">{like_count}</span>
            </p>{" "}
          </div>
          <div className="flex lg:justify-center lg:text-base w-full items-center gap-2 mt-1 mb-4">
            <p>
              <span className="font-bold ">Rating</span> :{" "}
              <span className="font-semibold">{rating}</span>
            </p>{" "}
            |
            <p>
              <span className="font-bold ">Posted Time</span> :{" "}
              <span className="font-semibold">{post_time}</span>
            </p>{" "}
            |
            <p>
              <span className="font-bold ">Admin Name</span> :{" "}
              <span className="font-semibold">{admin_name}</span>
            </p>{" "}
          </div>
          <div className=" w-full">
            <span className="font-bold lg:text-lg ">Ingredients</span>{" "}
            <ul className="list-decimal border-t-2 border-[#8A2BE2] ps-6 flex justify-center gap-8 w-full mt-2 mb-4 pt-2">
              {ingredients.map((ingredient, idx) => (
                <li className="text-left " key={idx}>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link to={`/purchase/${_id}`}>
              <button
                type="button"
                className="lg:px-8  px-4 py-2   lg:py-3 lg:m-2 lg:text-lg md:font-bold font-semibold rounded-xl border  bg-violet-900 hover:bg-violet-400 text-gray-100 hover:text-black"
              >
                Request
              </button>
            </Link>
            <Link to={`/purchase/${_id}`}>
              <button
                type="button"
                className="lg:px-8  px-4 py-2   lg:py-3 lg:m-2 lg:text-lg md:font-bold font-semibold rounded-xl border  bg-violet-900 hover:bg-violet-400 text-gray-100 hover:text-black"
              >
                Like
              </button>
            </Link>
          </div>
        </div>
      </div>
      <img
        src={meal_image}
        alt=""
        className="w-5/6 mx-auto mb-12 -mt-20 bg-gray-500 rounded-lg shadow-md lg:-mt-40"
      />

      <Review></Review>
    </section>
  );
};

export default MealDetails;
