import React from 'react';

const Footer = () => {
  return (
    <footer className="w-100 mt-auto p-4">
      <div className="container">
        &copy;{new Date().getFullYear()} Brought to You by 4Amigos-Movies
      </div>
    </footer>
  );
};

export default Footer;
