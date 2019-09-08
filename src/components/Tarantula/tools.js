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

function randomChoice(arr) {
  return arr[Math.floor(arr.length * Math.random())];
}

function extract(m) { // supports only scale*rotate*translate matrix
  var radians = Math.PI / 180

  var sX = Math.sqrt(m[0]*m[0] + m[1]*m[1] + m[2]*m[2]),
      sY = Math.sqrt(m[4]*m[4] + m[5]*m[5] + m[6]*m[6]),
      sZ = Math.sqrt(m[8]*m[8] + m[9]*m[9] + m[10]*m[10])

  var rX = Math.atan2(-m[9]/sZ, m[10]/sZ) / radians,
      rY = Math.asin(m[8]/sZ) / radians,
      rZ = Math.atan2(-m[4]/sY, m[0]/sX) / radians

  if (m[4] === 1 || m[4] === -1) {
    rX = 0
    rY = m[4] * -Math.PI/2
    rZ = m[4] * Math.atan2(m[6]/sY, m[5]/sY) / radians
  }

  var tX = m[12]/sX,
      tY = m[13]/sX,
      tZ = m[14]/sX

  return {
    translate: [tX, tY, tZ],
    rotate: [rX, rY, rZ],
    scale: [sX, sY, sZ]
  }
}

var qrDecompone = function(a) {
  var angle = Math.atan2(a[1], a[0]),
      denom = Math.pow(a[0], 2) + Math.pow(a[1], 2),
      scaleX = Math.sqrt(denom),
      scaleY = (a[0] * a[3] - a[2] * a[1]) / scaleX,
      skewX = Math.atan2(a[0] * a[2] + a[1] * a[3], denom);
  return {
    angle: angle / (Math.PI / 180),  // this is rotation angle in degrees
    scaleX: scaleX,                  // scaleX factor  
    scaleY: scaleY,                  // scaleY factor
    skewX: skewX / (Math.PI / 180),  // skewX angle degrees
    skewY: 0,                        // skewY angle degrees
    translateX: a[4],                // translation point  x
    translateY: a[5]                 // translation point  y
  };
};

export default {
  degreesToRadians,
  radiansToDegrees,
  randomChoice,
  extract,
  qrDecompone
}
