import * as THREE from "three";
import {
  DirectionalLightX,
  DirectionalLightY,
  DirectionalLightZ
} from "./helpers/constants";

export default scene => {
  let lightA = new THREE.AmbientLight(0x444444);
  scene.add(lightA);
  //Create a new directional light
  let lightD = new THREE.DirectionalLight(0xffffff, 1);
  lightD.position.set(DirectionalLightX, DirectionalLightY, DirectionalLightZ);
  scene.add(lightD);

  function update() {}

  function getName() {
    return "Lights";
  }

  return {
    update,
    getName
  };
};
