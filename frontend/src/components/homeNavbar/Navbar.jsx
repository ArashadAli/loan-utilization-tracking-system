import { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Product", href: "#product" },
    { name: "Pricing", href: "#pricing" },
    { name: "Templates", href: "#templates" },
    { name: "Blog", href: "#blog" },
  ];

  return (
    <>
      <div className={`navbar-wrapper ${scrolled ? "scrolled" : ""}`}>
        <nav className="navbar">
          <div className="navbar-content">
            {/* Logo */}
            <div className="nav-logo">
              <div className="logo-icon">
                <div className="icon-inner">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="url(#gradient1)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="url(#gradient1)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="url(#gradient1)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient id="gradient1" x1="2" y1="2" x2="22" y2="22">
                        <stop offset="0%" stopColor="#667eea" />
                        <stop offset="100%" stopColor="#764ba2" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <span className="logo-text">
                Fin<span className="gradient-text">Track</span>
              </span>
            </div>

            {/* Nav Items */}
            <div className="nav-center">
              <ul className="nav-list">
                {navItems.map((item, index) => (
                  <li
                    key={item.name}
                    className={`nav-item ${activeItem === index ? "active" : ""}`}
                    onMouseEnter={() => setActiveItem(index)}
                    onMouseLeave={() => setActiveItem(null)}
                  >
                    <a href={item.href}>
                      {item.name}
                      <span className="nav-item-bg"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="nav-actions">
              <button className="btn-gradient">
                <span className="btn-content">
                  <span>
                    Login / SignUp
                  </span>
                  <svg viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 3L11 8L6 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="btn-shine"></span>
              </button>

              {/* Mobile Menu Button */}
              <button
                className={`menu-btn ${menuOpen ? "active" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <span className="menu-line"></span>
                <span className="menu-line"></span>
              </button>
            </div>
          </div>

          {/* Navbar glow effect */}
          <div className="navbar-glow"></div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-overlay ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <aside className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <div className="mobile-header">
          <div className="nav-logo">
            <div className="logo-icon">
              <div className="icon-inner">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="gradient2" x1="2" y1="2" x2="22" y2="22">
                      <stop offset="0%" stopColor="#667eea" />
                      <stop offset="100%" stopColor="#764ba2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <span className="logo-text">
              Fin<span className="gradient-text">Track</span>
            </span>
          </div>

          <button
            className="close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="mobile-nav">
          <ul className="mobile-list">
            {navItems.map((item) => (
              <li key={item.name}>
                <a href={item.href} onClick={() => setMenuOpen(false)}>
                  <span>{item.name}</span>
                  <svg viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-actions">
            <button className="mobile-btn-gradient">
              <span>Login / SignUp</span>
              <svg viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 3L11 8L6 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </nav>

        <div className="mobile-glow"></div>
      </aside>
    </>
  );
};

export default Navbar;