import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ThreeContainer from "./threejs/ThreeContainer";
import flightData from "./frontcomponents/fakeData/fakeData.json";
import FlightList from "./frontcomponents/FlightList";
import RouteList from "./frontcomponents/RouteList";
import ScheduleList from "./frontcomponents/ScheduleList";
import SearchForm from "./frontcomponents/SearchForm";

const App = props => {
  const [clearToggle, setClearToggle] = useState(false);
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [schedule, setSchedule] = useState("");
  const [fs, setFS] = useState("");

  useEffect(() => {
    console.log("call", fs);

    fetchData();
  }, [fs]);

  const fetchData = () => {
    axios.get(`/api/airports/${fs}`).then(response => {
      if (response.data) {
        setDepartureAirport(response.data.departure);
        setArrivalAirport(response.data.arrival);
      }
    });
  };

  const fetchFlightSchedule = () => {
    console.log(
      `/api/shcedules/from/${departureAirport.fs}/to/${arrivalAirport[0].fs}`
    );
    if (arrivalAirport.length === 1)
      axios
        .get(
          `/api/shcedules/from/${departureAirport.fs}/to/${arrivalAirport[0].fs}`
        )
        .then(response => {
          if (response.data) {
            setSchedule(response.data);
          }
        });
  };

  const arrivals = () => {};

  const departures = departure => {
    if (departure === fs) fetchData();
    setFS(departure.toUpperCase());
  };

  const onSelect = selected_arrival => {
    setArrivalAirport([selected_arrival]);
    fetchFlightSchedule();
  };
  return (
    <>
      <div>
        <ScheduleList
          newDeparture={departureAirport}
          newArrival={arrivalAirport}
          newSchedule={schedule}
        ></ScheduleList>
        <RouteList
          newDeparture={departureAirport}
          newArrival={arrivalAirport}
          getDepartures={departures}
          onSelect={onSelect}
        ></RouteList>
        {/* <FlightList flights={flightData}></FlightList> */}
        <SearchForm getArrival={arrivals} getDepartures={departures} />
      </div>
      <ThreeContainer
        clear={clearToggle}
        newDeparture={departureAirport}
        newArrival={arrivalAirport}
      />
    </>
  );
};

export default App;
