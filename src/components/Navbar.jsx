import { useState, useEffect } from 'react'
import { sections } from '../config.js'

function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const navbar = document.getElementById('navbar')
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled')
      } else {
        navbar.classList.remove('scrolled')
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleMenu = () => setOpen(!open)
  const closeMenu = () => setOpen(false)

  return (
    <nav id="navbar" className="glass">
      <div className="container">
        <div className="nav-container">
          <div className="logo">PW</div>
          <ul
            className="nav-links"
            style={open ? { display: 'flex', flexDirection: 'column' } : {}}
          >
            <li>
              <a href="#home" onClick={closeMenu}>Home</a>
            </li>
            <li>
              <a href="#about" onClick={closeMenu}>About</a>
            </li>
            <li>
              <a href="#projects" onClick={closeMenu}>Projects</a>
            </li>
            {sections.blog && (
              <li>
                <a href="#blog" onClick={closeMenu}>Blog</a>
              </li>
            )}
            <li>
              <a href="#contact" onClick={closeMenu}>Contact</a>
            </li>
          </ul>
          <div className="mobile-menu" onClick={toggleMenu}>
            <i className="fas fa-bars" />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
