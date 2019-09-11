import * as THREE from "three";
import { CURVE_SEGMENTS, GLOBE_RADIUS } from "../helpers/constants";

export default scene => {
  var textureLoader = new THREE.TextureLoader();
  const sphere = new THREE.SphereGeometry(
    GLOBE_RADIUS * 15,
    CURVE_SEGMENTS,
    CURVE_SEGMENTS
  );
  const map = textureLoader.load(
    "http://localhost:8080/api/textures/milkyway_4k.jpg"
  );
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.magFilter = THREE.NearestFilter;

  const material = new THREE.MeshBasicMaterial({
    map: map,
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
