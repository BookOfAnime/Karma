import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="parallax">
      <h2>About Karma Coin</h2>
      <p className="about-description">
        Karma Coin is not just another cryptocurrency; it's a movement. Built on the principles of fairness, community, and canine companionship, we're creating a digital economy where being a good boy (or girl) really pays off.
      </p>
      <div className="stats">
        <div className="stat">
          <div className="stat-icon">👥</div>
          <h3>Fair Pump Launch</h3>
          <p>Equality for all de dawgs</p>
        </div>
        <div className="stat">
          <div className="stat-icon">💰</div>
          <h3>$1Billion</h3>
          <p>Supply </p>
        </div>
        <div className="stat">
          <div className="stat-icon">🔄</div>
          <h3>Virtual Chat</h3>
          <p>Great community and livestream</p>
        </div>
      </div>
    </section>
  );
};

export default About;
