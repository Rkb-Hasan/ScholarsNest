// import UpdateReviewForm from "../Form/UpdateReviewForm";

import UpdateReviewForm from "../Form/UpdateReviewForm";

const UpdateReviewModal = ({ defaultReview, handleUpdateNewReview }) => {
  return (
    <>
      <button
        onClick={() => document.getElementById(`modal_2`).showModal()}
        className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight bg-green-400 bg-opacity-20 rounded-3xl"
      >
        Edit
      </button>

      {/* modal */}

      <dialog id={`modal_2`} className="modal">
        <div className="modal-box w-full">
          <UpdateReviewForm
            handleUpdateNewReview={handleUpdateNewReview}
            defaultReview={defaultReview}
          ></UpdateReviewForm>
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

export default UpdateReviewModal;
