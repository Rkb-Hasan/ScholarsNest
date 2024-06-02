import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Card = ({ meal }) => {
  const { _id, meal_name, category, meal_image, price, like_count } = meal;
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
              (Qty Available : {like_count})
            </span>
          </div>
          <Link to={`/meal/${_id}`}>
            <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-violet-950 rounded hover:bg-gray-700  focus:bg-gray-700  focus:outline-none">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  meal: PropTypes.object,
};

export default Card;
