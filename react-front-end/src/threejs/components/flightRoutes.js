import * as THREE from "three";

import { getSplineFromCoords } from "../helpers/curve";
import { CURVE_SEGMENTS } from "../helpers/constants";
import makePlaneInstance from "./plane";

export default (scene, airport) => {
  if (airport.departure && airport.arrival[0]) {
    const group = new THREE.Group();
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
        parseFloat(departure_airport.latitude),
        parseFloat(departure_airport.longitude)
      ];
      const endCoor = [
        parseFloat(arrival_airport.latitude),
        parseFloat(arrival_airport.longitude)
      ];
      const { spline } = getSplineFromCoords(startCoor, endCoor);
      const points = spline.getPoints(CURVE_SEGMENTS);
      const curve_geometry = new THREE.BufferGeometry().setFromPoints(points);

      const plane = makePlaneInstance(spline);

      const curvedLine = new THREE.Line(curve_geometry, curve_material);
      curvedLine.name = `line_${departure_airport.fs}_${arrival_airport.fs}`;
      curvedLine.departure_fs = departure_airport.fs;
      curvedLine.arrival_fs = arrival_airport.fs;
      curvedLine.arrivalObject = {
        fs: arrival_airport.fs,
        name: arrival_airport.name,
        latitude: arrival_airport.latitude,
        longitude: arrival_airport.longitude
      };
      curvedLine.add(plane);

      return curvedLine;
    }

    function routesPerAirport(airport) {
      for (const arrival of airport.arrival) {
        const departure_airport = airport.departure;
        const arrival_airport = arrival;
        const curve_material = new THREE.MeshBasicMaterial({
          blending: THREE.AdditiveBlending,
          opacity: 0.7,
          transparent: true,
          color: 0xe85d33
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
