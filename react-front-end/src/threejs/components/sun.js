import * as THREE from "three";
import { CURVE_SEGMENTS, GLOBE_RADIUS } from "../helpers/constants";
import {
  DirectionalLightX,
  DirectionalLightY,
  DirectionalLightZ
} from "../helpers/constants";

export default scene => {
  var textureLoader = new THREE.TextureLoader();
  const sphere = new THREE.SphereGeometry(
    GLOBE_RADIUS * 0.2,
    CURVE_SEGMENTS,
    CURVE_SEGMENTS
  );

  const material = new THREE.MeshBasicMaterial({
    color: 0xfdb813
  });

  const sun = new THREE.Mesh(sphere, material);

  var spriteMaterial = new THREE.SpriteMaterial({
    map: textureLoader.load("http://localhost:8080/api/textures/glow.png"),
    color: 0xfdb813,
    transparent: false,
    blending: THREE.AdditiveBlending
  });
  var sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(17, 17, 17);
  sun.add(sprite); // this centers the glow at the mesh

  sun.name = "sun";

  scene.add(sun);
  sun.position.set(DirectionalLightX, DirectionalLightY, DirectionalLightZ);

  function update() {}

  return {
    update
  };
};
