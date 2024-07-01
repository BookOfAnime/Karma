import React from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Features from "./components/Features";
import Tokenomics from "./components/Tokenomics";
import FlappyDogGame from "./components/FlappyDogGame";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="karma-coin-website">
      <Navbar />
      <Header />
      <About />
      <Features />
      <Tokenomics />
      {/* <section id="game">
        <h2>Flappy Karma Dog</h2>
        <FlappyDogGame />
      </section> */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
