import React from 'react';
import Navbar from './components/Navbar';
import HeroScene from './components/HeroScene';
import About from './components/About';
import TechStackScene from './components/TechStackScene';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="relative min-h-screen bg-[#08070d] text-white selection:bg-neonCyan/30 selection:text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex flex-col w-full">
        <HeroScene />
        <About />
        <TechStackScene />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#050409]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500 font-sans">
          <div>
            &copy; {new Date().getFullYear()} Creative Dev Portfolio. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#hero" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#tech" className="hover:text-white transition-colors">Tech</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
