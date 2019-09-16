import React, { useRef, useEffect } from 'react'

function Moth({ scrollTop, windowSize, bottomAnchorSection }) {
  const moth = useRef(null)
  const foreWing1 = useRef(null)
  const foreWing2 = useRef(null)
  const hindWing1 = useRef(null)
  const hindWing2 = useRef(null)
  const multiplier = 10
  let thisOffsetTop = 1

  useEffect(() => {
    thisOffsetTop = bottomAnchorSection.current.offsetTop + moth.current.getBoundingClientRect().top
    foreWing1.current.style.transform = 'rotate(-85deg)'
    foreWing2.current.style.transform = 'rotateY(180deg) rotateZ(-88deg)'
    hindWing1.current.style.transform = 'rotate(-40deg)'
    hindWing2.current.style.transform = 'rotateY(-180deg) rotateZ(-42deg)'
  }, [])
  
  useEffect(() => {
    if(Math.floor((scrollTop - windowSize.height / multiplier) / (thisOffsetTop * 1000) <= 1)) {
      const fraction = (scrollTop - windowSize.height / multiplier) / (thisOffsetTop * 1000)
      foreWing1.current.style.transform = `rotate(${85 * Math.pow(fraction, 3) - 85}deg)`
      foreWing2.current.style.transform = `rotateY(180deg) rotateZ(${85 * Math.pow(fraction, 3) - 88}deg)`
      hindWing1.current.style.transform = `rotate(${40 * Math.pow(fraction, 3) - 40}deg)`
      hindWing2.current.style.transform = `rotateY(-180deg) rotateZ(${40 * Math.pow(fraction, 3) - 42}deg)`
    } else {
      foreWing1.current.style.transform = 'rotate(0deg)'
      foreWing2.current.style.transform = 'rotateY(180deg) rotateZ(-3deg)'
      hindWing1.current.style.transform = 'rotate(0deg)'
      hindWing2.current.style.transform = 'rotateY(-180deg) rotateZ(-2deg)'
    }
  }, [scrollTop])

  return (
    <div className="moth-wrapper">
      <div ref={moth} className="moth">
        <div className="m-thorax">
          <div className="pattern"></div>
          <div className="m-antennae m-antennae-1">
            <div></div>
          </div>
          <div className="m-antennae m-antennae-2">
            <div></div>
          </div>
        </div>
        <div className="m-abdomen"></div>
        <div ref={hindWing1} className="m-hind-wing m-hind-wing-1">
          <div></div>
        </div>
        <div ref={hindWing2} className="m-hind-wing m-hind-wing-2">
          <div></div>
        </div>
        <div ref={foreWing1} className="m-fore-wing m-fore-wing-1">
          <div className="apex"></div>
          <div className="costal-margin"></div>
          <div className="outer-margin"></div>
        </div>
        <div ref={foreWing2} className="m-fore-wing m-fore-wing-2">
          <div className="apex"></div>
          <div className="costal-margin"></div>
          <div className="outer-margin"></div>
        </div>
      </div>
    </div>
  )
}

export default Moth
