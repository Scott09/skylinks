import * as THREE from "three";
import { CURVE_SEGMENTS, GLOBE_RADIUS } from "../helpers/constants";

export default scene => {
  const sphere = new THREE.SphereGeometry(
    GLOBE_RADIUS * 15,
    CURVE_SEGMENTS,
    CURVE_SEGMENTS
  );

  const material = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture("images/milkyway_4k.jpg"),
    side: THREE.BackSide
  });
  const background = new THREE.Mesh(sphere, material);
  background.name = "background";

  scene.add(background);
  background.rotation.z += (Math.PI / 180) * 63;

  function update() {}

  return {
    update
  };
};
