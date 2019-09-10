import * as THREE from "three";

export default points => {
  // let counter = 0;

  // let dir = new THREE.Vector3();
  // dir.subVectors(points[0], points[points.length - 1]).normalize();

  let geo = new THREE.PlaneBufferGeometry(0.2, 0.2, 0.1, 0.1);
  let mat = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture("images/plane.png"),
    transparent: true,
    side: THREE.DoubleSide
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
