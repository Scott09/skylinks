const airport = require("./db/data/airports.json");
const routes = require("./db/data/routes.json");
const airlines = require("./db/data/airlines.json");
const flights = require("./db/data/flights");
const { Pool } = require("pg");
require("dotenv").config();
const fs = require('fs');
const waypointfolder = "./db/waypoints";



const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

pool.connect((error, client) => {
  console.log(process.env.DB_HOST);
  if (error) {
    console.log(error);
  } else {
    console.log("connected");
  }
});

const promise = new Promise((resolve, reject) => {
  const airports = airport.airports;
  for (let item of airports) {
    if (item.iata) {
      pool
        .query(
          `INSERT INTO airports (fs, name, latitude, longitude, countrycode,countryname, city)
  VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            item.fs,
            item.name,
            item.latitude,
            item.longitude,
            item.countrycode,
            item.countryname,
            item.city
          ]
        )
        .catch(err => {
          console.log(err);
        });
    }
  }

  let j = 0;
  let k = 0;
  for (let i of routes) {
    if (i.STOPS === 0) {
      pool
        .query(
          `INSERT INTO routes (stops, departure_iata, arrival_iata)
  VALUES ($1, $2, $3)`,
          [i.STOPS, i.START_AIRPORT, i.DESTINATION_AIRPORT]
        )
        .then(() => k++)
        .catch(err => {
          j++;
          console.log("error when seeding routes", j, "at routes #", k);
          // console.log(err);
        });
    }
  }
  resolve(() => {
    console.log(`done`);
  });
});

for (const item of airlines.airlines) {
  if (item.iata) {
    pool
      .query(
        `INSERT INTO airlines (fs, name, iata, icao) VALUES ($1, $2, $3, $4)`,
        [item.fs, item.name, item.iata, item.icao]
      )
      .catch(err => console.log(err));
  }
}

for (const item of flights.scheduledFlights) {
  pool.query(
    `INSERT into flights(airlineFsCode, stops, departureAirportFs, arrivalAirportFs, departureTime, arrivalTime) values ($1, $2, $3, $4, $5, $6)`,
    [
      item.carrierFsCode,
      item.stops,
      item.departureAirportFsCode,
      item.arrivalAirportFsCode,
      item.departureTime,
      item.arrivalTime
    ]
  );
}

// loop through waypoint folder and seed the database with waypoints

fs.readdirSync(waypointfolder).forEach(file => {
  const filename = file.slice(0,7)
  const [departure, arrival] = filename.split('_');

  const waypoints = JSON.parse(fs.readFileSync(`./db/waypoints/${file}`, "utf8"));
  

  for (const waypoint of waypoints) {
    pool.query(
      `INSERT into route_info(position_time, position, altitude, direction, departure_iata, arrival_iata) values ($1, $2, $3, $4, $5, $6)`,
      [
        waypoint.Timestamp,
        waypoint.Position,
        waypoint.Altitude,
        waypoint.Direction,
        departure,
        arrival
      ]
    );
    
}});





