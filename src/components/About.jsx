import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Palette, Gauge, Layout } from 'lucide-react';
import profileImg from '../assets/profile.jpg';

const pillars = [
  {
    icon: <Cpu className="text-neonCyan" size={24} />,
    title: 'Front-End Development',
    description: 'Developing modular, highly-performant React/TypeScript codebases utilizing modern workflows and tools.',
  },
  {
    icon: <Palette className="text-primary" size={24} />,
    title: 'Creative Coding & 3D',
    description: 'Creating interactive 3D web experiences using Three.js, React Three Fiber, GLSL shaders, and GSAP.',
  },
  {
    icon: <Layout className="text-neonPink" size={24} />,
    title: 'UI/UX Engineering',
    description: 'Transforming custom Figma design systems into responsive, fluid components with clean micro-interactions.',
  },
  {
    icon: <Gauge className="text-accent" size={24} />,
    title: 'Performance Optimization',
    description: 'Ensuring ultra-fast page speeds with code-splitting, lazy-loading, asset optimization, and SEO compliance.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 max-w-7xl mx-auto w-full">
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-neonPink/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Animated Text */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Profile Avatar */}
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden mb-6 border border-neonCyan/20 shadow-neonCyan hover:shadow-neonPink hover:border-neonPink/30 transition-all duration-500 group cursor-pointer">
              <img
                src={profileImg}
                alt="Developer Profile"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08070d]/50 to-transparent pointer-events-none" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
              What I Do
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
              Engineering web layouts that feel <span className="text-neonPink text-glow-pink">alive</span>.
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg mb-8 font-sans">
              I bridge the gap between design and engineering, combining visual aesthetics with robust architecture. My goal is to build immersive web interactions that delight users while keeping code maintainable and highly optimized.
            </p>
            <p className="text-slate-500 font-sans text-sm border-l-2 border-primary pl-4 py-2 italic">
              "Good design is obvious. Great design is transparent."
            </p>
          </motion.div>
        </div>

        {/* Right Side: Features/Pillars grid */}
        <div className="lg:col-span-7">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="glassmorphism p-8 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-colors duration-300"
              >
                {/* Accent neon hover background glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full group-hover:bg-primary/10 transition-colors duration-300" />
                
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {pillar.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {pillar.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed font-sans">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
