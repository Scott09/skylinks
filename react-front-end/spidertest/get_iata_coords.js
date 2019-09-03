const data = require("./cities.json");
const fs = require("fs");

const airports = {};
for (let i of data) {
  let iata = i.iata;
  airports[iata] = {};
  airports[iata].dd_latitude = i.dd_latitude;
  airports[iata].dd_longitude = i.dd_longitude;
}

fs.writeFile("airports.json", JSON.stringify(airports), err => {
  if (err) throw err;
  console.log("The file has been saved!");
});
