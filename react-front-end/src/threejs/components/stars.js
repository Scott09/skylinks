import * as THREE from "three";
import { CURVE_SEGMENTS, GLOBE_RADIUS } from "../helpers/constants";

export default scene => {
  const group = new THREE.Group();

  const geometry_sphere = new THREE.SphereGeometry(
    GLOBE_RADIUS,
    CURVE_SEGMENTS,
    CURVE_SEGMENTS
  );

  const sphere = new THREE.SphereGeometry(
    GLOBE_RADIUS * 200,
    CURVE_SEGMENTS,
    CURVE_SEGMENTS
  );
  const material = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture("images/galaxy_starfield.png"),
    side: THREE.BackSide
  });
  const stars = new THREE.Mesh(sphere, material);

  group.add(stars);
  scene.add(group);

  function getName() {
    return "Stars";
  }

  function update() {}

  return {
    update,
    getName
  };
};
