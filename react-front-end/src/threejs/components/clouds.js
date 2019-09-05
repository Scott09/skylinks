import * as THREE from "three";
import { CURVE_SEGMENTS, GLOBE_RADIUS } from "../helpers/constants";

export default scene => {
  const group = new THREE.Group();

  const sphere = new THREE.SphereGeometry(
    GLOBE_RADIUS + 0.3,
    CURVE_SEGMENTS,
    CURVE_SEGMENTS
  );

  const material = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture("images/fair_clouds_4k.png"),
    transparent: true
  });

  const subjectMaterial = new THREE.MeshStandardMaterial({
    color: "#000",
    transparent: true,
    side: THREE.DoubleSide,
    alphaTest: 0.5
  });

  const clouds = new THREE.Mesh(sphere, material);
  clouds.name = "clouds";

  scene.add(clouds);

  function update(time) {
    group.rotation.y = time / 60;
  }

  return {
    update
  };
};
