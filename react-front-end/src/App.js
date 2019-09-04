import React from "react";
import axios from "axios";
import "./App.css";
import ThreeContainer from "./threejs/ThreeContainer";
import { sayHello } from "./threejs/SceneManager";

const App = props => {
  const fetchData = () => {
    axios.get("/api/airports").then(response => {
      console.log(response.data);
      // setCity(response.data);
    });
  };

  //   function onDocumentMouseDown(event) {
  //     event.preventDefault();
  //     var mouse3D = new THREE.Vector3(
  //       EARTH(event.clientX / window.innerWidth) * 2 - 1,
  //       -(event.clientY / window.innerHeight) * 2 + 1,
  //       0.5
  //     );
  //     var raycaster = new THREE.Raycaster();
  //     raycaster.setFromCamera(mouse3D, camera);
  //     var intersects = raycaster.intersectObjects([CLOUDS]);

  //     if (intersects.length > 0) {
  //       intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
  //     }
  //   }
  //   // document.addEventListener("mousedown", onDocumentMouseDown);
  //   // Set up the controls
  //   let controls = new OrbitControls(camera);
  //   controls.minPolarAngle = 1.52;
  //   controls.maxPolarAngle = 1.52;
  //   controls.minAzimuthAngle = -Infinity;
  //   controls.maxAzimuthAngle = Infinity;
  //   controls.rotateSpeed = 0.3;
  //   controls.zoomSpeed = 0.5;
  //   controls.maxDistance = 50;
  //   controls.minDistance = 6;
  //   controls.enablePan = false;
  //   // controls.autoRotate = true;
  //   // controls.autoRotateSpeed = 0.3;
  //   controls.update();

  //   let animate = function() {
  //     requestAnimationFrame(animate);
  //     CLOUDS.rotation.y += 0.0001;
  //     controls.update();
  //     renderer.render(scene, camera);
  //   };
  //   animate();
  // }, []);

  return (
    <>
      <button onClick={fetchData}> Fetch Data </button>
      <ThreeContainer />
    </>
  );
};

export default App;
