function degreesToRadians(degrees) {
	return degrees * Math.PI / 180;
}

function radiansToDegrees(radians) {
	return radians * 180 / Math.PI;
}

function legCounterAngle(bodyAngle, distanceFromAxisToLeg, distanceFromLegToFloor) {
  const beta = radiansToDegrees(Math.asin(distanceFromAxisToLeg * Math.sin(degreesToRadians(bodyAngle)) / distanceFromLegToFloor))
  return -1 * (bodyAngle + beta)
}

export default {
  degreesToRadians,
  radiansToDegrees
}
