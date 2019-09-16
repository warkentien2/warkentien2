import React, { useState, useEffect } from 'react'
import useWindowSize from './hooks/useWindowSize'
let Tarantula = React.lazy(() => import("./components/Tarantula"));

function App() {
  const windowSize = useWindowSize()
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
          
        </section>
        <section id="projects" className="section section--third">
          
        </section>
        <footer id="contact" className="footer">
          <div>
            <a href="https://www.linkedin.com/in/warkentien2/" target="_blank" className="ml-1 mr-1 rt-3"><i className="fab fa-linkedin-in"></i></a>
            <a href="https://codepen.io/warkentien2/" target="_blank" className="ml-1 mr-1 rt-3"><i className="fab fa-codepen"></i></a>
            <a href="https://stackoverflow.com/users/4714084/warkentien2?tab=profile" target="_blank" className="ml-1 mr-1 rt-3"><i className="fab fa-stack-overflow"></i></a>
            <a href="https://www.deviantart.com/warkentien2/gallery/" target="_blank" className="ml-1 mr-1 rt-3"><i className="fab fa-deviantart"></i></a>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
