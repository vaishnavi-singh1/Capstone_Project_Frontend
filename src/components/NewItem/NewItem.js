import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewItem.scss";
import ArrowBack from "../../assets/Icons/arrow_back-24px.svg";
import ArrowDropDown from "../../assets/Icons/arrow_drop_down-24px.svg";
import Error from "../../assets/Icons/error-24px.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewItem = () => {
  const [itemDetails, setItemDetails] = useState({
    name: "",
    description: "",
    category: "",
    status: "",
    quantity: 0,
    godownID: "",
    godownName: "",
  });

  const [isdisabled, setIsDisabled] = useState(false);

  const [godowns, setGodowns] = useState(null);

  // Errors
  const [errorName, setErrorName] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  const navigate = useNavigate();

  // Update state for input in Add Item Section - keep all other fields as-is
  const handleItemChange = (e) => {
    setItemDetails({
      ...itemDetails,
      [e.target.name]: e.target.value,
    });
  };

  const notify = (item) => toast.success(`${item} added to inventories.`);

  const ErrorMessage = () => {
    return (
      <span className="new-item__form-error">
        <img
          src={Error}
          alt="Error Icon"
          className="new-item__form-error-icon"
        />
        This field is required
      </span>
    );
  };

  // Set available godowns on initial load
  useEffect(() => {
    const getGodowns = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/godowns"
        );
        setGodowns(response.data);
        setItemDetails({
          ...itemDetails,
          godownID: response.data[0].id,
          godownName: response.data[0].name,
        });
      } catch (error) {
        console.error(error);
      }
    };

    getGodowns();
  }, []);

  // Set available godowns on initial load
  const categories = [
    "Electronics",
    "Gear",
    "Apparel",
    "Accessories",
    "Health",
  ];

  const dropDownArrow = {
    backgroundImage: `url(${ArrowDropDown})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "98% 50%",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let ready = true;

    setErrorName(false);
    setErrorDescription(false);
    setErrorStatus(false);

    if (itemDetails.name === "") {
      setErrorName(true);
      ready = false;
    }
    if (itemDetails.description === "") {
      setErrorDescription(true);
      ready = false;
    }
    if (itemDetails.status === "") {
      setErrorStatus(true);
      ready = false;
    }

    if (ready) {
      // Set Quantity to 0 if out of stock.
      const quantity =
        itemDetails.status === "In Stock" ? itemDetails.quantity : 0;
      try {
        const newItem = {
          godownID: itemDetails.godownID,
          godownName: itemDetails.godownName,
          itemName: itemDetails.name,
          category: itemDetails.category,
          description: itemDetails.description,
          status: itemDetails.status,
          quantity: quantity,
        };
        const inward = {
          godownName: itemDetails.godownName,
          itemName: itemDetails.name,
          category: itemDetails.category,
          quantity: quantity,
          addedBy: "admin"
        };
        const response = await axios.all([
          axios.post(
          "http://localhost:9000/inventories",
          newItem
          ),
          axios.post(
            "http://localhost:7000/inwards",
            inward
          )
        ]);
        setIsDisabled(true);
        notify(newItem.itemName);
        setTimeout(() => {
          navigate("/inventory");
        }, 3000);
        return response;
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <section className="new-item">
      <form onSubmit={handleSubmit}>
        <h1 className="new-item__header">
          <Link to="/" className="new-item__header-link">
            <img src={ArrowBack} alt="Back Arrow Icon" />
          </Link>
          Add New Inventory Item
        </h1>
        <div className="new-item__form-container">
          <div className="new-item__form-section new-item__form-section--details">
            <h2 className="new-item__details-header">Item Details</h2>

            <label htmlFor="name" className="new-item__form-label">
              Item Name
              <input
                name="name"
                placeholder="Item Name"
                value={itemDetails.name}
                onChange={handleItemChange}
                className={`new-item__form-input ${
                  errorName ? " new-item__form-input--error" : ""
                }`}
                disabled={isdisabled}
              />
              {errorName && <ErrorMessage />}
            </label>

            <label htmlFor="description" className="new-item__form-label">
              Description
              <textarea
                name="description"
                placeholder="Description"
                value={itemDetails.description}
                onChange={handleItemChange}
                className={`new-item__form-textarea ${
                  errorDescription ? " new-item__form-textarea--error" : ""
                }`}
                disabled={isdisabled}
              ></textarea>
              {errorDescription && <ErrorMessage />}
            </label>
            <label htmlFor="category" className="new-item__form-label">
              Category
              <select
                name="category"
                className="new-item__form-select"
                style={dropDownArrow}
                onChange={(e) => {
                  let index = e.nativeEvent.target.selectedIndex;
                  setItemDetails({
                    ...itemDetails,
                    category: e.nativeEvent.target[index].text,
                  });
                }}
                disabled={isdisabled}
              >
                {categories &&
                  categories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <div className="new-item__form-section new-item__form-section--availability">
            <h2 className="new-item__details-header">Item Availability</h2>
            <label htmlFor="status" className="new-item__form-label">
              Status
              <div
                className="new-item__radio-container"
                onChange={handleItemChange}
              >
                <div className="new-item__radio-box">
                  <input
                    type="radio"
                    value="In Stock"
                    name="status"
                    className="new-item__radio"
                    disabled={isdisabled}
                  />
                  <span
                    className={`${
                      itemDetails.status === "In Stock"
                        ? "new-item__selected"
                        : ""
                    } ${errorStatus ? "new-item__error" : ""}`}
                  >
                    In Stock
                  </span>
                </div>
                <div className="new-item__radio-box">
                  <input
                    type="radio"
                    value="Out of Stock"
                    name="status"
                    className="new-item__radio"
                    disabled={isdisabled}
                  />
                  <span
                    className={`${
                      itemDetails.status === "In Stock"
                        ? "new-item__selected"
                        : ""
                    } ${errorStatus ? "new-item__error" : ""}`}
                  >
                    Out of Stock
                  </span>
                </div>
              </div>
              {errorStatus && <ErrorMessage />}
            </label>
            {itemDetails.status === "In Stock" && (
              <label htmlFor="quantity" className="new-item__form-label">
                Quantity
                <input
                  name="quantity"
                  placeholder="Quantity"
                  value={itemDetails.quantity}
                  onChange={handleItemChange}
                  className="new-item__form-input"
                  disabled={isdisabled}
                />
              </label>
            )}
            <label htmlFor="godown" className="new-item__form-label">
              Godown
              <select
                name="godown"
                className="new-item__form-select"
                style={dropDownArrow}
                onChange={(e) => {
                  let index = e.nativeEvent.target.selectedIndex;
                  setItemDetails({
                    ...itemDetails,
                    godownID: e.target.value,
                    godownName: e.nativeEvent.target[index].text,
                  });
                }}
                disabled={isdisabled}
              >
                {godowns &&
                  godowns.map((option) => (
                    <option
                      key={option.id}
                      value={option.id}
                      name={option.name}
                    >
                      {option.name}
                    </option>
                  ))}
              </select>
            </label>
          </div>
        </div>
        <div className="new-item__button-container">
          <Link className="new-item__button new-item__button--cancel" to="/">
            Cancel
          </Link>
          <button className="new-item__button" disabled={isdisabled}>
            + Add Item
          </button>
        </div>
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
      </form>
    </section>
  );
};

export default NewItem;
