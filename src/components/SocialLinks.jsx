import { socialLinks } from '../config/socialLinks.js';

function SocialLinks() {
  return (
    <div className="social-links">
      {socialLinks.map((link) => (
        <a
          key={link.id}
          href={link.href}
          title={link.title}
          aria-label={link.ariaLabel}
          target={link.external ? '_blank' : undefined}
          rel={link.external ? 'noopener noreferrer' : undefined}
        >
          <i className={link.icon} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
