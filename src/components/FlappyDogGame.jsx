import React, { useState, useEffect, useRef } from 'react';
import './FlappyDogGame.css';

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

export default FlappyDogGame;
