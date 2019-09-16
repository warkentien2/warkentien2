import React, { useState, useEffect, useRef } from 'react'
import useWindowSize from './hooks/useWindowSize'
import useScrollTop from "./hooks/useScrollTop"
import Moth from './components/Moth'
let Tarantula = React.lazy(() => import("./components/Tarantula"));

function App() {
  const mentoringSection = useRef(null)
  const windowSize = useWindowSize()
  const scroll = useScrollTop()
  const [isMobile, updateIsMobile] = useState(windowSize.width/windowSize.height <= 100/101)

  useEffect(() => {
    updateIsMobile(windowSize.width/windowSize.height <= 100/101)
  }, [windowSize.width, windowSize.height, isMobile])

  return (
    <div className="App">
      <header className="main-header">
        <nav className="navbar">
          <li><a href="#animation">Animation</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </nav>
      </header>
      <main className="main">
        <section id="home" className="section hero">
          <h1 className="hero__title">
            <span tabIndex="-1" className="block right">
              <span className="block font--tiny right"><a className="brand hero__title--highlight" href="#home">Philip Warkentien II</a></span>
              <span className="block font--small right--overflow">Complex UI &</span>
            </span>
            <span className="block font--small left left--overflow">Complex UI &</span>
            <span className="block left hero__title__block">
              <span className="block right font--regular">animation-focused</span>
              <span className="block right font--tiny">front-end <span className="hero__title--highlight">developer</span></span>
              <span className="block right font--tiny">& <span className="hero__title--highlight">mentor</span></span>
            </span>
          </h1>
          <React.Suspense fallback={<span />}>
            {isMobile ? <Tarantula isMobile={true} /> : <span />}
            {!isMobile ? <Tarantula isMobile={false} /> : <span />}
          </React.Suspense>
        </section>
        <section id="animation" className="section section--second">
          <div className="container">
            <h2>About</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p><img className="responsive-image" src="./designers.png" alt="Design versus Development" /></p>
          </div>
          <Moth bottomAnchorSection={mentoringSection} scrollTop={scroll.position} windowSize={windowSize} />
        </section>
        <section ref={mentoringSection} id="projects" className="section section--third">
          <div className="container">
            <h2>Mentoring</h2>
            <div className="row">
              <div className="col-sm-6 col-4">
                <Statistics windowSize={windowSize} topAnchorSection={mentoringSection} scrollTop={scroll.position} className="statistics-1" value={250} title="classroom students" />
              </div>
              <div className="col-sm-6 col-4">
                <Statistics windowSize={windowSize} topAnchorSection={mentoringSection} scrollTop={scroll.position} large className="statistics-2" value={5000} title="project reviews" />
              </div>
              <div className="col-sm-6 col-4">
                <Statistics windowSize={windowSize} topAnchorSection={mentoringSection} scrollTop={scroll.position} className="statistics-3" value={868} title="stackoverflow reputation" />
              </div>
              <div className="col-sm-6 col-12">
                <Statistics windowSize={windowSize} topAnchorSection={mentoringSection} scrollTop={scroll.position} className="statistics-4" value={14} title="peer onboarding" />
              </div>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </section>
        <footer id="contact" className="footer">
          <div className="container">     
            <div>
              <a href="https://www.linkedin.com/in/warkentien2/" target="_blank" className="ml-1 mr-1 rt-3"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://codepen.io/warkentien2/" target="_blank" className="ml-1 mr-1 rt-3"><i className="fab fa-codepen"></i></a>
              <a href="https://stackoverflow.com/users/4714084/warkentien2?tab=profile" target="_blank" className="ml-1 mr-1 rt-3"><i className="fab fa-stack-overflow"></i></a>
              <a href="https://www.deviantart.com/warkentien2/gallery/" target="_blank" className="ml-1 mr-1 rt-3"><i className="fab fa-deviantart"></i></a>
            </div>
            <a href="mailto:philip.dw2@gmail.com?Subject=Job%20Offer" target="_top">philip.dw2@gmail.com</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

function Statistics({ windowSize, topAnchorSection, scrollTop, className = '', value, title, large = false }) {
  const number = useRef(null)
  const [showValue, updateValue] = useState(0)
  const multiplier = (windowSize.width/windowSize.height <= 100/101) ? 7 : 4
  let thisOffsetTop = 1

  useEffect(() => {
    thisOffsetTop = topAnchorSection.current.offsetTop + number.current.getBoundingClientRect().top
    number.current.parentNode.style.transform = 'translateY(200%)'
    number.current.parentNode.style.opacity = 0
  }, [])
  
  useEffect(() => {
    if(Math.floor((scrollTop - windowSize.height / multiplier) / (thisOffsetTop * 1000) <= 1)) {
      const fraction = (scrollTop - windowSize.height / multiplier) / (thisOffsetTop * 1000)
      number.current.parentNode.style.transform = `translateY(${((1 - fraction) * fraction * fraction) * 200}%)`
      number.current.parentNode.style.opacity = Math.max(0, 1.5 * (fraction * fraction * fraction * fraction) - 0.5)
      updateValue(Math.floor((fraction * fraction * fraction * fraction) * value))
    } else {
      number.current.parentNode.style.transform = 'translateY(0)'
      number.current.parentNode.style.opacity = 1
      updateValue(value);
    }
  }, [scrollTop])

  return (
    <p className={`statistics${className ? ' ' + className : ''}${large ? ' statistics--large' : ''}`}>
      <span ref={number} className="large">{showValue}<sup>+</sup></span><br /><span>{title}</span>
    </p>
  )
}

export default App;
