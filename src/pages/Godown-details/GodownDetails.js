import "./Godown-details.scss";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import editButton from "../../assets/Icons/edit-24px.svg";
import sortButton from "../../assets/Icons/sort-24px.svg";
import trashButton from "../../assets/Icons/delete_outline-24px.svg";
import rightChevron from "../../assets/Icons/chevron_right-24px.svg";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GodownDetails() {
  const { godownID } = useParams();

  // const godownURL = `http://10.11.244.90:8080/admin/godowns/${godownID}`;
  const godownURL = `http://localhost:8000/godowns/${godownID}`;
  const inventoriesAPIURL = "http://localhost:9000/inventories";

  const [currentGodown, setCurrentGodown] = useState();
  // const [currentInventory, setCurrentInventory] = useState();
  const [inventoriesData, setInventoriesData] = useState([]);

  useEffect(() => {
    axios
      .get(inventoriesAPIURL)
      .then((response) => {
        setInventoriesData(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  //filter through all inventories and show just matching godownID
  const currentInventory = inventoriesData.filter(
    (inventory) => inventory.godownID === godownID
  );


  useEffect(() => {
    axios
      .get(godownURL)
      .then((response) => {
        // console.log(response);
        setCurrentGodown(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
      // console.log(godownID);
      // console.log(godownURL);


  }, [godownURL]);

  if (
    currentGodown === null ||
    currentGodown === undefined ||
    currentInventory === null ||
    currentInventory === undefined
  ) {
    return (
      <></>
    );
  }

  return (
    <div className="page-body">
      <header className="Header">
        <h1 className="Header__title">
          <Link to="/">
            <img className="back-arrow" src={backArrow} alt="arrow_back" />
          </Link>
          {currentGodown.godownName}
        </h1>
        <Link to={`/godowns/edit-godown/${godownID}`}>
          <button className="Header__edit-button__mobile">
            <img className="Header__edit-icon" src={editButton} alt="edit" />
          </button>
        </Link>
        <Link to={`/godowns/edit-godown/${godownID}`}>
          <button className="Header__edit-button">
            <img className="Header__edit-icon" src={editButton} alt="edit" />
            Edit
          </button>
        </Link>
      </header>
      <section className="godown-details">
        <div className="godown-details__address">
          <h2 className="godown-details__title">GODOWN ADDRESS:</h2>
          <p className="godown-details__info">
            {currentGodown.godownAddress}, {currentGodown.godownCity},{" "}
            {currentGodown.godownCountry}
          </p>
        </div>
        <div className="godown-details__container">
          <div className="godown-details__name">
            <h2 className="godown-details__title">CONTACT NAME:</h2>
            <p className="godown-details__info">
              {currentGodown.godownEmployee.employeeName}
            </p>
            <p className="godown-details__info">
            <h2 className="godown-details__title">POSITION:</h2>
              {/* {currentGodown.godownEmployee.employeePosition} */}
              Manager
            </p>
          </div>
          <div className="godown-details__contact">
            <h2 className="godown-details__title">CONTACT INFORMATION:</h2>
            <p className="godown-details__info">
              {currentGodown.godownEmployee.employeePhone}
            </p>
            <p className="godown-details__info">
              {currentGodown.godownEmployee.employeeEmail}
            </p>
          </div>
        </div>
      </section>

      <section className="Inventory">
        <ul className="Inventory__header">
          <li className="Inventory__item-title">
            INVENTORY ITEM{" "}
          </li>
          <li className="Inventory__item-title">
            CATEGORY{" "}
          </li>
          <li className="Inventory__item-title">
            STATUS{" "}
          </li>
          <li className="Inventory__item-title">
            QTY{" "}
          </li>
          <li className="Inventory__item-title">
            ACTIONS{" "}
          </li>
        </ul>

        {currentInventory.map((inventory) => {
          return (
            <div className="Inventory__items-grouping" key={inventory.id}>
              <ul className="Inventory__items">
                <div className="Inventory__items-container">
                  <div className="Inventory__items-name">
                    <li className="Inventory__items-title">INVENTORY ITEM</li>
                    <li>
                      <Link
                        className="Inventory__items-item"
                        to={`/inventory/${inventory.id}`}
                      >
                        {inventory.itemName}{" "}
                        <img
                          className="Inventory__items-chevron"
                          src={rightChevron}
                          alt=""
                        />{" "}
                      </Link>
                    </li>
                  </div>
                  <div className="Inventory__items-category">
                    <li className="Inventory__items-title">CATEGORY</li>
                    <li className="Inventory__items-category-details">
                      {inventory.category}
                    </li>
                  </div>
                </div>
                <div className="Inventory__items-container">
                  <div className="Inventory__items-status">
                    <li className="Inventory__items-title">STATUS</li>
                    <li
                      className={
                        inventory.status === "In Stock"
                          ? "Inventory__statusTagGreen"
                          : "Inventory__statusTagRed"
                      }
                    >
                      {inventory.status}
                    </li>
                  </div>
                  <div className="Inventory__items-quantity">
                    <li className="Inventory__items-title">QTY</li>
                    <li className="Inventory__items-quantity-details">
                      {inventory.quantity}
                    </li>
                  </div>
                </div>
                <li className="Inventory__items-actions">
                  <img
                    className="trashCan"
                    src={trashButton}
                    alt="delete"
                  />
                  <Link to={`/inventory/edit-inventory/${inventory.id}`}>
                    <img src={editButton} alt="edit" />
                  </Link>
                </li>
              </ul>
            </div>
          );
        })}
      </section>
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
  );
}

export default GodownDetails;
