import * as THREE from "three";
import { CURVE_SEGMENTS, GLOBE_RADIUS } from "./constants";

export const STARS = new THREE.Mesh(
  new THREE.SphereGeometry(GLOBE_RADIUS * 200, CURVE_SEGMENTS, CURVE_SEGMENTS),
  new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture("images/galaxy_starfield.png"),
    side: THREE.BackSide
  })
);
