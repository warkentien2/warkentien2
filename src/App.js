import React from 'react'
import Tarantula from './components/Tarantula'

function App() {
  return (
    <div className="App">
      <header className="main-header">
        <nav className="navbar">
          <li>Animation</li>
          <li>Interactions</li>
          <li>Layout</li>
          <li>Projects</li>
          <li>Contact</li>
        </nav>
      </header>
      <main className="main">
        <section id="home" className="hero" style={{ height: '100vh' }}>
          <h1
            className="hero__title"
          >
            <span tabindex="-1" className="block right">
              <span className="block small right"><a className="brand" href="#home">Philip Warkentien II</a></span>
              <span className="block right--overflow">Complex UI &</span>
            </span>
            <span className="block left left--overflow">Complex UI &</span>
            <span className="block left hero__title__block">
              <span className="block right">animation-focused</span>
              <span className="block right small">front-end <span className="hero__title--highlight">developer</span></span>
              <span className="block right small">& <span className="hero__title--highlight">mentor</span></span>
            </span>
          </h1>
          <Tarantula />
        </section>
      </main>
    </div>
  );
}

export default App;
