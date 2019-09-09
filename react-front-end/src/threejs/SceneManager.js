import * as THREE from "three";
import Earth from "./components/earth";
import StarsBackGround from "./components/stars";
import Clouds from "./components/clouds";
import Sun from "./components/sun";
import FlightRoutes from "./components/flightRoutes";
import GeneralLights from "./GeneralLights";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default canvas => {
  const clock = new THREE.Clock();

  const screenDimensions = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  const scene = buildScene();
  const renderer = buildRender(screenDimensions);
  const camera = buildCamera(screenDimensions);
  const controls = buildControls(camera);
  const sceneSubjects = createSceneSubjects(scene);
  let sceneRoutes = [];

  function buildScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#FFF");

    return scene;
  }

  function buildRender({ width, height }) {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      powerPreference: "high-performance"
    });
    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);

    return renderer;
  }

  function buildControls(camera) {
    var controls = new OrbitControls(camera);
    controls.minPolarAngle = -Math.PI;
    controls.maxPolarAngle = Math.PI;
    controls.minAzimuthAngle = -Infinity;
    controls.maxAzimuthAngle = Infinity;
    controls.rotateSpeed = 0.3;
    controls.zoomSpeed = 0.5;
    controls.maxDistance = 40;
    controls.minDistance = 6;
    controls.enablePan = false;
    controls.enabled = false;

    return controls;
  }

  function buildCamera({ width, height }) {
    const aspectRatio = width / height;
    const fieldOfView = 65;
    const nearPlane = 0.2;
    const farPlane = 10000;
    const camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );
    camera.position.z = 10;
    return camera;
  }

  function createSceneSubjects(scene) {
    const sceneSubjects = [
      // new Earth(scene),
      // new Clouds(scene),
      // new Sun(scene),
      // new GeneralLights(scene),
      // new StarsBackGround(scene)
    ];
    return sceneSubjects;
  }

  function createSceneRoute(scene, airport) {
    return [new FlightRoutes(scene, airport)];
  }

  function addEntity(airport) {
    sceneRoutes.push(createSceneRoute(scene, airport));
  }

  function clear() {
    var selectedObject = scene.getObjectByName("routes");
    var children_to_remove = [];

    selectedObject &&
      selectedObject.traverse(line => {
        if (line.type === "Line") {
          console.log("removed");
          children_to_remove.push(line);
        }
      });
    //remove all children
    children_to_remove.forEach(function(child) {
      scene.remove(child);
      child.geometry.dispose();
      child.material.dispose();
    });

    sceneRoutes.length = 0;
    scene.remove(selectedObject);
  }

  function update() {
    const elapsedTime = clock.getElapsedTime();

    for (let i = 0; i < sceneSubjects.length; i++) {
      sceneSubjects[i].update(elapsedTime);
    }
    controls.update();
    renderer.render(scene, camera);
  }

  function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    screenDimensions.width = width;
    screenDimensions.height = height;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }
  function onMouseLeave(event) {
    controls.enabled = false;
  }

  function onMouseEnter(event) {
    controls.enabled = true;
  }

  function onMouseDown(event) {
    let mouse3D = new THREE.Vector3(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    let raycaster = new THREE.Raycaster();
    raycaster.linePrecision = 0.1;
    raycaster.setFromCamera(mouse3D, camera);
    // find the object that we want to intersect

    let routes = scene.getObjectByName("routes");
    if (routes) {
      let intersects = raycaster.intersectObjects(routes.children);
      if (intersects.length > 0) {
        let selectedElement = document.getElementById(
          `${intersects[0].object.departure_fs}_${intersects[0].object.arrival_fs}`
        );
        selectedElement.focus();
        // change color and corresponding list item on click
        selectedElement.style.background = "PaleGreen";
        intersects[0].object.material.color.setHex(0x98fb98);
        intersects[0].object.material.opacity = 1;
        setTimeout(() => {
          selectedElement.style.background = "";
          intersects[0].object.material.color.setHex(0xe85d33);
          intersects[0].object.material.opacity = 0.7;
        }, 1000);
      }
    }
  }

  return {
    update,
    onWindowResize,
    onMouseDown,
    clear,
    addEntity,
    onMouseEnter,
    onMouseLeave
  };
};
