import React, { useState, useEffect, useRef } from 'react'
import useWindowSize from './hooks/useWindowSize'
import useScrollTop from "./hooks/useScrollTop"
import Moth from './components/Moth'
import ReviewSlider from './components/ReviewSlider'
import { TweenMax, Power2 } from 'gsap'
import tools from './tools'
let Tarantula = React.lazy(() => import("./components/Tarantula"))

function App() {
  const mentoringSection = useRef(null)
  const app = useRef(null)
  const windowSize = useWindowSize()
  const scroll = useScrollTop()
  const [isMobile, updateIsMobile] = useState(windowSize.width/windowSize.height <= 100/101)

  useEffect(() => {
    updateIsMobile(windowSize.width/windowSize.height <= 100/101)
  }, [windowSize.width, windowSize.height, isMobile])

  function navigationHandler(e) {
    e.preventDefault()
    const headerOffset = 0
    const html = app.current.parentNode.parentNode.parentNode
    const targetScroll = app.current.querySelector(e.target.getAttribute('href')).offsetTop - headerOffset
    TweenMax.to(html, 0.5, { scrollTop: targetScroll, ease: Power2.easeInOut })
    window.history.replaceState(undefined, undefined, e.target.getAttribute('href'))
  }

  return (
    <div ref={app} className="App">
      <header className="main-header">
        <nav className="navbar">
          <li><a href="#home" onClick={navigationHandler}>warkentien2</a></li>
          <li><a href="#animation" onClick={navigationHandler}>Niche</a></li>
          <li><a href="#projects" onClick={navigationHandler}>Mentoring</a></li>
          <li><a href="#contact" onClick={navigationHandler}>Contact</a></li>
        </nav>
      </header>
      <main id="home" className="main">
        <section id="home" className="section hero">
          <h1 className="hero__title">
            <span className="block left hero__title__block">
              <span className="block font--tiny right"><a className="brand hero__title--highlight" href="#home" onClick={navigationHandler}>Philip D. Warkentien II</a></span>
              <span className="block right block--split-wrapper">
                <span tabIndex="-1" className="block block--no-overflow split-1">
                  <span className="block font--small right--overflow">Complex UI &</span>
                </span>
                <span className="block block--no-overflow split-2">
                  <span className="block font--small left left--overflow">Complex UI &</span>
                </span>
              </span>
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
              <img className="responsive-image" src="./designers.png" alt="Design versus Development" />
              <figcaption>Awwwards Conference. <a className="highlight" href="https://www.youtube.com/watch?v=bEg5ySTUGxE"
                target="_blank"
                rel="noopener noreferrer"
                >
                  Talk by Pablo Stanley
                </a> | InvisionApp Design Lead
              </figcaption>
            </figure>
            <p>
              If you ever heard "this <em>cannot</em> be done", that's where I come in! After all, we tell the computer what to do, 
              not the other way around.<br /><br />
              There's an ever growing need for Visual Web Developers. When the task was too big for a Web Master, the field was 
              split between Front and Backend. However, with Webpack, Docker, Typescript, Cross-Plataform programming, and 
              EverythingElse.js, most Front-End Developers are getting pulled into a Full-Stack role. Hiring a Front-End Developer no longer 
              guarantees that you'll have a Visual Developer. So, new job descriptions started popping up:
            </p>
            <ul>
              <li>UI-Focused Front-End Developer</li>
              <li>Front-End Animation Developer</li>
              <li>3D Rendering Front-End Developer</li>
              <li>Rich Media Developer</li>
              <li>UI Developer</li>
              <li>UX/UI Designer & Engineer</li>
            </ul>
            <p>
              Their goal? To fill the Visual Developer niche the Front-End Developer has created.
              <br />
              Before you commit a large budget to a 3D-renderred or Video project, talk to me.
            </p>
          </div>
          <Moth bottomAnchorSection={mentoringSection} scrollTop={scroll.position} windowSize={windowSize} />
        </section>
        <section ref={mentoringSection} id="projects" className="section section--third">
          <div className="container">
            <h2>Helping others</h2>
            <div className="row stats">
              <div className="col-sm-6 col-4">
                <Statistics topAnchorSection={mentoringSection} windowSize={windowSize} scrollTop={scroll.position} index={1} value={250} title="classroom students" />
              </div>
              <div className="col-sm-6 col-4">
                <Statistics topAnchorSection={mentoringSection} windowSize={windowSize} scrollTop={scroll.position} large index={2} value={5000} title="project reviews" />
              </div>
              <div className="col-sm-6 col-4">
                <Statistics topAnchorSection={mentoringSection} windowSize={windowSize} scrollTop={scroll.position} index={3} value={868} title="stackoverflow reputation" />
              </div>
              <div className="col-sm-6 col-12">
                <Statistics topAnchorSection={mentoringSection} windowSize={windowSize} scrollTop={scroll.position} index={4} value={14} title="peer onboarding" />
              </div>
            </div>
            <ReviewSlider windowSize={windowSize} />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </section>
        <footer id="contact" className="footer">
          <div className="container">     
            <div className="row contain">
              <div className="col-6 col-wrap right contact-list contact-list--left">
                <h4>Find me:</h4>
                <ul>
                  <li className="contact"><a href="https://codepen.io/warkentien2/" target="_blank" rel="noopener noreferrer">Playground <i className="fab fa-codepen"></i></a></li>
                  <li className="contact"><a href="https://www.deviantart.com/warkentien2/gallery/" target="_blank" rel="noopener noreferrer">Art <i className="fab fa-deviantart"></i></a></li>
                  <li className="contact"><a href="https://stackoverflow.com/users/4714084/warkentien2" target="_blank" rel="noopener noreferrer">Helping <i className="fab fa-stack-overflow"></i></a></li>
                  <li className="contact"><a href="https://www.codewars.com/users/warkentien2" target="_blank" rel="noopener noreferrer">
                    Training <svg viewBox="0 0 5120 5120">
                      <path d="M2640 5089c-19-5-44-15-55-21-11-7-58-13-105-14-132-2-186-18-237-70-40-41-46-44-97-44-76 0-101-12-176-84-63-60-153-131-196-154-11-6-75-20-142-32-146-25-171-33-199-67l-21-26-86 18c-157 33-259 3-369-108-61-62-66-65-145-82-44-10-104-31-132-47-75-43-130-137-130-224 0-44-32-80-89-99-65-21-128-76-140-123-5-20-9-71-8-113 2-73 1-78-34-123-33-42-38-55-44-129-4-45-13-113-21-150-22-109-20-123 31-175 25-25 45-49 45-54 0-21-36-61-72-79-41-21-48-42-21-71 15-17 15-21-5-62-18-36-22-60-22-142 0-54 4-116 9-136 10-43 5-51-55-92-60-39-105-128-112-217-6-86 11-153 55-220 35-54 36-54 24-109-25-116-31-181-21-221 14-51 68-120 109-140 42-20 51-35 51-87 0-91 19-132 92-204 37-36 69-72 69-80 1-7 2-22 3-33 1-16 8-20 33-20 28 0 43-11 104-79 65-72 70-82 66-115-2-20-10-51-18-68-10-25-10-36-2-44 18-18 61-2 77 30 19 35 41 45 69 29 12-6 64-13 117-16 57-2 104-10 117-18 15-10 29-38 44-89 26-89 68-143 145-187 68-38 110-88 124-149 20-82 55-116 200-199 106-60 144-87 190-138 74-82 110-96 234-86 55 4 110 14 139 27 59 24 80 16 141-56 43-51 81-77 115-77 11 0 53 13 94 30 53 21 92 30 132 30 31 0 88 7 127 16 69 16 71 16 99-5 40-30 66-27 74 8 8 37 39 65 90 81 29 10 65 39 130 107l90 93h110c70 0 131 6 165 15l93 27c30 9 53 7 114-7 67-16 85-16 162-5 116 17 139 28 197 95 97 114 81 105 194 105 62 0 113 5 133 14 51 21 134 116 142 162 11 71 15 82 31 98 9 9 32 16 54 16 26 0 48 8 68 25 35 29 112 199 112 246 0 26 9 42 40 70 45 41 48 58 30 183-9 58-8 72 5 90 61 82 65 91 65 130 0 23-9 59-20 81-12 24-20 59-20 92 0 46 4 57 40 98 48 55 57 87 66 234 8 124 3 115 89 185 72 59 99 126 99 246 0 52-4 122-8 156-7 49-5 66 9 95 20 38 31 148 21 204-5 27-26 57-71 105-64 68-64 68-53 107 15 55 3 167-24 222-14 28-42 60-73 83-38 29-52 46-58 75-10 48-64 112-137 164-59 41-102 93-115 139-15 50-33 60-111 60-40 0-83 4-97 9-25 10-117 137-141 196-14 32-19 35-55 35s-43 5-91 65c-59 75-96 102-158 111-51 8-67 28-77 99-7 53-63 160-116 220-39 45-121 75-202 75-82 0-105 14-144 85-41 73-80 110-130 124-54 15-191 13-238-4l-42-15c-2 0-21 17-42 38-64 62-195 89-301 61zm-18-462c34-25 163-36 208-17 28 12 32 10 73-26 81-75 136-103 216-110 85-8 112-26 129-83 16-52 85-138 125-156 18-8 50-19 73-25 53-13 64-38 64-147 0-103 13-134 95-236 30-38 55-74 55-81s-10-26-22-42c-18-23-24-44-27-107-3-72 0-84 29-143 30-62 31-66 16-89-9-14-21-25-26-25s-21-17-35-38c-19-29-28-61-36-128-12-101-23-124-80-159-48-31-75-72-90-142l-12-52-76-26c-42-14-87-35-100-46l-24-20-22 21c-30 28-55 26-55-5 0-43-26-79-85-118-56-38-69-39-93-5-18 25-28 23-62-14-34-38-35-34-15 80 15 82 34 126 61 136 35 13 54 69 54 155 0 76 3 89 28 125 25 37 27 46 27 145v106l-32 10c-18 6-35 14-39 18-4 3-1 33 5 64 24 113-15 242-99 323-28 27-50 57-50 69 0 11-10 50-22 87-28 86-87 152-184 205-41 23-76 45-79 50-4 5-11 37-16 71-13 81-41 128-123 207l-67 64-67-7c-37-3-91-9-119-12-37-5-53-3-53 5 0 21 39 50 77 56 21 3 56 13 78 22 127 50 140 53 205 47 44-4 78-1 105 9 42 15 44 15 87-16zm-1198-533c11-10 16-34 16-73 0-61 16-89 45-77 10 4 15 19 15 50 0 33 6 52 23 70l22 25 150-7c175-9 203-19 305-107 63-54 64-55 127-55 69 0 116-18 133-49 5-11 15-43 21-73 15-70 31-91 87-119 76-39 100-66 123-141 11-37 34-87 52-110 49-64 49-64 32-104-27-66-19-115 34-197 24-37 24-38 7-75-12-24-21-75-25-145-4-59-13-113-19-119-17-17-38 6-57 63-17 51-48 75-79 63-21-8-66 40-66 71 0 62-67 147-128 161-35 9-62 32-62 55 0 25-53 84-94 103-18 8-66 19-107 22-88 8-117 21-153 68-43 57-153 73-279 40l-60-15-40 40c-22 23-51 44-64 47-14 4-70 1-126-5-83-9-107-16-136-38-20-15-38-30-41-33-3-4-17-21-32-38l-27-32-95 26-96 25-46-20c-98-44-143-21-124 63 7 31 7 54-1 73-16 42-5 65 69 144 37 41 80 95 95 121 19 33 36 50 55 54 85 19 107 29 152 69 43 38 54 43 83 38 31-5 35-3 40 23 10 48 20 55 113 81 48 13 99 31 114 38l27 15c1 0 9-7 17-16zm2894-450c29-24 45-48 53-77 18-68 58-134 90-147 19-8 32-23 38-45 5-18 27-56 50-85 58-73 60-87 31-199-6-24-12-76-13-115-2-60 2-76 21-103 12-17 25-45 28-61 5-26 2-32-22-44-51-24-77-116-67-234 7-90-9-113-88-125-60-9-73-21-206-181-72-87-108-113-173-123-25-4-57-14-72-21-39-20-62-17-87 12-43 49-92 6-72-64 13-45 5-52-59-52-36 0-80-8-110-20-66-26-114-25-158 2-26 16-56 23-116 26-61 3-91 10-121 28-22 12-71 28-109 35s-85 24-104 37-63 37-97 53c-39 18-74 44-94 70-29 36-32 44-22 65 14 33 36 40 77 25 27-10 39-9 71 4 26 11 52 14 81 10 59-9 142 10 194 45 35 23 157 60 200 60 21 0 68 55 74 88 11 63 18 69 86 74 137 11 181 57 201 208l13 94 61 24c66 25 131 79 158 132 19 37 23 102 11 181l-8 55 53 35c79 51 93 76 97 169 3 58 0 87-12 111-9 17-13 37-9 43 32 57 73 60 131 10zm-2773-635c34-17 51-19 107-14 76 7 92 1 155-56 41-38 45-39 117-39 74 0 76-1 103-35s51-48 105-59c18-4 34-18 44-39 9-17 34-51 56-75 29-32 38-50 36-70l-3-27-170-6c-145-5-183-10-260-33-160-48-196-67-231-116-61-84-69-90-121-90-66 0-139-28-173-66-21-25-30-47-35-95-9-73-24-92-122-150-44-27-69-50-89-84-30-52-33-89-19-221l8-71-42-39c-66-61-75-84-76-203 0-86-3-106-17-114-25-17-64 6-87 51-11 21-47 68-80 105s-63 79-67 94c-18 81-28 111-47 146-11 20-24 37-29 37s-17 15-28 33c-15 25-20 50-20 112 0 44-7 105-15 135s-12 63-9 73c3 9 34 31 70 47 35 16 64 34 64 40 0 7-13 24-28 38-24 23-30 41-41 112-19 121-16 128 53 167 67 38 126 86 142 117 7 12 17 48 24 81s17 65 22 72c5 6 45 24 89 38 72 24 87 34 151 99l71 71 101 1c89 0 107 4 151 27 61 32 89 33 140 6zm724-691c15-26 14-29-10-55-15-15-39-48-54-73s-47-66-71-92c-56-60-63-88-35-145 26-54 27-98 1-154-25-57-25-116 0-154 36-53 43-101 25-150-15-37-15-49-5-82 21-65 51-116 97-167 41-46 44-53 37-85-21-95 15-203 87-265 22-18 67-43 99-55 66-24 90-50 90-96 0-18 14-53 36-85 121-186 114-217-54-227-58-3-153 0-228 7-137 14-164 26-164 75 0 32-25 47-135 80-112 33-141 55-194 145-28 47-59 83-90 105-56 40-70 67-82 155-7 43-20 80-41 113-29 45-30 51-19 86 14 47 15 205 1 231-5 10-25 27-44 38-25 15-38 32-45 59-19 67-14 90 29 137 45 49 70 101 70 146 0 44 14 67 80 130 36 35 62 70 70 95 26 79 69 115 138 115 21 0 41 13 76 50 37 39 61 54 104 66 68 20 123 47 142 69 21 25 71 16 89-17zm343-286c88-134 142-191 189-198 43-7 54-18 84-77 12-22 38-54 59-71 35-28 46-31 132-36 94-6 94-6 124-42 52-63 211-101 296-72 46 16 46 15 108-17 54-30 72-34 158-37 121-5 134-2 194 48 58 48 105 60 144 36 40-23 80-20 187 14 105 34 126 36 143 15 9-11 3-34-35-116-38-84-45-108-40-138 7-42-2-54-47-65-44-10-95-63-127-130-16-35-37-66-46-70-9-3-45-6-80-6-57 0-68-3-99-30-18-17-41-47-49-68-23-58-35-64-93-46-34 11-73 14-127 11-69-5-85-10-145-46-38-23-73-41-79-41-5 0-18 9-29 21-31 34-64 46-149 53-61 5-87 12-115 31-20 14-46 25-57 25-12 0-34 11-50 24-44 36-63 43-143 51-41 3-83 11-93 17-21 11-47 66-47 100 0 37-41 109-74 129-17 10-48 19-68 19-46 0-58 18-59 92-1 84-19 129-62 158-33 21-37 27-30 50 13 40 5 152-14 193-16 36-16 40 5 100 18 51 20 69 12 105-7 31-7 49 1 65 15 27 40 46 54 40 5-2 36-43 67-91z" fill="#0c0032"/>
                    </svg>
                  </a></li>
                </ul>
              </div>
              <div className="col-6 col-wrap contact-list contact-list--right">
                <h4>Reach out:</h4>
                <ul>
                  <li className="contact"><a href="https://www.linkedin.com/in/warkentien2/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i> Portfolio</a></li>
                  <li className="contact"><a href="mailto:philip.dw2@gmail.com?Subject=Job%20Offer" target="_top"><i class="fas fa-envelope"></i> philip.dw2<br />@gmail.com</a></li>
                </ul>        
              </div>
            </div>
            <p className="small center">© Copyright 2019 - <span className="no-wrap">Philip D. Warkentien II</span></p>
          </div>
        </footer>
      </main>
    </div>
  );
}

function Statistics({ topAnchorSection, windowSize, scrollTop, index, value, title, large = false }) {
  const number = useRef(null)
  const [showValue, updateValue] = useState(0)

  useEffect(() => {
    if(scrollTop + windowSize.height / 5 <= topAnchorSection.current.offsetTop) {
      const fraction = tools.growCompletelyFrom(scrollTop + windowSize.height / 5, topAnchorSection.current.offsetTop, topAnchorSection.current.offsetTop - windowSize.height / 2) / topAnchorSection.current.offsetTop
      number.current.parentNode.style.transform = `translateY(${((1 - fraction)) * 100}%)`
      updateValue(Math.round(value * Math.pow(fraction, 0.75)))
    } else {
      number.current.parentNode.style.transform = 'translateY(0)'
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
