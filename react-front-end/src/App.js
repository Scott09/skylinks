import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ThreeContainer from "./threejs/ThreeContainer";
import flightData from "./frontcomponents/fakeData/fakeData.json";
import FlightList from "./frontcomponents/FlightList";
import RouteList from "./frontcomponents/RouteList";
import SearchForm from "./frontcomponents/SearchForm";

const App = props => {
  const [clearToggle, setClearToggle] = useState(false);
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [fs, setFS] = useState("");

  useEffect(() => {
    console.log("call", fs);

    fetchData();
  }, [fs]);

  const fetchData = () => {
    axios.get(`/api/airports/${fs}`).then(response => {
      if (response.data) {
        setDepartureAirport(response.data);
        setArrivalAirport("");
      }
    });
  };

  const arrivals = () => {};

  const departures = departure => {
    setFS(departure.toUpperCase());
  };

  const onSelect = selected_arrival => {
    console.log(selected_arrival);
    setArrivalAirport([selected_arrival]);
  };
  return (
    <>
      <div>
        <RouteList routes={departureAirport} onSelect={onSelect}></RouteList>
        {/* <FlightList flights={flightData}></FlightList> */}
        <SearchForm getArrival={arrivals} getDepartures={departures} />
      </div>
      <ThreeContainer
        clear={clearToggle}
        newAirport={departureAirport}
        newSingleArrival={arrivalAirport}
        onSelect={onSelect}
      />
    </>
  );
};

export default App;
