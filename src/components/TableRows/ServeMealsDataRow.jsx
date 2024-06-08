const ServeMealsDataRow = ({ meal, idx, handleServeMeal }) => {
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
        <div className="text-gray-900 whitespace-no-wrap">
          <ul className="list-decimal">
            {meal?.requested.map((req, idx) => (
              <li key={idx}>{req?.requestedUserEmail}</li>
            ))}
          </ul>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="text-gray-900 whitespace-no-wrap">
          <ul className="list-decimal">
            {meal?.requested.map((req, idx) => (
              <li key={idx}>{req?.requestedUserName}</li>
            ))}
          </ul>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="text-gray-900 whitespace-no-wrap">
          <ul className="list-decimal">
            {meal?.requested.map((req, idx) => (
              <li key={idx}>{req?.status}</li>
            ))}
          </ul>
        </div>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {meal?.requested.map((req, idx) => (
          <button
            key={idx}
            disabled={req?.status === "served"}
            onClick={() => handleServeMeal(meal?._id, req?.requestedUserEmail)}
            className="relative cursor-pointer m-1 px-3 py-1 font-semibold text-green-900 leading-tight block disabled:cursor-not-allowed"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">Serve Meal</span>
          </button>
        ))}
      </td>
    </tr>
  );
};

export default ServeMealsDataRow;
