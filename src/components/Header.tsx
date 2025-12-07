import { useEffect, useState } from 'react';
import styles from './Header.module.css';

type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: 'https://lostinthewoodsdigital.com/about', external: true },
  { label: 'Portfolio', href: 'https://lostinthewoodsdigital.com/portfolio', external: true },
  { label: 'Contact', href: 'https://lostinthewoodsdigital.com/contact', external: true },
  { label: 'Games', href: 'https://lostinthewoodsdigital.com/games', external: true },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  return (
    <header className={`${styles.header} ${menuOpen ? styles.open : ''}`}>
      <div className={styles.inner}>
        <a
          href="https://lostinthewoodsdigital.com"
          className={styles.brand}
          target="_blank"
          rel="noreferrer"
        >
          <span className={styles.brandMark} aria-hidden="true">
            LWD
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandTitle}>Lost in the Woods Digital</span>
            <span className={styles.brandSubtitle}>Interactive worlds & craft</span>
          </span>
        </a>

        <nav className={styles.nav} aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.navLink}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className={styles.menuButton}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span className={styles.menuIcon} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div className={styles.mobileMenu} aria-hidden={!menuOpen}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={styles.mobileNavLink}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noreferrer' : undefined}
            onClick={closeMenu}
          >
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}
