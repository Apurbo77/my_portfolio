import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';

const GithubIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const projects = [
  {
    title: 'Nebula 3D Dashboard',
    description: 'An interactive 3D telemetry dashboard featuring custom GLSL particle fields and real-time canvas charting.',
    tech: ['React', 'R3F', 'GLSL Shaders', 'Tailwind'],
    github: '#',
    demo: '#',
    color: 'from-neonCyan to-primary',
    previewContent: (
      <div className="absolute inset-0 bg-[#0c0a17] flex items-center justify-center overflow-hidden">
        {/* Mockup 3D telemetry visualization */}
        <div className="absolute w-28 h-28 rounded-full border border-neonCyan/30 animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute w-20 h-20 rounded-full border border-primary/20 animate-reverse-spin" style={{ animationDuration: '6s' }} />
        <div className="absolute w-4 h-4 rounded-full bg-neonCyan shadow-neonCyan animate-ping" />
        <div className="absolute bottom-4 left-4 right-4 h-12 flex gap-1 items-end bg-black/40 p-2 rounded border border-white/5">
          <div className="w-1/6 bg-neonCyan/80 h-[30%] rounded-sm" />
          <div className="w-1/6 bg-primary/80 h-[70%] rounded-sm" />
          <div className="w-1/6 bg-neonPink/80 h-[45%] rounded-sm" />
          <div className="w-1/6 bg-neonCyan/80 h-[90%] rounded-sm" />
          <div className="w-1/6 bg-primary/80 h-[60%] rounded-sm" />
          <div className="w-1/6 bg-neonPink/80 h-[80%] rounded-sm" />
        </div>
      </div>
    )
  },
  {
    title: 'Aether eCommerce',
    description: 'A headless e-commerce store with high-performance Framer Motion transitions, cart orchestration, and stripe API integration.',
    tech: ['Next.js', 'Framer Motion', 'Tailwind', 'Stripe'],
    github: '#',
    demo: '#',
    color: 'from-primary to-neonPink',
    previewContent: (
      <div className="absolute inset-0 bg-[#0d0714] flex items-center justify-center overflow-hidden">
        {/* Mockup product card UI */}
        <div className="w-32 bg-white/[0.03] border border-white/10 rounded-xl p-3 flex flex-col gap-2 relative">
          <div className="h-14 rounded-lg bg-gradient-to-tr from-primary/30 to-neonPink/20 flex items-center justify-center">
            <span className="text-[10px] text-neonPink uppercase font-bold tracking-widest">Premium Core</span>
          </div>
          <div className="h-2 w-16 bg-white/20 rounded-full" />
          <div className="h-1.5 w-10 bg-white/10 rounded-full" />
          <div className="flex justify-between items-center mt-1">
            <span className="text-[9px] text-white font-bold">$129.00</span>
            <div className="w-5 h-5 rounded-md bg-neonPink flex items-center justify-center text-[9px] text-white font-bold">+</div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'Nova Realtime Analytics',
    description: 'An enterprise reporting dashboard tracking live websocket telemetry, using high-speed SVG mapping and charts.',
    tech: ['Vite', 'React', 'D3.js', 'WebSockets'],
    github: '#',
    demo: '#',
    color: 'from-neonPink to-accent',
    previewContent: (
      <div className="absolute inset-0 bg-[#060a12] flex items-center justify-center overflow-hidden">
        {/* Mockup nodes and logs visual */}
        <div className="w-full h-full p-4 flex flex-col gap-3 font-mono">
          <div className="text-[8px] text-accent flex items-center gap-1.5 border-b border-white/5 pb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            LIVE TELEMETRY: CONNECTED
          </div>
          <div className="flex flex-col gap-1 text-[7px] text-slate-400">
            <div>&gt; CLIENT CONNECTED FROM IP 192.168.1.1</div>
            <div>&gt; COMPILING SHADERS... SUCCESS</div>
            <div className="text-neonPink">&gt; FPS: 60 | RENDER TIME: 1.2ms</div>
          </div>
          <div className="mt-auto h-6 border-t border-dashed border-white/10 pt-2 flex justify-between items-center">
            <span className="text-[7px] text-slate-500">Node Status</span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </div>
    )
  }
];

export default function Projects() {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const width = rect.width;
    const height = rect.height;
    
    // Calculate rotation (-10deg to 10deg max)
    const rotateX = ((y - height / 2) / (height / 2)) * -8;
    const rotateY = ((x - width / 2) / (width / 2)) * 8;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    const glow = card.querySelector('.card-glow');
    if (glow) {
      glow.style.background = `radial-gradient(circle 250px at ${x}px ${y}px, rgba(99, 102, 241, 0.08), transparent)`;
    }
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    
    const glow = card.querySelector('.card-glow');
    if (glow) {
      glow.style.background = 'transparent';
    }
  };

  return (
    <section id="projects" className="relative py-28 px-6 max-w-7xl mx-auto w-full">
      {/* Background neon light */}
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            Selected <span className="bg-clip-text text-transparent bg-gradient-to-r from-neonCyan to-neonPink">Projects</span>
          </h2>
        </motion.div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="flex"
          >
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="glassmorphism rounded-2xl w-full overflow-hidden flex flex-col transition-all duration-200 ease-out border border-white/5 cursor-pointer relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Dynamic mouse refraction card glow */}
              <div className="card-glow absolute inset-0 pointer-events-none transition-opacity duration-300" />
              
              {/* Project Card Header Image/Preview */}
              <div className="h-48 relative overflow-hidden border-b border-white/5">
                {project.previewContent}
                {/* Visual colored overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-10 mix-blend-color-dodge`} />
              </div>

              {/* Project Details */}
              <div className="p-6 flex flex-col flex-grow relative z-10">
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-neonCyan transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans flex-grow">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[10px] font-semibold text-slate-300 bg-white/5 border border-white/5 rounded-md font-sans"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 items-center border-t border-white/5 pt-4 mt-auto">
                  <a
                    href={project.github}
                    className="text-slate-400 hover:text-white flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-colors"
                  >
                    <GithubIcon size={14} /> Code
                  </a>
                  <a
                    href={project.demo}
                    className="text-slate-400 hover:text-white flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-colors ml-auto"
                  >
                    Live Demo <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
