import React from "react";
import ResetIcon from "./reset.png";
import "./ResetButton.css";

export default function ResetButton(props) {
  return (
    <React.Fragment>
      <input
        id="reset"
        type="image"
        alt="Submit"
        src={ResetIcon}
        height="22"
        width="22"
        onClick={() => props.onClear()}
      />
    </React.Fragment>
  );
}
