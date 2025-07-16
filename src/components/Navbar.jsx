import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
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
              <a href="#home" onClick={closeMenu}>{t('nav.home')}</a>
            </li>
            <li>
              <a href="#about" onClick={closeMenu}>{t('nav.about')}</a>
            </li>
            <li>
              <a href="#projects" onClick={closeMenu}>{t('nav.projects')}</a>
            </li>
            {sections.blog && (
              <li>
                <a href="#blog" onClick={closeMenu}>{t('nav.blog')}</a>
              </li>
            )}
            <li>
              <a href="#contact" onClick={closeMenu}>{t('nav.contact')}</a>
            </li>
          </ul>
          <button className="lang-btn" onClick={toggleLanguage}>
            {i18n.language === 'en' ? '🇬🇧' : '🇵🇱'}
          </button>
          <div className="mobile-menu" onClick={toggleMenu}>
            <i className="fas fa-bars" />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
