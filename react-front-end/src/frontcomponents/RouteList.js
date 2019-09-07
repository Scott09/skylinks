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
    opacity: 0.5
  }
}));

export default function RouteList(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      {props.routes.departure && props.routes.arrival[0] && (
        <div className={classes.root}>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem className={classes.mainContainer} button>
              <ListItemIcon>
                <img src={AirportTower} height="44" width="44" />
              </ListItemIcon>
              <ListItemText
                primary={`Departure from: (${props.routes.departure.fs}) ${props.routes.departure.name}`}
              />
            </ListItem>
            {props.routes.arrival.map(arrival => {
              return (
                <>
                  <ListItem className={classes.mainContainer} button>
                    <ListItemIcon>
                      <img src={PlaneLogo} height="33" width="33" />
                    </ListItemIcon>
                    <ListItemText>
                      <img src={Arrow} height="12" width="12" /> To: (
                      {arrival.fs}) <br></br> {arrival.name}
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
