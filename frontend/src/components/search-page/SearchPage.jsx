import React from 'react'
import Container from '../container/Container'
import animationBackground from '../../assets/animation-background.mp4'

const Search = () => {
  return (
    <Container>
      <div className="relative w-screen h-screen overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 flex items-center justify-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-[700px] h-[700px] object-cover"
          >
            <source src={animationBackground} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-4xl font-bold">Hello World</h1>
        </div>
      </div>
    </Container>
  )
}

export default Search
