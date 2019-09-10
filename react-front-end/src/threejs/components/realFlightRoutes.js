import * as THREE from "three";

import { coordinateToPosition } from "../helpers/curve";
import makePlaneInstance from "./planeRealTime";

export default (scene, waypoints) => {
  if (waypoints) {
    const group = new THREE.Group();
    var mat = new THREE.LineBasicMaterial({ color: 0xff0000 });

    function createPath(positions) {
      const points = [];
      for (const pos of positions) {
        const lat = parseFloat(pos.position.latitude);
        const long = parseFloat(pos.position.longitude);
        const alt = parseFloat(pos.position.altitude);
        const position_Vector3 = coordinateToPosition(
          lat,
          long,
          5 + alt * (5 / 20902000) * 30
        );
        points.push(position_Vector3);
      }
      const curve_geometry = new THREE.BufferGeometry().setFromPoints(points);
      var line = new THREE.Line(curve_geometry, mat);
      line.name = "waypointsLine";

      const plane = makePlaneInstance(points);
      plane.name = "realTimePlane";
      plane.points = points;
      line.add(plane);

      group.add(line);
    }
    createPath(waypoints);

    group.name = "realRoute";
    scene.add(group);

    function update() {}

    return {
      update
    };
  }
};
