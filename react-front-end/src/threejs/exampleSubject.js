import * as THREE from "three";

export default scene => {
  const group = new THREE.Group();

  scene.add(group)
  function update(time) {}

  return {
    update
  };
};
