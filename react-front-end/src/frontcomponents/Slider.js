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
    height: 8
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
  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  const index = props.waypoints.length - 1;
  const currentIndex = Math.floor((props.realFlightPosition / 100) * index);
  let totalSeconds =
    props.waypoints[currentIndex].timestamp - props.waypoints[0].timestamp;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds = totalSeconds % 3600;
  let minutes = Math.floor(totalSeconds / 60);
  minutes = checkTime(minutes);
  let seconds = totalSeconds % 60;
  seconds = checkTime(seconds);

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
        aria-label="pretto slider"
        onChange={handleSliderChange}
        marks={marks}
        min={0}
        max={100}
        step={0.5}
      ></PrettoSlider>
      <p id="slidertext">
        Altitude: {props.waypoints[currentIndex].position.altitude} Ft.
      </p>
      <p>
        {hours}:{minutes}:{seconds} Since Departure
      </p>
      <span>
        Latitude:{" "}
        {parseFloat(props.waypoints[currentIndex].position.latitude).toFixed(4)}{" "}
        -<span></span> Longitude:{" "}
        {parseFloat(props.waypoints[currentIndex].position.longitude).toFixed(
          4
        )}
      </span>
    </Paper>
  );
}
