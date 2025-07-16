import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Blog from './components/Blog.jsx'
import Footer from './components/Footer.jsx'
import './App.css'
import { sections } from './config.js'
import useScrollAnimation from './hooks/useScrollAnimation.js'

function App() {
  useScrollAnimation()

  return (
    <>
      <Navbar />
      {sections.hero && <Hero />}
      {sections.about && <About />}
      {sections.projects && <Projects />}
      {sections.blog && <Blog />}
      {sections.footer && <Footer />}
    </>
  )
}

export default App
