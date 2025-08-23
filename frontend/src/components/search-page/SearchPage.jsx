import React from "react";
import Container from "../container/Container";
import animationBackground from "../../assets/animation-background.mp4";
import SearchBox from "../searchbox/SearchBox";
import Navbar from "../navbar/Navbar";

const Search = () => {
  return (
    <Container>
      <div className="relative w-full h-screen overflow-hidden">
        {/* Navbar fixed at top */}
        <div className="absolute top-0 left-0 w-full z-20">
          <Navbar />
        </div>

        {/* Background Video (Responsive + Centered) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-[90vw] max-w-[700px] aspect-square"
          >
            <source src={animationBackground} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Overlay Content (below Navbar, centered) */}
        <div className="relative z-10 flex items-center justify-center h-full pt-20 px-4">
          <SearchBox />
        </div>
      </div>
    </Container>
  );
};

export default Search;
