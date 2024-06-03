import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewGodown.scss";
import ArrowBack from "../../assets/Icons/arrow_back-24px.svg";
import Error from "../../assets/Icons/error-24px.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewGodown() {
  const [godownDetails, setGodownDetails] = useState({
    godownDtoName: "",
    godownDtoAddress: "",
    godownDtoCity: "",
    godownDtoCountry: "",
    employeeName: "",
    employeePosition: "",
    employeePhone: "",
    employeeEmail: "",
    employeePassword: "123"
  });

  const [isdisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();

  // Errors
  const [errorGodownName, setErrorGodownName] = useState(false);
  const [errorStreet, setErrorStreet] = useState(false);
  const [errorCity, setErrorCity] = useState(false);
  const [errorCountry, setErrorCountry] = useState(false);
  const [errorContactName, setErrorContactName] = useState(false);
  const [errorPosition, setErrorPosition] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  // Update state for input in Godown Section - keep all other fields as it is
  const handleGodownChange = (e) => {
    setGodownDetails({
      ...godownDetails,
      [e.target.name]: e.target.value,
    });
  };

  const notify = (item) => toast.success(`${item} was added to godowns.`);

  const ErrorMessage = () => {
    return (
      <span className="new-godown__form-error">
        <img
          src={Error}
          alt="Error Icon"
          className="new-godown__form-error-icon"
        />
        This field is required
      </span>
    );
  };

  const handleSubmit = async (e) => {
    // Reset Errors
    e.preventDefault();

    let isValid = true;

    setErrorGodownName(false);
    setErrorStreet(false);
    setErrorCity(false);
    setErrorCountry(false);
    setErrorContactName(false);
    setErrorPosition(false);
    setErrorPhone(false);
    setErrorEmail(false);
    
    // Sets Errors
    if (godownDetails.godownDtoName === "") {
      setErrorGodownName(true);
      isValid = false;
    }
    if (godownDetails.godownDtoAddress === "") {
      setErrorStreet(true);
      isValid = false;
    }
    if (godownDetails.godownDtoCity === "") {
      setErrorCity(true);
      isValid = false;
    }
    if (godownDetails.godownDtoCountry === "") {
      setErrorCountry(true);
      isValid = false;
    }
    if (godownDetails.employeeName === "") {
      setErrorContactName(true);
      isValid = false;
    }
    if (godownDetails.employeePosition === "") {
      setErrorPosition(true);
      isValid = false;
    }
    if (godownDetails.godownDtoName === "") {
      setErrorGodownName(true);
      isValid = false;
    }

    if
      (godownDetails.employeePhone === "") {
      setErrorPhone(true);
      isValid = false;
    }

    if (
      godownDetails.employeeEmail === "" ||
      !godownDetails.employeeEmail.includes("@")
    ) {
      setErrorEmail(true);
      isValid = false;
    }

    // If no errors, submit form
    if (isValid) {
      try {
        const newGodown = {
          godownDtoName: godownDetails.godownDtoName,
          godownDtoAddress: godownDetails.godownDtoAddress,
          godownDtoCity: godownDetails.godownDtoCity,
          godownDtoCountry: godownDetails.godownDtoCountry,
          employeeName: godownDetails.employeeName,
          employeePosition: godownDetails.employeePosition,
          employeePhone: godownDetails.employeePhone,
          employeeEmail: godownDetails.employeeEmail,
          employeePassword: godownDetails.employeePassword,
        };
        const response = await axios.post(
          "http://localhost:8000/godowns/",
          // "http://10.11.244.90:8080/admin/godowns",
          newGodown
        );
        setIsDisabled(true);
        notify(newGodown.godownDtoName);
        setTimeout(() => {
          navigate("/godowns");
        }, 3000);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <section className="new-godown">
      <form onSubmit={handleSubmit} className="new-godown__form">
        <h1 className="new-godown__header">
          <Link to="/" className="new-godown__header-link">
            <img src={ArrowBack} alt="Back Arrow Icon" />
          </Link>
          Add New Godown
        </h1>
        <div className="new-godown__form-container">
          <div className="new-godown__form-section new-godown__form-section--godown">
            <h2 className="new-godown__details-header">Godown Details</h2>
            <label
              htmlFor="godownDtoName"
              className="new-godown__form-label"
            >
              Godown Name
              <input
                name="godownDtoName"
                placeholder="Godown Name"
                value={godownDetails.godownDtoName}
                onChange={handleGodownChange}
                className={`new-godown__form-input ${
                  errorGodownName ? " new-godown__form-input--error" : ""
                }`}
                disabled={isdisabled}
              />
              {errorGodownName && <ErrorMessage />}
            </label>
            <label htmlFor="godownDtoAddress" className="new-godown__form-label">
              Street Address
              <input
                name="godownDtoAddress"
                placeholder="Street Address"
                value={godownDetails.godownDtoAddress}
                onChange={handleGodownChange}
                className={`new-godown__form-input ${
                  errorStreet ? " new-godown__form-input--error" : ""
                }`}
                disabled={isdisabled}
              />
              {errorStreet && <ErrorMessage />}
            </label>
            <label htmlFor="godownDtoCity" className="new-godown__form-label">
              City
              <input
                name="godownDtoCity"
                placeholder="City"
                value={godownDetails.godownDtoCity}
                onChange={handleGodownChange}
                className={`new-godown__form-input ${
                  errorCity ? " new-godown__form-input--error" : ""
                }`}
                disabled={isdisabled}
              />
              {errorCity && <ErrorMessage />}
            </label>
            <label htmlFor="godownDtoCountry" className="new-godown__form-label">
              Country
              <input
                name="godownDtoCountry"
                placeholder="Country"
                value={godownDetails.godownDtoCountry}
                onChange={handleGodownChange}
                className={`new-godown__form-input ${
                  errorCountry ? " new-godown__form-input--error" : ""
                }`}
                disabled={isdisabled}
              />
              {errorCountry && <ErrorMessage />}
            </label>
          </div>
          <div className="new-godown__form-section new-godown__form-section--contact">
            <h2 className="new-godown__details-header">Contact Details</h2>
            <label htmlFor="employeeName" className="new-godown__form-label">
              Contact Name
              <input
                name="employeeName"
                placeholder="Contact Name"
                value={godownDetails.employeeName}
                onChange={handleGodownChange}
                className={`new-godown__form-input ${
                  errorContactName ? " new-godown__form-input--error" : ""
                }`}
                disabled={isdisabled}
              />
              {errorContactName && <ErrorMessage />}
            </label>
            <label htmlFor="employeePosition" className="new-godown__form-label">
              Position
              <input
                name="employeePosition"
                placeholder="Position"
                value={godownDetails.employeePosition}
                onChange={handleGodownChange}
                className={`new-godown__form-input ${
                  errorPosition ? " new-godown__form-input--error" : ""
                }`}
                disabled={isdisabled}
              />
              {errorPosition && <ErrorMessage />}
            </label>
            <label htmlFor="employeePhone" className="new-godown__form-label">
              Phone Number
              <input
                name="employeePhone"
                placeholder="Phone Number"
                value={godownDetails.employeePhone}
                onChange={handleGodownChange}
                className={`new-godown__form-input ${
                  errorPhone ? " new-godown__form-input--error" : ""
                }`}
                disabled={isdisabled}
              />
              {errorPhone && <ErrorMessage />}
            </label>
            <label htmlFor="employeeEmail" className="new-godown__form-label">
              Email
              <input
                name="employeeEmail"
                placeholder="Email"
                value={godownDetails.employeeEmail}
                onChange={handleGodownChange}
                className={`new-godown__form-input ${
                  errorEmail ? " new-godown__form-input--error" : ""
                }`}
                disabled={isdisabled}
              />
              {errorEmail && <ErrorMessage />}
            </label>
            <label htmlFor="employeePassword" className="new-godown__form-label">
              Password    
              <input
                name="employeePassword"
                placeholder="Password"
                value={godownDetails.employeePassword}
                onChange={handleGodownChange}
                className={`new-godown__form-input ${
                  errorEmail ? " new-godown__form-input--error" : ""
                }`}
                disabled={isdisabled}
              />
              {errorEmail && <ErrorMessage />}
            </label>
          </div>
        </div>
        <div className="new-godown__button-container">
          <Link
            className="new-godown__button new-godown__button--cancel"
            to="/"
          >
            Cancel
          </Link>
          <button className="new-godown__button" disabled={isdisabled}>
            + Add Godown
          </button>
        </div>
        <ToastContainer
          employeePosition="bottom-center"
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

export default NewGodown;
