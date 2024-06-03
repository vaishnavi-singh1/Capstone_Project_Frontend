import "./HomePage.scss";
import axios from "axios";
import { useState, useEffect } from "react";

import Godown from "../../components/Godown/Godown";

function HomePage() {
  const godownsAPIURL =
    "http://localhost:8000/godowns";
    // "http://10.11.244.90:8080/admin/godowns";
  const [godownsData, setGodownsData] = useState();

  useEffect(() => {
    axios
      .get(godownsAPIURL)
      .then((response) => {
        // console.log(response.data);
        setGodownsData(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (godownsData === null || godownsData === undefined) {
    return (
      <></>
    );
  }

  return (
    <>
      <Godown
        godownsData={godownsData}
        setGodownsData={setGodownsData}
      />
    </>
  );
}

export default HomePage;
