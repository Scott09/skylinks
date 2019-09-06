import * as THREE from "three";

import { getSplineFromCoords } from "../helpers/curve";
import { CURVE_SEGMENTS } from "../helpers/constants";

export default (scene, airport) => {
  if (airport) {
    const group = new THREE.Group();
    console.log(`spider test 1`, airport);
    /**
     * returns a filtedred list if airports
     * @param  {} name_of_airport, the of the airport
     * @param  {} list_of_airports
     */

    function makeLineInstance(
      departure_airport,
      arrival_airport,
      curve_material
    ) {
      const startCoor = [
        departure_airport.latitude,
        departure_airport.longitude
      ];
      const endCoor = [arrival_airport.latitude, arrival_airport.longitude];
      console.log(startCoor, endCoor);
      const { spline } = getSplineFromCoords(startCoor, endCoor);
      const points = spline.getPoints(CURVE_SEGMENTS);
      const curve_geometry = new THREE.BufferGeometry().setFromPoints(points);

      const curvedLine = new THREE.Line(curve_geometry, curve_material);
      curvedLine.name = `line_${departure_airport.iata}_${arrival_airport.iata}`;
      curvedLine.departure_iata = departure_airport.iata;
      curvedLine.arrival_iata = arrival_airport.iata;
      return curvedLine;
    }

    function routesPerAirport(airport) {
      for (const arrival of airport.arrival) {
        const departure_airport = airport.departure;
        const arrival_airport = arrival;
        const curve_material = new THREE.LineBasicMaterial({
          color: 0xffffff
        });
        const line = makeLineInstance(
          departure_airport,
          arrival_airport,
          curve_material
        );
        if (line) {
          group.add(line);
        }
      }
    }

    routesPerAirport(airport);

    group.name = "routes";

    scene.add(group);

    function update() {}

    return {
      update
    };
  }
};
