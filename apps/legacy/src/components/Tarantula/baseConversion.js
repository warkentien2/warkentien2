let str = `
.x-leg {
  height: 28px;
  left: 400px;
  position: absolute;
  top: 300px;
  width: 130px;
  // opacity: 0.25;

  >.x-leg-parts {
    left: 0;
    top: 0;
  }
}

.x-leg-parts {
  background: $body-color;
  border: $border;
  border-radius: 50% 60% 45% 25%;
  box-shadow: $body-shadow;
  height: 97.5%;
  left: 95%;
  position: absolute;
  top: 10%;
  transform-origin: 5% 50%;
}

.x-trochanter {
  width: 30%;
  transform: rotate(10deg);
}

.x-femur {
  height: 100%;
  left: 50%;
  top: 0;
  transform: rotate(-80deg);
  transform-origin: 5% 25%;
  width: 350%;
}

.x-patella {
  background: $patella-color;
  transform: rotate(100deg);
  width: 45%;
}

.x-tibia {
  background: $tibia-color;
  height: 100%;
  top: 2.5%;
  left: 80%;
  transform: rotate(15deg);
  width: 150%;
}

.x-metatarsus {
  background: $meta-color;
  left: 92.5%;
  height: 80%;
  transform: rotate(25deg);
  width: 95%;
}

.x-tarsus {
  border-radius: 50% 50% 100% 50%;
  height: 65%;
  left: 95%;
  top: 20%;
  transform: rotate(-10deg);
  width: 60%;
}

.x-dot {
  // background: blue;
  // border: 1px solid white;
  border-radius: 50%;
  height: 4px;
  left: 5%;
  opacity: 0.5;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 4px;
}

.x-leg.leg-1 {

  .x-trochanter {
    transform: rotate(20deg);
  }

  .x-femur {
    transform: rotate(-70deg);
  }

  .x-patella {
    transform: rotate(60deg);
  }

  .x-metatarsus {
    transform: rotate(50deg);
  }
}

.x-leg.leg-2 {
  left: 370px;
}

.x-leg-small {
  transform: rotateY(180deg);
  left: 23%;

  .x-trochanter {
    transform: rotate(20deg);
  }

  .x-femur {
    width: 310%;
    transform: rotate(-67.5deg);
  }

  .x-patella {
    transform: rotate(67.5deg);
  }

  .x-metatarsus {
    transform: rotate(30deg);
  }
}

.x-leg.leg-4 {
  left: 25%;

  .x-trochanter {
    transform: rotate(30deg);
  }

  .x-femur {
    left: 30%;
    top: 30%;
    transform: rotate(-115deg);
  }

  .x-patella {
    transform: rotate(120deg);
  }

  .x-metatarsus {
    transform: rotate(60deg);
  }

  .x-tarsus {
    transform: rotate(-35deg);
  }
}

.x-body-parts {
  background: $body-color;
  border: $border;
  box-shadow: $body-shadow;
  height: 92.5%;
  left: 95%;
  position: absolute;
  top: 10%;
  transform-origin: 5% 50%;
}

.x-abdomen {
  left: 16.75%;
  top: 38.5%;
  width: 170px;
  height: 120px;
  border-radius: 60% 50% 35% 50%;
  transform: rotate(-20deg);
}

.x-cephalothorax {
  background: $cephalo-color;
  left: 32.75%;
  top: 37.5%;
  width: 120px;
  height: 70px;
  border-radius: 10%;
  border-top-left-radius: 100%;
  border-bottom-right-radius: 30%;
  transform: rotate(-10deg);

  .x-eye {
    position: absolute;
    right: -17.5%;
    top: 4%;
    width: 10px;
    height: 8px;
    border-radius: 50% 50% 45% 45%;
    background: #ccc;
    box-shadow: inset -2px 0 1px -1px #ccc, inset -1px -2px 1px 2px rgba(0, 0, 0, 1);
    border: 1px solid #000;
    transform: rotate(45deg);
  }

  .x-eye2 {
    position: absolute;
    right: -14%;
    top: 10%;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ccc;
    box-shadow: inset -2px 0 1px -1px #ccc, inset -1px -2px 1px 2px rgba(0, 0, 0, 1);
    border: 1px solid #000;
    transform: rotate(60deg);
  }

  .x-eye3 {
    position: absolute;
    right: -22.5%;
    top: 16%;
    width: 4px;
    height: 3px;
    border-radius: 50%;
    background: #ccc;
    box-shadow: inset -2px 0 1px -1px #ccc, inset -1px -2px 1px 2px rgba(0, 0, 0, 1);
    border: 1px solid #000;
    transform: rotate(60deg);
  }

  .x-eye4 {
    position: absolute;
    right: -28%;
    top: 14%;
    width: 5px;
    height: 3px;
    border-radius: 50%;
    background: #ccc;
    box-shadow: inset -2px 0 1px -1px #ccc, inset -1px -2px 1px 2px rgba(0, 0, 0, 1);
    border: 1px solid #000;
    transform: rotate(60deg);
  }

  .x-coxa-pattern,
  .x-chelicera-pattern {
    background: $cephalo-color;
    display: inline-block;
    left: 48%;
    top: 0;
    width: 24%;
    height: 80%;
    position: absolute;
    transform-origin: 50% 0;
    box-shadow: inset 0 -15px 10px 5px rgba(20, 20, 10, 0.25);
    border-radius: 80% 80% 20% 20%;
  }

  .x-cp1 {
    transform: translate(-90%, 35%) rotate(30deg);
  }

  .x-cp2 {
    transform: translate(-35%, 20%) rotate(15deg);
  }

  .x-cp3 {
    transform: translate(7%, 15%) rotate(7deg);
  }

  .x-cp4 {
    transform: translate(40%, 12.5%) rotate(-10deg);
  }

  .x-chelicera-pattern {
    width: 37.5%;
    height: 70%;
    border: 1px solid $border-color;
    box-shadow: $body-shadow;
    border-top: none;
    border-radius: 20% 85% 15% 0%;
    transform: translate(25%, 0) rotate(-55deg);
  }
}

.x-pedipalp {
  left: 44%;
  top: 42.5%;
  position: absolute;
  transform: rotate(10deg);
  width: 80px;
  height: 22px;

  .x-leg-parts {
    border-radius: 40% 50% 35% 25%;
  }

  .x-trochanter {
    transform: rotate(10deg);
  }

  .x-femur {
    transform: rotate(-40deg);
  }

  .x-patella {
    transform: rotate(70deg);
  }

  .x-tibia {
    top: -5%;
  }

  .x-metatarsus {
    transform: rotate(50deg);
    width: 80%;
    height: 75%;
  }
}

.x-chelicerae {
  width: 85px;
  height: 45px;
  left: 45.75%;
  top: 33.5%;
  transform: rotate(60deg);
  border-radius: 30% 70% 10% 0%;

  .x-fang {
    position: absolute;
    background: $fang-color;
    border-radius: 20% 0 100% 0;
    width: 20%;
    height: 20%;
    right: -10%;
    bottom: -25%;
    transform: rotate(60deg);
    tranform-origin: 10% 50%;
  }
}
`

function toVMax(s1) {	
	return `${(parseInt(s1)/7.5).toFixed(2)}em`;
}

str = str.replace(/(\d+px)/g, toVMax)
console.log(str)