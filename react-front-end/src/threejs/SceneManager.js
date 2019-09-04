import * as THREE from "three";
import Earth from "./components/earth";
import StarsBackGround from "./components/stars";
import Clouds from "./components/clouds";
import FlightRoutes from "./components/flightRoutes";
import GeneralLights from "./GeneralLights";

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
  const sceneSubjects = createSceneSubjects(scene);

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
    const sceneSubjects = [
      new Earth(scene),
      new GeneralLights(scene),
      new StarsBackGround(scene),
      new Clouds(scene),
      new FlightRoutes(scene)
    ];

    return sceneSubjects;
  }

  function update() {
    const elapsedTime = clock.getElapsedTime();

    for (let i = 0; i < sceneSubjects.length; i++)
      sceneSubjects[i].update(elapsedTime);
    renderer.render(scene, camera);
  }

  function onWindowResize() {
    const { width, height } = canvas;

    screenDimensions.width = width;
    screenDimensions.height = height;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }

  function onMouseMove(x, y) {
    mousePosition.x = x;
    mousePosition.y = y;
  }

  return {
    update,
    onWindowResize,
    onMouseMove
  };
};
