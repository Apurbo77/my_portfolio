import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Html, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const techData = [
  { name: 'React', position: [-2, 1.2, 0.5], color: '#00f0ff', size: 0.65 },
  { name: 'Node.js', position: [2, 1.5, -0.8], color: '#10b981', size: 0.6 },
  { name: 'JavaScript', position: [-1.8, -1.2, 0.8], color: '#f59e0b', size: 0.55 },
  { name: 'Three.js', position: [0, 0.2, 0], color: '#6366f1', size: 0.85 }, // Center node
  { name: 'Tailwind CSS', position: [2.2, -0.8, 0.6], color: '#06b6d4', size: 0.6 },
  { name: 'Framer Motion', position: [-3.2, -0.2, -0.8], color: '#ff2e93', size: 0.5 },
  { name: 'Vite', position: [0.8, -1.6, -0.5], color: '#a855f7', size: 0.5 },
];

function TechNode({ position, name, color, size }) {
  const meshRef = useRef();
  const ringRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
      
      // Float up and down using a sine wave offsets based on name length/coordinates
      const floatOffset = Math.sin(time * 1.5 + position[0]) * 0.12;
      meshRef.current.position.y = position[1] + floatOffset;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= 0.008;
    }
  });

  return (
    <group position={[position[0], 0, position[2]]}>
      <mesh
        ref={meshRef}
        position={[0, position[1], 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
        scale={hovered ? 1.25 : 1.0}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.2}
          transmission={0.65}
          thickness={1.2}
          clearcoat={1}
          emissive={color}
          emissiveIntensity={hovered ? 0.9 : 0.25}
        />
        
        {/* Orbit ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[size * 1.4, 0.015, 8, 48]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>

        {/* Text label */}
        <Text
          position={[0, -size - 0.35, 0]}
          fontSize={0.22}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>

        {/* Tooltip Overlay */}
        {hovered && (
          <Html distanceFactor={8} position={[0, size + 0.4, 0]} center>
            <div className="glassmorphism px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap text-white border border-white/20 shadow-lg pointer-events-none">
              Stack: <span style={{ color }}>{name}</span>
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
}

export default function TechStackScene() {
  return (
    <section id="tech" className="relative py-28 px-6 bg-[#08070d]/50 grid-bg">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-neonCyan/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: content details */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-neonCyan mb-3 block">
              Skillset
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
              Interactive <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neonCyan to-primary">
                Tech Universe
              </span>
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg mb-8 font-sans">
              I specialize in creating fluid front-ends and interactive experiences. Click and drag the scene to rotate the 3D space, and hover over each node to reveal details.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {techData.map((tech) => (
                <span
                  key={tech.name}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all font-sans text-slate-300"
                  style={{ borderLeft: `3px solid ${tech.color}` }}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right column: 3D canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="lg:col-span-7 h-[450px] md:h-[600px] w-full relative bg-white/[0.01] rounded-3xl border border-white/5 overflow-hidden"
        >
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            gl={{ antialias: true }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff2e93" />
            <pointLight position={[5, -5, 5]} intensity={1.5} color="#00f0ff" />
            
            <Suspense fallback={null}>
              <group position={[0, -0.2, 0]}>
                {techData.map((tech) => (
                  <TechNode key={tech.name} {...tech} />
                ))}
                
                {/* Visual orbital rings */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[1.5, 1.51, 64]} />
                  <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[2.5, 2.51, 64]} />
                  <meshBasicMaterial color="#ffffff" transparent opacity={0.03} />
                </mesh>
              </group>
              
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                minPolarAngle={Math.PI / 3} 
                maxPolarAngle={Math.PI / 1.8}
              />
            </Suspense>
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
}
