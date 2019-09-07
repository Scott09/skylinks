import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "antd";
import { Input } from "antd";
import "antd/dist/antd.css";
import "./SearchForm.css";

const SearchForm = props => {
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");

  const { Search } = Input;
  const handleDepartureChange = value => {
    setDeparture(value);
  };

  useEffect(() => {
    onFormSubmit();
  }, [departure]);

  // const handleArrivalChange = event => {
  //   setArrival(event.target.value);
  // };

  const onFormSubmit = () => {
    props.getDepartures(departure);
  };

  return (
    <form>
      <div className="example-input">
        <div id="containerdiv">
          <span>
            <Search
              allowClear
              className="textinput"
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={(value, event) => {
                event.preventDefault();
                handleDepartureChange(value);
              }}
            />
          </span>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
