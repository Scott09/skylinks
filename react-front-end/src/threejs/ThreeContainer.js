import React, { useEffect, useRef, useState } from "react";
import threeEntryPoint from "./threeEntryPoint";

const ThreeContainer = props => {
  const [state, setState] = useState(null);

  let threeRootElement = useRef(null);
  useEffect(() => {
    const manager = threeEntryPoint(threeRootElement);
    setState(manager);
  }, []);

  useEffect(() => {
    if (props.realFlightPosition) {
      state.updatePosition(props.realFlightPosition);
    }
  }, [props.realFlightPosition]);

  if (state) {
    state.clear();
    state.addEntity({
      departure: props.newDeparture,
      arrival: props.newArrival,
      waypoints: props.waypoints
    });
  }

  const style = {
    height: "100vh",
    overflow: "hidden",
    zIndex: "0"
  };

  return <div style={style} ref={element => (threeRootElement = element)} />;
};
export default ThreeContainer;
