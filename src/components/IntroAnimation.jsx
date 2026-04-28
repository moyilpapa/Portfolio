import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const IntroAnimation = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1.2,
            ease: "expo.inOut",
            onComplete: onComplete
          });
        }
      });

      gsap.set(textRef.current, { opacity: 0, y: 20 });

      tl.to(containerRef.current, { opacity: 1, duration: 1 })
        .to(textRef.current, { 
          opacity: 1, 
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          onStart: () => {
            const words = ["INITIALIZING", "CONNECTING", "ASCENDING"];
            let idx = 0;
            
            const startDecoding = () => {
              if (idx < words.length) {
                const target = words[idx];
                const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
                let iteration = 0;
                
                const interval = setInterval(() => {
                  if (!textRef.current) return;
                  textRef.current.innerText = target
                    .split("")
                    .map((char, index) => {
                      if (index < iteration) return target[index];
                      return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("");
                  
                  if (iteration >= target.length) {
                    clearInterval(interval);
                    idx++;
                    if (idx < words.length) {
                      setTimeout(startDecoding, 1200);
                    }
                  }
                  iteration += 1/3;
                }, 30);
              }
            };
            startDecoding();
          }
        })
        .to(textRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power4.in",
          delay: 4
        });
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#020617] overflow-hidden flex flex-col items-center justify-center px-4"
    >
      <div className="relative z-20 text-center max-w-xl w-full">
        <div className="mb-8 overflow-hidden">
          <div className="h-[1px] w-0 bg-sky-400/50 mx-auto" id="loading-bar" />
        </div>
        <h1 
          ref={textRef}
          className="text-xl sm:text-3xl font-bold tracking-[0.5em] uppercase text-white font-mono break-all sm:break-normal"
          style={{ textShadow: '0 0 20px rgba(56, 189, 248, 0.6)' }}
        ></h1>
        <div className="mt-12 flex gap-6 justify-center opacity-20">
          <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />
          <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse [animation-delay:0.3s]" />
          <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse [animation-delay:0.6s]" />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        <div className="w-full h-px bg-sky-400/10 shadow-[0_0_15px_#38bdf8] animate-[scan_10s_linear_infinite]" />
      </div>

      {/* Decorative corners */}
      <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-sky-400/30" />
      <div className="absolute top-12 right-12 w-8 h-8 border-t border-r border-sky-400/30" />
      <div className="absolute bottom-12 left-12 w-8 h-8 border-b border-l border-sky-400/30" />
      <div className="absolute bottom-12 right-12 w-8 h-8 border-b border-r border-sky-400/30" />
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-[40]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3 %3Cfilter id='noiseFilter'%3 %3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3 %3C/filter%3 %3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3 %3C/svg%3E")` }} />
      
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
};

export default IntroAnimation;
