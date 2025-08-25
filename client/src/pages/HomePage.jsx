import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div
      className="font-sans text-black min-h-screen"
      style={{ backgroundColor: "#C8D7C8" }}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #669966 0%, #558855 50%, #447744 100%)",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent"></div>

        {/* Background images */}
        <div className="absolute bg-gray-700  inset-0 overflow-hidden">
          <img
            src="/src/assets/image01.jpeg"
            alt="bg-1"
            className="absolute top-0 left-0 w-1/3 h-full object-cover opacity-30 mix-blend-overlay"
          />
          <img
            src="/src/assets/image03.jpeg"
            alt="bg-2"
            className="absolute top-0 left-1/3 w-1/3 h-full object-cover opacity-30 mix-blend-overlay"
          />
          <img
            src="/src/assets/image02.jpeg"
            alt="bg-3"
            className="absolute top-0 right-0 w-1/3 h-full object-cover opacity-30 mix-blend-overlay"
          />
        </div>

        {/* Hero content */}
        <div className="relative text-white text-center px-12 py-32 md:py-40">
          <h1 className="text-6xl md:text-8xl font-thin leading-tight max-w-6xl mx-auto mb-12">
            Discover Your Style
            <span className="block font-extralight text-5xl md:text-6xl mt-6 opacity-95">
              with AI precision
            </span>
          </h1>
          <p className="text-2xl md:text-3xl font-extralight max-w-4xl mx-auto leading-relaxed opacity-90 mb-16">
            Curate the perfect wardrobe from thousands of premium brands, guided
            by your personal AI stylist
          </p>
          <div className="mt-20">
            <Link
              to="/search"
              className="px-12 py-5 rounded-full hover:opacity-95 transition-all duration-300 shadow-2xl hover:shadow-3xl font-light tracking-wider text-xl text-black"
              style={{ backgroundColor: "#C8D7C8" }}
            >
              Search
            </Link>
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
            <div
              className="group p-12 rounded-3xl transition-all duration-700 cursor-pointer hover:scale-105 hover:shadow-2xl border border-white/60"
              style={{ backgroundColor: "#C8D7C880" }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#669966";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#C8D7C880";
                e.target.style.color = "black";
              }}
            >
              <div className="text-4xl font-extralight mb-6 text-black group-hover:text-white transition-colors duration-700">
                AI Curation
              </div>
              <p className="text-lg font-light leading-relaxed text-gray-700 group-hover:text-white/95 transition-colors duration-700">
                Sophisticated algorithms learn your preferences, body type, and
                lifestyle to suggest pieces you'll truly love
              </p>
            </div>

            <div
              className="group p-12 rounded-3xl transition-all duration-700 cursor-pointer hover:scale-105 hover:shadow-2xl border border-white/60"
              style={{ backgroundColor: "#C8D7C880" }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#669966";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#C8D7C880";
                e.target.style.color = "black";
              }}
            >
              <div className="text-4xl font-extralight mb-6 text-black group-hover:text-white transition-colors duration-700">
                Global Brands
              </div>
              <p className="text-lg font-light leading-relaxed text-gray-700 group-hover:text-white/95 transition-colors duration-700">
                Access thousands of premium retailers and emerging designers
                from around the world in one curated space
              </p>
            </div>

            <div
              className="group p-12 rounded-3xl transition-all duration-700 cursor-pointer hover:scale-105 hover:shadow-2xl border border-white/60"
              style={{ backgroundColor: "#C8D7C880" }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#669966";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#C8D7C880";
                e.target.style.color = "black";
              }}
            >
              <div className="text-4xl font-extralight mb-6 text-black group-hover:text-white transition-colors duration-700">
                Seamless Experience
              </div>
              <p className="text-lg font-light leading-relaxed text-gray-700 group-hover:text-white/95 transition-colors duration-700">
                Unified shopping cart, personalized styling sessions, and
                effortless checkout across all brands
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="px-12 py-32" style={{ backgroundColor: "#C8D7C860" }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-thin text-center mb-24 text-black">
            Your Personal Style{" "}
            <span
              className="px-6 py-2 rounded-2xl text-white font-light"
              style={{ backgroundColor: "#669966" }}
            >
              Journey
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div
              className="rounded-3xl p-16 shadow-2xl text-white"
              style={{ backgroundColor: "#669966" }}
            >
              <div className="text-8xl font-thin mb-8 opacity-85">01</div>
              <h3 className="text-3xl font-light mb-6 opacity-95">
                Style Discovery
              </h3>
              <p className="text-xl font-extralight leading-relaxed opacity-90">
                Our AI analyzes your preferences, lifestyle, and body type to
                create your unique style DNA
              </p>
            </div>

            <div
              className="rounded-3xl p-16 shadow-xl border-2 border-white/80 text-black"
              style={{ backgroundColor: "#C8D7C8" }}
            >
              <div
                className="text-8xl font-thin mb-8"
                style={{ color: "#669966" }}
              >
                02
              </div>
              <h3 className="text-3xl font-light mb-6 text-black">
                Curated Selections
              </h3>
              <p className="text-xl font-extralight leading-relaxed text-gray-800">
                Receive personalized outfit recommendations and trending pieces
                tailored specifically for you
              </p>
            </div>

            <div
              className="rounded-3xl p-16 shadow-xl border-2 border-white/80 text-black"
              style={{ backgroundColor: "#C8D7C8" }}
            >
              <div
                className="text-8xl font-thin mb-8"
                style={{ color: "#669966" }}
              >
                03
              </div>
              <h3 className="text-3xl font-light mb-6 text-black">
                Smart Shopping
              </h3>
              <p className="text-xl font-extralight leading-relaxed text-gray-800">
                Compare prices, read reviews, and shop from multiple brands with
                our unified platform
              </p>
            </div>

            <div
              className="rounded-3xl p-16 shadow-2xl text-white"
              style={{
                background: "linear-gradient(135deg, #669966 0%, #558855 100%)",
              }}
            >
              <div className="text-8xl font-thin mb-8 opacity-85">04</div>
              <h3 className="text-3xl font-light mb-6 opacity-95">
                Style Evolution
              </h3>
              <p className="text-xl font-extralight leading-relaxed opacity-90">
                Your style profile evolves with you, learning from your choices
                and adapting to new trends
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="px-12 py-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-thin mb-24 text-black text-center">
            Fashion Philosophy
          </h2>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div style={{ color: "#669966" }} className="text-9xl font-thin">
                01
              </div>
              <h3 className="text-4xl font-light text-black">
                Conscious Curation
              </h3>
              <p className="text-2xl font-extralight text-gray-700 leading-relaxed">
                We believe in quality over quantity. Every recommendation is
                thoughtfully curated to enhance your personal style and build a
                sustainable wardrobe.
              </p>
            </div>

            <div className="space-y-10">
              <div style={{ color: "#669966" }} className="text-9xl font-thin">
                02
              </div>
              <h3 className="text-4xl font-light text-black">
                Inclusive Beauty
              </h3>
              <p className="text-2xl font-extralight text-gray-700 leading-relaxed">
                Style has no boundaries. We celebrate diversity in all its
                forms, ensuring everyone finds their perfect expression through
                fashion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="px-12 py-32" style={{ backgroundColor: "#C8D7C860" }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-thin mb-24 text-black text-center">
            The Future of Fashion
          </h2>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div
              className="rounded-3xl p-16 shadow-2xl text-white"
              style={{
                background: "linear-gradient(135deg, #669966 0%, #558855 100%)",
              }}
            >
              <h3 className="text-4xl font-light mb-10 opacity-95">
                Our Vision
              </h3>
              <p className="text-2xl font-extralight leading-relaxed opacity-90">
                To democratize personal styling, making expert fashion guidance
                accessible to everyone through the power of artificial
                intelligence.
              </p>
            </div>

            <div
              className="rounded-3xl p-16 shadow-xl border-2 border-white/80 text-black"
              style={{ backgroundColor: "#C8D7C8" }}
            >
              <h3 className="text-4xl font-light mb-10 text-black">
                Coming Soon
              </h3>
              <p className="text-2xl font-extralight leading-relaxed text-gray-800">
                Virtual fitting rooms, 3D style previews, and AR try-on
                experiences that will revolutionize how you discover fashion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default Homepage;
