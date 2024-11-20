import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className={isDarkMode ? 'header-dark' : 'header-light'}>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/learn">Learn</Link>
        <Link to="/interviews">Interviews</Link>
        <Link to="/battles">Battles</Link>
        <Link to="/profile">Profile</Link>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>
    </header>
  );
};

export default Header;