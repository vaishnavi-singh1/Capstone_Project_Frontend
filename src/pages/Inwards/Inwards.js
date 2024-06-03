import "./Inwards.scss";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Inwards() {
  let itemID = useParams().id;
  let inwardsURL = `http://localhost:7000/inwards`;

  const [currentInward, setCurrentInward] = useState();

  useEffect(() => {
    axios
      .get(inwardsURL)
      .then((response) => {
        setCurrentInward(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [inwardsURL]);

  if (currentInward === null || currentInward === undefined) {
    return (
      <ClipLoader
        color="#232940"
        cssOverride={{ display: "block", margin: "0 auto" }}
        size={100}
      />
    );
  }
  return (
    <div className="page-body">
        <header className="inward-header">
            <h1 className="inward-header__itemName">
              Inwards
            </h1>
        </header>
        {currentInward.map((inward) => (
        <>            
          <section className="inward-body">
            <div className="inward-container-description-category">
              <div className="inward-container-itemDescription">
                <h2 className="info-title">ITEM NAME</h2>
                <p className="info-details">{inward.itemName}</p>
              </div>
              <div className="inward-container">
                <h2 className="info-title">CATEGORY:</h2>
                <p className="info-details">{inward.category}</p>
              </div>
            </div>
            <div className="inward-container-status-quantity-godown">
              <div className="inward-container-status-quantity">
                <div className="inward-container">
                  <h2 className="info-title">ADDED BY:</h2>
                    {inward.addedBy}
                </div>
                <div className="inward-container">
                  <h2 className="info-title">QUANTITY:</h2>
                  <p className="info-details">{inward.quantity}</p>
                </div>
              </div>
              <div>
                <h2 className="info-title">GODOWN:</h2>
                <p className="info-details">{inward.godownName}</p>
              </div>
            </div>
          </section>
          <hr/>
        </>
        ))}
    </div>
  );
}
export default Inwards;
