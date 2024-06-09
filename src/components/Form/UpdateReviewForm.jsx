const UpdateReviewForm = ({ handleUpdateNewReview, defaultReview }) => {
  return (
    <div>
      <form
        method="dialog"
        onSubmit={(e) => handleUpdateNewReview(e)}
        className="flex flex-col  w-full"
      >
        <textarea
          defaultValue={defaultReview}
          rows="5"
          placeholder="Give your review..."
          className="p-4 rounded-md resize-none border-2 dark:text-gray-800 dark:bg-gray-50"
          name="userNewReview"
        ></textarea>
        <input
          //   disabled={isPending}
          type="submit"
          className="cursor-pointer disabled:cursor-not-allowed py-4 font-bold my-8 rounded-md text-white bg-[#8A2BE2]"
          value="Update"
        ></input>
      </form>
    </div>
  );
};

export default UpdateReviewForm;
