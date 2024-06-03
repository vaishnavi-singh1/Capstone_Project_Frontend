import "../../components/NewItem/NewItem.scss";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ArrowBack from "../../assets/Icons/arrow_back-24px.svg";
import ArrowDropDown from "../../assets/Icons/arrow_drop_down-24px.svg";
import Error from "../../assets/Icons/error-24px.svg";

function EditInventory() {
  const { inventoryId } = useParams();
  const [godowns, setGodowns] = useState(null);
  const [itemDetails, setItemDetails] = useState({
    id: "",
    godownID: "",
    godownName: "",
    itemName: "",
    description: "",
    category: "",
    status: "",
    quantity: "",
  });

  const [isdisabled, setIsDisabled] = useState(false);

  const notify = (item) => toast.success(`${item} was updated successfully.`);

  let inventoryURL = `http://localhost:9000/inventories/${inventoryId}`;

  //get initial invetory data for the edit page
  useEffect(() => {
    axios.get(inventoryURL).then((response) => {
      if (response.status === 200) {
        setItemDetails({
          id: response.data.id,
          godownID: response.data.godownID,
          godownName: response.data.godownName,
          itemName: response.data.itemName,
          description: response.data.description,
          category: response.data.category,
          status: response.data.status,
          quantity: response.data.quantity,
        });
      }
    });
  }, [inventoryURL]);

  // Set available godowns on initial load
  useEffect(() => {
    const getGodowns = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/godowns"
        );
        setGodowns(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getGodowns();
  }, []);

  // Set available categories on initial load
  const categories = [
    "Electronics",
    "Gear",
    "Apparel",
    "Accessories",
    "Health",
  ];

  const [errorName, setErrorName] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

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

  const handleItemChange = (e) => {
    setItemDetails({
      ...itemDetails,
      [e.target.name]: e.target.value,
    });
  };

  const inStockDefault = () => {
    if (itemDetails.status === "In Stock") {
      return true;
    }
  };
  const OutStockDefault = () => {
    if (itemDetails.status === "Out of Stock") {
      return true;
    }
  };

  const navigate = useNavigate();

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

    // FormValidation
    if (itemDetails.itemName === "") {
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
        const updatedItem = {
          id: itemDetails.id,
          godownID: itemDetails.godownID,
          godownName: itemDetails.godownName,
          itemName: itemDetails.itemName,
          category: itemDetails.category,
          description: itemDetails.description,
          status: itemDetails.status,
          quantity: quantity,
        };
        const response = await axios.put(
          `http://localhost:9000/inventories/${inventoryId}`,
          updatedItem
        );
        setIsDisabled(true);
        notify(updatedItem.itemName);
        setTimeout(() => {
          navigate("/inventory");
        }, 3000);

        return response;
      } catch (error) {
        console.log(error);
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
          Edit Inventory Item
        </h1>
        <div className="new-item__form-container">
          <div className="new-item__form-section new-item__form-section--details">
            <h2 className="new-item__details-header">Item Details</h2>

            <label htmlFor="name" className="new-item__form-label">
              Item Name
              <input
                name="itemName"
                placeholder="Item Name"
                onChange={handleItemChange}
                defaultValue={itemDetails.itemName}
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
                defaultValue={itemDetails.description}
                placeholder="Description"
                onChange={handleItemChange}
                className={`new-item__form-textarea ${
                  errorDescription ? " new-item__form-textarea--error" : ""
                }`}
              ></textarea>
              {errorDescription && <ErrorMessage />}
            </label>
            <label htmlFor="category" className="new-item__form-label">
              Category
              <select
                name="category"
                disabled={isdisabled}
                className="new-item__form-select"
                style={dropDownArrow}
                onChange={(e) => {
                  let index = e.nativeEvent.target.selectedIndex;
                  setItemDetails({
                    ...itemDetails,
                    category: e.nativeEvent.target[index].text,
                  });
                }}
              >
                {categories &&
                  categories.map((option) => (
                    <option
                      key={option}
                      value={option}
                      selected={itemDetails.category === option}
                    >
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
                    defaultChecked={inStockDefault()}
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
                    name="status"
                    value="Out of Stock"
                    className="new-item__radio"
                    defaultChecked={OutStockDefault()}
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
                  onChange={handleItemChange}
                  className="new-item__form-input"
                  defaultValue={itemDetails.quantity}
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
                disabled={isdisabled}
                onChange={(e) => {
                  let index = e.nativeEvent.target.selectedIndex;
                  setItemDetails({
                    ...itemDetails,
                    godownID: e.target.value,
                    godownName: e.nativeEvent.target[index].text,
                  });
                }}
              >
                {godowns &&
                  godowns.map((option) => (
                    <option
                      key={option.id}
                      value={option.id}
                      name={option.name}
                      selected={option.name === itemDetails.godownName}
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
            Save
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
}


export default EditInventory;
