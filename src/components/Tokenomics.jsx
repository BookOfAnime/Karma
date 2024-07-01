import React, { useState, useEffect } from 'react';
import './Tokenomics.css'

const Tokenomics = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(Array.from({ length: 20 }, (_, i) => ({
      date: `2023-${(i + 1).toString().padStart(2, '0')}-01`,
      value: Math.random() * 100 + 50
    })));
  }, []);

  return (
    <section id="tokenomics">
      <h2>Tokenomics</h2>
      <div className="chart-container">
        <div className="chart">
          {chartData.map((data, index) => (
            <div 
              key={index} 
              className="bar" 
              style={{ 
                height: `${data.value}px`,
                animation: `grow-bar 1s ease-out ${index * 0.1}s`
              }}
              title={`${data.date}: ${data.value.toFixed(2)}`}
            ></div>
          ))}
        </div>
        <div className="chart-labels">
          <span>Price (USD)</span>
          <span>Date</span>
        </div>
      </div>
      <p>Our unique token distribution ensures a fair and sustainable ecosystem:</p>
      <ul className="token-distribution">
        <li><span className="percentage">40%</span> Community Rewards</li>
        <li><span className="percentage">30%</span> Liquidity Pool</li>
        <li><span className="percentage">20%</span> Development</li>
        <li><span className="percentage">10%</span> Marketing</li>
      </ul>
    </section>
  );
};

export default Tokenomics;