import * as THREE from "three";

export default scene => {
  let lightA = new THREE.AmbientLight(0x333333);
  scene.add(lightA);
  //Create a new directional light
  let lightD = new THREE.DirectionalLight(0xffffff, 1);
  lightD.position.set(50, 25, 30);
  scene.add(lightD);

  function update() {}

  return {
    update
  };
};
