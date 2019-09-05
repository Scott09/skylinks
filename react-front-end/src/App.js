import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import ThreeContainer from "./threejs/ThreeContainer";
import canvas from "./threejs/SceneManager";

const App = props => {
  const [state, setState] = useState();
  const { emptyRoutes } = canvas();

  const fetchData = () => {
    emptyRoutes();
    axios.get("/api/airports").then(response => {
      setState(response.data);
    });
  };

  useEffect(() => {
    emptyRoutes();
    console.log(emptyRoutes());
  }, [state]);

  return (
    <>
      <button onClick={fetchData}> Fetch Data </button>
      <ThreeContainer />
    </>
  );
};

export default App;
