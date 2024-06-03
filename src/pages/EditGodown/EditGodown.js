import "./EditGodown.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import backArrowIcon from "../../assets/Icons/arrow_back-24px.svg";
import Error from "../../assets/Icons/error-24px.svg";
import "../../components/NewGodown/NewGodown.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

function EditGodown() {
  const navigate = useNavigate();
  const [godownDetails, setGodownDetails] = useState({
    godownName: "",
    godownAddress: "",
    godownCity: "",
    godownCountry: "",
    employeeId: "",
    employeeName: "",
    employeePosition: "",
    employeePhone: "",
    employeeEmail: "",
  });
  const { godownId } = useParams();

  const [isdisabled, setIsDisabled] = useState(false);

  let godownURL = `http://10.11.244.90:8080/admin/godowns/${godownId}`;

  useEffect(() => {
    axios.get(godownURL).then((response) => {
      if (response.status === 200) {
        // console.log(response.data);
        setGodownDetails({
          godownName: response.data.godownName,
          godownAddress: response.data.godownAddress,
          godownCity: response.data.godownCity,
          godownCountry: response.data.godownCountry,
          employeeId: response.data.godownEmployee.employeeId,
          employeeName: response.data.godownEmployee.employeeName,
          employeePosition: "M",
          employeePhone: response.data.godownEmployee.employeePhone,
          employeeEmail: response.data.godownEmployee.employeeEmail,
        });
      }
    });
  }, [godownURL]);

  //handle change with value
  const handleGodownChange = (e) => {
    setGodownDetails({
      ...godownDetails,
      [e.target.name]: e.target.value,
    });
    // console.log(godownDetails);
  };

  // Error Message component
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

  const notify = (item) => toast.success(`${item} was updated successfully.`);

  // Errors
  const [errorGodownName, setErrorGodownName] = useState(false);
  const [errorStreet, setErrorStreet] = useState(false);
  const [errorCity, setErrorCity] = useState(false);
  const [errorCountry, setErrorCountry] = useState(false);
  const [errorContactName, setErrorContactName] = useState(false);
  const [errorPosition, setErrorPosition] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
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
    if (godownDetails.godownName === "") {
      setErrorGodownName(true);
      isValid = false;
    }
    if (godownDetails.godownAddress === "") {
      setErrorStreet(true);
      isValid = false;
    }
    if (godownDetails.godownCity === "") {
      setErrorCity(true);
      isValid = false;
    }
    if (godownDetails.godownCountry === "") {
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

    if (godownDetails.employeePhone === "") {
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

    if (isValid) {
      //   console.log(godownDetails);
      try {
        // const editedGodown = {
        //   id: godownId,
        //   employeeName: godownDetails.godownDtoName,
        //   address: godownDetails.godownDtoAddress,
        //   godownDtoCity: godownDetails.godownDtoCity,
        //   godownDtoCountry: godownDetails.godownDtoCountry,
        //   contact: {
        //     employeeName: godownDetails.employeeName,
        //     employeePosition: godownDetails.employeePosition,
        //     employeePhone: godownDetails.employeePhone,
        //     employeeEmail: godownDetails.employeeEmail,
        //   },
        // };
        const editedGodown = {
          godownDtoId: godownId,
          godownDtoName: godownDetails.godownName,
          godownDtoAddress: godownDetails.godownAddress,
          godownDtoCity: godownDetails.godownCity,
          godownDtoCountry: godownDetails.godownCountry,
          employeeId: godownDetails.employeeId,
          employeeName: godownDetails.employeeName,
          employeePosition: godownDetails.employeePosition,
          employeePhone: godownDetails.employeePhone,
          employeeEmail: godownDetails.employeeEmail,
          // employeePassword: godownDetails.employeePassword,
        };


        const response = axios.put(
          `http://10.11.244.90:8080/admin/godowns`,
          editedGodown
        );
        // console.log(godownDetails);
        // console.log(editedGodown);

          // console.log(response);

        setIsDisabled(true);
        notify(editedGodown.godownName);
        setTimeout(() => {
          navigate("/godowns");
        }, 3000);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (godownDetails === null || godownDetails === undefined) {
    return (
      <></>
    );
  }

  return (
    <>
      <section className="new-godown">
        <form onSubmit={handleSubmit} className="new-godown__form">
          <h1 className="new-godown__header">
            <Link to="/" className="new-godown__header-link">
              <img src={backArrowIcon} alt="Back Arrow Icon" />
            </Link>
            Edit Godown
          </h1>
          <div className="new-godown__form-container">
            <div className="new-godown__form-section new-godown__form-section--godown">
              <h2 className="new-godown__details-header">
                Godown Details
              </h2>
              <label
                htmlFor="godownName"
                className="new-godown__form-label"
              >
                Godown Name
                <input
                  required
                  type="text"
                  placeholder="Godown Name"
                  name="godownName"
                  defaultValue={godownDetails.godownName}
                  onChange={handleGodownChange}
                  className={`new-godown__form-input ${
                    errorGodownName
                      ? " new-godown__form-input--error"
                      : ""
                  }`}
                  disabled={isdisabled}
                />
                {errorGodownName && <ErrorMessage />}
              </label>
              <label htmlFor="godownAddress" className="new-godown__form-label">
                Street Address
                <input
                  required
                  type="text"
                  placeholder="Godown Street"
                  name="godownAddress"
                  defaultValue={godownDetails.godownAddress}
                  onChange={handleGodownChange}
                  className={`new-godown__form-input ${
                    errorStreet ? " new-godown__form-input--error" : ""
                  }`}
                  disabled={isdisabled}
                />
                {errorStreet && <ErrorMessage />}
              </label>
              <label htmlFor="godownCity" className="new-godown__form-label">
                City
                <input
                  required
                  type="text"
                  placeholder="Godown City"
                  name="godownCity"
                  defaultValue={godownDetails.godownCity}
                  onChange={handleGodownChange}
                  className={`new-godown__form-input ${
                    errorCity ? " new-godown__form-input--error" : ""
                  }`}
                  disabled={isdisabled}
                />
                {errorCity && <ErrorMessage />}
              </label>
              <label htmlFor="godownCountry" className="new-godown__form-label">
                Country
                <input
                  required
                  type="text"
                  placeholder="Godown Country"
                  name="godownCountry"
                  defaultValue={godownDetails.godownCountry}
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
              <label
                htmlFor="employeeName"
                className="new-godown__form-label"
              >
                Contact Name
                <input
                  required
                  type="text"
                  placeholder="Contact Name"
                  name="employeeName"
                  defaultValue={godownDetails.employeeName}
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
                  required
                  type="text"
                  placeholder="Position"
                  name="employeePosition"
                  defaultValue={godownDetails.employeePosition}
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
                  required
                  type="text"
                  placeholder="Phone number"
                  name="employeePhone"
                  defaultValue={godownDetails.employeePhone}
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
                  required
                  type="text"
                  placeholder="Email"
                  name="employeeEmail"
                  defaultValue={godownDetails.employeeEmail}
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
    </>
  );
}

export default EditGodown;
