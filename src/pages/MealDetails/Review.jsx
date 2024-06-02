import { Link } from "react-router-dom";

const Review = () => {
  return (
    <div className="my-16">
      <div className="flex justify-between items-center">
        <div className="w-1/2">
          <h2 className="lg:text-5xl md:text-4xl w-full text-end  text-3xl text-[#8A2BE2] font-bold ">
            Review
          </h2>
        </div>
        <p className=" bg-purple-200 p-2 rounded-md  text-[#8A2BE2] font-bold text-center">
          <span>set </span>Reviews
        </p>
      </div>
      <div className="divider my-2 bg-[#8A2BE2] lg:h-1 h-[2px]"></div>
      <div className="flex flex-col  p-8 shadow-sm rounded-xl lg:p-12 bg-gradient-to-r from-[#8A2BE24D] from-0% via-[#8A2BE219] via-50% to-[#8A2BE20D] to-100% border-gradient-right text-white">
        <div className="flex flex-col items-center w-full">
          <h2 className="lg:text-4xl text-3xl text-[#8A2BE2] font-bold text-center">
            Your opinion matters!
          </h2>
          <div className="flex flex-col items-center py-6 space-y-3">
            <span className="text-center text-[#8A2BE2] font-semibold lg:text-xl text-lg">
              How was your experience?
            </span>
          </div>
          <div className="flex flex-col lg:w-1/2 w-full">
            <textarea
              rows="5"
              placeholder="Give your review..."
              className="p-4 rounded-md resize-none dark:text-gray-800 dark:bg-gray-50"
            ></textarea>
            <button
              type="button"
              className="py-4 font-bold my-8 lg:text-lg rounded-md text-white bg-[#8A2BE2]"
            >
              Leave feedback
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Link
            to="/"
            rel="noopener noreferrer"
            href="#"
            className="text-sm font-bold text-[#8A2BE2]"
          >
            Maybe later
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Review;
