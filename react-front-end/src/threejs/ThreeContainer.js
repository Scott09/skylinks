import React, { useEffect, useRef, useState } from "react";
import threeEntryPoint from "./threeEntryPoint";
import { height } from "@material-ui/system";
const ThreeContainer = props => {
  const [state, setState] = useState(null);

  let threeRootElement = useRef(null);
  useEffect(() => {
    const manager = threeEntryPoint(threeRootElement);
    setState(manager);
  }, []);

  if (state && !props.newSingleArrival) {
    state.clear();
    state.addEntity(props.newAirport);
  }

  if (props.newSingleArrival) {
    state.clear();
    state.addEntity({
      departure: props.newAirport.departure,
      arrival: props.newSingleArrival
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
