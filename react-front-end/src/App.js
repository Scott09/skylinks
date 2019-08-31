import React, { useState, useEffect } from "react";
import axios from "axios";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import "./App.css";

const App = props => {
  const [message, setMessage] = useState({
    message: "Click the button to load data!"
  });

  useEffect(() => {
    // === THREE.JS CODE START ===
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.2,
      2000
    );
    // Set up the canvas
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Set up the lines
    // let geometry_line = new THREE.SphereGeometry(5.4, 32, 32);
    // let mat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
    // let wireframe = new THREE.WireframeGeometry(geometry_line);
    // let line = new THREE.LineSegments(wireframe, mat);
    // line.material.depthTest = true;
    // line.material.transparent = true;
    // line.material.opacity = 0.7;
    // // scene.add(line);

    // Set up the sphere
    let geometry_sphere = new THREE.SphereGeometry(5, 32, 32);
    let material = new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture("images/2_no_clouds_4k.jpg"),
      bumpMap: THREE.ImageUtils.loadTexture("images/elev_bump_4k.jpg"),
      bumpScale: 0.05,
      specularMap: THREE.ImageUtils.loadTexture("images/water_4k.png"),
      specular: new THREE.Color("grey"),
      shininess: 15
    });
    let sphere = new THREE.Mesh(geometry_sphere, material);
    scene.add(sphere);
    // Set up the clouds
    let clouds = new THREE.Mesh(
      new THREE.SphereGeometry(5.2 + 0.003, 32, 32),
      new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture("images/fair_clouds_4k.png"),
        transparent: true
      })
    );
    scene.add(clouds);
    //Create a new ambient light
    let lightA = new THREE.AmbientLight(0x333333);
    scene.add(lightA);
    //Create a new directional light
    let lightD = new THREE.DirectionalLight(0xffffff, 1);
    lightD.position.set(50, 25, 30);
    scene.add(lightD);
    //Create stars
    let stars = new THREE.Mesh(
      new THREE.SphereGeometry(960, 64, 64),
      new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("images/galaxy_starfield.png"),
        side: THREE.BackSide
      })
    );
    scene.add(stars);
    // Add flight path
    function coordinateToPosition(lat, lng, radius) {
      const phi = (90 - lat) * DEGREE_TO_RADIAN;
      const theta = (lng + 180) * DEGREE_TO_RADIAN;

      return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    }

    function clamp(num, min, max) {
      return num <= min ? min : num >= max ? max : num;
    }

    const RADIUS = 5;
    const CURVE_MIN_ALTITUDE = 2;
    const CURVE_MAX_ALTITUDE = 4;
    const DEGREE_TO_RADIAN = Math.PI / 180;
    const VanCoor = [45.6387, -122.6615];
    const GZCoor = [23.1292, 113.2644];

    const start = coordinateToPosition(VanCoor[0], VanCoor[1], RADIUS);
    const end = coordinateToPosition(GZCoor[0], GZCoor[1], RADIUS);

    const spline = new THREE.CubicBezierCurve3(start, 123, 123, end);
    scene.add(spline);
    //
    let geometry_place = new THREE.SphereGeometry(0.05, 32, 32);
    let mat_place = new THREE.MeshBasicMaterial({
      color: 0xff0000
    });
    let sphere_place1 = new THREE.Mesh(geometry_place, mat_place);
    let sphere_place2 = new THREE.Mesh(geometry_place, mat_place);
    sphere_place1.position.set(start.x, start.y, start.z);
    sphere_place2.position.set(end.x, end.y, end.z);
    scene.add(sphere_place1);
    scene.add(sphere_place2);
    // Set up camera position
    camera.position.z = 10;

    // Set up the controls
    let controls = new TrackballControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.0;
    // controls.panSpeed = 100;
    // controls.noZoom=false;
    controls.noPan = false;
    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;
    controls.update();

    let animate = function() {
      requestAnimationFrame(animate);

      clouds.rotation.y += 0.0001;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  // const fetchData = () => {
  //   axios.get("/api/data").then(response => {
  //     // handle success
  //     console.log(response.data);

  //     console.log(response.data.message);
  //     setMessage({
  //       message: response.data.message
  //     });
  //   });
  // };

  return (
    <div className="App">
      {/* <h1>{message.message}</h1>
      <button onClick={fetchData}>Fetch Data</button> */}
    </div>
  );
};

export default App;
