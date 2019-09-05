import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import ThreeContainer from "./threejs/ThreeContainer";
import YVR_routes from "./YVR_routes.json";

const App = props => {
  const [clearToggle, setClearToggle] = useState(false);

  const fetchData = () => {
    axios.get("/api/airports").then(response => {
      console.log(response.data);
      // setCity(response.data);props
    });
  };
  const _addEntity = () => {
    setClearToggle(false);
  };

  const _removeEntity = () => {
    setClearToggle(true);
  };

  return (
    <>
      <button onClick={_addEntity}> add entity </button>
      <button onClick={_removeEntity}> remove entity </button>
      <ThreeContainer clear={clearToggle} newAirport={YVR_routes} />
    </>
  );
};

export default App;
