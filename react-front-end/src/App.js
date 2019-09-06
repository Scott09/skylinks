import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import ThreeContainer from "./threejs/ThreeContainer";
import YVR_routes from "./YVR_routes.json";
import flightData from "./frontcomponents/fakeData/fakeData.json";
import FlightList from "./frontcomponents/FlightList";

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
      <FlightList flights={flightData}></FlightList>
      <ThreeContainer clear={clearToggle} newAirport={YVR_routes} />
      {/* <button style={style} onClick={_addEntity}>
        add entity
      </button>
      <button style={style} onClick={_removeEntity}>
        {" "}
        remove entity
      </button> */}
    </>
  );
};

export default App;
