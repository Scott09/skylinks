import React, { useEffect, useRef } from "react";
import threeEntryPoint from "./threeEntryPoint";

const ThreeContainer = props => {
  let div = useRef(null);

  useEffect(() => {
    threeEntryPoint(div);
  }, []);

  return <div ref={element => (div = element)} />;
};

export default ThreeContainer;
