import * as THREE from "three";

export default points => {
  var textureLoader = new THREE.TextureLoader();

  // let counter = 0;

  // let dir = new THREE.Vector3();
  // dir.subVectors(points[0], points[points.length - 1]).normalize();

  let geo = new THREE.PlaneBufferGeometry(0.2, 0.2, 0.1, 0.1);
  let mat = new THREE.MeshBasicMaterial({
    map: textureLoader.load("http://localhost:8080/api/textures/plane.png"),
    transparent: true
  });
  let plane = new THREE.Mesh(geo, mat);

  return plane;

  // function moveontrack() {
  //   if (counter <= 1) {
  //     plane.position.copy(points[Math.floor(counter * points.length)]);

  //     counter += 0.005;
  //   } else {
  //     counter = 0;
  //   }
  // }
};
