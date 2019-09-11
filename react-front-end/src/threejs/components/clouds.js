import * as THREE from "three";
import { CURVE_SEGMENTS, GLOBE_RADIUS } from "../helpers/constants";

export default scene => {
  var textureLoader = new THREE.TextureLoader();
  const sphere = new THREE.SphereGeometry(
    GLOBE_RADIUS + 0.1,
    CURVE_SEGMENTS,
    CURVE_SEGMENTS
  );

  const material = new THREE.MeshPhongMaterial({
    map: textureLoader.load(
      "http://localhost:8080/api/textures/fair_clouds_4k.png"
    ),
    opacity: 0.7,
    transparent: true
  });

  const clouds = new THREE.Mesh(sphere, material);
  clouds.name = "clouds";

  scene.add(clouds);

  function update(time) {
    clouds.rotation.y += 0.0002;
  }

  return {
    update
  };
};
