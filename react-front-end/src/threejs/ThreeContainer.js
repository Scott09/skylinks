import React, { useEffect, useRef, useState } from "react";
import threeEntryPoint from "./threeEntryPoint";
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

  return <div ref={element => (threeRootElement = element)} />;
};
export default ThreeContainer;
