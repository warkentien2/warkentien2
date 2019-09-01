import React, { useState, useEffect, useRef } from 'react'
import tools from './tools'
import { TimelineMax, TweenMax } from 'gsap'

function animateBodyPart(node, speed, angle, newWidth = false) {
  const animation = { rotation: angle }
  if(newWidth) animation.width = newWidth

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

  tl.addLabel('move')
  if(coxa) tl.add(animateBodyPart(coxa, speed, angles[0]), 'move')
  if(femur) tl.add(animateBodyPart(femur, speed, angles[1]), 'move')
  if(patella) tl.add(animateBodyPart(patella, speed, angles[2], scalePatella), 'move')
  if(tibia) tl.add(animateBodyPart(tibia, speed, angles[3]), 'move')
  if(metatarsus) tl.add(animateBodyPart(metatarsus, speed, angles[4], scaleMetatarsus), 'move')
  if(tarsus) tl.add(animateBodyPart(tarsus, speed, angles[5]), 'move')

  return tl
}

function Tarantula({hideFrontLegs = false, hideBackLegs = false}) {
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

  useEffect(() => {
    timeline.addLabel('setup')
    timeline.addLabel('move-1', 'setup+=0.25')
    timeline.addLabel('raise-1', 'move-1+=0.25')
    timeline.addLabel('stretch-1', 'raise-1+=0.25')
    timeline.addLabel('step-1', 'stretch-1+=0.25')

    timeline.add(animateLeg(legA1, 0, [0, -80, 75, false, 40, -10]), 'setup')
    timeline.add(animateLeg(legA2, 0, [0, -78, 93, false, 61, -25]), 'setup')
    timeline.add(animateLeg(legA3, 0.01, [20, -140, 160, 20, 15, 0], 39), 'setup')
    timeline.add(animateLeg(legA4, 0, [30, -115, 100, false, 87, -33]), 'setup')
    timeline.add(animateLeg(pedipalpA, 0, [1, -5, 53, 35, -15, false]), 'setup')

    timeline.add(animateLeg(legB1, 0, [-10, -68, 70, false, 40, -10]), 'setup')
    timeline.add(animateLeg(legB2, 0, [-10, -68, 87, false, 61, -25]), 'setup')
    timeline.add(animateLeg(legB3, 0.01, [10, -135, 165, 20, 15, 10], 20), 'setup')
    timeline.add(animateLeg(legB4, 0, [20, -109, 105, false, 87, -33]), 'setup')
    timeline.add(animateLeg(pedipalpB, 0, [0, -5, 53, 35, -15, false]), 'setup')

    timeline.add(animateLeg(legA1, 0.25, [40, -145, 102, false, 86, -40]), 'move-1')
    timeline.add(animateLeg(legA2, 0.25, [30, -123, 130, false, 58, -35], 50), 'move-1')
    timeline.add(animateLeg(legA3, 0.25, [15, -113, 94, 15, 88, -30], 100), 'move-1')
    timeline.add(animateLeg(legA4, 0.25, [10, -65, 62, false, 50, -20]), 'move-1')
    timeline.add(animateLeg(pedipalpA, 0.25, [1, -20, 122, 20, -30, false]), 'move-1')

    timeline.add(animateLeg(legB1, 0.25, [30, -140, 102, false, 80, -30]), 'move-1')
    timeline.add(animateLeg(legB2, 0.25, [20, -120, 120, false, 68, -35], 50), 'move-1')
    timeline.add(animateLeg(legB3, 0.25, [5, -104, 95, 15, 88, -30], 100), 'move-1')
    timeline.add(animateLeg(legB4, 0.25, [0, -56, 62, false, 55, -22]), 'move-1')
    timeline.add(animateLeg(pedipalpB, 0.25, [0, -20, 122, 20, -30, false]), 'move-1')

    timeline.add(animateLeg(legA1, 0.25, [26, -142, 72, false, 96, -10]), 'raise-1')
    timeline.add(animateLeg(legA2, 0.25, [20, -127, 90, false, 88, 5], 80), 'raise-1')
    timeline.add(animateLeg(legA3, 0.25, [18, -121, 84, 15, 78, -10], 100), 'raise-1')
    timeline.add(animateLeg(legA4, 0.25, [18, -95, 82, false, 40, -10]), 'raise-1')
    timeline.add(animateLeg(pedipalpA, 0.25, [1, -40, 82, 30, 20, false]), 'raise-1')

    timeline.add(animateLeg(legB1, 0.25, [16, -130, 72, false, 90, -5]), 'raise-1')
    timeline.add(animateLeg(legB2, 0.25, [10, -110, 87, false, 98, 5], 80), 'raise-1')
    timeline.add(animateLeg(legB3, 0.25, [8, -113, 85, 15, 78, -10], 100), 'raise-1')
    timeline.add(animateLeg(legB4, 0.25, [8, -86, 82, false, 45, -12]), 'raise-1')
    timeline.add(animateLeg(pedipalpB, 0.25, [0, -40, 82, 30, 20, false]), 'raise-1')

    // timeline.add(animateLeg(legA1, 0.25, [13, -142, 72, false, 96, -10]), 'stretch-1')
    // timeline.add(animateLeg(legA2, 0.25, [10, -127, 90, false, 88, 5], 80), 'stretch-1')
    // timeline.add(animateLeg(legA3, 0.25, [19, -121, 84, 15, 78, -10], 100), 'stretch-1')
    // timeline.add(animateLeg(legA4, 0.25, [24, -95, 82, false, 40, -10]), 'stretch-1')
    // timeline.add(animateLeg(pedipalpA, 0.25, [1, -40, 82, 30, 20, false]), 'stretch-1')

    // timeline.add(animateLeg(legB1, 0.25, [3, -130, 72, false, 90, -5]), 'stretch-1')
    // timeline.add(animateLeg(legB2, 0.25, [0, -110, 87, false, 98, 5], 80), 'stretch-1')
    // timeline.add(animateLeg(legB3, 0.25, [9, -113, 85, 15, 78, -10], 100), 'stretch-1')
    // timeline.add(animateLeg(legB4, 0.25, [14, -86, 82, false, 45, -12]), 'stretch-1')
    // timeline.add(animateLeg(pedipalpB, 0.25, [0, -40, 82, 30, 20, false]), 'stretch-1')

    // timeline.add(animateLeg(legA1, 0.25, [0, -80, 75, false, 40, -10]), 'step-1')
    // timeline.add(animateLeg(legA2, 0.25, [0, -78, 93, false, 61, -25]), 'step-1')
    // timeline.add(animateLeg(legA3, 0.25, [20, -140, 160, 20, 15, 0], 39), 'step-1')
    // timeline.add(animateLeg(legA4, 0.25, [30, -115, 100, false, 87, -33]), 'step-1')
    // timeline.add(animateLeg(pedipalpA, 0.25, [0.75, -5, 53, 35, -15, false]), 'step-1')

    // timeline.add(animateLeg(legB1, 0.25, [-10, -68, 70, false, 40, -10]), 'step-1')
    // timeline.add(animateLeg(legB2, 0.25, [-10, -68, 87, false, 61, -25]), 'step-1')
    // timeline.add(animateLeg(legB3, 0.25, [10, -135, 165, 20, 15, 10], 20), 'step-1')
    // timeline.add(animateLeg(legB4, 0.25, [20, -109, 105, false, 87, -33]), 'step-1')
    // timeline.add(animateLeg(pedipalpB, 0.25, [0, -5, 53, 35, -15, false]), 'step-1')

    // tl.to(leg.current, 0.5, {

    // })
    
    // setTimeout(() => {
    //   switchClass('leg-pull', 'leg-raise-1')
    // }, 100)

    // setTimeout(() => {
    //   switchClass('leg-raise-1', 'leg-raise-2')
    // }, 600)

    // setTimeout(() => {
    //   switchClass('leg-raise-2', 'leg-step')
    // }, 1100)

    // setTimeout(() => {
    //   switchClass('leg-step', 'leg-pull')
    // }, 1600)

    // setTimeout(() => {
    //   switchClass('leg-pull', 'leg-raise-1')
    // }, 2100)

    // setTimeout(() => {
    //   switchClass('leg-raise-1', 'leg-raise-2')
    // }, 2600)

    // setTimeout(() => {
    //   switchClass('leg-raise-2', 'leg-step')
    // }, 3100)

    // setTimeout(() => {
    //   switchClass('leg-step', 'leg-pull')
    // }, 3600)
  }, [])

  return (
    <div className="tarantula">
      <div className="x-body">
        <div className="x-body-part x-cephalothorax">

          { !hideBackLegs && (
            <React.Fragment>
              <div ref={legB2} id="leg-6" className="x-leg x-leg--background leg-6">
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
              <div ref={legB1} id="leg-5" className="x-leg x-leg--background leg-5">
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
              <div ref={legB3} id="leg-7" className="x-leg x-leg--background x-leg--small leg-7">
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
              <div ref={legB4} id="leg-8" className="x-leg x-leg--background x-leg--small leg-8">
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
              <div ref={pedipalpB} id="pedipalp-2" className="x-leg x-leg--background x-pedipalp pedipalp-2">
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
              <div ref={pedipalpA} id="pedipalp-1" className="x-leg x-pedipalp pedipalp-1">
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
              <div ref={legA4} id="leg-4" className="x-leg x-leg--small leg-4">
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
              <div ref={legA3} id="leg-3" className="x-leg x-leg--small leg-3">
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
              <div ref={legA1} id="leg-1" className="x-leg leg-1">
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
              <div ref={legA2} id="leg-2" className="x-leg leg-2">
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
