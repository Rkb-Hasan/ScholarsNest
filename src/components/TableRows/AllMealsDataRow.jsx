import { Link } from "react-router-dom";
import UpdateModal from "../ModalButtons/UpdateModal";

const AllMealsDataRow = ({ meal, idx, handleDeleteMeal }) => {
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
        <p className="text-gray-900 whitespace-no-wrap">
          {meal?.review.length}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{meal?.adminName}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {/* update */}
        <UpdateModal meal={meal}></UpdateModal>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => handleDeleteMeal(meal?._id)}
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

export default AllMealsDataRow;
