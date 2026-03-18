const socialLinks = [
  {
    href: 'https://github.com/PawelWielga',
    title: 'GitHub',
    ariaLabel: 'GitHub profile (opens in new tab)',
    icon: 'fab fa-github',
    external: true,
  },
  {
    href: 'https://www.linkedin.com/in/pawel-wielga/',
    title: 'LinkedIn',
    ariaLabel: 'LinkedIn profile (opens in new tab)',
    icon: 'fab fa-linkedin',
    external: true,
  },
  {
    href: 'mailto:-----------@gmail.com',
    title: 'Email',
    ariaLabel: 'Send email',
    icon: 'fas fa-envelope',
    external: false,
  },
];

function SocialLinks() {
  return (
    <div className="social-links">
      {socialLinks.map((link) => (
        <a
          key={link.href}
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
