import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const IntroAnimation = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const logoRef = useRef(null);
  const circleRef = useRef(null);
  const linesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: onComplete
          });
        }
      });

      // Initial state
      gsap.set([textRef.current, logoRef.current, circleRef.current, linesRef.current], { opacity: 0 });
      gsap.set(circleRef.current, { scale: 0.8, border: "4px solid #38bdf8" });

      // Step 1: Power On
      tl.to(containerRef.current, { opacity: 1, duration: 1 })
        .to(circleRef.current, { opacity: 0.5, scale: 1, duration: 1.5, ease: "expo.out" }, "-=0.2")
        .to(textRef.current, { 
          opacity: 1, 
          duration: 0.1, 
          onStart: () => {
             const text = ">> BOOT_SEQUENCE_LOADED // PROTOCOL_V.99";
             let i = 0;
             textRef.current.innerText = "";
             const interval = setInterval(() => {
               if (i < text.length) {
                 textRef.current.innerText = text.substring(0, i + 1) + "_";
                 i++;
               } else {
                 clearInterval(interval);
                 // Keep the blinking cursor
                 const cursorInterval = setInterval(() => {
                    if(textRef.current) {
                      const current = textRef.current.innerText;
                      textRef.current.innerText = current.endsWith("_") ? current.slice(0, -1) : current + "_";
                    }
                 }, 400);
                 setTimeout(() => clearInterval(cursorInterval), 5000);
               }
             }, 60);
          }
        }, "-=0.5")

      // Step 2: Data Streams
      tl.to(linesRef.current, { opacity: 0.3, duration: 1.5, ease: "power2.in" }, "-=0.5")
        .to(linesRef.current, { 
          backgroundPosition: "0px 1000px", 
          duration: 6, 
          ease: "none", 
          repeat: 0 
        }, "-=1.5")

      // Step 3: Logo Decoding
      tl.to(logoRef.current, { 
        opacity: 1, 
        duration: 0.8, 
        onStart: () => {
          const chars = "YIDIDYA SHIMELIS";
          const decodeTl = gsap.timeline();
          logoRef.current.innerText = "";
          
          chars.split("").forEach((char, index) => {
            decodeTl.to({}, {
              duration: 0.08,
              onStart: () => {
                const scramble = "01#$%&@/<>[]{}";
                let scrambleCount = 0;
                const scrambler = setInterval(() => {
                  logoRef.current.innerText = logoRef.current.innerText.substring(0, index) + scramble[Math.floor(Math.random() * scramble.length)];
                  scrambleCount++;
                  if(scrambleCount > 5) {
                    clearInterval(scrambler);
                    logoRef.current.innerText = logoRef.current.innerText.substring(0, index) + char;
                  }
                }, 40);
              }
            }, index * 0.08);
          });
        }
      }, "-=4.5")

      // Step 4: Final Expansion
      tl.to(circleRef.current, { 
        scale: 6, 
        opacity: 0, 
        duration: 2, 
        ease: "expo.in" 
      }, "+=0.5")
        .to(containerRef.current, {
           backgroundColor: "#ffffff",
           duration: 0.2,
           ease: "power4.in"
        }, "-=0.5")
        .to(containerRef.current, {
           opacity: 0,
           duration: 0.5,
           ease: "power2.out"
        });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 noise pointer-events-none" />
      <div className="absolute inset-0 bg_grid_white opacity-10 pointer-events-none" />
      <div className="scanline" />
      
      {/* Perspectival Grid Lines */}
      <div 
        ref={linesRef}
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px)',
          backgroundSize: '100% 40px',
        }}
      />

      {/* Futuristic Orbit Circle */}
      <div 
        ref={circleRef}
        className="absolute w-[400px] h-[400px] border border-sky-500/20 rounded-full flex items-center justify-center"
      >
        <div className="absolute w-[95%] h-[95%] border border-sky-400/10 rounded-full animate-spin-slow" />
        <div className="absolute w-[110%] h-[110%] border-t border-sky-400/30 rounded-full animate-spin-fast" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <div 
          ref={textRef}
          className="text-[10px] tracking-[4px] uppercase text-sky-500/60 font-mono mb-4 h-4"
        ></div>
        <h1 
          ref={logoRef}
          className="text-4xl md:text-5xl font-bold tracking-[8px] text-white uppercase"
        ></h1>
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="w-12 h-[1px] bg-sky-500/20" />
          <div className="text-[10px] tracking-[2px] text-sky-500/40 font-mono">SE_FACULTY // ASTU</div>
          <div className="w-12 h-[1px] bg-sky-500/20" />
        </div>
      </div>

      {/* Bottom Data Badge */}
      <div className="absolute bottom-10 left-10 text-left font-mono text-[8px] text-sky-500/30 leading-loose uppercase">
        <p>Location: 08.5447° N, 39.2677° E</p>
        <p>Protocol: SSL_ENCRYPTED_AES256</p>
        <p>Environment: Production_Core</p>
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        .animate-spin-fast {
          animation: spin 3s linear infinite reverse;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default IntroAnimation;
