import React, { useState, useEffect, useRef } from 'react'
import tools from './tools'
import { TimelineMax, TweenMax, Power2, Linear } from 'gsap'

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
  let femurWidth, patellaWidth, tibiaWidth
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
  let scaleMetatarsus = false;

  if(scaleFemurPercent) {
    femurWidth = femur.getBoundingClientRect().width
    scaleFemur = Math.abs(femurWidth * scaleFemurPercent / 100)
    scalePatella = Math.abs(femurWidth * 0.95 + 2)
  }

  if(scalePatellaPercent) {
    patellaWidth = scaleFemurPercent ? scalePatella : patella.getBoundingClientRect().width
    tibiaWidth = leg.current.querySelector('.x-tibia').getBoundingClientRect().width
    scalePatella = Math.abs(patellaWidth * scalePatellaPercent / 100)
    scaleMetatarsus = Math.abs(tibiaWidth * 0.95 + 2)
  }

  // moves leg parts on the x axis
  const offset = scalePatellaPercent ? (100 - scalePatellaPercent) * 1/5 : false

  tl.addLabel('move')
  if(coxa) tl.add(animateBodyPart(coxa, speed, angles[0]), 'move')
  if(femur) tl.add(animateBodyPart(femur, speed, angles[1], scaleFemur), 'move')
  if(patella) tl.add(animateBodyPart(patella, speed, angles[2], scalePatella, offset), 'move')
  if(tibia) tl.add(animateBodyPart(tibia, speed, angles[3]), 'move')
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
  step: (el, time) => animateLeg(el, time, [0, -80, 75, false, 40, -10]),
  move: (el, time) => animateLeg(el, time, [40, -145, 102, false, 86, -40]),
  raise: (el, time) => animateLeg(el, time, [26, -142, tools.randomChoice([72, 87, 62]), false, tools.randomChoice([56, 66, 36]), -10]),
  stretch: (el, time) => animateLeg(el, time, [13, -82, 32, false, 22, -25]),
  attackStance: (el, time) => animateLeg(el, time, [-50, -122, tools.randomChoice([62, 67]), false, tools.randomChoice([30, 35, 46]), -25])
}

const animateLegB1 = {
  step: (el, time) => animateLeg(el, time, [-10, -68, 70, false, 40, -10]),
  move: (el, time) => animateLeg(el, time, [30, -140, 102, false, 80, -30]),
  raise: (el, time) => animateLeg(el, time, [16, -130, tools.randomChoice([72, 87, 62]), false, tools.randomChoice([50, 60, 30]), -5]),
  stretch: (el, time) => animateLeg(el, time, [3, -70, 32, false, 20, -25]),
  attackStance: (el, time) => animateLeg(el, time, [-50, -143, tools.randomChoice([87, 82]), false, tools.randomChoice([50, 55, 60]), -20])
}

const animateLegA2 = {
  step: (el, time) => animateLeg(el, time, [-3, -78, 92, false, 66, -25], 100),
  move: (el, time) => animateLeg(el, time, [30, -123, 130, false, 58, -35], 59),
  raise: (el, time) => animateLeg(el, time, [20, -127, tools.randomChoice([60, 55, 80]), false, tools.randomChoice([88, 92, 52]), 5], 80),
  stretch: (el, time) => animateLeg(el, time, [10, -87, 60, false, tools.randomChoice([45, 30]), -30], 100),
  attackStance: (el, time) => animateLeg(el, time, [30, -95, 162, false, 10, -5], 100, 120)
}

const animateLegB2 = {
  step: (el, time) => animateLeg(el, time, [-13, -68, 86, false, 66, -25], 100),
  move: (el, time) => animateLeg(el, time, [20, -120, 120, false, 68, -35], 59),
  raise: (el, time) => animateLeg(el, time, [10, -110, tools.randomChoice([57, 52, 77]), false, tools.randomChoice([98, 103, 63]), 5], 80),
  stretch: (el, time) => animateLeg(el, time, [0, -79, 57, false, tools.randomChoice([47, 32]), -30], 100),
  attackStance: (el, time) => animateLeg(el, time, [25, -155, 147, false, 7, -5], 80, 110)
}

const animateLegA3 = {
  step: (el, time) => animateLeg(el, time, [20, -140, 160, 20, 15, 0], 48),
  move: (el, time) => animateLeg(el, time, [15, -113, 94, 15, 88, -30], 100),
  raise: (el, time) => animateLeg(el, time, [18, -128, 94, 15, 48, -10], 58),
  stretch: (el, time) => animateLeg(el, time, [19, -138, 165, 15, 15, -10], 38),
  attackStance: (el, time) => animateLeg(el, time, [-10, -63, 150, false, 12, -10], 100, 205)
}

const animateLegB3 = {
  step: (el, time) => animateLeg(el, time, [10, -135, 165, 20, 15, 10], 33),
  move: (el, time) => animateLeg(el, time, [5, -104, 95, 15, 88, -30], 100),
  raise: (el, time) => animateLeg(el, time, [8, -120, 95, 15, 48, -10], 45),
  stretch: (el, time) => animateLeg(el, time, [9, -130, 170, 15, 15, 0], 25),
  attackStance: (el, time) => animateLeg(el, time, [-20, -73, 133, false, 12, -30], 57, 140)
}

const animateLegA4 = {
  step: (el, time) => animateLeg(el, time, [30, -115, 100, false, 87, -33]),
  move: (el, time) => animateLeg(el, time, [10, -65, 62, false, 50, -20]),
  raise: (el, time) => animateLeg(el, time, [20, -95, 72, false, 70, -10]),
  stretch: (el, time) => animateLeg(el, time, [30, -125, 82, false, 100, -10]),
  attackStance: (el, time) => animateLeg(el, time, [30, -50, 40, false, 27, -33])
}

const animateLegB4 = {
  step: (el, time) => animateLeg(el, time, [20, -109, 105, false, 87, -33]),
  move: (el, time) => animateLeg(el, time, [0, -56, 62, false, 55, -22]),
  raise: (el, time) => animateLeg(el, time, [10, -89, 72, false, 75, -12]),
  stretch: (el, time) => animateLeg(el, time, [20, -119, 82, false, 105, -12]),
  attackStance: (el, time) => animateLeg(el, time, [20, -45, 72, false, 27, -33])
}

const animatePedipalpA = {
  step: (el, time) => animateLeg(el, time, [1, -5, 53, 35, -15, false]),
  move: (el, time) => animateLeg(el, time, [1, -20, 122, 20, -30, false]),
  raise: (el, time) => animateLeg(el, time, [1, -40, 82, 30, 20, false]),
  stretch: (el, time) => animateLeg(el, time, [1, -25, 52, 20, -25, false]),
  attackStance: (el, time) => animateLeg(el, time, [1, -155, 72, 20, -10, false])
}

const animatePedipalpB = {
  step: (el, time) => animateLeg(el, time, [0, -5, 53, 35, -15, false]),
  move: (el, time) => animateLeg(el, time, [0, -20, 122, 20, -30, false]),
  raise: (el, time) => animateLeg(el, time, [0, -40, 82, 30, 20, false]),
  stretch: (el, time) => animateLeg(el, time, [0, -25, 52, 20, -25, false]),
  attackStance: (el, time) => animateLeg(el, time, [0, -180, 57, 20, -10, false])
}

function legCycle(leg, options = false) {
  if(options) {
    var {
      moveFirst = false,
      raiseLate = false,
      repeat = 3,
      steps = 4
    } = options;
  } else {
    var moveFirst = false,
      raiseLate = false,
      repeat = 3,
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

function Tarantula({hideFrontLegs = false, hideBackLegs = false}) {
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
  const bodyParts = [body, abdomen, legA1, legA2, legA3, legA4, legB1, legB2, legB3, legB4, pedipalpA, pedipalpB, cheliceraeA, cheliceraeB];
  const timeline = new TimelineMax()
  const walk = new TimelineMax()

  useEffect(() => {
    // walk
    //   .addLabel('setup')
    //   .set(tarantula.current, { xPercent: (-8 * 26) }, 'setup')
    //   .addLabel('motion-1', 'setup+=0.01')
    //   .to(tarantula.current, 0.725, { xPercent: (-7 * 26), ease: Linear.easeNone }, 'motion-1')
    //   .to(tarantula.current, 0.725, { xPercent: (-6 * 26), ease: Linear.easeNone }, 'motion-1+=0.75')
    //   .to(tarantula.current, 0.725, { xPercent: (-5 * 26), ease: Linear.easeNone }, 'motion-1+=1.5')
    //   .to(tarantula.current, 0.725, { xPercent: (-4 * 26), ease: Linear.easeNone }, 'motion-1+=2.25')
    //   .to(tarantula.current, 0.725, { xPercent: (-3 * 26), ease: Linear.easeNone }, 'motion-1+=3')
    //   .to(tarantula.current, 0.725, { xPercent: (-2 * 26), ease: Linear.easeNone }, 'motion-1+=3.75')
    //   .to(tarantula.current, 0.725, { xPercent: (-1 * 26), ease: Linear.easeNone }, 'motion-1+=4.5')
    //   .to(tarantula.current, 0.725, { xPercent: (0 * 26), ease: Linear.easeNone }, 'motion-1+=5.25')
    // ;

    // Main Timeline

    timeline.addLabel('setup')
      .set(spinneretA.current, { rotation: -85 }, 'setup')
      .set(spinneretB.current, { rotation: -95 }, 'setup')
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

      // .addLabel('motion-1', 'setup+=0.01')
      // .add(legCycle(legA2), 'motion-1')
      // .add(legCycle(legB3), 'motion-1')
      // .add(legCycle(pedipalpB), 'motion-1')
      // .add(legCycle(legA4, { raiseLate: true }), 'motion-1')
      // .add(legCycle(legB1, { raiseLate: true }), 'motion-1')
      // .add(legCycle(legA3, { moveFirst: true }), 'motion-1')
      // .add(legCycle(legB2, { moveFirst: true }), 'motion-1')
      // .add(legCycle(pedipalpA, { moveFirst: true }), 'motion-1')
      // .add(legCycle(legA1, { raiseLate: true, moveFirst: true }), 'motion-1')
      // .add(legCycle(legB4, { raiseLate: true, moveFirst: true }), 'motion-1')
      
      .addLabel('motion-2', '+=0.5')
      .add(rotateBody(bodyParts, 0.5, -10, 15), 'motion-2-=0.5')
      .add(legCycle(legB2, { repeat: 0, steps: 3 }), 'motion-2')
      .add(legCycle(legA2, { repeat: 0, steps: 3 }), 'motion-2+=0.25')
      .add(legCycle(legB1, { repeat: 0, steps: 3 }), 'motion-2+=0.25')
      .add(legCycle(legA1, { moveFirst: true, repeat: 0, steps: 3 }), 'motion-2')

      .add(rotateBody(bodyParts, 0.5, -60, 30, true), 'motion-2+=0.25')
      .to(body.current, 0.5, { yPercent: -8.5, ease: Linear.easeNone }, 'motion-2+=0.25')
      .to([spinneretA.current, spinneretB.current], 0.5, { rotation: -100, ease: Linear.easeNone }, 'motion-2+=0.25')
      .add(animateLegA1.attackStance(legA1, 0.5), 'motion-2+=1')
      .add(animateLegA2.attackStance(legA2, 0.5), 'motion-2+=1')
      .add(animateLegA3.attackStance(legA3, 0.5), 'motion-2+=0.25')
      .add(animateLegA4.attackStance(legA4, 0.5), 'motion-2+=0.25')
      .add(animatePedipalpA.attackStance(pedipalpA, 0.5), 'motion-2+=0.25')

      .add(animateLegB1.attackStance(legB1, 0.5), 'motion-2+=1')
      .add(animateLegB2.attackStance(legB2, 0.5), 'motion-2+=1')
      .add(animateLegB3.attackStance(legB3, 0.5), 'motion-2+=0.25')
      .add(animateLegB4.attackStance(legB4, 0.5), 'motion-2+=0.25')
      .add(animatePedipalpB.attackStance(pedipalpB, 0.5), 'motion-2+=0.25')
    ;

    // TODO: I prefer to raise all members and position them on "attackStance"
    // Then lift the body and front legs.

  }, [])

  return (
    <div ref={tarantula} className="tarantula">
      <div ref={body} className="x-body">
        <div className="x-body-part x-cephalothorax">

          { !hideBackLegs && (
            <React.Fragment>
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
            </React.Fragment>
          )}

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
            <div ref={spinneretA} className="x-spinnerets">    
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
          <div className="x-eye x-eye1"></div>
          <div className="x-eye x-eye2"></div>
          <div className="x-eye x-eye3"></div>
          <div className="x-eye x-eye4"></div>

          {!hideFrontLegs && (
            <React.Fragment>
              <div ref={pedipalpA} id="pedipalpA" className="x-leg x-pedipalp pedipalp-1">
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
              <div ref={legA4} id="legA4" className="x-leg x-leg--small leg-4">
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
              <div ref={legA3} id="legA3" className="x-leg x-leg--small leg-3">
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
              <div ref={legA1} id="legA1" className="x-leg leg-1">
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
              <div ref={legA2} id="legA2" className="x-leg leg-2">
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
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

export default Tarantula
