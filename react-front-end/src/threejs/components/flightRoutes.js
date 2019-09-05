import * as THREE from "three";

import airports from "../../airports.json";

import { getSplineFromCoords } from "../helpers/curve";

export default (scene, airport) => {
  const group = new THREE.Group();

  /**
   * returns a filtedred list if airports
   * @param  {} name_of_airport, the of the airport
   * @param  {} list_of_airports
   */
  function filterRoutesByIATA(name_of_airport, list_of_airports) {
    let filteredAirports = list_of_airports.filter(function(airport) {
      return airport.start_airport === name_of_airport;
    });
    return filteredAirports;
  }

  function validRoute(start_iata, end_iata) {
    if (airports[start_iata] && airports[end_iata]) {
      return true;
    }
  }

  function makeLineInstance(start_iata, end_iata, curve_material, lineDetail) {
    if (validRoute(start_iata, end_iata)) {
      const start = [
        airports[start_iata].dd_latitude,
        airports[start_iata].dd_longitude
      ];
      const end = [
        airports[end_iata].dd_latitude,
        airports[end_iata].dd_longitude
      ];
      const startCoor = [...start];
      const endCoor = [...end];
      const { spline } = getSplineFromCoords(startCoor, endCoor);
      const points = spline.getPoints(lineDetail);
      const curve_geometry = new THREE.BufferGeometry().setFromPoints(points);

      const curvedLine = new THREE.Line(curve_geometry, curve_material);
      curvedLine.name = `line_${start_iata}_${end_iata}`;
      curvedLine.start_iata = start_iata;
      curvedLine.end_iata = end_iata;
      return curvedLine;
    }
  }

  function routesPerAirport(airport_name, file_of_routes) {
    for (const airport of filterRoutesByIATA(airport_name, file_of_routes)) {
      const start_iata = airport.start_airport;
      const end_iata = airport.destination_airport;
      const curve_material = new THREE.LineBasicMaterial({
        color: 0xffffff
      });
      const lineDetail = 32;
      const line = makeLineInstance(
        start_iata,
        end_iata,
        curve_material,
        lineDetail
      );
      if (line) {
        group.add(line);
      }
    }
  }
  console.log(airport);
  routesPerAirport("YVR", airport);
  group.name = "routes";

  scene.add(group);

  function update() {}

  return {
    update
  };
};
