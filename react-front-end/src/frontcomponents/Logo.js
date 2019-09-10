import React from "react";
import "./Logo.css";
import airplane from "./airplane.png";

const Logo = props => {
  return (
    <div id="logo">
      <p>
        <img className="plane" src={airplane} alt="plane"></img> SKYLINKS
      </p>
    </div>
  );
};

export default Logo;
