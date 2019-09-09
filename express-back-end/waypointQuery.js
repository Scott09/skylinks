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


const queryWaypoints = (departure, arrival) => {
  
  pool.query(`SELECT * FROM route_info WHERE departure_iata = '${departure}' AND arrival_iata = '${arrival}' ORDER BY position_time ASC`, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log(response.rows);
      const waypoints = [];
      for (const item of response.rows) {
        
        const currentlatitude = item.position.split(',')[0];
        const currentlongitude = item.position.split(',')[1];
        
        waypoints.push({
          timestamp: item.position_time,
          position: {
            latitude: currentlatitude,
            longitude: currentlongitude,
            altitude: item.altitude
          }
        })
      }
      return waypoints;
    }
  })
 
}

queryWaypoints('YVR', 'YYZ');


