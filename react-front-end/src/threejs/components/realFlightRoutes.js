import * as THREE from "three";

import { coordinateToPosition } from "../helpers/curve";

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
        const something = coordinateToPosition(lat, long, 4.5 + alt / 35000);
        points.push(something);
      }
      const curve_geometry = new THREE.BufferGeometry().setFromPoints(points);
      var line = new THREE.Line(curve_geometry, mat);
      line.name = "waypointsLine";
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
