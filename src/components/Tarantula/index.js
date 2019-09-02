import React, { useState, useEffect, useRef } from 'react'
import tools from './tools'
import { TimelineMax, TweenMax, Power2, Linear } from 'gsap'

function animateBodyPart(node, speed, angle, newWidth = false, offset = false) {
  const animation = { rotation: angle, ease: Linear.easeNone }
  if(newWidth) {
    animation.width = newWidth
    animation.xPercent = offset
  }

  return speed > 0 ? TweenMax.to(node, speed, animation) : TweenMax.set(node, animation)
}

function animateLeg(leg, speed, angles = [false, false, false, false, false, false], scalePatellaPercent = false) {
  const tl = new TimelineMax()
  let patellaWidth, tibiaWidth
  const legParts = ['coxa', 'femur', 'patella', 'tibia', 'metatarsus', 'tarsus']
  const [coxa, femur, patella, tibia, metatarsus, tarsus] = angles.map((angle, index) => {
    if(angle !== false) {
      return leg.current.querySelector(`.x-${legParts[index]}`)
    } else {
      return false
    }
  })

  if(scalePatellaPercent) {
    patellaWidth = patella.getBoundingClientRect().width
    tibiaWidth = leg.current.querySelector('.x-tibia').getBoundingClientRect().width
  }
  const scalePatella = scalePatellaPercent ? Math.abs(patellaWidth * scalePatellaPercent / 100) : false
  const scaleMetatarsus = scalePatellaPercent ? Math.abs(tibiaWidth * 0.95 + 2) : false

  // moves leg parts on the x axis
  const offset = scalePatellaPercent ? (100 - scalePatellaPercent) * 1/5 : false

  tl.addLabel('move')
  if(coxa) tl.add(animateBodyPart(coxa, speed, angles[0]), 'move')
  if(femur) tl.add(animateBodyPart(femur, speed, angles[1]), 'move')
  if(patella) tl.add(animateBodyPart(patella, speed, angles[2], scalePatella, offset), 'move')
  if(tibia) tl.add(animateBodyPart(tibia, speed, angles[3]), 'move')
  if(metatarsus) tl.add(animateBodyPart(metatarsus, speed, angles[4], scaleMetatarsus, -offset), 'move')
  if(tarsus) tl.add(animateBodyPart(tarsus, speed, angles[5]), 'move')

  return tl
}

const animateLegA1 = {
  step: (el, time) => animateLeg(el, time, [0, -80, 75, false, 40, -10]),
  move: (el, time) => animateLeg(el, time, [40, -145, 102, false, 86, -40]),
  raise: (el, time) => animateLeg(el, time, [26, -142, 72, false, 96, -10]),
  stretch: (el, time) => animateLeg(el, time, [13, -82, 42, false, 22, -25])
}

const animateLegB1 = {
  step: (el, time) => animateLeg(el, time, [-10, -68, 70, false, 40, -10]),
  move: (el, time) => animateLeg(el, time, [30, -140, 102, false, 80, -30]),
  raise: (el, time) => animateLeg(el, time, [16, -130, 72, false, 90, -5]),
  stretch: (el, time) => animateLeg(el, time, [3, -70, 42, false, 20, -25])
}

const animateLegA2 = {
  step: (el, time) => animateLeg(el, time, [-3, -78, 92, false, 66, -25], 100),
  move: (el, time) => animateLeg(el, time, [30, -123, 130, false, 58, -35], 59),
  raise: (el, time) => animateLeg(el, time, [20, -127, 70, false, 88, 5], 80),
  stretch: (el, time) => animateLeg(el, time, [10, -87, 60, false, 45, -30], 100)  
}

const animateLegB2 = {
  step: (el, time) => animateLeg(el, time, [-13, -68, 86, false, 66, -25], 100),
  move: (el, time) => animateLeg(el, time, [20, -120, 120, false, 68, -35], 59),
  raise: (el, time) => animateLeg(el, time, [10, -110, 67, false, 98, 5], 80),
  stretch: (el, time) => animateLeg(el, time, [0, -79, 57, false, 47, -30], 100)
}

const animateLegA3 = {
  step: (el, time) => animateLeg(el, time, [20, -140, 160, 20, 15, 0], 48),
  move: (el, time) => animateLeg(el, time, [15, -113, 94, 15, 88, -30], 100),
  raise: (el, time) => animateLeg(el, time, [18, -128, 94, 15, 48, -10], 58),
  stretch: (el, time) => animateLeg(el, time, [19, -138, 165, 15, 15, -10], 38)
}

const animateLegB3 = {
  step: (el, time) => animateLeg(el, time, [10, -135, 165, 20, 15, 10], 33),
  move: (el, time) => animateLeg(el, time, [5, -104, 95, 15, 88, -30], 100),
  raise: (el, time) => animateLeg(el, time, [8, -120, 95, 15, 48, -10], 45),
  stretch: (el, time) => animateLeg(el, time, [9, -130, 170, 15, 15, 0], 25)
}

const animateLegA4 = {
  step: (el, time) => animateLeg(el, time, [30, -115, 100, false, 87, -33]),
  move: (el, time) => animateLeg(el, time, [10, -65, 62, false, 50, -20]),
  raise: (el, time) => animateLeg(el, time, [20, -95, 72, false, 70, -10]),
  stretch: (el, time) => animateLeg(el, time, [30, -125, 82, false, 100, -10])
}

const animateLegB4 = {
  step: (el, time) => animateLeg(el, time, [20, -109, 105, false, 87, -33]),
  move: (el, time) => animateLeg(el, time, [0, -56, 62, false, 55, -22]),
  raise: (el, time) => animateLeg(el, time, [10, -89, 72, false, 75, -12]),
  stretch: (el, time) => animateLeg(el, time, [20, -119, 82, false, 105, -12])
}

const animatePedipalpA = {
  step: (el, time) => animateLeg(el, time, [1, -5, 53, 35, -15, false]),
  move: (el, time) => animateLeg(el, time, [1, -20, 122, 20, -30, false]),
  raise: (el, time) => animateLeg(el, time, [1, -40, 82, 30, 20, false]),
  stretch: (el, time) => animateLeg(el, time, [1, -25, 52, 20, -25, false])
}

const animatePedipalpB = {
  step: (el, time) => animateLeg(el, time, [0, -5, 53, 35, -15, false]),
  move: (el, time) => animateLeg(el, time, [0, -20, 122, 20, -30, false]),
  raise: (el, time) => animateLeg(el, time, [0, -40, 82, 30, 20, false]),
  stretch: (el, time) => animateLeg(el, time, [0, -25, 52, 20, -25, false])
}

function legCycle(leg, ...options) {
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
  const moveFirst = options.includes('moveFirst') // or raiseFirst
  const raiseLate = options.includes('raiseLate')

  console.log(moveFirst, raiseLate)

  if (moveFirst && raiseLate) {
    return new TimelineMax({ repeat: 3 })
      .addLabel('cycle')
      .add(animateObjects[legId].move(leg, 0.5), 'cycle')
      .add(animateObjects[legId].raise(leg, 0.25), 'cycle+=0.5')
      .add(animateObjects[legId].stretch(leg, 0.25), 'cycle+=0.75')
      .add(animateObjects[legId].step(leg, 0.5), 'cycle+=1')
    ;
  } else if (moveFirst) {
    return new TimelineMax({ repeat: 3 })
      .addLabel('cycle')
      .add(animateObjects[legId].move(leg, 0.75), 'cycle')
      .add(animateObjects[legId].raise(leg, 0.25), 'cycle+=0.75')
      .add(animateObjects[legId].stretch(leg, 0.25), 'cycle+=1')
      .add(animateObjects[legId].step(leg, 0.25), 'cycle+=1.25')
    ;
  } else if (raiseLate) {
    return new TimelineMax({ repeat: 3 })
      .addLabel('cycle')
      .add(animateObjects[legId].raise(leg, 0.5), 'cycle')
      .add(animateObjects[legId].stretch(leg, 0.25), 'cycle+=0.5')
      .add(animateObjects[legId].step(leg, 0.25), 'cycle+=0.75')
      .add(animateObjects[legId].move(leg, 0.5), 'cycle+=1')
      ;
  } else {
    return new TimelineMax({ repeat: 3 })
      .addLabel('cycle')
      .add(animateObjects[legId].raise(leg, 0.25), 'cycle')
      .add(animateObjects[legId].stretch(leg, 0.25), 'cycle+=0.25')
      .add(animateObjects[legId].step(leg, 0.25), 'cycle+=0.5')
      .add(animateObjects[legId].move(leg, 0.75), 'cycle+=0.75')
    ;
  }
}

function Tarantula({hideFrontLegs = false, hideBackLegs = false}) {
  const tarantula = useRef(null)
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
  const abdomen = useRef(null)
  const timeline = new TimelineMax()
  const walk = new TimelineMax()

  useEffect(() => {
    walk
      // .timeScale(0.5)
      .addLabel('setup')
      .set(tarantula.current, { xPercent: (-8 * 26) }, 'setup')
      .addLabel('motion-1', 'setup+=0.01')
      .to(tarantula.current, 0.725, { xPercent: (-7 * 26), ease: Linear.easeNone }, 'motion-1')
      .to(tarantula.current, 0.725, { xPercent: (-6 * 26), ease: Linear.easeNone }, 'motion-1+=0.75')
      .to(tarantula.current, 0.725, { xPercent: (-5 * 26), ease: Linear.easeNone }, 'motion-1+=1.5')
      .to(tarantula.current, 0.725, { xPercent: (-4 * 26), ease: Linear.easeNone }, 'motion-1+=2.25')
      .to(tarantula.current, 0.725, { xPercent: (-3 * 26), ease: Linear.easeNone }, 'motion-1+=3')
      .to(tarantula.current, 0.725, { xPercent: (-2 * 26), ease: Linear.easeNone }, 'motion-1+=3.75')
      .to(tarantula.current, 0.725, { xPercent: (-1 * 26), ease: Linear.easeNone }, 'motion-1+=4.5')
      .to(tarantula.current, 0.725, { xPercent: (0 * 26), ease: Linear.easeNone }, 'motion-1+=5.25')
      // .to(tarantula.current, 0.725, { xPercent: (1 * 26), ease: Linear.easeNone }, 'motion-1+=6')
      // .to(tarantula.current, 0.725, { xPercent: (2 * 26), ease: Linear.easeNone }, 'motion-1+=6.75')
      // .to(tarantula.current, 0.725, { xPercent: (3 * 26), ease: Linear.easeNone }, 'motion-1+=7.5')
      // .to(tarantula.current, 0.725, { xPercent: (4 * 26), ease: Linear.easeNone }, 'motion-1+=8.25')
      // .to(tarantula.current, 0.725, { xPercent: (5 * 26), ease: Linear.easeNone }, 'motion-1+=9')
      // .to(tarantula.current, 0.725, { xPercent: (6 * 26), ease: Linear.easeNone }, 'motion-1+=9.75')
    ;

    // Main Timeline

    timeline.addLabel('setup')
    // timeline.timeScale(0.5)

    timeline.add(animateLegA1.step(legA1, 0), 'setup')
    timeline.add(animateLegA2.move(legA2, 0.01), 'setup')
    timeline.add(animateLegA3.step(legA3, 0.01), 'setup')
    timeline.add(animateLegA4.move(legA4, 0), 'setup')
    timeline.add(animatePedipalpA.step(pedipalpA, 0), 'setup')

    timeline.add(animateLegB1.move(legB1, 0), 'setup')
    timeline.add(animateLegB2.step(legB2, 0.01), 'setup')
    timeline.add(animateLegB3.move(legB3, 0.01), 'setup')
    timeline.add(animateLegB4.step(legB4, 0), 'setup')
    timeline.add(animatePedipalpB.move(pedipalpB, 0), 'setup')

    timeline.addLabel('motion-1', 'setup+=0.01')
      .add(legCycle(legA2), 'motion-1')
      .add(legCycle(legB3), 'motion-1')
      .add(legCycle(pedipalpB), 'motion-1')
      .add(legCycle(legA4, "raiseLate"), 'motion-1')
      .add(legCycle(legB1, "raiseLate"), 'motion-1')
      .add(legCycle(legA3, "moveFirst"), 'motion-1')
      .add(legCycle(legB2, "moveFirst"), 'motion-1')
      .add(legCycle(pedipalpA, "moveFirst"), 'motion-1')
      .add(legCycle(legA1, "raiseLate", "moveFirst"), 'motion-1')
      .add(legCycle(legB4, "raiseLate", "moveFirst"), 'motion-1')
    ;

  }, [])

  return (
    <div ref={tarantula} className="tarantula">
      <div className="x-body">
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
            <div className="x-spinnerets x-spinnerets--background">
              <div className="x-spinnerets-parts x-coxa">
                <div className="x-spinnerets-parts x-femur">
                  <div className="x-spinnerets-parts x-patella">
                    <div className="x-spinnerets-parts x-tibia"></div>
                  </div>
                </div>
              </div>   
            </div>
            <div className="x-spinnerets">    
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
