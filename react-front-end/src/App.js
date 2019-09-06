import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import ThreeContainer from "./threejs/ThreeContainer";
import YVR_routes from "./YVR_routes.json";
import flightData from "./frontcomponents/fakeData/fakeData.json";
import FlightList from "./frontcomponents/FlightList";

const App = props => {
  const [clearToggle, setClearToggle] = useState(false);
  const [departureAirport, setDepartureAirport] = useState("");
  const [iata, setIata] = useState("");

  const fetchData = () => {
    axios.get(`/api/airports/${iata}`).then(response => {
      setDepartureAirport(response.data);
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

      <button onClick={fetchData}> Get DATA </button>
      <button onClick={() => setIata("YVR")}> Vancouver Airport </button>
      <button onClick={() => setIata("YYZ")}> Toronto Airport </button>
      <button onClick={() => setIata("CAN")}> Guangzhou Airport </button>
      <button onClick={() => setIata("GRU")}> São Paulo Airport </button>
      <input
        value={iata}
        onChange={event => setIata(event.target.value)}
        type="text"
        placeholder="Airport IATA"
      />
      <button onClick={_addEntity}> add entity </button>
      <button onClick={_removeEntity}> remove entity </button>
      {departureAirport && (
        <span>Current data from server: {departureAirport.departure.iata}</span>
      )}
      <ThreeContainer clear={clearToggle} newAirport={departureAirport} />

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
