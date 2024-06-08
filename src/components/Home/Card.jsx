import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useRoleBadge from "../../hooks/useRoleBadge";
import LoadingSpinner from "../Shared/LoadingSpinner";
const Card = ({ meal, like, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [dbUser, isLoading] = useRoleBadge();
  let checkDuplicateLike = null;

  const { _id, meal_name, category, meal_image, price, likes } = meal;

  if (likes && likes.length) {
    checkDuplicateLike = likes.find((like) => like.likedUser === user?.email);
  }

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (updateOrInsert) => {
      try {
        const { data } = await axiosSecure.put(`/saveMeal`, updateOrInsert);
        return data;
      } catch (error) {
        if (error.response) {
          // Axios error with response
          throw new Error(
            `Error ${error.response.status}: ${error.response.statusText}`
          );
        } else {
          // Other errors
          throw new Error(error.message);
        }
      }
    },
    onSuccess: (data) => {
      refetch();
      console.log(data);
      toast.success("Liked!!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update : " + error.message);
    },
  });

  const handleLike = async () => {
    if (checkDuplicateLike) {
      return toast.error("You already liked this meal once");
    } else if (dbUser?.badge === "bronze") {
      return toast.error(
        "Opps! Only premium users can like the upcoming meals"
      );
    }
    const userLiked = {
      likedUser: user?.email,
    };

    try {
      const newLike = {
        _id,
        liked: [userLiked], // Only send the new like
        requestStatus: false,
        likeStatus: true,
      };
      console.log(newLike);

      await mutateAsync(newLike);
    } catch (err) {
      console.error(err);
      toast.error("Error: " + err.message);
    }
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
      <div
        className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
        style={{
          backgroundImage: `url(${meal_image})`,
        }}
      ></div>

      <div className="w-64 -mt-10 overflow-hidden bg-purple-950 rounded-lg shadow-lg  ">
        <div className="flex justify-center">
          <h3 className="py-2  font-bold tracking-wide text-center text-gray-800  dark:text-white">
            {meal_name}
          </h3>
          <span className="text-xs text-white">({category})</span>
        </div>

        <div className="flex items-center justify-between px-3 py-2 bg-purple-800 ">
          <div className="flex">
            <span className="font-bold text-gray-800 dark:text-gray-200">
              {price}$
            </span>
            <span className="text-xs text-white ">
              (Likes : {likes.length})
            </span>
          </div>

          <div className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-violet-950 rounded hover:bg-gray-700  focus:bg-gray-700  focus:outline-none disabled:bg-slate-600 ">
            {like ? (
              <button
                onClick={handleLike}
                disabled={isPending}
                className="flex items-center gap-1 disabled:cursor-not-allowed"
              >
                {checkDuplicateLike ? (
                  <span className="flex items-center gap-1 ">
                    {likes?.length}
                    <AiFillLike />
                  </span>
                ) : (
                  <span className="flex items-center gap-1 ">
                    {likes?.length} <AiOutlineLike />
                  </span>
                )}
              </button>
            ) : (
              <Link to={`/meal/${_id}`}>Details</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  meal: PropTypes.object,
};

export default Card;
