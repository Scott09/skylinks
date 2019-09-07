import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import ThreeContainer from "./threejs/ThreeContainer";
import flightData from "./frontcomponents/fakeData/fakeData.json";
import FlightList from "./frontcomponents/FlightList";
import SearchForm from "./frontcomponents/SearchForm";

const App = props => {
  const [clearToggle, setClearToggle] = useState(false);
  const [departureAirport, setDepartureAirport] = useState("");
  const [fs, setFS] = useState("");

  const fetchData = () => {
    axios.get(`/api/airports/${fs}`).then(response => {
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
      <div>
        <button onClick={fetchData}> Get DATA </button>
        <button onClick={() => setFS("YVR")}> Vancouver Airport </button>
        <button onClick={() => setFS("YYZ")}> Toronto Airport </button>
        <button onClick={() => setFS("CAN")}> Guangzhou Airport </button>
        <button onClick={() => setFS("GRU")}> São Paulo Airport </button>
        <input
          value={fs}
          onChange={event => setFS(event.target.value)}
          type="text"
          placeholder="Airport fs"
        />
        <button onClick={_addEntity}> add entity </button>
        <button onClick={_removeEntity}> remove entity </button>
        {departureAirport && (
          <span>Current data from server: {departureAirport.departure.fs}</span>
        )}
        <FlightList flights={flightData}></FlightList>
        <SearchForm />
      </div>
      <ThreeContainer clear={clearToggle} newAirport={departureAirport} />
    </>
  );
};

export default App;
