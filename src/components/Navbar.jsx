import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <nav id="navbar" className="glass">
      <div className="container">
        <div className="nav-container">
          <div className="logo" aria-label="Site logo"></div>
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
