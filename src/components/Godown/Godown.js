import "./Godown.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import rightArrow from "../../assets/Icons/chevron_right-24px.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Godown(props) {

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteGodown, setDeleteGodown] = useState([""]);

  const notify = (item) =>
  toast.success(`${item} was deleted from godowns.`);

  const delHandle = (name, id) => {
    setDeleteGodown([name, id]);
    setDeleteModal(true);
  };

  return (
    <>
      <div className="godown__container">
      {deleteModal && (
          <DeleteModal
            setDeleteModal={setDeleteModal}
            deleteGodown={deleteGodown}
            notify={notify}
            setGodownsData={props.setGodownsData}
          />
      )}
        <div className="godown__top">
          <h1 className="godown__title">Godowns</h1>
          <div className="godown__topright">
            <Link to="/godowns/new" className="godown__button">
              + Add New Godown
            </Link>
          </div>
        </div>

        <div className="godown__categories">
          <div className="godown__categoryAndArrow">
            <span className="godown__category ">
              GODOWN
            </span>
          </div>
          <div className="godown__categoryAndArrow">
            <span className="godown__category">
              ADDRESS
            </span>
          </div>
          <div className="godown__categoryAndArrow">
            <span className="godown__category">CONTACT NAME</span>
          </div>
          <div className="godown__categoryAndArrow">
            <span className="godown__category">CONTACT INFORMATION</span>
          </div>
          <span className="godown__category--right">ACTIONS</span>
        </div>

        {props.godownsData.map((godown) => (
            <div className="godown" key={godown.id}>
              <div className="godown__text">
                <div className="godown__left">
                  <Link
                    to={`/godowns/${godown.id}`}
                    className="godown__link"
                  >
                    <div className="godown__nameAndArrow">
                      <p className="godown__name">{godown.godownName}</p>

                      <img
                        src={rightArrow}
                        className="godown__rightArrow"
                        alt="right arrow"
                      />
                    </div>
                  </Link>
                  <p className="godown__address">
                    {godown.godownAddress}, {godown.godownCity}, {godown.godownCountry}
                  </p>
                </div>
                <div className="godown__right">
                  <p className="godown__contact">{godown.godownEmployee.employeeName}</p>
                  <p className="godown__contactinfo">
                    <span>{godown.godownEmployee.employeePhone}</span>
                    <span>{godown.godownEmployee.employeEmail}</span>
                  </p>
                </div>
              </div>
              <div className="godown__icons">
                <img
                  onClick={() => delHandle(godown.godownName, godown.id)}
                  src={deleteIcon}
                  alt="delete icon"
                  className="godown__deleteicon"
                />
                <Link to={`edit-godown/${godown.id}`}>
                  <img
                    src={editIcon}
                    alt="edit icon"
                    className="godown__editicon"
                  />
                </Link>
              </div>
            </div>
          ))}
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}
export default Godown;
