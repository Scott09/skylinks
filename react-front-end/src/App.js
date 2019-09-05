import React from "react";
import axios from "axios";
import "./App.css";
import ThreeContainer from "./threejs/ThreeContainer";
import canvas from "./threejs/SceneManager";

const App = props => {
  const { removeEntity, printScene, addEntity, toggleRemove } = canvas();
  const fetchData = () => {
    removeEntity();
    axios.get("/api/airports").then(response => {
      console.log(response.data);
      // setCity(response.data);
    });
  };
  const _printScene = () => {
    printScene();
  };
  const _addEntity = () => {
    addEntity();
  };

  const _removeEntity = () => {
    let random = Math.random();
  };
  // document.addEventListener("mousedown", onDocumentMouseDown);
  // // Set up the controls
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
      <button onClick={_addEntity}> add entity </button>
      <button onClick={_removeEntity}> remove entity </button>
      <button onClick={_printScene}> print Scene </button>
      <ThreeContainer clear={random} />
    </>
  );
};

export default App;
