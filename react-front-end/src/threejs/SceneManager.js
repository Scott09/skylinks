import * as THREE from "three";
import Earth from "./components/earth";
import StarsBackGround from "./components/stars";
import Clouds from "./components/clouds";
import Sun from "./components/sun";
import FlightRoutes from "./components/flightRoutes";
import FlightRealRoutes from "./components/realFlightRoutes";
import GeneralLights from "./GeneralLights";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { coordinateToPosition } from "./helpers/curve";

export default canvas => {
  const clock = new THREE.Clock();
  var gltfLoader = new GLTFLoader();

  const screenDimensions = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  const scene = buildScene();
  const renderer = buildRender(screenDimensions);
  const camera = buildCamera(screenDimensions);
  const controls = buildControls(camera);
  const sceneSubjects = createSceneSubjects(scene);
  createPlane(scene);
  let airPlaneRoot = "";
  let sceneRoutes = [];
  let sceneRealRoute = [];

  function createPlane(scene) {
    gltfLoader.load("http://localhost:8080/with-cors/scene.gltf", gltf => {
      gltf.scene.traverse(function(child) {
        if (child.isMesh) {
          child.name = "airPlaneParts";
          child.rotation.set(
            (Math.PI / 180) * 0,
            (Math.PI / 180) * 0,
            (Math.PI / 180) * 0
          );
          child.geometry.center(); // center here
        }
      });
      const root = gltf.scene;
      root.scale.set(0.00001, 0.00001, 0.00001);
      root.name = "real3d";
      scene.add(root);

      return root;

      // compute the box that contains all the stuff
      // from root and below
    });
  }

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
    controls.target.set(0, 0.6, 0);

    return controls;
  }

  function buildCamera({ width, height }) {
    const fieldOfView = 65;
    const aspectRatio = width / height;
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
      new Clouds(scene),
      new Sun(scene),
      new GeneralLights(scene),
      new StarsBackGround(scene)
    ];
    return sceneSubjects;
  }

  function createSceneRoute(scene, airport) {
    return [new FlightRoutes(scene, airport)];
  }
  function createSceneRealRoute(scene, airport) {
    return [new FlightRealRoutes(scene, airport)];
  }

  function addEntity(airport) {
    if (airport.waypoints.length > 1) {
      sceneRealRoute.push(createSceneRealRoute(scene, airport.waypoints));
    } else {
      sceneRoutes.push(createSceneRoute(scene, airport));
    }
  }

  function clearRoutes(obj) {
    var children_to_remove = [];

    obj &&
      obj.traverse(line => {
        if (line.type === "Line") {
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
    scene.remove(obj);
  }

  function clearWaypoints(obj) {
    var children_to_remove = [];
    obj &&
      obj.traverse(line => {
        if (line.name === "waypointsLine") {
          children_to_remove.push(line);
        }
      });
    //remove all children
    children_to_remove.forEach(function(child) {
      scene.remove(child);
      child.geometry.dispose();
      child.material.dispose();
    });

    sceneRealRoute.length = 0;
    scene.remove(obj);
  }

  function clear() {
    var selectedObject = "";
    if (scene.getObjectByName("routes")) {
      selectedObject = scene.getObjectByName("routes");
      clearRoutes(selectedObject);
    } else if (scene.getObjectByName("realRoute")) {
      selectedObject = scene.getObjectByName("realRoute");
      clearWaypoints(selectedObject);
    }
  }

  function update() {
    if (!airPlaneRoot) {
      airPlaneRoot = scene.getObjectByName("real3d");
    }
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

  const clearAirPlane3d = () => {
    if (airPlaneRoot) {
      console.log("clear");
      airPlaneRoot.position.set(0, 0, 0);
    }
  };

  function updatePosition(position, waypoints) {
    const plane = scene.getObjectByName("realTimePlane");
    // const center = new THREE.Vector3(0, 0, 0);
    if (airPlaneRoot && plane) {
      airPlaneRoot.points = plane.points;
      const index = airPlaneRoot.points.length - 2;
      const current = Math.floor((position / 100) * index);
      airPlaneRoot.up = new THREE.Vector3(0, 1, 0);
      const endPosition = coordinateToPosition(
        waypoints[waypoints.length - 1].position.latitude,
        waypoints[waypoints.length - 1].position.longitude,
        5
      );
      console.log(endPosition);
      airPlaneRoot.position.lerp(airPlaneRoot.points[current], 1);

      airPlaneRoot.lookAt(airPlaneRoot.points[current + 1]);
      airPlaneRoot.rotation.z = -(Math.PI / 180) * 320;
    } else if (plane) {
      const index = plane.points.length - 1;
      const current = Math.floor((position / 100) * index);
      plane.position.lerp(plane.points[current], 1);
      plane.rotation.z =
        (Math.PI / 180) * waypoints[current].position.direction;
      // axis.crossVectors(up, plane.points[current]).normalize();
      // plane.quaternion.setFromAxisAngle(
      //   new THREE.Vector3(0, 1, 0),
      //   (Math.PI / 180) * waypoints[current].position.direction
      // );

      // plane.quaternion.setFromUnitVectors(
      //   plane.points[current],
      //   plane.points[current + 10]
      // );
    }
  }

  return {
    update,
    onWindowResize,
    onMouseDown,
    clear,
    addEntity,
    onMouseEnter,
    onMouseLeave,
    updatePosition,
    clearAirPlane3d
  };
};
