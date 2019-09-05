import * as THREE from "three";
import {
  CURVE_SEGMENTS,
  GLOBE_RADIUS,
  GLOBE_SHININESS,
  GLOBE_BUMPSCALE
} from "../helpers/constants";

export default scene => {
  const group = new THREE.Group();

  const geometry_sphere = new THREE.SphereGeometry(
    GLOBE_RADIUS,
    CURVE_SEGMENTS,
    CURVE_SEGMENTS
  );

  const material = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture("images/2_no_clouds_4k.jpg"),
    bumpMap: THREE.ImageUtils.loadTexture("images/elev_bump_4k.jpg"),
    bumpScale: GLOBE_BUMPSCALE,
    specularMap: THREE.ImageUtils.loadTexture("images/water_4k.png"),
    specular: new THREE.Color("grey"),
    shininess: GLOBE_SHININESS
  });

  const earth = new THREE.Mesh(geometry_sphere, material);
  earth.name = "earth";

  const earthtWireframe = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry_sphere),
    new THREE.LineBasicMaterial()
  );

  scene.add(earth);

  function update() {}

  return {
    update
  };
};
