import useAuth from "../../hooks/useAuth";

const RequestedDataRow = ({ meal, idx, handleCancel }) => {
  const { user } = useAuth();

  const myRequest = meal?.requested.find(
    (req) => req?.requestedUserEmail === user?.email
  );
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
        <p className="text-gray-900 whitespace-no-wrap">{myRequest?.status}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => handleCancel(meal?._id, myRequest?.requestedUserEmail)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">cancel</span>
        </button>
        {/* Delete modal */}
        {/* <DeleteModal
            isOpen={isOpen}
            closeModal={closeModal}
            handleDelete={handleDelete}
            id={meal?._id}
          ></DeleteModal> */}
      </td>
    </tr>
  );
};

export default RequestedDataRow;

//  RequestedDataRow;
