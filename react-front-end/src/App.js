import React, { useState, useEffect } from "react";
import axios from "axios";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./App.css";
import ThreeContainer from "./test/ThreeContainer";

import { EARTH } from "./components/earth.js";
import { CLOUDS } from "./components/clouds.js";
import { STARS } from "./components/stars.js";
import {
  coordinateToPosition,
  getSplineFromCoords
} from "./components/curve.js";

import YVR_routes from "./YVR_routes.json";
import airports from "./airports.json";

const App = props => {
  // let [cities, setCity] = useState([]);
  const [lines, setLines] = useState({});
  const fetchData = () => {
    axios.get("/api/airports").then(response => {
      console.log(response.data);
      // setCity(response.data);
    });
  };

  useEffect(() => {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.2,
      10000
    );
    camera.position.set(0, 0, 10);
    camera.lookAt(scene.position);
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

    /**
     * returns a filtedred list if airports
     * @param  {} name_of_airport, the of the airport
     * @param  {} list_of_airports
     */
    function filterRoutesByIATA(name_of_airport, list_of_airports) {
      let filteredAirports = list_of_airports.filter(function(airport) {
        return airport.start_airport === name_of_airport;
      });
      return filteredAirports;
    }

    function validRoute(start_iata, end_iata) {
      if (airports[start_iata] && airports[end_iata]) {
        return true;
      }
    }

    function makeLineInstance(
      start_iata,
      end_iata,
      curve_material,
      lineDetail
    ) {
      if (validRoute(start_iata, end_iata)) {
        const start = [
          airports[start_iata].dd_latitude,
          airports[start_iata].dd_longitude
        ];
        const end = [
          airports[end_iata].dd_latitude,
          airports[end_iata].dd_longitude
        ];
        const startCoor = [...start];
        const endCoor = [...end];
        const { spline } = getSplineFromCoords(startCoor, endCoor);
        const points = spline.getPoints(lineDetail);
        const curve_geometry = new THREE.BufferGeometry().setFromPoints(points);

        const curvedLine = new THREE.Line(curve_geometry, curve_material);
        curvedLine.name = `line_${start_iata}_${end_iata}`;
        curvedLine.start_iata = start_iata;
        curvedLine.end_iata = end_iata;
        scene.add(curvedLine);
        return curvedLine;
      }
    }

    function routesPerAirport(airport_name, file_of_routes) {
      const group = {};
      for (const airport of filterRoutesByIATA(airport_name, file_of_routes)) {
        const start_iata = airport.start_airport;
        const end_iata = airport.destination_airport;
        const curve_material = new THREE.LineBasicMaterial({
          color: 0xffffff
        });
        const lineDetail = 32;
        const line = makeLineInstance(
          start_iata,
          end_iata,
          curve_material,
          lineDetail
        );
        if (line) {
          group[line.name] = line;
        }
      }
      setLines(group);
      return group;
    }

    console.log(routesPerAirport("YVR", YVR_routes));

    // console.log(group[0].name);

    // Set up interactions with 3d objects

    function onDocumentMouseDown(event) {
      event.preventDefault();
      var mouse3D = new THREE.Vector3(
        EARTH(event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
      );
      var raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse3D, camera);
      var intersects = raycaster.intersectObjects([CLOUDS]);

      if (intersects.length > 0) {
        intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
      }
    }
    // document.addEventListener("mousedown", onDocumentMouseDown);
    // Set up the controls
    let controls = new OrbitControls(camera);
    controls.minPolarAngle = 1.52;
    controls.maxPolarAngle = 1.52;
    controls.minAzimuthAngle = -Infinity;
    controls.maxAzimuthAngle = Infinity;
    controls.rotateSpeed = 0.3;
    controls.zoomSpeed = 0.5;
    controls.maxDistance = 50;
    controls.minDistance = 6;
    controls.enablePan = false;
    // controls.autoRotate = true;
    // controls.autoRotateSpeed = 0.3;
    controls.update();

    let animate = function() {
      requestAnimationFrame(animate);
      CLOUDS.rotation.y += 0.0001;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return (
    <>
      <ThreeContainer />
      <button onClick={fetchData}> Fetch Data </button>
    </>
  );
};

export default App;
