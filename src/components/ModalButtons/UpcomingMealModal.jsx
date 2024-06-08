import UpcomingMealForm from "../Form/UpcomingMealForm";

const UpcomingMealModal = ({ refetch }) => {
  return (
    <>
      <button
        onClick={() => document.getElementById(`modal_1`).showModal()}
        className="btn bg-violet-950 text-white hover:bg-violet-800 rounded-sm font-bold"
      >
        Add Upcoming Meal
      </button>

      {/* modal */}

      <dialog id={`modal_1`} className="modal">
        <div className="modal-box w-full">
          <UpcomingMealForm refetch={refetch}></UpcomingMealForm>
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

export default UpcomingMealModal;
