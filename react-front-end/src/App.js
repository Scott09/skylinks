import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ThreeContainer from "./threejs/ThreeContainer";
import RouteList from "./frontcomponents/RouteList";
import SearchForm from "./frontcomponents/SearchForm";
import ResetButton from "./frontcomponents/ResetButton";
import ScheduleListTable from "./frontcomponents/ScheduleListTable";
import Logo from "./frontcomponents/Logo";
import Slider from "./frontcomponents/Slider";

const App = props => {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState(""); //list
  const [departureFs, setDepartureFs] = useState(""); //single
  const [arrivalAirportFs, setArrivalAirportFs] = useState("");
  const [schedule, setSchedule] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [realFlightPosition, setRealFlightPosition] = useState(0);

  useEffect(() => {
    fetchData();
  }, [departureFs]);

  useEffect(() => {
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
      axios.get(`/api/real/from/${departure}/to/${arrival}`).then(response => {
        if (response.data) {
          setWaypoints(response.data);
        }
      });
    }
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
    setArrivalAirportFs("");
    setWaypoints([]);
  };
  return (
    <>
      <div>
        <Logo></Logo>
        <ScheduleListTable
          newDeparture={departureAirport}
          newArrival={arrivalAirport}
          newSchedule={schedule}
        ></ScheduleListTable>
        <RouteList
          newDeparture={departureAirport}
          newArrival={arrivalAirport}
          getDepartures={departures}
          onSelect={onSelect}
        ></RouteList>
        <ResetButton onClear={onClear}></ResetButton>
        <SearchForm getArrival={arrivals} getDepartures={departures} />
        {waypoints.length > 0 ? (
          <Slider
            realFlightPosition={realFlightPosition}
            setRealFlightPosition={setRealFlightPosition}
            waypoints={waypoints}
          />
        ) : null}
      </div>
      <ThreeContainer
        waypoints={waypoints}
        realFlightPosition={realFlightPosition}
        newDeparture={departureAirport}
        newArrival={arrivalAirport}
      />
    </>
  );
};

export default App;
