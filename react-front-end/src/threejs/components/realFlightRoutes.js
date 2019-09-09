import * as THREE from "three";

import points from "./route_helper/YVR_YYZ.json";
import { coordinateToPosition } from "../helpers/curve";

export default scene => {
  if (points) {
    const group = new THREE.Group();
    var mat = new THREE.LineBasicMaterial({ color: 0xff0000 });
    var geo = new THREE.Geometry();

    function setPoints(points) {
      const listOfPoints = [];
      for (const time of points) {
        const [latitude, longitude] = time.Position.split(",");
        const altitude = time.Altitude;
        const currentTimestamp = {
          timestamp: time.Timestamp,
          position: {
            latitude: latitude,
            longitude: longitude,
            altitude: altitude
          }
        };
        listOfPoints.push(currentTimestamp);
      }
      return listOfPoints;
    }

    function createPath(positions) {
      const points = [];
      for (const pos of positions) {
        const lat = parseFloat(pos.position.latitude);
        const long = parseFloat(pos.position.longitude);
        const alt = parseFloat(pos.position.altitude);
        console.log(alt);
        const something = coordinateToPosition(lat, long, 4.5 + alt / 35000);
        points.push(something);
      }
      const curve_geometry = new THREE.BufferGeometry().setFromPoints(points);
      var line = new THREE.Line(curve_geometry, mat);
      line.name = "RealPath";
      scene.add(line);
      return line;
    }

    const positions = setPoints(points);
    const route = createPath(positions);
    console.log(scene);

    group.name = "realRoute";

    function update() {}

    return {
      update
    };
  }
};
