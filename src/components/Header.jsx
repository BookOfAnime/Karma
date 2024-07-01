import React, { useState, useEffect } from 'react';
import './header.css';

const Header = () => {
  const [coinRotation, setCoinRotation] = useState(0);

  useEffect(() => {
    const rotateCoin = setInterval(() => {
      setCoinRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(rotateCoin);
  }, []);

  return (
    <header>
      <div className="overlay"></div>
      <h1 className="glitch" data-text="Karma Coin">Karma Coin</h1>
      <p>Where Good Deeds Earn Great Rewards</p>
      <div className="coin" style={{ transform: `rotateY(${coinRotation}deg)` }}>
        <img className='karmaDog' src="./karma.jpeg" alt="Karma Dog" />
      </div>
      <a href="#about" className="cta-button">Learn More</a>
    </header>
  );
};

export default Header;
