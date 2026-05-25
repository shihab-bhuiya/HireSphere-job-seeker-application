import React from "react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25),transparent_60%)]" />

      {/* Globe / background image */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl w-full px-6 text-center">
        
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Find Your Dream Job Today
        </h1>

        <p className="mt-4 text-gray-300 text-sm md:text-base">
          Explore thousands of remote and on-site opportunities worldwide
        </p>

        {/* Search Bar */}
        <div className="mt-8 flex flex-col md:flex-row items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
          <input
            type="text"
            placeholder="Job title or keyword"
            className="flex-1 bg-transparent outline-none px-3 text-white placeholder-gray-400"
          />

          <input
            type="text"
            placeholder="Location"
            className="flex-1 bg-transparent outline-none px-3 text-white placeholder-gray-400"
          />

          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium">
            Search
          </button>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h2 className="text-2xl font-bold">50K+</h2>
            <p className="text-gray-400 text-sm">Active Jobs</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h2 className="text-2xl font-bold">12K+</h2>
            <p className="text-gray-400 text-sm">Companies</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h2 className="text-2xl font-bold">97%</h2>
            <p className="text-gray-400 text-sm">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;