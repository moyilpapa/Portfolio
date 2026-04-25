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
  Menu,
  X,
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

const Header = ({ onOpenMenu }) => {
  return (
    <header className="col-span-2 mb-2">
      <div className="glass_card flex justify-between items-center px-6 py-3">
        <div className="inner_border flex items-center gap-3">
          <div className="status_dot animate-pulse" />
          <span className="text-[10px] tracking-[2px] uppercase opacity-40 font-bold">Status: Online</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="inner_border flex items-center gap-2">
              <a 
                href="https://github.com/moyilpapa" 
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github size={16} />
              </a>
            </div>
            <div className="inner_border flex items-center gap-2">
              <a 
                href="https://www.linkedin.com/in/jedidiah-s-aa75a4355" 
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
          <button 
            className="md:hidden p-2 text-white inner_border"
            onClick={onOpenMenu}
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

const Sidebar = () => {
  const navLinks = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'About', path: '/about', icon: Shield },
    { label: 'Education', path: '/education', icon: GraduationCap },
    { label: 'Projects', path: '/projects', icon: Layers },
    { label: 'Resume', path: '/resume', icon: FileText },
  ];

  return (
    <aside className="sidebar flex flex-col gap-6 h-full">
      <div className="glass_card p-6">
        <Link to="/" className="block">
          <h1 className="text-[26px] sm:text-[28px] leading-tight font-light mb-1">
            YIDIDYA<br/><span className="font-bold text_cyber_blue">SHIMELIS</span>
          </h1>
        </Link>
        <div className="inner_border w-fit mt-2">
          <p className="text-[10px] uppercase tracking-[1px] text_cyber_blue font-bold">Software Engineer</p>
        </div>
      </div>

      <div className="glass_card flex-grow py-4 px-3">
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink 
                key={link.path}
                to={link.path}
                className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl transition-all border ${
                  isActive 
                  ? 'bg-white/10 text-white border-white/10' 
                  : 'text-slate-400 border-transparent hover:text-white hover:bg-white/5 hover:border-white/5'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
        
        <div className="mt-10 pt-10 border-t border-white/5 px-4">
          <div className="flex flex-col gap-4">
            <div className="inner_border overflow-hidden">
              <a href="mailto:yididyashimelis@gmail.com" className="text-xs text-slate-500 hover:text-white transition-colors truncate block">
                yididyashimelis@gmail.com
              </a>
            </div>
            <div className="flex gap-4">
              <a href="https://github.com/moyilpapa" target="_blank" rel="noreferrer" className="inner_border text-slate-400 hover:text_cyber_blue transition-colors" title="GitHub">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/jedidiah-s-aa75a4355" target="_blank" rel="noreferrer" className="inner_border text-slate-400 hover:text_cyber_blue transition-colors" title="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

const HomePage = () => (
  <PageTransition>
    <div className="glass_card p-8 sm:p-12 h-full flex flex-col justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 blur-[120px] rounded-full pointer-events-none" style={{ backgroundColor: 'rgba(56, 189, 248, 0.05)' }} />
      <div className="inner_border w-fit mb-4">
        <span className="text_cyber_blue text-[10px] tracking-[2px] uppercase font-bold opacity-60">Portfolio Overview</span>
      </div>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight break-words">
        <span className="text_dynamic_cyber">Building Resilient</span> <br/> 
        <span className="text-transparent bg-clip-text bg-gradient-to-r from_cyber_blue to-white font-light italic">Digital Systems</span>
      </h2>
      <p className="text-lg text-slate-400 max-w-lg leading-relaxed mb-10">
        Third-year software engineering student focused on cybersecurity 
        and high-performance architecture. Currently exploring the intersection 
        of AI-driven productivity and infrastructure safety.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link to="/projects" className="cyber_button_primary">
          View Projects
        </Link>
        <Link to="/about" className="cyber_button_outline">
          About Me
        </Link>
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
            <span className="text-[10px] uppercase font-bold tracking-widest">About</span>
          </button>
          <button 
            onClick={() => setActiveTab('specs')}
            className={`inner_border flex-grow sm:flex-initial px-6 py-2 transition-all ${activeTab === 'specs' ? 'bg-white/10 text-white border-white/20' : 'text-slate-500 hover:text-white'}`}
          >
            <span className="text-[10px] uppercase font-bold tracking-widest">Skill</span>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 sm:p-10 custom_scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'summary' ? (
              <motion.div
                key="summary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-12"
              >
                <div>
                   <h2 className="text-3xl font-bold mb-8">Professional Summary</h2>
                   <div className="space-y-6 max-w-2xl">
                      <p className="text-lg text-slate-300 leading-relaxed italic">
                        "I am a software engineering student at ASTU with a passion for cybersecurity and system optimization."
                      </p>
                      <p className="text-slate-400 leading-relaxed">
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
                    <h3 className="text-[11px] uppercase tracking-[3px] text-slate-500 font-bold mb-4 px-2">Core Arsenal</h3>
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
    <div className="glass_card p-10 h-full overflow-y-auto custom_scrollbar">
      <h2 className="text-3xl font-bold mb-10">Education</h2>
      <div className="space-y-12">
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
    <div className="grid md:grid-cols-2 gap-6 h-full auto-rows-max">
      {PROJECTS.map((project, index) => (
        <Link key={project.id} to={`/project/${project.id}`} className="block group">
          <div className="glass_card h-full p-8 group-hover:border-white/20 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-8">
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
      <div className="glass_card h-full p-6 sm:p-10 overflow-y-auto custom_scrollbar">
        <Link to="/projects" className="flex items-center gap-2 text-[10px] text-slate-500 hover:text-white font-bold transition-colors mb-10">
          <ArrowLeft size={12} /> BACK TO DIRECTORY
        </Link>
        <div className="absolute top-10 right-10 opacity-10 pointer-events-none">
          <Globe size={180} />
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          <div className="max-w-2xl w-full">
            <div className="inner_border w-fit mb-4">
              <span className="text_cyber_blue text-[10px] uppercase font-bold tracking-[2px]">{project.type}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 break-words">{project.title}</h2>
            <div className="flex flex-wrap gap-2 text-center items-center">
              {project.tech.map(t => (
                <span key={t} className="skill_pill opacity-60">{t}</span>
              ))}
            </div>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/5 text_cyber_blue flex items-center justify-center">
            <project.icon size={48} />
          </div>
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-12">
          <div className="space-y-8">
            <p className="text-xl leading-relaxed text-slate-300">
              {project.description}
            </p>
            <div className="p-8 border border-white/5 rounded-2xl bg-white/5">
              <h4 className="text-[10px] uppercase text-slate-500 font-bold mb-4">Implementation Notes</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
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
    <div className="glass_card p-12 h-full flex flex-col justify-center items-center text-center">
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 border" style={{ backgroundColor: 'rgba(56, 189, 248, 0.1)', borderColor: 'rgba(56, 189, 248, 0.1)' }}>
        <FileText size={36} className="text_cyber_blue" />
      </div>
      <h2 className="text-4xl font-bold mb-4">Curriculum Vitae</h2>
      <p className="text-slate-400 max-w-sm mb-10 leading-relaxed">
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

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  return (
    <Router>
      <div className="relative min-h-screen flex flex-col scroll-smooth overflow-x-hidden bg-transparent">
        <AnimatePresence>
          {!isIntroComplete && (
            <IntroAnimation onComplete={() => setIsIntroComplete(true)} />
          )}
        </AnimatePresence>
        
        <div className={`max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-10 flex-grow flex flex-col md:grid md:grid-cols-[280px_1fr] md:grid-rows-[auto_1fr] gap-6 relative transition-opacity duration-1000 ${isIntroComplete ? 'opacity-100' : 'opacity-0'}`}>
          
          <Header onOpenMenu={() => setIsMenuOpen(true)} />

          <div className="md:contents hidden">
            <Sidebar />
          </div>

          <main className="relative min-h-[500px]">
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
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="fixed inset-0 z-50 bg_cyber_navy flex flex-col md:hidden p-8"
            >
              <div className="flex justify-between items-center mb-12 glass_card py-3 px-6">
                <span className="text-[10px] tracking-[4px] uppercase font-bold text_cyber_blue">Navigation</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-white inner_border p-2"><X size={20} /></button>
              </div>
              <div className="flex flex-col gap-4">
                {['Home', 'About', 'Education', 'Projects', 'Resume'].map((item) => (
                  <Link 
                    key={item}
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    onClick={() => setIsMenuOpen(false)} 
                    className="inner_border py-4 px-6 text-2xl font-light hover:text_cyber_blue hover:bg-white/10 transition-all block w-full"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
