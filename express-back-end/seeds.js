const airports = require("./db/data/airports.json");
const routes = require("./db/data/routes.json");
const { Pool } = require("pg");
require("dotenv").config();

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

const airport_keys = Object.keys(airports);
for (let i of airport_keys) {
  if (airports[i].iata) {
    pool
      .query(
        `INSERT INTO airports (iata, name, latitude, longitude, country, city)
  VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          airports[i].iata,
          airports[i].name,
          airports[i].dd_latitude,
          airports[i].dd_longitude,
          "",
          ""
        ]
      )
      .catch(err => {
        console.log(err);
      });
  }
}

let j = 0
for (let i of routes) {
  j++
  if (j % 60000 === 0) console.log(`we are here`)
  if(i.STOPS === 0 ){
    pool
      .query(
        `INSERT INTO routes (stops, departure_iata, arrival_iata)
  VALUES ($1, $2, $3)`,
        [
          i.STOPS,
          i.START_AIRPORT,
          i.DESTINATION_AIRPORT
        ]
      )
      .catch(err => {
        console.log(err);
      });
    }
  }
  resolve(()=>{console.log(`done`)})
})
