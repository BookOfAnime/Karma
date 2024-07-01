import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
    { title: "Lightning Fast", description: "Transactions quicker than a dog chasing a squirrel.", icon: "⚡" },
    { title: "Community Driven", description: "Governed by a pack, not a single alpha.", icon: "🐾" },
    { title: "Secure", description: "Fort Knox level security, with added bark alerts.", icon: "🔒" },
    { title: "Eco-Friendly", description: "Green as the grass your dog loves to roll in.", icon: "🌿" }
  ];

  return (
    <section id="features">
      <h2>Features</h2>
      <div className="feature-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
