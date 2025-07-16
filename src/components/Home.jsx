import Hero from './Hero.jsx'
import About from './About.jsx'
import Projects from './Projects.jsx'
import Blog from './Blog.jsx'
import { sections } from '../config.js'
import useScrollAnimation from '../hooks/useScrollAnimation.js'

function Home() {
  useScrollAnimation()

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
