/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams, Navigate, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ChevronRight, 
  ShieldCheck, 
  Terminal as TerminalIcon, 
  Code2, 
  ExternalLink,
  Volume2,
  ArrowLeft,
  Layout as LayoutIcon,
  User,
  Home,
  Shield,
  Layers,
  Cpu,
  GraduationCap,
  FileText,
  Activity,
  Download,
  Lock,
  Search,
  Eye,
  Command,
  File,
  Globe
} from 'lucide-react';
import { PROJECTS, SKILLS, EDUCATION } from './constants.js';
import IntroAnimation from './components/IntroAnimation.jsx';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float as FloatDrei, PerspectiveCamera } from '@react-three/drei';

const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none opacity-15">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ambientLight intensity={0.1} />
        <Stars radius={100} depth={50} count={2000} factor={2} saturation={0} fade speed={0.3} />
        
        {/* Subtle floating tech shapes */}
        {[...Array(6)].map((_, i) => (
          <FloatDrei key={i} speed={1} rotationIntensity={1} floatIntensity={1} position={[(i - 2.5) * 4, (i % 2 === 0 ? 3 : -3), 0]}>
            <mesh>
              <icosahedronGeometry args={[0.8, 1]} />
              <meshStandardMaterial 
                color={i % 2 === 0 ? "#14f1ff" : "#fb923c"} 
                emissive={i % 2 === 0 ? "#38bdf8" : "#f97316"} 
                emissiveIntensity={1.2} 
                wireframe 
                transparent 
                opacity={0.06} 
              />
            </mesh>
          </FloatDrei>
        ))}
      </Canvas>
    </div>
  );
};

const GlassCard = ({ children, className = "" }) => (
  <div className={`glass_card p-6 ${className}`}>
    {children}
  </div>
);

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className="h-full"
  >
    {children}
  </motion.div>
);

const Header = () => {
  return (
    <header className="w-full mb-8">
      <div className="glass_card flex justify-between items-center px-8 py-4 border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-8">
          <Link to="/" className="group block">
            <h1 className="text-xl sm:text-2xl leading-tight font-light whitespace-normal transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
              YIDIDYA <span className="font-bold text_cyber_blue tracking-tighter">SHIMELIS</span>
            </h1>
          </Link>
          <div className="inner_border hidden md:flex items-center gap-3 py-1 px-2.5 bg-white/[0.02]">
            <div className="status_dot animate-pulse w-1.5 h-1.5" />
            <span className="text-[10px] tracking-[3px] uppercase opacity-60 font-bold font-mono">ACTIVE</span>
          </div>
        </div>
        
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <div className="inner_border hover:border-white/20 transition-all p-0.5">
              <a 
                href="https://github.com/moyilpapa" 
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                title="GitHub"
              >
                <Github size={14} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:inline">Source</span>
              </a>
            </div>
            <div className="inner_border hover:border-white/20 transition-all p-0.5">
              <a 
                href="https://www.linkedin.com/in/jedidiah-s-aa75a4355" 
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                title="LinkedIn"
              >
                <Linkedin size={14} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:inline">Network</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavigationDock = () => {
  const navLinks = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'About', path: '/about', icon: Shield },
    { label: 'Education', path: '/education', icon: GraduationCap },
    { label: 'Projects', path: '/projects', icon: Layers },
    { label: 'Resume', path: '/resume', icon: FileText },
  ];

  return (
    <div className="w-full mt-auto pt-6 flex justify-center">
      <div className="glass_card !overflow-visible p-1.5 border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)] bg-white/[0.04] rounded-2xl px-6">
        <nav className="flex items-center justify-center gap-3 sm:gap-6 py-1.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `group relative px-4 sm:px-7 py-2.5 rounded-lg transition-all duration-300 ${
                  isActive 
                  ? 'bg-white/10 text-white shadow-[inset_0_0_20px_rgba(56,189,248,0.2)]' 
                  : 'text-slate-500 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {({ isActive }) => (
                  <>
                    {/* Refined Tech Label Tooltip */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 pointer-events-none z-50 scale-90 group-hover:scale-100">
                      <div className="relative px-3 py-1 bg-[#020617]/95 backdrop-blur-md border border-blue-500/30 rounded inline-block overflow-hidden">
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-blue-400/50" />
                        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-blue-400/50" />
                        
                        <span className="relative text-[9px] font-black tracking-[3px] text-blue-400 uppercase whitespace-nowrap">
                          {link.label}
                        </span>
                      </div>
                      <div className="w-2 h-2 bg-blue-500/40 rotate-45 mx-auto -mt-[4px] shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                    </div>

                    <Icon size={20} className={`sm:size-[22px] transition-transform ${isActive ? 'scale-110' : 'group-hover:rotate-6'}`} />
                    {isActive && (
                      <motion.div 
                        layoutId="nav-active"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg_cyber_blue shadow-[0_-2px_10px_#38bdf8]"
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

const HomePage = () => (
  <PageTransition>
    <div className="glass_card p-8 sm:p-12 lg:p-20 h-full flex flex-col justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] blur-[120px] rounded-full pointer-events-none" style={{ backgroundColor: 'rgba(56, 189, 248, 0.03)' }} />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] blur-[100px] rounded-full pointer-events-none" style={{ backgroundColor: 'rgba(251, 146, 60, 0.03)' }} />
      
      <div className="grid lg:grid-cols-[1fr_auto] items-center gap-10 lg:gap-20 relative z-20">
        {/* Text Section (Visual Precedence on Left) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-10 leading-[1.05] tracking-tight">
            <span className="text_dynamic_cyber">Building Resilient</span> <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from_cyber_blue to-white font-light italic">Digital Systems</span>
            <span className="text-slate-400 font-light text-xl md:text-2xl block mt-6 tracking-[4px] uppercase italic">Hi, I'm Yididya Shimelis</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed mx-auto lg:mx-0 mb-12">
            Third-year software engineering student at ASTU specializing in 
            cybersecurity and efficient system architecture.
          </p>
        </motion.div>

        {/* Photo Section (Balanced on Right) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
          className="flex justify-center lg:justify-end order-1 lg:order-2"
        >
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 group">
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-blue-500/40" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-blue-500/40" />
            <div className="absolute inset-0 bg_cyber_blue/5 animate-pulse rounded-2xl" />
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 glass_card p-1 bg-white/[0.01]">
              <img 
                src="/profile.png" 
                alt="Yididya Shimelis"
                className="w-full h-full object-cover rounded-xl filter contrast-110 brightness-100 transition-all duration-700"
                referrerPolicy="no-referrer"
                style={{ filter: 'contrast(1.1) brightness(1.05)' }}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent h-px w-full top-0 animate-[scan_4s_linear_infinite] pointer-events-none opacity-30" />
              <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </PageTransition>
);

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <PageTransition>
      <div className="glass_card h-full flex flex-col overflow-hidden">
        {/* Sub-navigation */}
        <div className="flex border-b border-white/5 p-4 sm:p-6 gap-2">
          <button 
            onClick={() => setActiveTab('summary')}
            className={`inner_border flex-grow sm:flex-initial px-6 py-2 transition-all ${activeTab === 'summary' ? 'bg-white/10 text-white border-white/20' : 'text-slate-500 hover:text-white'}`}
          >
            <span className="text-[10px] uppercase font-bold tracking-[3px]">Snapshot</span>
          </button>
          <button 
            onClick={() => setActiveTab('specs')}
            className={`inner_border flex-grow sm:flex-initial px-6 py-2 transition-all ${activeTab === 'specs' ? 'bg-white/10 text-white border-white/20' : 'text-slate-500 hover:text-white'}`}
          >
            <span className="text-[10px] uppercase font-bold tracking-[3px]">Skills</span>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-10 sm:p-16 custom_scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'summary' ? (
              <motion.div
                key="summary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-16"
              >
                <div className="flex flex-col gap-12">
                   <div className="space-y-8 max-w-4xl">
                      <h2 className="text-4xl font-bold">Professional Summary</h2>
                      <p className="text-2xl text-slate-300 leading-relaxed italic border-l-4 border_cyber_blue pl-8">
                        "I am a software engineering student at ASTU with a passion for cybersecurity and system optimization."
                      </p>
                      <p className="text-slate-400 leading-relaxed text-xl">
                        I thrive on understanding the architecture of complex applications and finding ways to make them faster and more secure. 
                        I believe that great software is built on a foundation of clean code and robust security protocols. 
                        My work is focused on creating tools that empower users while maintaining strict data integrity.
                      </p>
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'University', value: 'ASTU' },
                    { label: 'Focus', value: 'Cybersecurity' },
                    { label: 'Level', value: '3rd Year SE' },
                    { label: 'Location', value: 'Adama, ET' }
                  ].map((item) => (
                    <div key={item.label} className="inner_border p-4">
                      <p className="text-[10px] text-slate-500 uppercase mb-1">{item.label}</p>
                      <p className="text-sm font-bold text_cyber_blue">{item.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="specs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-12"
              >
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold">Tech Specifications</h2>
                    <div className="glass_card p-6 bg-white/5 border-none">
                      <h3 className="text-[10px] tracking-[2px] uppercase text_cyber_blue font-bold mb-6">Specifications</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="inner_border">
                          <p className="text-[10px] text-slate-500 uppercase mb-1">Primary_OS</p>
                          <p className="text-sm font-semibold">Linux (Debian)</p>
                        </div>
                        <div className="inner_border">
                          <p className="text-[10px] text-slate-500 uppercase mb-1">Architecture</p>
                          <p className="text-sm font-semibold">x64 / ARM</p>
                        </div>
                        <div className="inner_border">
                          <p className="text-[10px] text-slate-500 uppercase mb-1">Core_Stack</p>
                          <p className="text-sm font-semibold">MERN / C++</p>
                        </div>
                        <div className="inner_border">
                          <p className="text-[10px] text-slate-500 uppercase mb-1">Protocol</p>
                          <p className="text-sm font-semibold">HTTPS / SSH</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-[11px] uppercase tracking-[3px] text-slate-500 font-bold mb-4 px-2">Core Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {SKILLS.map(s => (
                        <div key={s.name} className="inner_border flex items-center gap-3">
                          <s.icon size={14} className="text_cyber_blue" />
                          <span className="text-xs font-medium text-slate-300">{s.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};

const EducationPage = () => (
  <PageTransition>
    <div className="glass_card p-10 sm:p-16 h-full overflow-y-auto custom_scrollbar">
      <h2 className="text-4xl font-bold mb-12">Education</h2>
      <div className="space-y-16">
        {EDUCATION.map((edu) => (
          <div key={edu.school} className="relative pl-8 border-l border-white/10">
            <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 bg_cyber_blue rounded-full" />
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold">{edu.school}</h3>
                <p className="text_cyber_blue text-sm font-medium">{edu.degree}</p>
              </div>
              <div className="inner_border mt-1">
                <span className="text-xs text-slate-500 font-mono italic">{edu.period}</span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-2xl">{edu.description}</p>
          </div>
        ))}
      </div>
    </div>
  </PageTransition>
);

const ProjectListPage = () => (
  <PageTransition>
    <div className="grid md:grid-cols-2 gap-8 h-full auto-rows-max">
      {PROJECTS.map((project, index) => (
        <Link key={project.id} to={`/project/${project.id}`} className="block group">
          <div className="glass_card h-full p-10 group-hover:border-white/20 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-10">
                <div className="inner_border">
                  <span className="text-[10px] text-slate-500 font-mono uppercase">{project.type}</span>
                </div>
                <div className="inner_border">
                  <project.icon size={18} className="text-slate-500 group-hover:text_cyber_blue transition-colors" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="inner_border flex items-center gap-2 text_cyber_blue">
                <File size={12} />
                <span className="text-[10px] font-bold tracking-widest uppercase">File</span>
                <ChevronRight size={12} />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </PageTransition>
);

const ProjectDetailPage = () => {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.id === id);

  if (!project) return <Navigate to="/projects" />;

  return (
    <PageTransition>
      <div className="glass_card h-full p-10 sm:p-16 overflow-y-auto custom_scrollbar">
        <Link to="/projects" className="flex items-center gap-2 text-[10px] text-slate-500 hover:text-white font-bold transition-colors mb-12">
          <ArrowLeft size={12} /> BACK TO DIRECTORY
        </Link>
        <div className="absolute top-12 right-12 opacity-10 pointer-events-none">
          <Globe size={240} />
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-2xl w-full">
            <div className="inner_border w-fit mb-6">
              <span className="text_cyber_blue text-[10px] uppercase font-bold tracking-[2px]">{project.type}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 break-words">{project.title}</h2>
            <div className="flex flex-wrap gap-3 text-center items-center">
              {project.tech.map(t => (
                <span key={t} className="skill_pill border-white/10 text-slate-400">{t}</span>
              ))}
            </div>
          </div>
          <div className="p-10 rounded-2xl bg-white/5 border border-white/5 text_cyber_blue flex items-center justify-center">
            <project.icon size={64} />
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16">
          <div className="space-y-10">
            <p className="text-2xl leading-relaxed text-slate-300">
              {project.description}
            </p>
            <div className="p-10 border border-white/10 rounded-2xl bg-white/[0.02]">
              <h4 className="text-[10px] uppercase text-slate-500 font-bold mb-6 tracking-[2px]">Implementation_Notes</h4>
              <p className="text-lg text-slate-400 leading-relaxed">
                {project.implementation_note || `This project was developed with a focus on modular design and efficiency. Using ${project.tech[0]} enabled a fast development cycle while ensuring scalability for future updates.`}
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer"
              className="cyber_button_primary w-full flex items-center justify-center gap-2"
            >
              GitHub Source <Github size={16} />
            </a>
            <div className="p-6 border border-white/5 rounded-xl bg-white/5">
              <p className="text-[10px] uppercase text-slate-500 font-bold mb-2">Operational Status</p>
              <div className="flex items-center gap-2 text-sm font-bold capitalize">
                <div className={`w-2 h-2 rounded-full ${project.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`} />
                {project.status}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const ResumePage = () => (
  <PageTransition>
    <div className="glass_card p-10 sm:p-20 h-full flex flex-col justify-center items-center text-center">
      <div className="w-24 h-24 rounded-3xl flex items-center justify-center mb-10 border" style={{ backgroundColor: 'rgba(56, 189, 248, 0.1)', borderColor: 'rgba(56, 189, 248, 0.1)' }}>
        <FileText size={40} className="text_cyber_blue" />
      </div>
      <h2 className="text-5xl font-bold mb-6">Curriculum Vitae</h2>
      <p className="text-xl text-slate-400 max-w-md mb-12 leading-relaxed">
        Download my professional resume for a simplified view of my academic and technical journey.
      </p>
      <div className="flex gap-4">
        <button className="cyber_button_primary flex items-center gap-2">
          Download PDF <Download size={16} />
        </button>
      </div>
    </div>
  </PageTransition>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

export default function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen flex flex-col scroll-smooth overflow-x-hidden bg-transparent">
        <AmbientBackground />
        <AnimatePresence>
          {!isIntroComplete && (
            <IntroAnimation onComplete={() => setIsIntroComplete(true)} />
          )}
        </AnimatePresence>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isIntroComplete ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-4 sm:py-8 flex-grow flex flex-col relative"
        >
          <Header />

          <main className="relative flex-grow w-full md:min-h-[600px]">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/education" element={<EducationPage />} />
                <Route path="/projects" element={<ProjectListPage />} />
                <Route path="/project/:id" element={<ProjectDetailPage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </AnimatePresence>
          </main>
          
          <NavigationDock />
        </motion.div>

        <footer className="max-w-7xl mx-auto w-full px-4 sm:px-6 mb-10 opacity-40">
          <div className="glass_card flex flex-col sm:flex-row justify-between items-center py-4 px-6 sm:px-8 gap-4 text-center">
            <span className="text-[10px] font-mono whitespace-normal">ASTU // SOFTWARE ENGINEERING</span>
            <span className="text-[10px] font-mono whitespace-normal">© 2026 YIDIDYA SHIMELIS</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}
