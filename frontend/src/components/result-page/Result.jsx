import React from 'react'
import Container from '../container/Container'
import animationBackground from '../../assets/animation-background.mp4'
import Navbar from '../navbar/Navbar'
// import card from './components/card'
const Result = () => {
  return (
      <div className="relative w-full h-screen overflow-hidden">
        
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

        {/* Navbar stays above */}
        <div className="relative z-20">
          <Navbar />
              <Container>
                   <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-4xl font-bold">Hello World</h1>
          {/* <Card/> */}
        </div>

                </Container>
        </div>
        </div>
     
  )
}

export default Result
