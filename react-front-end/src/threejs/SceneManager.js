import * as THREE from "three";
import Earth from "./components/earth";
import StarsBackGround from "./components/stars";
import Clouds from "./components/clouds";
import FlightRoutes from "./components/flightRoutes";
import GeneralLights from "./GeneralLights";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default canvas => {
  const clock = new THREE.Clock();

  const screenDimensions = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  const mousePosition = {
    x: 0,
    y: 0
  };

  const scene = buildScene();
  const renderer = buildRender(screenDimensions);
  const camera = buildCamera(screenDimensions);
  buildControls(camera);
  const sceneSubjects = createSceneSubjects(scene);
  createSceneRoute(scene);
  console.log(scene);

  function buildScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#FFF");

    return scene;
  }

  function buildRender({ width, height }) {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas
    });
    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    return renderer;
  }

  function buildControls(camera) {
    var controls = new OrbitControls(camera);
    controls.minPolarAngle = 1.52;
    controls.maxPolarAngle = 1.52;
    controls.minAzimuthAngle = -Infinity;
    controls.maxAzimuthAngle = Infinity;
    controls.rotateSpeed = 0.3;
    controls.zoomSpeed = 0.5;
    controls.maxDistance = 50;
    controls.minDistance = 6;
    controls.enablePan = false;
  }

  function buildCamera({ width, height }) {
    const aspectRatio = width / height;
    const fieldOfView = 75;
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
    const a = [
      new Earth(scene),
      new Clouds(scene),
      new GeneralLights(scene),
      new StarsBackGround(scene)
    ];
    return a;
  }

  function emptyRoutes() {}

  function createSceneRoute(scene) {
    new FlightRoutes(scene);
  }

  function update() {
    const elapsedTime = clock.getElapsedTime();

    for (let i = 0; i < sceneSubjects.length; i++) {
      sceneSubjects[i].update(elapsedTime);
    }

    // for (let i = 0; i < sceneRoutes.length; i++) {
    //   sceneRoutes[i].update(elapsedTime);
    // }

    // controls.update();
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

  function onMouseDown(event) {
    event.preventDefault();
    let mouse3D = new THREE.Vector3(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    let raycaster = new THREE.Raycaster();
    raycaster.linePrecision = 0.1;
    raycaster.setFromCamera(mouse3D, camera);
    // find the object that we want to intersect

    let routes = scene.getObjectByName("routes");

    let intersects = raycaster.intersectObjects(routes.children);

    if (intersects.length > 0) {
      for (let i of intersects) {
        i.object.material.color.setHex(Math.random() * 0xffffff);
        console.log(`From: ${i.object.start_iata} to: ${i.object.end_iata}`);
      }
      // intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
    }
  }

  function onMouseMove(x, y) {
    mousePosition.x = x;
    mousePosition.y = y;
  }

  return {
    update,
    onWindowResize,
    onMouseDown,
    emptyRoutes
  };
};
