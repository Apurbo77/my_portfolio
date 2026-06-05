import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

function Globe() {
  const globeRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = time * 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.y = -time * 0.08;
      ringRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;
    }
  });

  return (
    <group>
      {/* Dark inner sphere for depth blocking */}
      <mesh>
        <sphereGeometry args={[1.98, 32, 32]} />
        <meshBasicMaterial color="#08070d" />
      </mesh>

      {/* Main wireframe globe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 24, 24]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Outer grid rings */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.2, 0.01, 8, 64]} />
        <meshBasicMaterial color="#ff2e93" transparent opacity={0.4} />
      </mesh>
      
      {/* Tilted secondary ring */}
      <mesh rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[2.3, 0.005, 8, 64]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.3} />
      </mesh>

      {/* Connection points on the sphere */}
      <group>
        {[
          [2, 0, 0],
          [-1.4, 1.4, 0],
          [0.8, -1.2, 1.4],
          [-0.5, -1.8, -0.6],
          [1, 1.6, -0.8]
        ].map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('sending');

    setTimeout(() => {
      setStatus('success');
      
      // Trigger canvas-confetti
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#6366f1', '#ff2e93']
      });

      setForm({ name: '', email: '', message: '' });
      
      // Reset back to idle after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-28 px-6 max-w-7xl mx-auto w-full">
      {/* Background neon light */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Contact Form */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glassmorphism p-8 md:p-10 rounded-3xl border border-white/5 relative"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-8">
              Let's build something <span className="text-neonCyan text-glow-cyan">together</span>
            </h2>

            {status === 'success' ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6 text-emerald-400">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-slate-400 text-sm max-w-sm font-sans">
                  Thank you for reaching out. I'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-sans">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    disabled={status === 'sending'}
                    placeholder="John Doe"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-neonCyan transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    disabled={status === 'sending'}
                    placeholder="john@example.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-neonCyan transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    disabled={status === 'sending'}
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-neonCyan transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-2 py-4 bg-gradient-to-r from-neonCyan to-primary text-black font-bold rounded-xl shadow-neonCyan hover:shadow-neonPink hover:text-white flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {status === 'sending' ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Right Side: R3F Wireframe Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-6 h-[400px] md:h-[500px] w-full relative cursor-grab active:cursor-grabbing"
        >
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{ antialias: true }}
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
            <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff2e93" />
            
            <Suspense fallback={null}>
              <Globe />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Suspense>
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
}
