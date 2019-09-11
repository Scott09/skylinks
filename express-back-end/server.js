const Express = require("express");
const App = Express();
const BodyParser = require("body-parser");
const PORT = 8080;
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();
const spidertest = require("./testflightdata.json");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

App.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
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

App.get("/api/textures/:id", (req, res, next) => {
  const texture = req.params.id;
  if (__dirname + "/textures/" + texture)
    res.sendFile(__dirname + "/textures/" + texture);
});

App.get("/with-cors/:id", (req, res, next) => {
  const plane = req.params.id;
  if (__dirname + "/airbus_a350_xwb/" + plane) {
    res.sendFile(__dirname + "/airbus_a350_xwb/" + plane);
  }
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

App.get("/api/real/from/:from/to/:to", (req, res) => {
  const departure = req.params.from;
  const arrival = req.params.to;
  pool.query(
    `SELECT * FROM route_info WHERE departure_iata = '${departure}' AND arrival_iata = '${arrival}' ORDER BY position_time ASC`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        const waypoints = [];
        for (const item of response.rows) {
          const currentLatitude = item.position.split(",")[0];
          const currentLongitude = item.position.split(",")[1];

          waypoints.push({
            timestamp: item.position_time,
            position: {
              latitude: currentLatitude,
              longitude: currentLongitude,
              altitude: item.altitude
            }
          });
        }
        res.json(waypoints);
      }
    }
  );
});

App.get("/api/schedules/from/:from/to/:to", (req, res) => {
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

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
