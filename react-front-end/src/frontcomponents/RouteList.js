import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PlaneLogo from "./flying-airliner.svg";
import AirportTower from "./airport.png";
import Arrow from "./right-arrow.svg";
import "./RouteList.css";

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
    right: 10,
    opacity: 0.5,
    overflow: "auto"
  }
}));

export default function RouteList(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      {props.newDeparture && props.newArrival[0] && (
        <div id="list_main" className={classes.root}>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem
              className={classes.mainContainer}
              onClick={() => props.getDepartures(props.newDeparture.fs)}
              button
            >
              <ListItemIcon>
                <img
                  alt="AirportTower"
                  src={AirportTower}
                  height="44"
                  width="44"
                />
              </ListItemIcon>
              <ListItemText
                primary={`Departure from: (${props.newDeparture.fs}) ${props.newDeparture.name}`}
              />
            </ListItem>
            {props.newArrival.map(arrival => {
              return (
                <>
                  <ListItem
                    id={`${props.newDeparture.fs}_${arrival.fs}`}
                    className={classes.mainContainer}
                    onClick={() => props.onSelect(arrival)}
                    button
                  >
                    <ListItemIcon>
                      <img
                        alt="PlaneLogo"
                        src={PlaneLogo}
                        height="33"
                        width="33"
                      />
                    </ListItemIcon>
                    <ListItemText>
                      <img alt="Arrow" src={Arrow} height="12" width="12" /> To:
                      ({arrival.fs}) <br></br> {arrival.name}
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
