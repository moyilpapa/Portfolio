import React, { useEffect, useRef, Suspense, useMemo } from 'react';
import gsap from 'gsap';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Stars, Float as FloatDrei, Sparkles, Instances, Instance } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration, Glitch } from '@react-three/postprocessing';
import * as THREE from 'three';

const NeuralCore = () => {
  const groupRef = useRef();
  const innerRef = useRef();
  const outerRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = time * 0.4;
      innerRef.current.rotation.z = time * 0.2;
      innerRef.current.scale.setScalar(1.2 + Math.sin(time * 2) * 0.1);
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = -time * 0.3;
      outerRef.current.rotation.x = Math.cos(time * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <FloatDrei speed={2} rotationIntensity={1} floatIntensity={1}>
        {/* Inner Core Octahedron */}
        <mesh ref={innerRef}>
          <octahedronGeometry args={[1.5, 2]} />
          <meshStandardMaterial 
            color="#14f1ff" 
            emissive="#14f1ff" 
            emissiveIntensity={10} 
            wireframe 
            transparent 
            opacity={0.8}
          />
        </mesh>

        {/* Outer Tech Shell */}
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[2.5, 1]} />
          <meshStandardMaterial 
            color="#fb923c" 
            emissive="#fb923c" 
            emissiveIntensity={4} 
            wireframe 
            transparent 
            opacity={0.3}
          />
        </mesh>

        {/* Energy Rings */}
        {[3.5, 4.2].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.02, 16, 100]} />
            <meshStandardMaterial 
              color="#14f1ff" 
              emissive="#14f1ff" 
              emissiveIntensity={8} 
              transparent 
              opacity={0.5}
            />
          </mesh>
        ))}
        
        <Sparkles count={100} scale={6} size={2} speed={0.4} color="#14f1ff" />
      </FloatDrei>
    </group>
  );
};

const DataTunnel = () => {
  const count = 100;
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const z = Math.random() * -100;
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 15;
      temp.push({
        position: [Math.cos(angle) * radius, Math.sin(angle) * radius, z],
        speed: 0.1 + Math.random() * 0.4
      });
    }
    return temp;
  }, []);

  const groupRef = useRef();
  useFrame((state) => {
    groupRef.current.children.forEach((child, i) => {
      child.position.z += particles[i].speed * 10;
      if (child.position.z > 20) child.position.z = -100;
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position}>
          <boxGeometry args={[0.05, 0.05, 4]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={5} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
};

const CameraController = () => {
  const { camera } = useThree();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    camera.position.x = Math.sin(time * 0.3) * 0.5;
    camera.position.y = 2 + Math.cos(time * 0.3) * 0.5;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

  const IntroAnimation = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1.5,
            ease: "expo.inOut",
            onComplete: onComplete
          });
        }
      });

      gsap.set([logoRef.current, canvasRef.current], { opacity: 0 });
      gsap.set(canvasRef.current, { scale: 1.5 });

      tl.to(containerRef.current, { opacity: 1, duration: 1, ease: "power4.out" })
        .to(canvasRef.current, { 
          opacity: 1, 
          scale: 1, 
          duration: 1.5, 
          ease: "expo.out" 
        }, "-=0.5")
        .to(logoRef.current, { 
          opacity: 1, 
          duration: 0.5,
          onStart: () => {
            const targets = ["INITIALIZING...", "EXPLORE"];
            let wordIndex = 0;
            
            const changeWord = () => {
              if (wordIndex < targets.length) {
                const target = targets[wordIndex];
                logoRef.current.innerText = "";
                
                let i = 0;
                const interval = setInterval(() => {
                  if (i < target.length) {
                    logoRef.current.innerText += target[i];
                    i++;
                  } else {
                    clearInterval(interval);
                    wordIndex++;
                    if (wordIndex < targets.length) {
                      setTimeout(changeWord, 800); // Reduced delay
                    }
                  }
                }, 40); // Slightly faster typing
              }
            };
            changeWord();
          }
        }, "-=0.5")
        .to(canvasRef.current, { 
          filter: "blur(20px)",
          opacity: 0, 
          duration: 1.5, 
          ease: "expo.in" 
        }, "+=1.5");

    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#020617] flex items-center justify-center overflow-hidden"
    >
      {/* 3D Scene Container */}
      <div ref={canvasRef} className="absolute inset-0 w-full h-full">
        <Canvas gl={{ antialias: true, tonalExposure: 0.5 }}>
          <PerspectiveCamera makeDefault position={[0, 2, 14]} fov={50} />
          <CameraController />
          <color attach="background" args={["#020617"]} />
          <fog attach="fog" args={["#020617", 5, 25]} />
          
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 15, 5]} intensity={3} color="#14f1ff" />
          <pointLight position={[-5, -15, -5]} intensity={2} color="#fb923c" />
          
          <Suspense fallback={null}>
            <NeuralCore />
            <DataTunnel />
            <Stars radius={150} depth={60} count={8000} factor={8} saturation={1} fade speed={3} />
          </Suspense>

          <EffectComposer multisampling={4}>
            <Bloom intensity={2.5} luminanceThreshold={0.2} luminanceSmoothing={0.9} radius={0.8} />
            <ChromaticAberration offset={[0.003, 0.003]} />
            <Noise opacity={0.05} />
            <Vignette darkness={0.7} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* UI Elements */}
      <div className="relative z-20 text-center pointer-events-none px-4">
        <h1 
          ref={logoRef}
          className="text-[40px] font-black tracking-[10px] sm:tracking-[25px] uppercase text-white cyberpunk-text min-h-[1.2em]"
        ></h1>
      </div>

      <style>{`
        .cyberpunk-text {
          text-shadow: 0 0 15px #14f1ff, 0 0 30px #14f1ff, 0 0 60px rgba(56, 189, 248, 0.5);
          filter: contrast(1.2);
        }
      `}</style>
    </div>
  );
};

export default IntroAnimation;
