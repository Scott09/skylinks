import React, { useState, useEffect } from "react";
import axios from "axios";
import * as THREE from "three";
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
    let geometry_line = new THREE.SphereGeometry(5.5, 32, 32);
    let mat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
    let wireframe = new THREE.WireframeGeometry(geometry_line);
    let line = new THREE.LineSegments(wireframe, mat);
    line.material.depthTest = true;
    line.material.transparent = true;
    line.material.opacity = 0.7;
    // scene.add(line);
    // Set up the sphere
    let geometry_sphere = new THREE.SphereGeometry(5, 32, 32);
    let material = new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture("images/2_no_clouds_4k.jpg"),
      bumpMap: THREE.ImageUtils.loadTexture("images/elev_bump_4k.jpg"),
      bumpScale: 0.005,
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
    // add the objects to the scene
    camera.position.z = 10;
    let animate = function() {
      requestAnimationFrame(animate);
      // line.rotation.x += 0.01;
      line.rotation.y += 0.1;
      // sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.003;
      clouds.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  const fetchData = () => {
    axios.get("/api/data").then(response => {
      // handle success
      console.log(response.data);

      console.log(response.data.message);
      setMessage({
        message: response.data.message
      });
    });
  };

  return (
    <div className="App">
      <h1>{message.message}</h1>
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
};

export default App;
