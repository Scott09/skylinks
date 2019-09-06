const Express = require("express");
const App = Express();
const BodyParser = require("body-parser");
const PORT = 8080;
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

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(Express.static("public"));

// Sample GET route
App.get("/api/data", (req, res) => {
  res.json({
    message: "Seems to work!"
  });
});

App.get("/api/airports", (req, res) => {
  const findDepartureCoords = {
    text: `
    SELECT iata, latitude, longitude FROM airports 
    WHERE iata = $1;
    `,
    values: ["YYZ"]
  };
  const findArrivalCoords = {
    text: `
    SELECT iata, latitude, longitude FROM airports 
    WHERE iata IN
    (SELECT DISTINCT arrival_iata FROM airports 
    JOIN routes ON routes.departure_iata = airports.iata 
    WHERE airports.iata = $1);
    `,
    values: ["YYZ"]
  };

  pool
    .query(findDepartureCoords)
    .then(coords => {
      pool.query(findArrivalCoords).then(arrival => {
        console.log(coords.rows);
        console.log(arrival.rows);
        res.json({
          airport: coords.rows[0],
          arrival: arrival.rows
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
