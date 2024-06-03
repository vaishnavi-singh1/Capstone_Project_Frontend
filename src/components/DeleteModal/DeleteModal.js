import "./DeleteModal.scss";
import axios from "axios";

function DeleteModal({
  setDeleteModal,
  deleteGodown,
  notify,
  setGodownsData,
}) {
  const cancelHandler = () => {
    setDeleteModal(false);
  };

  const deleteHandler = () => {
    let apiURL = `http://localhost:8000/godowns/${deleteGodown[1]}`;
    // let apiURL = `http://10.11.244.90:8080/admin/godowns/${deleteGodown[1]}`;

    axios
      .delete(apiURL)
      .then((res) => {
        console.log(res);
        // setGodownsData(res.data);
      })
      .then(setDeleteModal(false))
      .then(notify(deleteGodown[0]))
      .catch((err) => console.error(err));
  };
  return (
    <div className="deleteModal-bg">
      <div className="deleteModal-container">
        <div className="deleteModal__top-container">
          <button onClick={cancelHandler} className="deleteModal__close-btn">
            X
          </button>
          <div className="deleteModal__text-container">
            <h1 className="deleteModal__title">
              Delete {deleteGodown[0]} godown?
            </h1>
            <p className="deleteModal__text">
              Please confirm that you’d like to delete the {deleteGodown[0]}
              {"\u00a0"}
              from the list of godowns. You won’t be able to undo this
              action.
            </p>
          </div>
        </div>
        <div className="deleteModal__btn-container">
          <button
            onClick={cancelHandler}
            className="deleteModal__btn deleteModal__btn-cancel"
          >
            Cancel
          </button>
          <button
            onClick={deleteHandler}
            className="deleteModal__btn deleteModal__btn-delete "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
