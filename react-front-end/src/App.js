import React from "react";
import axios from "axios";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./App.css";
import { EARTH } from "./components/earth.js";
import { CLOUDS } from "./components/clouds.js";
import { STARS } from "./components/stars.js";
import {
  coordinateToPosition,
  getSplineFromCoords
} from "./components/curve.js";

const App = props => {
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.2,
    10000
  );
  // Set up the canvas
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //Create a new ambient light
  let lightA = new THREE.AmbientLight(0x333333);
  scene.add(lightA);
  //Create a new directional light
  let lightD = new THREE.DirectionalLight(0xffffff, 1);
  lightD.position.set(50, 25, 30);
  scene.add(lightD);

  // Set up Earth, clouds and stars background
  scene.add(EARTH);
  scene.add(CLOUDS);
  scene.add(STARS);

  // Set up cities
  const RADIUS = 5;
  const VanCoor = [49.1966913, -123.183701];
  const GZCoor = [23.1292, 113.2644];

  const start = coordinateToPosition(VanCoor[0], VanCoor[1], RADIUS);
  const end = coordinateToPosition(GZCoor[0], GZCoor[1], RADIUS);

  let geometry_place = new THREE.SphereGeometry(0.05, 32, 32);
  let mat_place = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    specular: new THREE.Color("red")
  });
  let sphere_place1 = new THREE.Mesh(geometry_place, mat_place);
  let sphere_place2 = new THREE.Mesh(geometry_place, mat_place);
  sphere_place1.position.set(start.x, start.y, start.z);
  sphere_place2.position.set(end.x, end.y, end.z);
  scene.add(sphere_place1);
  scene.add(sphere_place2);

  // Set up the flight path
  const { spline } = getSplineFromCoords(VanCoor, GZCoor);
  const points = spline.getPoints(32);
  const curve_geometry = new THREE.BufferGeometry().setFromPoints(points);
  const curve_material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const curveObject = new THREE.Line(curve_geometry, curve_material);
  scene.add(curveObject);

  // Set up camera position
  camera.position.z = 10;
  camera.position.y = 10;

  // Set up the controls
  let controls = new OrbitControls(camera);
  controls.minPolarAngle = 1.52;
  controls.maxPolarAngle = 1.52;
  controls.minAzimuthAngle = -Infinity;
  controls.maxAzimuthAngle = Infinity;
  controls.rotateSpeed = 0.3;
  controls.zoomSpeed = 1.0;
  controls.maxDistance = 50;
  controls.minDistance = 6;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.3;
  controls.enablePan = false;
  controls.update();

  let animate = function() {
    requestAnimationFrame(animate);
    CLOUDS.rotation.y += 0.0001;
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  return <div className="App"></div>;
};

export default App;
