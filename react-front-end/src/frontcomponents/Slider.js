import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/core/Slider";
import "./Slider.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
    padding: theme.spacing(3)
  },
  margin: {
    height: theme.spacing(3)
  }
}));

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -8,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

export default function CustomizedSlider(props) {
  // const marks = [];
  // props.waypoints.forEach(waypoint =>
  //   marks.push({ value: waypoint.position.altitude })
  // );
  const handleSliderChange = (event, newValue) => {
    props.setRealFlightPosition(newValue);
  };

  const marks = [
    {
      value: 0,
      label: "Depart"
    },
    {
      value: 100,
      label: "Arrive"
    }
  ];

  const classes = useStyles();

  return (
    <Paper id="slider" className={classes.root}>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        onChange={handleSliderChange}
        marks={marks}
        min={0}
        max={100}
        step={1}
      ></PrettoSlider>
    </Paper>
  );
}
