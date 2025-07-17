import Hero from './Hero.jsx'
import About from './About.jsx'
import Projects from './projects/Projects.jsx'
import Blog from './Blog.jsx'
import { sections } from '../config.js'
import useScrollAnimation from '../hooks/useScrollAnimation.js'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function Home() {
  const location = useLocation()
  useScrollAnimation()
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1)
      const el = document.getElementById(targetId)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])

  return (
    <>
      {sections.hero && <Hero />}
      {sections.about && <About />}
      {sections.projects && <Projects />}
      {sections.blog && <Blog />}
    </>
  )
}

export default Home
