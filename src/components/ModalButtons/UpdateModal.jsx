import UpdateMealForm from "../Form/UpdateMealForm";

const UpdateModal = ({ meal }) => {
  //   console.log(meal);
  return (
    <>
      <button
        onClick={() => document.getElementById(`modal_${meal._id}`).showModal()}
        className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
        ></span>
        <span className="relative">Update</span>
      </button>

      {/* modal */}

      <dialog id={`modal_${meal._id}`} className="modal">
        <div className="modal-box w-full">
          <UpdateMealForm mealToUpdate={meal}></UpdateMealForm>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-purple-950 text-white hover:bg-purple-800 hover:text-slate-800 lg:text-lg">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default UpdateModal;
