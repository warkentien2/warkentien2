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
            <h2>Niche</h2>
            <h3>Visual Problem Solving</h3>
            <p>
              It is common knowledge amongst Designers that Developers will ruin your dreams:
            </p>
            <figure className="art-direction">
              <img className="resdivonsive-image" src="./designers.png" alt="Design versus Development" />
              <figcaption>Awwwards Conference <a className="highlight" href="https://www.youtube.com/watch?v=bEg5ySTUGxE"
                target="_blank"
                rel="noopener noreferrer"
                >
                  talk by Pablo Stanley
                </a> | InvisionApp Design Lead
              </figcaption>
            </figure>
            <p>
              If you ever heard "this <em>cannot</em> be done", that's where I come in! After all, we tell the computer what to do, 
              not the other way around.<br /><br />
              There's an ever growing need for Visual Web Developers. When the task was too big for a Web Master, the field was 
              split between Front and Backend. However, with Webpack, Docker, Typescript, Cross-Plataform programming, and 
              EverythingElse.js, most Front-End Developers are getting pulled into a Full-Stack role. Hiring Front-End no longer 
              guarantees that you'll have a Visual Developer. So, new job descriptions started popping up:
            </p>
            <ul>
              <li>UI-Focused Front-End Developer</li>
              <li>Front-End Animation Developer</li>
              <li>3D Rendering Front-End Developer</li>
              <li>Rich Media Developer</li>
              <li>UI Developer</li>
            </ul>
            <p>
              to fill the Visual Developer niche, the Front-End Developer was created. However, as the field keeps getting denser. Front-End 
              Developers started working on cross-plataform projects, docker, 
              <br />
              Before you commit a large budget to a 3D-renderred or Video project, talk to me.
            </p>
          </div>
          <Moth bottomAnchorSection={mentoringSection} scrollTop={scroll.position} windowSize={windowSize} />
        </section>
        <section ref={mentoringSection} id="projects" className="section section--third">
          <div className="container">
            <h2>Helping others</h2>
            <div className="row">
              <div className="col-sm-6 col-4">
                <Statistics topAnchorSection={mentoringSection} scrollTop={scroll.position} index={1} value={250} title="classroom students" />
              </div>
              <div className="col-sm-6 col-4">
                <Statistics topAnchorSection={mentoringSection} scrollTop={scroll.position} large index={2} value={5000} title="project reviews" />
              </div>
              <div className="col-sm-6 col-4">
                <Statistics topAnchorSection={mentoringSection} scrollTop={scroll.position} index={3} value={868} title="stackoverflow reputation" />
              </div>
              <div className="col-sm-6 col-12">
                <Statistics topAnchorSection={mentoringSection} scrollTop={scroll.position} index={4} value={14} title="peer onboarding" />
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
              <a href="https://www.linkedin.com/in/warkentien2/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://codepen.io/warkentien2/" target="_blank" rel="noopener noreferrer"><i className="fab fa-codepen"></i></a>
              <a href="https://stackoverflow.com/users/4714084/warkentien2?tab=profile" target="_blank" rel="noopener noreferrer"><i className="fab fa-stack-overflow"></i></a>
              <a href="https://www.deviantart.com/warkentien2/gallery/" target="_blank" rel="noopener noreferrer"><i className="fab fa-deviantart"></i></a>
            </div>
            <a href="mailto:philip.dw2@gmail.com?Subject=Job%20Offer" target="_top">philip.dw2@gmail.com</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

function Statistics({ topAnchorSection, scrollTop, index, value, title, large = false }) {
  const number = useRef(null)
  const [showValue, updateValue] = useState(0)
  const [thisOffsetTop, updateThisOffsetTop] = useState(1)

  useEffect(() => {
    updateThisOffsetTop(topAnchorSection.current.offsetTop)
    if(scrollTop / (thisOffsetTop - 140) <= 1) {
      number.current.parentNode.style.transform = 'translateY(100%)'
      number.current.parentNode.style.opacity = 0
    }
  }, [])
  
  useEffect(() => {
    if(scrollTop / (thisOffsetTop - 140) <= 1) {
      const fraction = scrollTop / (thisOffsetTop - 140)
      number.current.parentNode.style.transform = `translateY(${((1 - fraction) * fraction * fraction) * 100}%)`
      number.current.parentNode.style.opacity = Math.max(0, 1.5 * (fraction * fraction * fraction * fraction) - 0.5)
      updateValue(Math.floor((fraction * fraction * fraction * fraction) * value))
    } else {
      number.current.parentNode.style.transform = 'translateY(0)'
      number.current.parentNode.style.opacity = 1
      updateValue(value);
    }
  }, [scrollTop])

  return (
    <p className={`statistics statistics-${index}${large ? ' statistics--large' : ''}`}>
      <span ref={number} className="large">{showValue}<sup>+</sup></span><br /><span>{title}</span>
    </p>
  )
}

export default App;
