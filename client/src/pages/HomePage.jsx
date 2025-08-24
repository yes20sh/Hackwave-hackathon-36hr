<<<<<<< HEAD
 import React from 'react'
 
 const HomePage = () => {
   return (
     <div>HomePage</div>
   )
 }
 
 export default HomePage
=======
import React from "react";

const Homepage = () => {
  return (
    <div className="font-sans text-black min-h-screen" style={{ backgroundColor: '#C8D7C8' }}>
      {/* Header */}
      <header className="flex justify-between items-center px-12 py-8 backdrop-blur-sm sticky top-0 z-50 border-b border-white/40" style={{ backgroundColor: '#C8D7C899' }}>
        <div className="text-3xl font-extralight tracking-widest text-black">
          <span className="font-light" style={{ color: '#669966' }}>d</span>robe
        </div>
        
        <button 
          className="px-8 py-3 rounded-full hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl font-light tracking-wide text-white"
          style={{ backgroundColor: '#669966' }}
        >
          Search
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #669966 0%, #558855 50%, #447744 100%)' }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent"></div>
        <div className="relative text-white text-center px-12 py-32 md:py-40">
          <h1 className="text-6xl md:text-8xl font-thin leading-tight max-w-6xl mx-auto mb-12">
            Discover Your Style
            <span className="block font-extralight text-5xl md:text-6xl mt-6 opacity-95">
              with AI precision
            </span>
          </h1>
          <p className="text-2xl md:text-3xl font-extralight max-w-4xl mx-auto leading-relaxed opacity-90 mb-16">
            Curate the perfect wardrobe from thousands of premium brands, 
            guided by your personal AI stylist
          </p>
          <div className="mt-20">
            <button 
              className="px-12 py-5 rounded-full hover:opacity-95 transition-all duration-300 shadow-2xl hover:shadow-3xl font-light tracking-wider text-xl text-black"
              style={{ backgroundColor: '#C8D7C8' }}
            >
              Begin Your Journey
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-12 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-thin text-black mb-12">
              The drobe Difference
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-extralight">
              Where artificial intelligence meets impeccable style curation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group p-12 rounded-3xl transition-all duration-700 cursor-pointer hover:scale-105 hover:shadow-2xl border border-white/60" 
                 style={{ backgroundColor: '#C8D7C880' }}
                 onMouseEnter={(e) => { e.target.style.backgroundColor = '#669966'; e.target.style.color = 'white'; }}
                 onMouseLeave={(e) => { e.target.style.backgroundColor = '#C8D7C880'; e.target.style.color = 'black'; }}>
              <div className="text-4xl font-extralight mb-6 text-black group-hover:text-white transition-colors duration-700">
                AI Curation
              </div>
              <p className="text-lg font-light leading-relaxed text-gray-700 group-hover:text-white/95 transition-colors duration-700">
                Sophisticated algorithms learn your preferences, body type, and lifestyle to suggest pieces you'll truly love
              </p>
            </div>
            
            <div className="group p-12 rounded-3xl transition-all duration-700 cursor-pointer hover:scale-105 hover:shadow-2xl border border-white/60" 
                 style={{ backgroundColor: '#C8D7C880' }}
                 onMouseEnter={(e) => { e.target.style.backgroundColor = '#669966'; e.target.style.color = 'white'; }}
                 onMouseLeave={(e) => { e.target.style.backgroundColor = '#C8D7C880'; e.target.style.color = 'black'; }}>
              <div className="text-4xl font-extralight mb-6 text-black group-hover:text-white transition-colors duration-700">
                Global Brands
              </div>
              <p className="text-lg font-light leading-relaxed text-gray-700 group-hover:text-white/95 transition-colors duration-700">
                Access thousands of premium retailers and emerging designers from around the world in one curated space
              </p>
            </div>
            
            <div className="group p-12 rounded-3xl transition-all duration-700 cursor-pointer hover:scale-105 hover:shadow-2xl border border-white/60" 
                 style={{ backgroundColor: '#C8D7C880' }}
                 onMouseEnter={(e) => { e.target.style.backgroundColor = '#669966'; e.target.style.color = 'white'; }}
                 onMouseLeave={(e) => { e.target.style.backgroundColor = '#C8D7C880'; e.target.style.color = 'black'; }}>
              <div className="text-4xl font-extralight mb-6 text-black group-hover:text-white transition-colors duration-700">
                Seamless Experience
              </div>
              <p className="text-lg font-light leading-relaxed text-gray-700 group-hover:text-white/95 transition-colors duration-700">
                Unified shopping cart, personalized styling sessions, and effortless checkout across all brands
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the sections remain the same */}
      
      {/* Footer */}
      <footer className="px-12 py-20 text-white" style={{ backgroundColor: '#669966' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-4xl font-extralight tracking-widest mb-8 opacity-95">
              <span className="text-white/80">●</span> drobe
            </div>
            <p className="font-extralight text-xl opacity-85">© 2025 drobe. Crafted with intention.</p>
          </div>
          
          <nav className="text-center">
            <ul className="flex flex-wrap justify-center space-x-12 text-lg font-extralight">
              <li><a href="#" className="hover:opacity-80 transition-opacity duration-300">Discover</a></li>
              <li><a href="#" className="hover:opacity-80 transition-opacity duration-300">Curate</a></li>
              <li><a href="#" className="hover:opacity-80 transition-opacity duration-300">Shop</a></li>
              <li><a href="#" className="hover:opacity-80 transition-opacity duration-300">Style AI</a></li>
              <li><a href="#" className="hover:opacity-80 transition-opacity duration-300">Community</a></li>
              <li><a href="#" className="hover:opacity-80 transition-opacity duration-300">Search</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
>>>>>>> 7a8b756 (update)
