import { Link, useLocation, useNavigate } from "react-router-dom";
import UpdateReviewModal from "../ModalButtons/UpdateReviewModal";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReviewDataRow = ({ meal, idx, email, handleDelete, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  const { review } = meal;
  const myReview = review.find((rev) => rev.reviewBy === email);
  const { mutateAsync } = useMutation({
    mutationFn: async (reviewQuery) => {
      try {
        const { data } = await axiosSecure.put("/updateReview", reviewQuery);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    onSuccess: async (data) => {
      await refetch();
      console.log(data);
      navigate(from);
      toast.success("Review updated successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update: " + error.message);
    },
  });

  const handleUpdateNewReview = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newReview = form.userNewReview?.value;
    if (!newReview) return toast.error("Review can't be empty!");
    const reviewQuery = {
      mealId: meal?._id,
      reviewedUserEmail: myReview?.reviewBy,
      newReview,
    };
    // console.log(reviewQuery);
    try {
      await mutateAsync(reviewQuery);
    } catch (err) {
      console.log(err);
    }
  };

  //   console.log(myReview.review);
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="ml-3">
          <p className="text-gray-900 whitespace-no-wrap">{idx + 1}</p>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="ml-3">
          <p className="text-gray-900 whitespace-no-wrap">{meal?.meal_name}</p>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{meal?.likes.length}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{myReview?.review}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <UpdateReviewModal
          handleUpdateNewReview={handleUpdateNewReview}
          defaultReview={myReview?.review}
        ></UpdateReviewModal>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => handleDelete(meal._id, myReview?.reviewBy)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Delete</span>
        </button>
        {/* Delete modal */}
        {/* <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          handleDelete={handleDelete}
          id={meal?._id}
        ></DeleteModal> */}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <Link to={`/meal/${meal?._id}`}>
          <button
            //   onClick={() => setIsOpen(true)}
            className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">View Meal</span>
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default ReviewDataRow;
