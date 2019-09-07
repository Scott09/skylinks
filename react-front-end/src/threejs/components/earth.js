import * as THREE from "three";
import {
  CURVE_SEGMENTS,
  GLOBE_RADIUS,
  GLOBE_SHININESS,
  GLOBE_BUMPSCALE
} from "../helpers/constants";

export default scene => {
  const geometry_sphere = new THREE.SphereGeometry(
    GLOBE_RADIUS,
    CURVE_SEGMENTS,
    CURVE_SEGMENTS
  );

  const material = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture("images/8k_earth_daymap.jpg"),
    bumpMap: THREE.ImageUtils.loadTexture("images/elev_bump_4k.jpg"),
    bumpScale: GLOBE_BUMPSCALE,
    specularMap: THREE.ImageUtils.loadTexture("images/water_4k.png"),
    specular: new THREE.Color("grey"),
    shininess: GLOBE_SHININESS
  });

  const earth = new THREE.Mesh(geometry_sphere, material);
  earth.name = "earth";

  scene.add(earth);

  function update() {}

  return {
    update
  };
};
