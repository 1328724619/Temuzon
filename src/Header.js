import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faShoppingCart, 
  faUser, 
  faBell, 
  faTruck,
  faBars,
  faTimes,
  faHeart,
  faHistory,
  faSun,
  faMoon
} from '@fortawesome/free-solid-svg-icons';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { useLocation } from 'react-router-dom';

function Header({ isMenuOpen, onMenuToggle, headerBgColor, theme, toggleTheme }) {
  const [{ basket, user }, dispatch] = useStateValue();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`} style={{ backgroundColor: headerBgColor }}>
      <div className="header__container">
        <div className="header__left">
          <button 
            className="header__menuButton"
            onClick={onMenuToggle}
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>

          <Link to="/" className="header__logo">
            <span className="logo__text">Temuzon</span>
          </Link>
        </div>

        <div className="header__center">
          <div className="header__searchContainer">
            <form className="header__searchForm" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search products, brands, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
          </div>
        </div>

        <div className="header__right">
          {user ? (
            <div className="header__actionButton header__userProfile">
              <FontAwesomeIcon icon={faUser} />
              <div className="header__userGreeting">
                <span>{`Hello ${user.displayName || 'Guest'}`}</span>
                <span className="header__signOutText" onClick={handleAuthentication}>Sign Out</span>
              </div>
            </div>
          ) : (
            <Link to="/login" className="header__actionButton">
              <FontAwesomeIcon icon={faUser} />
              <span>Sign In</span>
            </Link>
          )}

          <Link to="/wishlist" className="header__actionButton">
            <FontAwesomeIcon icon={faHeart} />
            <span>Wishlist</span>
          </Link>

          <Link to="/orders" className="header__actionButton">
            <FontAwesomeIcon icon={faHistory} />
            <span>Orders</span>
          </Link>

          <Link to="/checkout" className="header__actionButton cart">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="header__basketCount">{basket?.length}</span>
          </Link>
          
          <button 
            className="header__actionButton theme__toggleButton"
            onClick={toggleTheme}
          >
            <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </div>
      </div>

      {/* Overlay to capture clicks outside the menu */}
      {isMenuOpen && (
        <div className="header__menuOverlay" onClick={onMenuToggle}></div>
      )}

      <nav className={`header__nav ${isMenuOpen ? 'open' : ''}`}>
        <div className="nav__container">
          <button className="nav__closeButton" onClick={onMenuToggle}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="nav__section">
            <h3>Categories</h3>
            <ul>
              <li><Link to="/category/smart-tech" className={location.pathname === '/category/smart-tech' ? 'active-link' : ''}>Smart Tech</Link></li>
              <li><Link to="/category/ai-fashion" className={location.pathname === '/category/ai-fashion' ? 'active-link' : ''}>AI Stylist</Link></li>
              <li><Link to="/category/smart-home" className={location.pathname === '/category/smart-home' ? 'active-link' : ''}>Smart Home</Link></li>
              <li><Link to="/category/beauty-ai" className={location.pathname === '/category/beauty-ai' ? 'active-link' : ''}>Beauty AI</Link></li>
            </ul>
          </div>

          <div className="nav__section">
            <h3>Account</h3>
            <ul>
              <li><Link to="/profile" className={location.pathname === '/profile' ? 'active-link' : ''}>Your Profile</Link></li>
              <li><Link to="/orders" className={location.pathname === '/orders' ? 'active-link' : ''}>Order History</Link></li>
              <li><Link to="/wishlist" className={location.pathname === '/wishlist' ? 'active-link' : ''}>Wishlist</Link></li>
              <li><Link to="/settings" className={location.pathname === '/settings' ? 'active-link' : ''}>Settings</Link></li>
            </ul>
          </div>

          <div className="nav__section">
            <h3>Support</h3>
            <ul>
              <li><Link to="/help" className={location.pathname === '/help' ? 'active-link' : ''}>Help Center</Link></li>
              <li><Link to="/track" className={location.pathname === '/track' ? 'active-link' : ''}>Track Order</Link></li>
              <li><Link to="/returns" className={location.pathname === '/returns' ? 'active-link' : ''}>Returns</Link></li>
              <li><Link to="/contact" className={location.pathname === '/contact' ? 'active-link' : ''}>Contact Us</Link></li>
            </ul>
          </div>

          {user && (
            <div className="nav__section nav__bottomAction">
              <button className="nav__actionButton signOut__button" onClick={handleAuthentication}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
