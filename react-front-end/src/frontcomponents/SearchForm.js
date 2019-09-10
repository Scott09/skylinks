import React, { useState, useEffect } from "react";
import { Input } from "antd";
import "antd/dist/antd.css";
import "./SearchForm.css";

const SearchForm = props => {
  const [departure, setDeparture] = useState("");

  const { Search } = Input;
  const handleDepartureChange = value => {
    setDeparture(value);
  };

  useEffect(() => {
    onFormSubmit();
  }, [departure]);

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
              id="text"
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
