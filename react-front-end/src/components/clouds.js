import * as THREE from "three";
import { CURVE_SEGMENTS, GLOBE_RADIUS } from "./constants";

export const CLOUDS = new THREE.Mesh(
  new THREE.SphereGeometry(GLOBE_RADIUS + 0.3, CURVE_SEGMENTS, CURVE_SEGMENTS),
  new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture("images/fair_clouds_4k.png"),
    transparent: true
  })
);
