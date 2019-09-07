import * as THREE from "three";

import { getSplineFromCoords } from "../helpers/curve";
import { CURVE_SEGMENTS } from "../helpers/constants";

export default (scene, airport) => {
  if (airport) {
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

      //testing plane here
      let counter = 0;
      let tangent = new THREE.Vector3();
      let axis = new THREE.Vector3();
      let up = new THREE.Vector3(0, 1, 0);

      let geo = new THREE.PlaneBufferGeometry(0.2, 0.2, 0.1, 0.1);
      let mat = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("images/plane.png"),
        transparent: true,
        side: THREE.DoubleSide
      });
      let plane = new THREE.Mesh(geo, mat);
      plane.position.x += 45;

      scene.add(plane);
      setInterval(moveontrack, 100);
      // var mtlLoader = new MTLLoader();
      // mtlLoader.setPath("/api/plane/");
      // mtlLoader.load("plane.mtl", function(materials) {
      //   materials.preload();

      //   var objLoader = new OBJLoader();
      //   objLoader.setMaterials(materials);
      //   objLoader.setPath("/api/plane/");
      //   objLoader.load("plane.obj", function(object) {
      //     console.log(`am i here?`);
      //     scene.add(object);
      //     setInterval(moveontrack(object), 100);
      //   });
      // });

      function moveontrack() {
        if (counter <= 1) {
          plane.position.copy(spline.getPointAt(counter));

          tangent = spline.getTangentAt(counter).normalize();

          axis.crossVectors(up, tangent).normalize();

          var radians = Math.acos(up.dot(tangent));

          plane.quaternion.setFromAxisAngle(axis, radians);

          counter += 0.005;
        } else {
          counter = 0;
        }
      }
      //testing plane up there

      const curvedLine = new THREE.Line(curve_geometry, curve_material);
      curvedLine.name = `line_${departure_airport.fs}_${arrival_airport.fs}`;
      curvedLine.departure_fs = departure_airport.fs;
      curvedLine.arrival_fs = arrival_airport.fs;
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
