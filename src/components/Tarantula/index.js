import React, { useEffect, useRef } from 'react'
import tools from './tools'
import { TimelineMax, TweenMax, Power1, Power2, Power3, Linear } from 'gsap'

function addWidthMetadata(tarantula) {
  const legsNodeList = tarantula.current.getElementsByClassName('x-leg')
  const legs = Array.prototype.slice.call(legsNodeList)

  legs.forEach(leg => {
    const legPartsNodeList = leg.querySelectorAll('.x-femur, .x-patella, .x-tibia')
    const legParts = Array.prototype.slice.call(legPartsNodeList)

    legParts.forEach(part => {
      part.dataset.width = part.getBoundingClientRect().width
      part.style.width = part.dataset.width
    })
  })
}

function animateBodyPart(node, speed, angle, newWidth = false, offset = 0) {
  let animation
  
  if(typeof angle === 'object') {
    animation = { ...angle }
    animation.ease = Linear.easeNone
  } else {
    animation = { rotation: angle, ease: Linear.easeNone }
  }

  if(newWidth) {
    animation.width = newWidth
    animation.xPercent = offset
  }

  return speed > 0 ? TweenMax.to(node, speed, animation) : TweenMax.set(node, animation)
}

function animateLeg(leg, speed, angles = [false, false, false, false, false, false], scalePatellaPercent = false, scaleFemurPercent = false) {
  const tl = new TimelineMax()
  const legParts = ['coxa', 'femur', 'patella', 'tibia', 'metatarsus', 'tarsus']
  const [coxa, femur, patella, tibia, metatarsus, tarsus] = angles.map((angle, index) => {
    if(angle !== false) {
      return leg.current.querySelector(`.x-${legParts[index]}`)
    } else {
      return false
    }
  })

  let scaleFemur = false;
  let scalePatella = false;
  let scaleTibia = false;
  let scaleMetatarsus = false;

  if(scaleFemurPercent) {
    scaleFemur = Math.abs(femur.dataset.width * scaleFemurPercent / 100)
  }

  if(scalePatellaPercent) {
    scalePatella = Math.abs(patella.dataset.width * scalePatellaPercent / 100)
    scaleTibia = Math.abs(tibia.dataset.width * scalePatellaPercent / 100)
  }

  // moves leg parts on the x axis
  const offset = scalePatellaPercent ? (100 - scalePatellaPercent) * 1/5 : false

  tl.addLabel('move')
  if(coxa) tl.add(animateBodyPart(coxa, speed, angles[0]), 'move')
  if(femur) tl.add(animateBodyPart(femur, speed, angles[1], scaleFemur), 'move')
  if(patella) tl.add(animateBodyPart(patella, speed, angles[2], scalePatella, offset), 'move')
  if(tibia) tl.add(animateBodyPart(tibia, speed, angles[3], scaleTibia), 'move')
  if(metatarsus) tl.add(animateBodyPart(metatarsus, speed, angles[4], scaleMetatarsus, -offset), 'move')
  if(tarsus) tl.add(animateBodyPart(tarsus, speed, angles[5]), 'move')

  return tl
}

function rotateBody(bodyParts, speed, angle, abdomenAngle = false, showFangs = false) {
  const tl = new TimelineMax()
  const [body, abdomen, legA1, legA2, legA3, legA4, legB1, legB2, legB3, legB4, pedipalpA, pedipalpB, cheliceraeA, cheliceraeB] = bodyParts
  
  tl.addLabel('move')

  tl.add(animateBodyPart(body.current, speed, angle), 'move')
  if(abdomenAngle) tl.add(animateBodyPart(abdomen.current, speed, 10 + abdomenAngle), 'move')
  tl.add(animateBodyPart(legA1.current, speed, 20 - 1.2 * angle), 'move')
  tl.add(animateBodyPart(legB1.current, speed, 21.5 - 1.42 * angle), 'move')
  tl.add(animateBodyPart(legA2.current, speed, 0), 'move') // buggy
  tl.add(animateBodyPart(legB2.current, speed, 5 - 1.15 * angle), 'move')
  tl.add(animateBodyPart(legA3.current, speed, { rotationZ: 180 - 20 - 1.3 * angle }), 'move')
  tl.add(animateBodyPart(legB3.current, speed, { rotationZ: 180 - 15 - 0.85 * angle }), 'move')
  tl.add(animateBodyPart(legA4.current, speed, { rotationZ: 180 - 2 - 1.12 * angle }), 'move')
  tl.add(animateBodyPart(legB4.current, speed, { rotationZ: -1.35 * angle }), 'move')
  tl.add(animateBodyPart(pedipalpA.current, speed, -12 - 1.52 * angle), 'move')
  tl.add(animateBodyPart(pedipalpB.current, speed, -10 - 1.95 * angle), 'move')

  if(showFangs) {
    tl.add(animateBodyPart(cheliceraeA.current, speed, 0), 'move')
    tl.add(animateBodyPart(cheliceraeA.current.querySelector('.x-fang'), speed, 47), 'move')
    tl.add(animateBodyPart(cheliceraeB.current, speed, -10), 'move')
    tl.add(animateBodyPart(cheliceraeB.current.querySelector('.x-fang'), speed, 60), 'move')
  }

  return tl
}

const animateLegA1 = {
  step: (el, time) => animateLeg(el, time, [0, -80, 75, 15, 40, -10]),
  move: (el, time) => animateLeg(el, time, [40, -145, 102, 15, 86, -40]),
  raise: (el, time) => animateLeg(el, time, [26, -142, tools.randomChoice([72, 87, 62]), 15, tools.randomChoice([56, 66, 36]), -10]),
  stretch: (el, time) => animateLeg(el, time, [13, -82, 32, 15, 22, -25]),
  halfAttackStance: (el, time) => animateLeg(el, time, [-20, -127, tools.randomChoice([97, 92]), 15, tools.randomChoice([10, 15, 26]), -15]),
  attackStance: (el, time) => animateLeg(el, time, [-50, -122, tools.randomChoice([62, 67]), 15, tools.randomChoice([30, 35, 46]), -25]),
  wiggleStance: (el, time) => animateLeg(el, time, [-50, -122, tools.randomChoice([62, 67, 75, 83, 95]), 15, tools.randomChoice([30, 35, 46, 50, 55]), tools.randomChoice([5, -5, -15, -25])], 95)
}

const animateLegB1 = {
  step: (el, time) => animateLeg(el, time, [-10, -69, 70, 15, 40, -10]),
  move: (el, time) => animateLeg(el, time, [30, -141, 102, 15, 80, -30]),
  raise: (el, time) => animateLeg(el, time, [16, -130, tools.randomChoice([72, 87, 62]), 15, tools.randomChoice([50, 60, 30]), -5]),
  stretch: (el, time) => animateLeg(el, time, [3, -70, 32, 15, 20, -25]),
  halfAttackStance: (el, time) => animateLeg(el, time, [-20, -123, tools.randomChoice([97, 92]), 15, tools.randomChoice([20, 25, 30]), -20]),
  attackStance: (el, time) => animateLeg(el, time, [-50, -143, tools.randomChoice([87, 82]), 15, tools.randomChoice([50, 55, 60]), -20]),
  wiggleStance: (el, time) => animateLeg(el, time, [-50, -143, tools.randomChoice([60, 75, 87, 82]), 15, tools.randomChoice([40, 50, 55, 60]), tools.randomChoice([5, -10, -15, -20])], 95)
}

const animateLegA2 = {
  step: (el, time) => animateLeg(el, time, [-3, -75, 92, 15, 66, -25], 100),
  move: (el, time) => animateLeg(el, time, [30, -123, 130, 15, 58, -35], 59),
  raise: (el, time) => animateLeg(el, time, [20, -127, tools.randomChoice([60, 55, 80]), 15, tools.randomChoice([88, 92, 52]), 5], 80),
  stretch: (el, time) => animateLeg(el, time, [10, -87, 60, 15, tools.randomChoice([45, 30]), -30], 100),
  halfAttackStance: (el, time) => animateLeg(el, time, [27, -75, 96, 15, 43, -25], 100, 160),
  attackStance: (el, time) => animateLeg(el, time, [30, -92, 162, 15, 10, -5], 100, 110)
}

const animateLegB2 = {
  step: (el, time) => animateLeg(el, time, [-13, -67, 86, 15, 66, -25], 100),
  move: (el, time) => animateLeg(el, time, [20, -120, 120, 15, 68, -35], 55),
  raise: (el, time) => animateLeg(el, time, [10, -110, tools.randomChoice([57, 52, 77]), 15, tools.randomChoice([98, 103, 63]), 5], 80),
  stretch: (el, time) => animateLeg(el, time, [0, -79, 57, 15, tools.randomChoice([47, 32]), -30], 100),
  halfAttackStance: (el, time) => animateLeg(el, time, [17, -95, 91, 15, 55, -30], 100, 160),
  attackStance: (el, time) => animateLeg(el, time, [25, -155, 148, 15, 7, -5], 100, 110)
}

const animateLegA3 = {
  step: (el, time) => animateLeg(el, time, [20, -140, 160, 20, 15, 0], 47),
  move: (el, time) => animateLeg(el, time, [15, -108, 94, 15, 88, -30], 100),
  raise: (el, time) => animateLeg(el, time, [18, -128, 74, 15, 98, -10], 58),
  stretch: (el, time) => animateLeg(el, time, [19, -138, 65, 15, 135, -10], 48),
  halfAttackStance: (el, time) => animateLeg(el, time, [70, -153, 153, 15, 0, 0], 62),
  attackStance: (el, time) => animateLeg(el, time, [-10, -63, 155, 10, 12, -10], 75, 185)
}

const animateLegB3 = {
  step: (el, time) => animateLeg(el, time, [10, -135, 165, 20, 15, 10], 35, 185),
  move: (el, time) => animateLeg(el, time, [5, -105, 95, 15, 88, -30], 100),
  raise: (el, time) => animateLeg(el, time, [8, -120, 85, 15, 98, -10], 70),
  stretch: (el, time) => animateLeg(el, time, [8, -120, 80, 15, 118, -10], 20),
  halfAttackStance: (el, time) => animateLeg(el, time, [50, -153, 133, 15, 42, -30], 71),
  attackStance: (el, time) => animateLeg(el, time, [-20, -73, 133, 15, 12, -30], 65, 130)
}

const animateLegA4 = {
  step: (el, time) => animateLeg(el, time, [30, -116, 100, 15, 87, -33]),
  move: (el, time) => animateLeg(el, time, [10, -65, 62, 15, 50, -20]),
  raise: (el, time) => animateLeg(el, time, [20, -95, 67, 15, 70, -10]),
  stretch: (el, time) => animateLeg(el, time, [30, -125, 82, 15, 100, -10]),
  halfAttackStance: (el, time) => animateLeg(el, time, [10, -48, 51, 15, 50, -20]),
  attackStance: (el, time) => animateLeg(el, time, [30, -49, 41, 15, 27, -33])
}

const animateLegB4 = {
  step: (el, time) => animateLeg(el, time, [20, -110, 105, 15, 87, -33]),
  move: (el, time) => animateLeg(el, time, [0, -55, 62, 15, 55, -22]),
  raise: (el, time) => animateLeg(el, time, [10, -89, 67, 15, 75, -12]),
  stretch: (el, time) => animateLeg(el, time, [20, -119, 82, 15, 105, -12]),
  halfAttackStance: (el, time) => animateLeg(el, time, [0, -40, 62, 15, 65, -22]),
  attackStance: (el, time) => animateLeg(el, time, [20, -42, 70, 15, 27, -33])
}

const animatePedipalpA = {
  step: (el, time) => animateLeg(el, time, [false, -3, 52, 35, -15, false]),
  move: (el, time) => animateLeg(el, time, [false, -23, 122, 20, -30, false]),
  raise: (el, time) => animateLeg(el, time, [false, -40, 82, 30, 20, false]),
  stretch: (el, time) => animateLeg(el, time, [false, -25, 52, 20, -25, false]),
  halfAttackStance: (el, time) => animateLeg(el, time, [false, -115, 107, 20, 60, false]),
  resting: (el, time) => animateLeg(el, time, [false, -90, 132, 30, 25, false]),
  attackStance: (el, time) => animateLeg(el, time, [false, -155, 72, 20, -10, false]),
  wiggleStance: (el, time) => animateLeg(el, time, [false, tools.randomChoice([-155, -157, -145]), tools.randomChoice([72, 82, 62]), tools.randomChoice([20, 25, 30]), tools.randomChoice([20, 10, 0, -10]), false])
}

const animatePedipalpB = {
  step: (el, time) => animateLeg(el, time, [false, -4, 53, 35, -15, false]),
  move: (el, time) => animateLeg(el, time, [false, -22, 122, 20, -30, false]),
  raise: (el, time) => animateLeg(el, time, [false, -40, 82, 30, 20, false]),
  stretch: (el, time) => animateLeg(el, time, [false, -25, 52, 20, -25, false]),
  halfAttackStance: (el, time) => animateLeg(el, time, [false, -110, 102, 20, 40, false]),
  resting: (el, time) => animateLeg(el, time, [false, -90, 132, 30, 20, false]),
  attackStance: (el, time) => animateLeg(el, time, [false, -180, 57, 20, -10, false]),
  wiggleStance: (el, time) => animateLeg(el, time, [false, tools.randomChoice([-180, -182, -170]), tools.randomChoice([57, 47, 62]), tools.randomChoice([20, 25, 30]), tools.randomChoice([15, 5, -5, -10]), false])
}

function legCycle(leg, options = false) {
  if(options) {
    var {
      moveFirst = false,
      raiseLate = false,
      repeat = 7,
      steps = 4
    } = options;
  } else {
    var moveFirst = false,
      raiseLate = false,
      repeat = 7,
      steps = 4;
  }

  const legId = leg.current.id
  const animateObjects = {
    'legA1': animateLegA1,
    'legA2': animateLegA2,
    'legA3': animateLegA3,
    'legA4': animateLegA4,
    'legB1': animateLegB1,
    'legB2': animateLegB2,
    'legB3': animateLegB3,
    'legB4': animateLegB4,
    'pedipalpA': animatePedipalpA,
    'pedipalpB': animatePedipalpB
  }

  if (moveFirst && raiseLate) {
    const tl = new TimelineMax({ repeat: repeat }).addLabel('cycle');

    if(steps >= 1) tl.add(animateObjects[legId].move(leg, 0.5), 'cycle')
    if(steps >= 2) tl.add(animateObjects[legId].raise(leg, 0.25), 'cycle+=0.5')
    if(steps >= 3) tl.add(animateObjects[legId].stretch(leg, 0.5), 'cycle+=0.75')
    if(steps >= 4) tl.add(animateObjects[legId].step(leg, 0.25), 'cycle+=1.25')

    return tl
  } else if (moveFirst) {
    const tl = new TimelineMax({ repeat: repeat }).addLabel('cycle');

    if(steps >= 1) tl.add(animateObjects[legId].move(leg, 0.75), 'cycle')
    if(steps >= 2) tl.add(animateObjects[legId].raise(leg, 0.25), 'cycle+=0.75')
    if(steps >= 3) tl.add(animateObjects[legId].stretch(leg, 0.25), 'cycle+=1')
    if(steps >= 4) tl.add(animateObjects[legId].step(leg, 0.25), 'cycle+=1.25')

    return tl
  } else if (raiseLate) {
    const tl = new TimelineMax({ repeat: repeat }).addLabel('cycle');

    if(steps >= 1) tl.add(animateObjects[legId].raise(leg, 0.5), 'cycle')
    if(steps >= 2) tl.add(animateObjects[legId].stretch(leg, 0.25), 'cycle+=0.5')
    if(steps >= 3) tl.add(animateObjects[legId].step(leg, 0.25), 'cycle+=0.75')
    if(steps >= 4) tl.add(animateObjects[legId].move(leg, 0.5), 'cycle+=1')

      return tl
  } else {
    const tl = new TimelineMax({ repeat: repeat }).addLabel('cycle');

    if(steps >= 1) tl.add(animateObjects[legId].raise(leg, 0.25), 'cycle')
    if(steps >= 2) tl.add(animateObjects[legId].stretch(leg, 0.25), 'cycle+=0.25')
    if(steps >= 3) tl.add(animateObjects[legId].step(leg, 0.25), 'cycle+=0.5')
    if(steps >= 4) tl.add(animateObjects[legId].move(leg, 0.75), 'cycle+=0.75')

    return tl
  }
}

function Tarantula({isMobile}) {
  const tarantulaWrapper = useRef(null)
  const tarantula = useRef(null)
  const body = useRef(null)
  const legA1 = useRef(null)
  const legA2 = useRef(null)
  const legA3 = useRef(null)
  const legA4 = useRef(null)
  const legB1 = useRef(null)
  const legB2 = useRef(null)
  const legB3 = useRef(null)
  const legB4 = useRef(null)
  const pedipalpA = useRef(null)
  const pedipalpB = useRef(null)
  const cheliceraeA = useRef(null)
  const cheliceraeB = useRef(null)
  const spinneretA = useRef(null)
  const spinneretB = useRef(null)
  const abdomen = useRef(null)
  const info = useRef(null)
  const wait = useRef(null)
  const bodyParts = [body, abdomen, legA1, legA2, legA3, legA4, legB1, legB2, legB3, legB4, pedipalpA, pedipalpB, cheliceraeA, cheliceraeB];
  const walkMidStanceTl = new TimelineMax({ paused: true })
  const attackStanceTl = new TimelineMax({ paused: true })
  const moveLegsTl = new TimelineMax({ paused: true })
  const completeTl = new TimelineMax({ paused: true })
  const singlePulseTl = new TimelineMax({ paused: true })
  const pulseTl = new TimelineMax({ paused: true, repeat: -1, repeatDelay: 8 })

  useEffect(() => {
    addWidthMetadata(tarantula)

    // animation
    singlePulseTl
      .addLabel('pulse')
      .to(body.current, 2.25, { 
        onStart: (self) => {
          self.target.classList.add('glow')
        }, 
        onStartParams: ['{self}'], 
        onComplete: (self) => {
          self.target.classList.remove('glow')
        }, 
        onCompleteParams: ['{self}']
      }, 'pulse')
    ;

    pulseTl
      .addLabel('keep-on-pulsing')
      .to(singlePulseTl, 2.25, { progress: 1, ease: Linear.easeNone, onStart: () => {
        TweenMax.set(singlePulseTl, { progress: 0 })
      }}, 'keep-on-pulsing')
    ;

    walkMidStanceTl.addLabel('setup')

    if(isMobile) {
      walkMidStanceTl.set(tarantulaWrapper.current, { rotation: 90 }, 'setup')
    }

    walkMidStanceTl
      .set(body.current, { xPercent: 0, yPercent: 0, rotation: 0 }, 'setup')
      .set(spinneretA.current, { rotation: -85 }, 'setup')
      .set(spinneretB.current, { rotation: -95 }, 'setup')
      .set(info.current, { autoAlpha: 0 }, 'setup')
      .add(animateLegA1.step(legA1, 0), 'setup')
      .add(animateLegA2.move(legA2, 0.01), 'setup')
      .add(animateLegA3.step(legA3, 0.01), 'setup')
      .add(animateLegA4.move(legA4, 0), 'setup')
      .add(animatePedipalpA.step(pedipalpA, 0), 'setup')
      .add(animateLegB1.move(legB1, 0), 'setup')
      .add(animateLegB2.step(legB2, 0.01), 'setup')
      .add(animateLegB3.move(legB3, 0.01), 'setup')
      .add(animateLegB4.step(legB4, 0), 'setup')
      .add(animatePedipalpB.move(pedipalpB, 0), 'setup')
      .set(tarantula.current, { xPercent: (-16 * 26) }, 'setup')
      .set(wait.current, { autoAlpha: 0 }, 'setup')
      
      .addLabel('motion-1', 'setup+=0.01')
      .to(wait.current, 1.5, { yoyo: true, yoyoEase: true, repeat: 3, ease: Power1.easeIn, autoAlpha: 0.5 }, 'motion-1')
      .to(tarantulaWrapper.current, 0.5, { autoAlpha: 1, ease: Power2.easeIn }, 'motion-1')

      // walk cycle
      .to(tarantula.current, 0.725, { xPercent: (-15 * 26), ease: Linear.easeNone }, 'motion-1')
      .to(tarantula.current, 0.725, { xPercent: (-14 * 26), ease: Linear.easeNone }, 'motion-1+=0.75')
      .to(tarantula.current, 0.725, { xPercent: (-13 * 26), ease: Linear.easeNone }, 'motion-1+=1.5')
      .to(tarantula.current, 0.725, { xPercent: (-12 * 26), ease: Linear.easeNone }, 'motion-1+=2.25')
      .to(tarantula.current, 0.725, { xPercent: (-11 * 26), ease: Linear.easeNone }, 'motion-1+=3')
      .to(tarantula.current, 0.725, { xPercent: (-10 * 26), ease: Linear.easeNone }, 'motion-1+=3.75')
      .to(tarantula.current, 0.725, { xPercent: (-9 * 26), ease: Linear.easeNone }, 'motion-1+=4.5')
      .to(tarantula.current, 0.725, { xPercent: (-8 * 26), ease: Linear.easeNone }, 'motion-1+=5.25')
      .to(tarantula.current, 0.725, { xPercent: (-7 * 26), ease: Linear.easeNone }, 'motion-1+=6')
      .to(tarantula.current, 0.725, { xPercent: (-6 * 26), ease: Linear.easeNone }, 'motion-1+=6.75')
      .to(tarantula.current, 0.725, { xPercent: (-5 * 26), ease: Linear.easeNone }, 'motion-1+=7.5')
      .to(tarantula.current, 0.725, { xPercent: (-4 * 26), ease: Linear.easeNone }, 'motion-1+=8.25')
      .to(tarantula.current, 0.725, { xPercent: (-3 * 26), ease: Linear.easeNone }, 'motion-1+=9')
      .to(tarantula.current, 0.725, { xPercent: (-2 * 26), ease: Linear.easeNone }, 'motion-1+=9.75')
      .to(tarantula.current, 0.725, { xPercent: (-1 * 26), ease: Linear.easeNone }, 'motion-1+=10.5')
      .to(tarantula.current, 0.725, { xPercent: (0 * 26), ease: Linear.easeNone }, 'motion-1+=11.25')

      .add(legCycle(legA2), 'motion-1')
      .add(legCycle(legB3), 'motion-1')
      .add(legCycle(pedipalpB, { repeat: 6 }), 'motion-1')
      .add(legCycle(legA4, { raiseLate: true }), 'motion-1')
      .add(legCycle(legB1, { raiseLate: true }), 'motion-1')
      .add(legCycle(legA3, { moveFirst: true }), 'motion-1')
      .add(legCycle(legB2, { moveFirst: true }), 'motion-1')
      .add(legCycle(pedipalpA, { moveFirst: true, repeat: 6 }), 'motion-1')
      .add(legCycle(legA1, { raiseLate: true, moveFirst: true }), 'motion-1')
      .add(legCycle(legB4, { raiseLate: true, moveFirst: true, repeat: 6 }), 'motion-1')
      
      .addLabel('motion-2')
      .add(animatePedipalpA.resting(pedipalpA, 1), 'motion-2-=1.5')
      .add(animatePedipalpB.resting(pedipalpB, 0.875), 'motion-2-=1.5')
      .add(legCycle(legB4, { raiseLate: true, moveFirst: true, repeat: 0, steps: 3 }), 'motion-2-=1.5')
      .add(animateLegB4.raise(legB4, 0.25), 'motion-2-=0.125')
      .add(animateLegB4.move(legB4, 0.25), 'motion-2+=0.125')
      .add(animateLegB3.raise(legB3, 0.25), 'motion-2+=0.125')
      .add(legCycle(legB2, { repeat: 0, steps: 3 }), 'motion-2')
      .add(legCycle(legA2, { repeat: 0, steps: 2 }), 'motion-2+=0.375')
      .add(legCycle(legB1, { moveFirst: true, repeat: 0, steps: 2 }), 'motion-2+=0.25')
      .add(legCycle(legA1, { moveFirst: true, repeat: 0, steps: 2 }), 'motion-2')

      .add(rotateBody(bodyParts, 0.25, -20, 10, false), 'motion-2+=0.375')
      .to(body.current, 0.25, { xPercent: -20, yPercent: -35, ease: Power1.easeOut }, 'motion-2+=0.375')
      .to([spinneretA.current, spinneretB.current], 0.25, { rotation: -100, ease: Linear.easeNone }, 'motion-2+=0.375')
      .add(animateLegA1.halfAttackStance(legA1, 0.25), 'motion-2+=0.75')
      .add(animateLegA2.halfAttackStance(legA2, 0.25), 'motion-2+=0.875')
      .add(animateLegA3.halfAttackStance(legA3, 0.25), 'motion-2+=0.375')
      .add(animateLegA4.halfAttackStance(legA4, 0.25), 'motion-2+=0.375')
      .add(animatePedipalpA.halfAttackStance(pedipalpA, 0.25), 'motion-2+=0.375')

      .add(animateLegB1.halfAttackStance(legB1, 0.25), 'motion-2+=1')
      .add(animateLegB2.halfAttackStance(legB2, 0.25), 'motion-2+=0.75')
      .add(animateLegB3.halfAttackStance(legB3, 0.25), 'motion-2+=0.375')
      .add(animateLegB4.halfAttackStance(legB4, 0.25), 'motion-2+=0.375')
      .add(animatePedipalpB.halfAttackStance(pedipalpB, 0.25), 'motion-2+=0.375')
    ;

    attackStanceTl.addLabel('motion-3')
      .add(rotateBody(bodyParts, 0.375, -60, 30, true), 'motion-3')
      .to(body.current, 0.375, { xPercent: -10, yPercent: 10, ease: Power3.easeIn }, 'motion-3')
      .to([spinneretA.current, spinneretB.current], 0.25, { rotation: -100, ease: Linear.easeNone }, 'motion-3')
      .add(animateLeg(legA1, 0.25, [-50, -122, tools.randomChoice([42, 47]), 15, tools.randomChoice([10, 15, 26]), -15]), 'motion-3+=0.125')
      .add(animateLegA2.attackStance(legA2, 0.375), 'motion-3')
      .add(animateLegA3.attackStance(legA3, 0.25), 'motion-3')
      .add(animateLegA4.attackStance(legA4, 0.25), 'motion-3')
      .add(animatePedipalpA.attackStance(pedipalpA, 0.25), 'motion-3+=0.25')

      .add(animateLeg(legB1, 0.25, [-50, -143, tools.randomChoice([67, 62]), 15, tools.randomChoice([10, 15, 20]), -10]), 'motion-3+=0.25')
      .add(animateLegB2.attackStance(legB2, 0.375), 'motion-3')
      .add(animateLegB3.attackStance(legB3, 0.25), 'motion-3')
      .add(animateLegB4.attackStance(legB4, 0.25), 'motion-3')
      .add(animatePedipalpB.attackStance(pedipalpB, 0.25), 'motion-3+=0.125')
 
      .addLabel('motion-4')
      .add(animateLegA1.attackStance(legA1, 0.25), 'motion-4-=0.125')
      .add(animateLegB1.attackStance(legB1, 0.25), 'motion-4')
      .add(animateLegA2.halfAttackStance(legA2, 0.25), 'motion-4')      
      .add(animateLegA2.move(legA2, 0.25), 'motion-4+=0.25')
      .add(animateLegA2.attackStance(legA2, 0.25), 'motion-4+=0.5')
      .add(animateLeg(legA3, 0.125, [-5, -73, 130, 15, 37, -10], 85, 250), 'motion-4+=0.875')
      .add(animateLegA3.attackStance(legA3, 0.125), 'motion-4+=1')
    ;

    moveLegsTl.addLabel('move-legs')
      .add(() => {
        return animateLegA1.wiggleStance(legA1, 1)
      }, `move-legs+=${0.125 * tools.randomChoice([1, 2, 3, 4])}`)
      .add(() => {
        return animateLegB1.wiggleStance(legB1, 1)
      }, `move-legs+=${0.125 * tools.randomChoice([1, 2, 3, 4])}`)
      .add(() => {
        return animatePedipalpA.wiggleStance(pedipalpA, 0.5)
      }, `move-legs+=${0.125 * tools.randomChoice([1, 2, 3, 4, 5, 6])}`)
      .add(() => {
        return animatePedipalpB.wiggleStance(pedipalpB, 0.5)
      }, `move-legs+=${0.125 * tools.randomChoice([1, 2, 3, 4, 5, 6])}`)
    ;

    completeTl.addLabel('enter')
      .to(walkMidStanceTl, 11, { progress: 1, ease: Power1.easeOut }, 'enter')
      .to(attackStanceTl, 2.25, { progress: 1, ease: Power2.easeInOut }, 'enter+=11')
      .to(singlePulseTl, 2.5, { progress: 1, ease: Linear.easeNone, onComplete: () => {
        TweenMax.set(singlePulseTl, { progress: 0 })
      }}, 'enter+=11.5')
      .to(info.current, 1, { autoAlpha: 1, ease: Power2.easeInOut }, 'enter+=13.75')
      .to(moveLegsTl, 0.25, { progress: 1, repeat: -1, repeatDelay: 10, ease: Power2.easeInOut }, 'enter+=15.25')
      .add(pulseTl.play(0), 'enter+=15.25')
    ;

    completeTl.play(0)

    return () => completeTl.stop()
  }, [])
  
  return (
    <div ref={tarantulaWrapper} className={`tarantula-wrapper${isMobile ? ' tarantula-wrapper--mobile' : ''}`}>
      <p ref={info} className="tarantula__info handwritten">
        <span className="tarantula__info__description">made with HTML5,<br />CSS and GSAP</span>
        <svg className="tarantula__info__arrow" viewBox="0 0 52 34" fill="none">
          <path d="M46.4576 1.32037C43.3078 10.8531 30.4555 28.15 4.24456 21.0754M4.24456 21.0754L14.3471 14.5008M4.24456 21.0754L11.7735 31.8898" stroke="white" strokeWidth="3" />
        </svg>
      </p>
      <p className="tarantula__wait">
        <span ref={wait}>loading...</span>
      </p>
      <div ref={tarantula} className="tarantula">
        <div ref={body} className="x-body">
          <div className="x-body-part x-cephalothorax">

            <div ref={legB2} id="legB2" className="x-leg x-leg--background leg-6">
              <div className="x-leg-parts x-coxa">
                <div className="x-leg-parts x-femur">
                  <div className="x-leg-parts x-patella">
                    <div className="x-leg-parts x-tibia">
                      <div className="x-leg-parts x-metatarsus">
                        <div className="x-leg-parts x-tarsus"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div ref={legB1} id="legB1" className="x-leg x-leg--background leg-5">
              <div className="x-leg-parts x-coxa">
                <div className="x-leg-parts x-femur">
                  <div className="x-leg-parts x-patella">
                    <div className="x-leg-parts x-tibia">
                      <div className="x-leg-parts x-metatarsus">
                        <div className="x-leg-parts x-tarsus"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div ref={legB3} id="legB3" className="x-leg x-leg--background x-leg--small leg-7">
              <div className="x-leg-parts x-coxa">
                <div className="x-leg-parts x-femur">
                  <div className="x-leg-parts x-patella">
                    <div className="x-leg-parts x-tibia">
                      <div className="x-leg-parts x-metatarsus">
                        <div className="x-leg-parts x-tarsus"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div ref={legB4} id="legB4" className="x-leg x-leg--background x-leg--small leg-8">
              <div className="x-leg-parts x-coxa">
                <div className="x-leg-parts x-femur">
                  <div className="x-leg-parts x-patella">
                    <div className="x-leg-parts x-tibia">
                      <div className="x-leg-parts x-metatarsus">
                        <div className="x-leg-parts x-tarsus"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div ref={pedipalpB} id="pedipalpB" className="x-leg x-leg--background x-pedipalp pedipalp-2">
              <div className="x-leg-parts x-coxa">
                <div className="x-leg-parts x-femur">
                  <div className="x-leg-parts x-patella">
                    <div className="x-leg-parts x-tibia">
                      <div className="x-leg-parts x-metatarsus"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div ref={cheliceraeB} className="x-body-part x-chelicerae x-chelicerae--background">
              <div className="x-fang"></div>
            </div>
            <div ref={cheliceraeA} className="x-body-part x-chelicerae">
              <div className="x-fang"></div>
            </div>
            <div ref={abdomen} className="x-body-part x-abdomen">
              <div ref={spinneretB} className="x-spinnerets x-spinnerets--background">
                <div className="x-spinnerets-parts x-coxa">
                  <div className="x-spinnerets-parts x-femur">
                    <div className="x-spinnerets-parts x-patella">
                      <div className="x-spinnerets-parts x-tibia"></div>
                    </div>
                  </div>
                </div>   
              </div>
              <div ref={spinneretA} className="x-spinnerets x-spinnerets--foreground">    
                <div className="x-spinnerets-parts x-coxa">
                  <div className="x-spinnerets-parts x-femur">
                    <div className="x-spinnerets-parts x-patella">
                      <div className="x-spinnerets-parts x-tibia"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
            <div className="x-chelicera-pattern"></div>
            <div className="x-coxa-pattern x-cp1"></div>
            <div className="x-coxa-pattern x-cp2"></div>
            <div className="x-coxa-pattern x-cp3"></div>
            <div className="x-coxa-pattern x-cp4"></div>
            <div className="x-coxa-pattern x-cp5"></div>

            <div ref={pedipalpA} id="pedipalpA" className="x-leg x-leg--foreground x-pedipalp pedipalp-1">
              <div className="x-leg-parts x-coxa">
                <div className="x-leg-parts x-femur">
                  <div className="x-leg-parts x-patella">
                    <div className="x-leg-parts x-tibia">
                      <div className="x-leg-parts x-metatarsus"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div ref={legA4} id="legA4" className="x-leg x-leg--foreground x-leg--small leg-4">
              <div className="x-leg-parts x-coxa">
                <div className="x-leg-parts x-femur">
                  <div className="x-leg-parts x-patella">
                    <div className="x-leg-parts x-tibia">
                      <div className="x-leg-parts x-metatarsus">
                        <div className="x-leg-parts x-tarsus"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div ref={legA3} id="legA3" className="x-leg x-leg--foreground x-leg--small leg-3">
              <div className="x-leg-parts x-coxa">
                <div className="x-leg-parts x-femur">
                  <div className="x-leg-parts x-patella">
                    <div className="x-leg-parts x-tibia">
                      <div className="x-leg-parts x-metatarsus">
                        <div className="x-leg-parts x-tarsus"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div ref={legA1} id="legA1" className="x-leg x-leg--foreground leg-1">
              <div className="x-leg-parts x-coxa">
                <div className="x-leg-parts x-femur">
                  <div className="x-leg-parts x-patella">
                    <div className="x-leg-parts x-tibia">
                      <div className="x-leg-parts x-metatarsus">
                        <div className="x-leg-parts x-tarsus"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div ref={legA2} id="legA2" className="x-leg x-leg--foreground leg-2">
              <div className="x-leg-parts x-coxa">
                <div className="x-leg-parts x-femur">
                  <div className="x-leg-parts x-patella">
                    <div className="x-leg-parts x-tibia">
                      <div className="x-leg-parts x-metatarsus">
                        <div className="x-leg-parts x-tarsus"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tarantula
