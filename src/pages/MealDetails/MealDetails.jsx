import { useMutation, useQuery } from "@tanstack/react-query";
// import useAxiosCommon from "../../hooks/useAxiosCommon";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import Review from "./Review";
import toast from "react-hot-toast";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import useSingleMeal from "../../hooks/useSingleMeal";

const MealDetails = () => {
  const { id } = useParams();
  // const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // const {
  //   data: meal = {},
  //   isLoading,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["meal", id],
  //   queryFn: async () => {
  //     const { data } = await axiosCommon.get(`/meal/${id}`);
  //     return data;
  //   },
  // });
  const [meal, isLoading, refetch] = useSingleMeal(id);
  // the shown meal
  const {
    _id,
    meal_name,
    category,
    meal_image,
    price,
    likes,
    rating,
    post_time,
    description,
    adminName,
    ingredients,
    review,
    requested,
  } = meal;

  // review related
  // update the review array
  let checkDuplicate = null;
  if (review && review.length) {
    checkDuplicate = review.find((rev) => rev?.reviewBy === user?.displayName);
  }

  let checkDuplicateRequest = null;
  if (requested && requested.length) {
    checkDuplicateRequest = requested.find(
      (req) => req.requestedUserEmail === user?.email
    );
  }
  let checkDuplicateLike = null;
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
      toast.success("Action Updated");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update review: " + error.message);
    },
  });
  // review related
  const handleReviewForm = async (e) => {
    e.preventDefault();

    if (checkDuplicate) {
      return toast.error("You already given review for this meal");
    }
    const form = e.target;
    const userReviewText = form.userReview.value.trim();

    if (!userReviewText) {
      toast.error("Review cannot be empty");
      return;
    }

    const userReview = {
      review: userReviewText,
      reviewBy: user?.displayName || "Anonymous",
    };

    try {
      const newReview = {
        _id,
        review: [userReview], // Only send the new review
        requestStatus: false,
        likeStatus: false,
      };
      console.log(newReview);

      await mutateAsync(newReview);
      form.reset();
    } catch (err) {
      form.reset();
      console.error(err);
      toast.error("Error: " + err.message);
    }
  };

  // request related
  const handleRequest = async () => {
    if (checkDuplicateRequest) {
      return toast.error("You already given request for this meal");
    }
    const userRequest = {
      requestedUserEmail: user?.email,
      requestedUserName: user?.displayName,
      status: "pending",
    };

    try {
      const newReQuest = {
        _id,
        requested: [userRequest], // Only send the new review
        requestStatus: true,
        likeStatus: false,
      };
      console.log(newReQuest);

      await mutateAsync(newReQuest);
    } catch (err) {
      console.error(err);
      toast.error("Error: " + err.message);
    }
  };

  // like related
  const handleLike = async () => {
    if (checkDuplicateLike) {
      return toast.error("You already liked this meal once");
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

  if (isLoading) return <LoadingSpinner />;

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
              <span className="font-semibold">{likes?.length}</span>
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
              <span className="font-semibold">{adminName}</span>
            </p>{" "}
          </div>
          <div className=" w-full">
            <span className="font-bold lg:text-lg ">Ingredients</span>{" "}
            <span className="font-semibold">{ingredients}</span>
            {/* <ul className="list-decimal border-t-2 border-[#8A2BE2] ps-6 flex justify-center gap-8 w-full mt-2 mb-4 pt-2">
              {ingredients.map((ingredient, idx) => (
                <li className="text-left " key={idx}>
                  {ingredient}
                </li>
              ))}
            </ul> */}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <button
              disabled={isPending}
              onClick={handleRequest}
              type="button"
              className="lg:px-8  px-4 py-2  disabled:cursor-not-allowed  lg:py-3 lg:m-2 lg:text-lg md:font-bold font-semibold rounded-xl border  bg-violet-900 hover:bg-violet-400 text-gray-100 hover:text-black"
            >
              Request
            </button>

            <button
              disabled={isPending}
              onClick={handleLike}
              type="button"
              className="lg:px-8  px-4 py-2 disabled:cursor-not-allowed   lg:py-3 lg:m-2 lg:text-lg md:font-bold font-semibold rounded-xl border  bg-violet-900 hover:bg-violet-400 text-gray-100 hover:text-black"
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
          </div>
        </div>
      </div>
      <img
        src={meal_image}
        alt=""
        className="w-5/6 mx-auto mb-12 -mt-20 bg-gray-500 rounded-lg shadow-md lg:-mt-40"
      />

      <Review
        review={review}
        handleReviewForm={handleReviewForm}
        isPending={isPending}
      ></Review>
    </section>
  );
};

export default MealDetails;
