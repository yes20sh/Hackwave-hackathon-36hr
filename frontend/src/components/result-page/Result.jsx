import React from "react";
import Container from "../container/Container";
import animationBackground from "../../assets/animation-background.mp4";
import Navbar from "../navbar/Navbar";
import Card from "./components/card";

const Result = () => {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20"
        >
          <source src={animationBackground} type="video/mp4" />
        </video>
      </div>

      {/* Navbar + Content */}
      <div className="relative z-20">
        <Navbar />
        <Container>
          <div className="relative z-10 pt-24 px-2 sm:px-4">
            {/* Cards Section */}
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
              gap-2 sm:gap-3 md:gap-4"
            >
              {Array.from({ length: 15 }).map((_, i) => (
                <Card
                  key={i}
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKEffPh8cCc4OIx5kkrcHAP_mtV7uzCHfCDQ&s"
                  brand="ZARA"
                  name="Men's Regular Fit T-Shirt"
                  price="999"
                />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Result;
