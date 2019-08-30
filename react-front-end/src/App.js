import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as THREE from "three";
import "./App.css";

const App = props => {
  const [message, setMessage] = useState({
    message: "Click the button to load data!"
  });
  const mount = useRef(null);
  const [isAnimating, setAnimating] = useState(true);
  const controls = useRef(null);

  useEffect(() => {
    // === THREE.JS CODE START ===
    console.log(mount);
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    var animate = function() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  }, []);

  const fetchData = () => {
    axios
      .get("/api/data") // You can simply make your requests to "/api/whatever you want"
      .then(response => {
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
