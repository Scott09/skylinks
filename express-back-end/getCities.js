const data = require("./data/airports.json");
const fs = require("fs");

const cities = [];
for (let key in data) {
  let single_airport_data = {
    name: "",
    iata: "",
    dd_latitude: 0,
    dd_longitude: 0
  };
  single_airport_data.name = data[key].name;
  single_airport_data.iata = data[key].iata;
  single_airport_data.dd_latitude = data[key].dd_latitude;
  single_airport_data.dd_longitude = data[key].dd_longitude;
  cities.push(single_airport_data);
}

fs.writeFile("cities.json", JSON.stringify(cities), err => {
  if (err) throw err;
  console.log("The file has been saved!");
});
