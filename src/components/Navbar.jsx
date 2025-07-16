import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { sections } from '../config.js'

function Navbar() {
  const [open, setOpen] = useState(false)
  const { t, i18n } = useTranslation()

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
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'pl' : 'en'
    i18n.changeLanguage(newLang)
  }

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
              <Link to="/#home" onClick={closeMenu}>{t('nav.home')}</Link>
            </li>
            <li>
              <Link to="/#about" onClick={closeMenu}>{t('nav.about')}</Link>
            </li>
            <li>
              <Link to="/#projects" onClick={closeMenu}>{t('nav.projects')}</Link>
            </li>
            {sections.blog && (
              <li>
                <Link to="/#blog" onClick={closeMenu}>{t('nav.blog')}</Link>
              </li>
            )}
            <li>
              <Link to="/#contact" onClick={closeMenu}>{t('nav.contact')}</Link>
            </li>
            <li>
              <button className="lang-btn" onClick={toggleLanguage}>
                {i18n.language === 'en' ? '🇬🇧' : '🇵🇱'}
              </button>
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
