function degreesToRadians(degrees) {
	return degrees * Math.PI / 180;
}

function radiansToDegrees(radians) {
	return radians * 180 / Math.PI;
}

function randomChoice(arr) {
  return arr[Math.floor(arr.length * Math.random())];
}

export default {
  degreesToRadians,
  radiansToDegrees,
  randomChoice
}
