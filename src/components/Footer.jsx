import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#tokenomics">Tokenomics</a></li>
            <li><a href="#game">Game</a></li>
          </ul>
        </div>
        {/* <div className="footer-section">
          <h3>Community</h3>
          <ul>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Telegram</a></li>
            <li><a href="#">Discord</a></li>
            <li><a href="#">Reddit</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div> */}
      </div>
      <p>🐾 Karma Coin - 2023. All rights reserved. Invest responsibly. Not financial advice.</p>
    </footer>
  );
};

export default Footer;