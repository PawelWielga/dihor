import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <nav id="navbar" className={`glass ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-container">
          <Link to="/" className="logo" aria-label="Paweł Wielga - Home">
            <span className="visually-hidden">Home</span>
          </Link>
          <ul className={`nav-links ${open ? 'open' : ''}`}>
            <li>
              <Link to="/#home" onClick={closeMenu} aria-label="Go to Home section">
                {t('nav.home')}
              </Link>
            </li>
            <li>
              <Link to="/#about" onClick={closeMenu} aria-label="Go to About section">
                {t('nav.about')}
              </Link>
            </li>
            <li>
              <Link to="/#projects" onClick={closeMenu} aria-label="Go to Projects section">
                {t('nav.projects')}
              </Link>
            </li>
            <li>
              <Link to="/#blog" onClick={closeMenu} aria-label="Go to Blog section">
                {t('nav.blog', { defaultValue: 'Blog' })}
              </Link>
            </li>
            <li>
              <Link to="/#contact" onClick={closeMenu} aria-label="Go to Contact section">
                {t('nav.contact')}
              </Link>
            </li>
          </ul>
          <button
            ref={menuButtonRef}
            className="mobile-menu"
            onClick={toggleMenu}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <i className={`fas ${open ? 'fa-times' : 'fa-bars'}`} aria-hidden="true" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
