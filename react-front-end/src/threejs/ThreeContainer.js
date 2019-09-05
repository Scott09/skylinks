import React, { useEffect, useRef, useState } from "react";
import threeEntryPoint from "./threeEntryPoint";
const ThreeContainer = props => {
  const [state, setState] = useState(null);
  let sceneManager = threeEntryPoint(threeRootElement);

  let threeRootElement = useRef(null);
  useEffect(() => {
    if (props.remove) {
      sceneManager.toggleRemove();
    }
  }, [state]);
  // useEffect(() => {
  //   let sceneManager = threeEntryPoint(threeRootElement);
  // }, []);
  return <div ref={element => (threeRootElement = element)} />;
};
export default ThreeContainer;
