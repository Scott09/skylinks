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

  if (state) {
    if (props.clear) {
      state.clear();
    }
    if (!props.clear) {
      state.addEntity(props.newAirport);
    }
  }
  const style = {
    height: "100vh",
    overflow: "hidden",
    zIndex: "0"
  };

  return <div style={style} ref={element => (threeRootElement = element)} />;
};
export default ThreeContainer;
