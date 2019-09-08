const Express = require("express");
const App = Express();
const BodyParser = require("body-parser");
const PORT = 8080;
const { Pool } = require("pg");
require("dotenv").config();
const axios = require("axios");
const spidertest = require("./testflightdata.json");

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

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(Express.static("public"));

// Sample GET route
App.get("/api/data", (req, res) => {
  res.json({
    message: "Seems to work!"
  });
});

App.get("/api/airports/:id", (req, res) => {
  const airport = req.params.id;
  const findDepartureCoords = {
    text: `
    SELECT fs, name, latitude, longitude FROM airports 
    WHERE fs = $1;
    `,
    values: [airport]
  };
  const findArrivalCoords = {
    text: `
    SELECT fs, name, latitude, longitude FROM airports 
    WHERE fs IN
    (SELECT DISTINCT arrival_iata FROM airports 
    JOIN routes ON routes.departure_iata = airports.fs 
    WHERE routes.stops = 0 AND airports.fs = $1);
    `,
    values: [airport]
  };

  pool
    .query(findDepartureCoords)
    .then(depart => {
      pool.query(findArrivalCoords).then(arrive => {
        console.log(depart.rows);
        res.json({
          departure: depart.rows[0],
          arrival: arrive.rows
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
});

App.get("/api/shcedules/from/:from/to/:to", (req, res) => {
  const from = req.params.from;
  const to = req.params.to;
  const now = new Date();
  const y = now.getYear() + 1900;
  const m = now.getMonth() + 1;
  const d = now.getDate();
  res.json(spidertest);
  // axios
  //   .get(
  //     `https://api.flightstats.com/flex/schedules/rest/v1/json/from/${from}/to/${to}/departing/${y}/${m}/${d}?appId=${process.env.appId}&appKey=${process.env.appKey}`
  //   )
  //   .then(api => {
  //     res.json(api.data);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
});

App.get("/api/plane/:id", (req, res) => {
  const file_name = req.params.id;
  console.log(file_name);
  res.send(`/plane/${file_name}`);
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
