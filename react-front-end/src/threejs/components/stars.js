import * as THREE from "three";
import { CURVE_SEGMENTS, GLOBE_RADIUS } from "../helpers/constants";

export default scene => {
  const sphere = new THREE.SphereGeometry(
    GLOBE_RADIUS * 200,
    CURVE_SEGMENTS,
    CURVE_SEGMENTS
  );
  const material = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture("images/galaxy_starfield.png"),
    side: THREE.BackSide
  });
  const background = new THREE.Mesh(sphere, material);
  background.name = "background";

  scene.add(background);

  function update() {}

  return {
    update
  };
};