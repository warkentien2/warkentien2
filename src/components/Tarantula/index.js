import React, { useEffect, useRef } from 'react'
import { TimelineMax } from 'gsap'

function Tarantula({hideFrontLegs = false, hideBackLegs = false}) {
  const leg = useRef(null)

  const switchClass = (oldClass, newClass) => {
    leg.current.classList.remove(oldClass)
    leg.current.classList.add(newClass)
  }

  useEffect(() => {
    // const tl = new TimelineMax()

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
              <div id="leg-6" className="x-leg x-leg--background leg-6">
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
              <div id="leg-5" className="x-leg x-leg--background leg-5">
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
              <div id="leg-7" className="x-leg x-leg--background x-leg--small leg-7">
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
              <div id="leg-8" className="x-leg x-leg--background x-leg--small leg-8">
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
              <div id="pedipalp-2" className="x-leg x-leg--background x-pedipalp pedipalp-2">
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

          <div className="x-body-part x-chelicerae x-chelicerae--background">
            <div className="x-fang"></div>
          </div>
          <div className="x-body-part x-chelicerae">
            <div className="x-fang"></div>
          </div>
          <div className="x-body-part x-abdomen">
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
              <div id="pedipalp-1" className="x-leg x-pedipalp pedipalp-1">
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
              <div id="leg-4" className="x-leg x-leg--small leg-4">
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
              <div id="leg-3" className="x-leg x-leg--small leg-3">
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
              <div ref={leg} id="leg-1" className="x-leg leg-1">
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
              <div id="leg-2" className="x-leg leg-2">
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
