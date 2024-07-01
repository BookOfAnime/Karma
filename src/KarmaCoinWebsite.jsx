import React, { useState, useEffect, useRef } from 'react';
import './KarmaCoinWebsite.css'
const FlappyDogGame = () => {
    const canvasRef = useRef(null);
    const [gameState, setGameState] = useState({
      isPlaying: false,
      score: 0,
      highScore: 0
    });
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let animationFrameId;
      let dog = { y: canvas.height / 2, velocity: 0 };
      let pipes = [];
      const gravity = 0.5;
      const jump = -10;
      const pipeWidth = 50;
      const pipeGap = 150;
  
      const gameLoop = () => {
        if (!gameState.isPlaying) return;
  
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        // Update and draw dog
        dog.velocity += gravity;
        dog.y += dog.velocity;
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(50, dog.y, 20, 0, Math.PI * 2);
        ctx.fill();
  
        // Update and draw pipes
        ctx.fillStyle = 'green';
        pipes.forEach((pipe, index) => {
          pipe.x -= 2;
          ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
          ctx.fillRect(pipe.x, pipe.top + pipeGap, pipeWidth, canvas.height - pipe.top - pipeGap);
  
          // Check collision
          if (
            50 > pipe.x && 50 < pipe.x + pipeWidth &&
            (dog.y < pipe.top || dog.y > pipe.top + pipeGap)
          ) {
            endGame();
          }
  
          // Increase score
          if (pipe.x === 48) {
            setGameState(prev => ({ ...prev, score: prev.score + 1 }));
          }
  
          // Remove off-screen pipes
          if (pipe.x < -pipeWidth) {
            pipes.splice(index, 1);
          }
        });
  
        // Add new pipes
        if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
          pipes.push({
            x: canvas.width,
            top: Math.random() * (canvas.height - pipeGap - 100) + 50
          });
        }
  
        // Check boundaries
        if (dog.y > canvas.height || dog.y < 0) {
          endGame();
        }
  
        animationFrameId = requestAnimationFrame(gameLoop);
      };
  
      const endGame = () => {
        setGameState(prev => ({
          ...prev,
          isPlaying: false,
          highScore: Math.max(prev.score, prev.highScore)
        }));
      };
  
      const handleClick = () => {
        if (!gameState.isPlaying) {
          setGameState(prev => ({ ...prev, isPlaying: true, score: 0 }));
          dog = { y: canvas.height / 2, velocity: 0 };
          pipes = [];
          animationFrameId = requestAnimationFrame(gameLoop);
        } else {
          dog.velocity = jump;
        }
      };
  
      canvas.addEventListener('click', handleClick);
  
      return () => {
        canvas.removeEventListener('click', handleClick);
        cancelAnimationFrame(animationFrameId);
      };
    }, [gameState.isPlaying]);
  
    return (
      <div className="game-container">
        <canvas ref={canvasRef} width={400} height={600} />
        {!gameState.isPlaying && (
          <div className="game-overlay">
            <h2>Flappy Karma Dog</h2>
            <p>Click to start and jump</p>
            {gameState.score > 0 && <p>Score: {gameState.score}</p>}
            <p>High Score: {gameState.highScore}</p>
          </div>
        )}
        {gameState.isPlaying && (
          <div className="game-score">Score: {gameState.score}</div>
        )}
      </div>
    );
  };

const KarmaCoinWebsite = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [coinRotation, setCoinRotation] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
      const sections = ['about', 'features', 'tokenomics', 'game'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(currentSection || '');
    };
    window.addEventListener('scroll', handleScroll);

    const rotateCoin = setInterval(() => {
      setCoinRotation(prev => (prev + 1) % 360);
    }, 50);

    setChartData(Array.from({ length: 20 }, (_, i) => ({
      date: `2023-${(i + 1).toString().padStart(2, '0')}-01`,
      value: Math.random() * 100 + 50
    })));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(rotateCoin);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="karma-coin-website">
      <nav className={isMenuOpen ? 'open' : ''}>
        <div className="logo">Karma Coin</div>
        <div className="menu-toggle" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={isMenuOpen ? 'open' : ''}>
          {['about', 'features', 'tokenomics', 'game'].map((section) => (
            <li key={section}>
              <a 
                href={`#${section}`} 
                className={activeSection === section ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <header>
        <h1 className="glitch" data-text="Karma Coin">Karma Coin</h1>
        <p>Where Good Dogs Earn Great Rewards</p>
        <div className="coin" style={{ transform: `rotateY(${coinRotation}deg)` }}>
          <div className="coin-face front">🐕</div>
          <div className="coin-face back">🪙</div>
        </div>
        <a href="#about" className="cta-button">Learn More</a>
      </header>

      <section id="about" className="parallax" style={{ backgroundPositionY: scrollPosition * 0.5 }}>
        <h2>About Karma Coin</h2>
        <p>Karma Coin is not just another cryptocurrency; it's a movement. Built on the principles of fairness, community, and canine companionship, we're creating a digital economy where being a good boy (or girl) really pays off.</p>
        <div className="stats">
          <div className="stat">
            <h3>1M+</h3>
            <p>Holders</p>
          </div>
          <div className="stat">
            <h3>$100M</h3>
            <p>Market Cap</p>
          </div>
          <div className="stat">
            <h3>10k+</h3>
            <p>Transactions/Day</p>
          </div>
        </div>
      </section>

      <section id="features">
        <h2>Features</h2>
        <div className="feature-grid">
          {[
            { title: "Lightning Fast", description: "Transactions quicker than a dog chasing a squirrel.", icon: "⚡" },
            { title: "Community Driven", description: "Governed by a pack, not a single alpha.", icon: "🐾" },
            { title: "Secure", description: "Fort Knox level security, with added bark alerts.", icon: "🔒" },
            { title: "Eco-Friendly", description: "Green as the grass your dog loves to roll in.", icon: "🌿" }
          ].map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

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

      <section id="game">
        <h2>Flappy Karma Dog</h2>
        <FlappyDogGame />
      </section>

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
          <div className="footer-section">
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
          </div>
        </div>
        <p>🐾 Karma Coin - 2023. All rights reserved. Invest responsibly. Not financial advice.</p>
      </footer>
    </div>
  );
};

export default KarmaCoinWebsite;