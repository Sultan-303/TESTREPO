// src/components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  const toggleDarkMode = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <header className="header">
      <div className="logo">Logo</div>
      <div className="name">Your Name</div>
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        Toggle Dark Mode
      </button>
    </header>
  );
};

export default Header;