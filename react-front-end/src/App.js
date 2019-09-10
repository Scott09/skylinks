import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ThreeContainer from "./threejs/ThreeContainer";
import flightData from "./frontcomponents/fakeData/fakeData.json";
import FlightList from "./frontcomponents/FlightList";
import RouteList from "./frontcomponents/RouteList";
import ScheduleList from "./frontcomponents/ScheduleList";
import SearchForm from "./frontcomponents/SearchForm";
import ResetButton from "./frontcomponents/ResetButton";

const App = props => {
  const [clearToggle, setClearToggle] = useState(false);
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState(""); //list
  const [departureFs, setDepartureFs] = useState(""); //single
  const [arrivalAirportFs, setArrivalAirportFs] = useState("");
  const [schedule, setSchedule] = useState("");
  const [waypoints, setWaypoints] = useState([]);

  useEffect(() => {
    fetchData();
  }, [departureFs]);

  useEffect(() => {
    console.log("here");
    fetchFlightSchedule();
    fetchWaypoints();
  }, [arrivalAirportFs]);

  const fetchData = () => {
    if (departureFs)
      axios.get(`/api/airports/${departureFs}`).then(response => {
        if (response.data) {
          setDepartureAirport(response.data.departure);
          setArrivalAirport(response.data.arrival);
        }
      });
  };

  const fetchFlightSchedule = () => {
    if (arrivalAirport.length === 1)
      axios
        .get(
          `/api/schedules/from/${departureAirport.fs}/to/${arrivalAirport[0].fs}`
        )
        .then(response => {
          if (response.data) {
            setSchedule(response.data);
          }
        });
  };

  const fetchWaypoints = () => {
    let departure = "";
    let arrival = "";
    if (departureFs && arrivalAirportFs) {
      departure = departureFs;
      arrival = arrivalAirportFs;
    }
    axios.get(`/api/real/from/${departure}/to/${arrival}`).then(response => {
      if (response.data) {
        setWaypoints(response.data);
      }
    });
  };

  const arrivals = () => {};

  const departures = departure => {
    if (departure === departureFs) {
      fetchData();
      setDepartureFs("");
      setWaypoints([]);
    }
    setDepartureFs(departure.toUpperCase());
  };

  const onSelect = selected_arrival => {
    setArrivalAirport([selected_arrival]);
    setArrivalAirportFs([selected_arrival.fs][0]);
  };

  const onClear = () => {
    setDepartureAirport("");
    setArrivalAirport("");
    setSchedule("");
    setDepartureFs("");
    setWaypoints([]);
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
        <ResetButton onClear={onClear}></ResetButton>
        <SearchForm getArrival={arrivals} getDepartures={departures} />
      </div>
      <ThreeContainer
        clear={clearToggle}
        waypoints={waypoints}
        newDeparture={departureAirport}
        newArrival={arrivalAirport}
      />
    </>
  );
};

export default App;
