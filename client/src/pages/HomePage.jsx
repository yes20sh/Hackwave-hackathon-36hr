import React from "react";

const ReferencesPage = () => {
  const profiles = [
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
    "https://randomuser.me/api/portraits/men/4.jpg",
    "https://randomuser.me/api/portraits/women/5.jpg",
    "https://randomuser.me/api/portraits/men/6.jpg",
    "https://randomuser.me/api/portraits/women/7.jpg",
    "https://randomuser.me/api/portraits/men/8.jpg",
    "https://randomuser.me/api/portraits/women/9.jpg",
    "https://randomuser.me/api/portraits/men/10.jpg",
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
     

      {/* Centered References Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center mt-20 px-8">
        <div className="w-full max-w-5xl">
          <h2 className="text-4xl font-bold mb-12">
            References of colleagues <br /> and clients
          </h2>

          {/* Profile Images */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {profiles.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Profile ${idx}`}
                className="w-16 h-16 rounded-full object-cover"
              />
            ))}
          </div>

          {/* Testimonial */}
          <div>
            <h3 className="uppercase font-bold tracking-widest mb-4">Saviina</h3>
            <p className="max-w-3xl mx-auto text-lg text-gray-800 italic">
              "Vlad is great to work with. He articulates all decisions with
              facts and provides a visually appealing finished product."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReferencesPage;
