import * as THREE from "three";
import { geoInterpolate } from "d3-geo";
import {
  GLOBE_RADIUS,
  CURVE_MIN_ALTITUDE,
  CURVE_MAX_ALTITUDE,
  DEGREE_TO_RADIAN
} from "./constants";

export function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

// util function to convert lat/lng to 3D point on globe
export function coordinateToPosition(lat, lng, radius) {
  const phi = (90 - lat) * DEGREE_TO_RADIAN;
  const theta = (lng + 180) * DEGREE_TO_RADIAN;

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export function getSplineFromCoords(coords1, coords2) {
  const startLat = coords1[0];
  const startLng = coords1[1];
  const endLat = coords2[0];
  const endLng = coords2[1];

  // start and end points
  const start = coordinateToPosition(startLat, startLng, GLOBE_RADIUS);
  const end = coordinateToPosition(endLat, endLng, GLOBE_RADIUS);

  // altitude
  const altitude = clamp(
    start.distanceTo(end) * 0.75,
    CURVE_MIN_ALTITUDE,
    CURVE_MAX_ALTITUDE
  );

  // 2 control points
  const interpolate = geoInterpolate([startLng, startLat], [endLng, endLat]);
  const midCoord1 = interpolate(0.25);
  const midCoord2 = interpolate(0.75);
  const mid1 = coordinateToPosition(
    midCoord1[1],
    midCoord1[0],
    GLOBE_RADIUS + altitude
  );
  const mid2 = coordinateToPosition(
    midCoord2[1],
    midCoord2[0],
    GLOBE_RADIUS + altitude
  );

  return {
    start,
    end,
    spline: new THREE.CubicBezierCurve3(start, mid1, mid2, end)
  };
}
