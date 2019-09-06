import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from 'antd';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import './SearchForm.css';


const SearchForm = (props) => {

    const [arrival, setArrival] = useState('');
    const [departure, setDeparture] = useState('');

    const handleDepartureChange = (event) => {
      setDeparture(event.target.value);
    }

    const handleArrivalChange = (event) => {
      setArrival(event.target.value);
    }

    const onFormSubmit = (event) => {
      
      setDeparture('');
      setArrival('');
    }

    return (
      <form>
        <div className="example-input">
          <div className="containerdiv">
          <h4>Please enter a departure or arrival airport</h4>
          <label> Departure Airport:
          <Input className= "textinput" value = {departure} placeholder="" onChange={handleDepartureChange} />
          </label>
          <label> Arrival Airport:
          <Input className="textinput" placeholder="" value={arrival} onChange={handleArrivalChange} />
          </label>
          <Button className="searchbutton" type="submit" className= "searchbutton" type="primary" icon="search" onSubmit={onFormSubmit} >Search</Button>
          </div>
        </div>
      </form>
    );
  
}

export default SearchForm;