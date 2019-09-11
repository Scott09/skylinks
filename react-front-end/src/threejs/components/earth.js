import * as THREE from "three";
import {
  CURVE_SEGMENTS,
  GLOBE_RADIUS,
  GLOBE_SHININESS,
  GLOBE_BUMPSCALE
} from "../helpers/constants";

export default scene => {
  var textureLoader = new THREE.TextureLoader();
  const geometry_sphere = new THREE.SphereGeometry(
    GLOBE_RADIUS,
    CURVE_SEGMENTS,
    CURVE_SEGMENTS
  );
  const mapTexture = textureLoader.load(
    "http://localhost:8080/api/textures/earth.jpg"
  );
  const bumbMapTexture = textureLoader.load(
    "http://localhost:8080/api/textures/elev_bump_4k.jpg"
  );

  const specularMap = textureLoader.load(
    "http://localhost:8080/api/textures/water_4k.png"
  );

  const material = new THREE.MeshPhongMaterial({
    map: mapTexture,
    bumpMap: bumbMapTexture,
    bumpScale: GLOBE_BUMPSCALE,
    specularMap: specularMap,
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
