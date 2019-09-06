import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}));

const SearchForm = props => {
  const classes = useStyles();
  const [departure, setDeparture] = useState("");

  return (
    <>
      <form>
        <label>
          Departure Airport:
          <TextField
            id="filled-name"
            label="Departure"
            className={classes.textField}
            value={departure}
            onChange={handleChange("name")}
            margin="normal"
            variant="filled"
          />
        </label>
      </form>
    </>
  );
};

export default SearchForm;
