import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PlaneLogo from "./flying-airliner.svg";
import AirportTower from "./airport.png";
import Arrow from "./right-arrow.svg";
import "./ScheduleList.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "85%",
    maxWidth: 260,
    backgroundColor: "white",
    border: "4px outset #1C6EA4",
    borderRadius: "8px",
    boxShadow: "20px 16px 44px -16px rgba(101,101,102,1)",
    position: "absolute",
    top: 60,
    left: 10,
    opacity: 0.5,
    overflow: "auto"
  }
}));

const now = new Date();
const y = now.getYear() + 1900;
const m = now.getMonth() + 1;
const d = now.getDate();

function beautyTime(time) {
  let ampm = "";
  let temp = time.split("T")[1];
  temp.split(":");
  let hour = parseInt(temp.split(":")[0]);
  let min = temp.split(":")[1];
  if (hour < 12) {
    ampm = " a.m.";
  } else {
    ampm = " p.m.";
  }
  return hour + ":" + min + ampm;
}

export default function ScheduleList(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      {props.newSchedule && (
        <div id="list_main" className={classes.root}>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem className={classes.mainContainer} button>
              <ListItemIcon>
                <img
                  alt="AirportTower"
                  src={AirportTower}
                  height="44"
                  width="44"
                />
              </ListItemIcon>
              <ListItemText
                primary={`Flight Schedule from ${props.newDeparture.name} to ${props.newArrival[0].name} on ${y}/${m}/${d}`}
              />
            </ListItem>
            {props.newSchedule.scheduledFlights.map(schedule => {
              return (
                <>
                  <ListItem className={classes.mainContainer} button>
                    <ListItemText id="scheduleText">
                      Flight Number: {schedule.carrierFsCode}
                      {schedule.flightNumber} <br></br>
                      Departure: {beautyTime(schedule.departureTime)}
                      <br></br>
                      Arrival: {beautyTime(schedule.arrivalTime)}
                    </ListItemText>
                  </ListItem>
                </>
              );
            })}
          </List>
        </div>
      )}
    </React.Fragment>
  );
}
