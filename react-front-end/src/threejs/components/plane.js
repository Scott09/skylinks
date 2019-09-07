import * as THREE from "three";

export default spline => {
  let counter = 0;
  let tangent = new THREE.Vector3();
  let axis = new THREE.Vector3();
  let up = new THREE.Vector3(0, 1, 0);

  let geo = new THREE.PlaneBufferGeometry(0.2, 0.2, 0.1, 0.1);
  let mat = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture("images/plane.png"),
    transparent: true,
    side: THREE.DoubleSide
  });
  let plane = new THREE.Mesh(geo, mat);

  const ran_for_airplane = Math.floor(Math.random() * 5000);
  setTimeout(() => {
    setInterval(moveontrack, 100);
  }, ran_for_airplane);

  return plane;
  // var mtlLoader = new MTLLoader();
  // mtlLoader.setPath("/api/plane/");
  // mtlLoader.load("plane.mtl", function(materials) {
  //   materials.preload();

  //   var objLoader = new OBJLoader();
  //   objLoader.setMaterials(materials);
  //   objLoader.setPath("/api/plane/");
  //   objLoader.load("plane.obj", function(object) {
  //     console.log(`am i here?`);
  //     scene.add(object);
  //     setInterval(moveontrack(object), 100);
  //   });
  // });

  function moveontrack() {
    if (counter <= 1) {
      plane.position.copy(spline.getPointAt(counter));

      tangent = spline.getTangentAt(0.5).normalize();

      axis.crossVectors(up, tangent).normalize();

      var radians = Math.acos(up.dot(tangent));

      plane.quaternion.setFromAxisAngle(axis, radians);

      counter += 0.003;
    } else {
      counter = 0;
    }
  }
};
