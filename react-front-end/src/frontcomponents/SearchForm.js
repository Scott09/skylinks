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
          <div id="containerdiv">
         
         <span>
          <Input id="containerdiv" className= "textinput" value = {departure} placeholder="Search Departure" onChange={handleDepartureChange} />
          </span>
          <span>
          <Button className="searchbutton" type="submit" className= "searchbutton" type="primary" icon="search" onSubmit={onFormSubmit} >Search</Button>
          </span>
          
          </div>
        </div>
      </form>
    );
  
}


export default SearchForm;
