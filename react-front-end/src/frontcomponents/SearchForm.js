import React from "react";
import { Input } from "antd";
import "antd/dist/antd.css";
import "./SearchForm.css";

const SearchForm = props => {
  const { Search } = Input;

  return (
    <form>
      <div className="example-input">
        <div id="containerdiv">
          <span>
            <Search
              allowClear
              id="text"
              className="textinput"
              placeholder="Search Airport Code"
              enterButton="Search"
              size="large"
              onSearch={(value, event) => {
                event.preventDefault();
                props.getDepartures(value);
              }}
            />
          </span>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
