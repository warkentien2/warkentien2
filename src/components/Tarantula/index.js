import React, { useEffect, useRef } from 'react'
import { TimelineMax } from 'gsap'

function Tarantula() {
  const leg = useRef(null)

  const switchClass = (oldClass, newClass) => {
    leg.current.classList.remove(oldClass)
    leg.current.classList.add(newClass)
  }

  useEffect(() => {
    const tl = new TimelineMax()

    // tl.to(leg.current, 0.5, {

    // })
    setTimeout(() => {
      switchClass('leg-pull', 'leg-raise-1')
    }, 100)

    setTimeout(() => {
      switchClass('leg-raise-1', 'leg-raise-2')
    }, 600)

    setTimeout(() => {
      switchClass('leg-raise-2', 'leg-step')
    }, 1100)

    setTimeout(() => {
      switchClass('leg-step', 'leg-pull')
    }, 1600)

    setTimeout(() => {
      switchClass('leg-pull', 'leg-raise-1')
    }, 2100)

    setTimeout(() => {
      switchClass('leg-raise-1', 'leg-raise-2')
    }, 2600)

    setTimeout(() => {
      switchClass('leg-raise-2', 'leg-step')
    }, 3100)

    setTimeout(() => {
      switchClass('leg-step', 'leg-pull')
    }, 3600)
  }, [])

  return (
    <div class="x-body">
      <div class="x-body-parts x-chelicerae">
        <div class="x-fang"></div>
      </div>
      <div class="x-abdomen x-body-parts"></div>
      <div class="x-cephalothorax x-body-parts">
        <div class="x-chelicera-pattern"></div>
        <div class="x-coxa-pattern x-cp1"></div>
        <div class="x-coxa-pattern x-cp2"></div>
        <div class="x-coxa-pattern x-cp3"></div>
        <div class="x-coxa-pattern x-cp4"></div>
        <div class="x-eye x-eye1"></div>
        <div class="x-eye x-eye2"></div>
        <div class="x-eye x-eye3"></div>
        <div class="x-eye x-eye4"></div>
      </div>
      <div class="x-leg x-pedipalp">
        <div class="x-leg-parts x-trochanter">
          <div class="x-leg-parts x-femur">
            <div class="x-leg-parts x-patella">
              <div class="x-leg-parts x-tibia">
                <div class="x-leg-parts x-metatarsus">
                  <div class="x-dot"></div>
                </div>
                <div class="x-dot"></div>
              </div>
              <div class="x-dot"></div>
            </div>
            <div class="x-dot"></div>
          </div>
          <div class="x-dot"></div>
        </div>
      </div>
      <div ref={leg} class="x-leg leg-2">
        <div class="x-leg-parts x-trochanter">
          <div class="x-leg-parts x-femur">
            <div class="x-leg-parts x-patella">
              <div class="x-leg-parts x-tibia">
                <div class="x-leg-parts x-metatarsus">
                  <div class="x-leg-parts x-tarsus">
                    <div class="x-dot"></div>
                  </div>
                  <div class="x-dot"></div>
                </div>
                <div class="x-dot"></div>
              </div>
              <div class="x-dot"></div>
            </div>
            <div class="x-dot"></div>
          </div>
          <div class="x-dot"></div>
        </div>
      </div>
      <div class="x-leg leg-3">
        <div class="x-leg-parts x-trochanter">
          <div class="x-leg-parts x-femur">
            <div class="x-leg-parts x-patella">
              <div class="x-leg-parts x-tibia">
                <div class="x-leg-parts x-metatarsus">
                  <div class="x-leg-parts x-tarsus">
                    <div class="x-dot"></div>
                  </div>
                  <div class="x-dot"></div>
                </div>
                <div class="x-dot"></div>
              </div>
              <div class="x-dot"></div>
            </div>
            <div class="x-dot"></div>
          </div>
          <div class="x-dot"></div>
        </div>
      </div>
      <div class="x-leg x-leg-small leg-1">
        <div class="x-leg-parts x-trochanter">
          <div class="x-leg-parts x-femur">
            <div class="x-leg-parts x-patella">
              <div class="x-leg-parts x-tibia">
                <div class="x-leg-parts x-metatarsus">
                  <div class="x-leg-parts x-tarsus">
                    <div class="x-dot"></div>
                  </div>
                  <div class="x-dot"></div>
                </div>
                <div class="x-dot"></div>
              </div>
              <div class="x-dot"></div>
            </div>
            <div class="x-dot"></div>
          </div>
          <div class="x-dot"></div>
        </div>
      </div>
      <div class="x-leg x-leg-small leg-4">
        <div class="x-leg-parts x-trochanter">
          <div class="x-leg-parts x-femur">
            <div class="x-leg-parts x-patella">
              <div class="x-leg-parts x-tibia">
                <div class="x-leg-parts x-metatarsus">
                  <div class="x-leg-parts x-tarsus">
                    <div class="x-dot"></div>
                  </div>
                  <div class="x-dot"></div>
                </div>
                <div class="x-dot"></div>
              </div>
              <div class="x-dot"></div>
            </div>
            <div class="x-dot"></div>
          </div>
          <div class="x-dot"></div>
        </div>
      </div>
    </div>
  )
}

export default Tarantula
