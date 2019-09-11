import * as THREE from "three";

export default spline => {
  let counter = 0;
  let tangent = new THREE.Vector3();
  let axis = new THREE.Vector3();
  let up = new THREE.Vector3(0, 1, 0);

  var textureLoader = new THREE.TextureLoader();

  let geo = new THREE.PlaneBufferGeometry(0.2, 0.2, 0.1, 0.1);
  let mat = new THREE.MeshBasicMaterial({
    map: textureLoader.load("http://localhost:8080/api/textures/plane.png"),
    transparent: true,
    side: THREE.DoubleSide
  });
  let plane = new THREE.Mesh(geo, mat);

  const ran_for_airplane = Math.floor(Math.random() * 5000);
  setTimeout(() => {
    setInterval(moveontrack, 100);
  }, ran_for_airplane);

  return plane;

  function moveontrack() {
    if (counter <= 1) {
      plane.position.copy(spline.getPointAt(counter));

      tangent = spline.getTangentAt(counter).normalize();

      axis.crossVectors(up, tangent).normalize();

      var radians = Math.acos(up.dot(tangent));

      plane.quaternion.setFromAxisAngle(axis, radians);

      counter += 0.003;
    } else {
      counter = 0;
    }
  }
};
