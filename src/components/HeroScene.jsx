import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import * as THREE from 'three';

// 3D Morphing Sphere component reacting to pointer positions
function MorphingSphere() {
  const meshRef = useRef();
  const outerRingRef1 = useRef();
  const outerRingRef2 = useRef();

  useFrame((state) => {
    const { x, y } = state.pointer;
    
    // Smoothly tilt and move mesh towards mouse pointer (parallax)
    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.4, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.4, 0.05);
      
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x * 0.8, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y * 0.8, 0.05);
    }

    if (outerRingRef1.current) {
      outerRingRef1.current.rotation.x = THREE.MathUtils.lerp(outerRingRef1.current.rotation.x, -y * 0.6, 0.03);
      outerRingRef1.current.rotation.y = THREE.MathUtils.lerp(outerRingRef1.current.rotation.y, -x * 0.6, 0.03);
    }

    if (outerRingRef2.current) {
      outerRingRef2.current.rotation.z += 0.005;
      outerRingRef2.current.rotation.x = THREE.MathUtils.lerp(outerRingRef2.current.rotation.x, y * 0.3, 0.03);
    }
  });

  return (
    <group>
      {/* Central morphing neon sphere */}
      <Float speed={3} rotationIntensity={1.2} floatIntensity={1.2}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshDistortMaterial
            color="#6366f1"
            attach="material"
            distort={0.35}
            speed={2.5}
            roughness={0.2}
            metalness={0.8}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </Float>

      {/* Rotating outer ring 1 (Cyan) */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={0.5}>
        <mesh ref={outerRingRef1}>
          <torusGeometry args={[2.3, 0.03, 16, 100]} />
          <meshBasicMaterial color="#00f0ff" wireframe />
        </mesh>
      </Float>
      
      {/* Rotating outer ring 2 (Pink) */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.8}>
        <mesh ref={outerRingRef2} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[2.6, 0.015, 8, 100]} />
          <meshBasicMaterial color="#ff2e93" wireframe opacity={0.4} transparent />
        </mesh>
      </Float>

      {/* Floating particles */}
      <Sparkles count={40} scale={5} size={2} speed={0.4} color="#00f0ff" />
      <Sparkles count={25} scale={4.5} size={1.5} speed={0.6} color="#ff2e93" />
    </group>
  );
}

export default function HeroScene() {
  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center overflow-hidden grid-bg">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-24">
        {/* Left Side: Bold Headlines */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider text-neonCyan border border-neonCyan/30 bg-neonCyan/5 uppercase mb-6 inline-block w-fit">
              Creative Front-End Developer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none text-white mb-6"
          >
            Crafting Digital <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neonCyan via-primary to-neonPink">
              Interactive
            </span> <br />
            Experiences
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-slate-400 max-w-xl mb-10 leading-relaxed font-sans"
          >
            I build responsive, high-performance web applications blending robust front-end architectures with immersive 3D interactions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-4 flex-wrap"
          >
            <a
              href="#projects"
              className="px-8 py-4 bg-gradient-to-r from-neonCyan to-primary text-black font-bold rounded-xl shadow-neonCyan hover:shadow-neonPink hover:scale-105 hover:text-white transition-all duration-300"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-white/10 hover:border-neonCyan/50 text-white font-medium rounded-xl hover:bg-white/5 transition-all duration-300"
            >
              Let's Talk
            </a>
          </motion.div>
        </div>

        {/* Right Side: R3F Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
          className="lg:col-span-5 h-[400px] md:h-[550px] w-full relative cursor-grab active:cursor-grabbing"
        >
          <Canvas
            camera={{ position: [0, 0, 5.5], fov: 45 }}
            gl={{ antialias: true }}
          >
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 10]} intensity={1.5} />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#ff2e93" />
            <pointLight position={[5, 5, 5]} intensity={2} color="#00f0ff" />
            
            <Suspense fallback={null}>
              <MorphingSphere />
            </Suspense>
          </Canvas>
        </motion.div>
      </div>

      {/* Floating scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
        <span className="text-xs uppercase tracking-widest font-semibold">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} className="text-neonCyan" />
        </motion.div>
      </div>
    </section>
  );
}
