/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Code2, Bug, Network, Shield, Cpu, Terminal, Users, Layers, Layout, MessageCircle, Music, Sun, Lightbulb, GraduationCap, Cpu as Hardware, Globe, Lock } from 'lucide-react';

export const PROJECTS = [
  {
    id: 'pandior',
    title: 'Pandior',
    description: 'A modern web application focusing on clean architecture and high-performance user interfaces.',
    tech: ['TypeScript', 'HTML', 'CSS'],
    github: 'https://github.com/moyilpapa',
    icon: Layout,
    accent: 'blue',
    status: 'active',
    type: 'Web Application',
    implementation_note: 'Built with a modern TypeScript foundation, Pandior emphasizes modular design and type-safe development to deliver a seamless user experience through a polished HTML/CSS frontend.'
  },
  {
    id: 'liosus',
    title: 'LIOSUS',
    description: 'A story narrater web app designed for high-fidelity audio synthesis. Developed to transform complex text into human-like speech patterns.',
    tech: ['TypeScript', 'HTML', 'CSS'],
    github: 'https://github.com/moyilpapa/LIOSUS',
    icon: Music,
    accent: 'blue',
    status: 'stable',
    type: 'Web Application',
    implementation_note: 'A narrative-driven web application built using TypeScript. This project focuses on high-fidelity audio synthesis through a clean interface, optimized for seamless storytelling.'
  },
  {
    id: 'csec_astu',
    title: 'CSEC_ASTU',
    description: 'A data science research project exploring club analytics and security patterns within the ASTU ecosystem.',
    tech: ['Python', 'Pandas', 'Data Science'],
    github: 'https://github.com/moyilpapa/CSEC_ASTU',
    icon: Shield,
    accent: 'red',
    status: 'active',
    type: 'Data Science',
    implementation_note: 'This project leverages Python and data science libraries like Pandas to analyze club engagement and security trends, providing actionable insights for the CSEC-ASTU division.'
  },
  {
    id: 'solar_system',
    title: 'Solar_System',
    description: 'An interactive simulation of planetary motion. Uses mathematical modeling to simulate the orbits of celestial bodies.',
    tech: ['Python', 'CS1 Graphics', 'Math'],
    github: 'https://github.com/moyilpapa/Solar_System',
    icon: Sun,
    accent: 'blue',
    status: 'stable',
    type: 'Python Simulation',
    implementation_note: 'Implemented using Python and the CS1 graphics library, this simulation focuses on the mathematical accuracy of orbital mechanics and planetary interactions in a 2D environment.'
  },
  {
    id: 'simple_chat',
    title: 'Simple Chat App',
    description: 'A multi-user desktop chat application designed for real-time peer communication.',
    tech: ['Java', 'Swing', 'Networking'],
    github: 'https://github.com/moyilpapa/Simple-Chat-App-',
    icon: MessageCircle,
    accent: 'red',
    status: 'stable',
    type: 'Desktop Application',
    implementation_note: 'A Java-based desktop application utilizing the Swing library for the graphical interface and standard networking APIs to handle real-time message broadcasting between multiple clients.'
  },
  {
    id: 'java_servlet',
    title: 'JavaServlet',
    description: 'An implementation of Java Servlets for server-side processing. Demonstrates backend architecture and request handling.',
    tech: ['Java', 'Servlet API', 'Tomcat'],
    github: 'https://github.com/moyilpapa/JavaServlet-',
    icon: Code2,
    accent: 'blue',
    status: 'archived',
    type: 'Backend System',
    implementation_note: 'Built to explore Java-based server-side development using the Servlet API and Apache Tomcat. It provides a foundational understanding of how backends handle HTTP requests.'
  },
];

export const SKILLS = [
  { name: 'Python', category: 'Programming', icon: Code2 },
  { name: 'Data Science', category: 'Analysis', icon: Layers },
  { name: 'Mathematics', category: 'Science', icon: Lightbulb },
  { name: 'C++', category: 'Programming', icon: Terminal },
  { name: 'Java', category: 'Programming', icon: Hardware },
  { name: 'Networking', category: 'Core', icon: Network },
  { name: 'OSINT', category: 'Security', icon: Shield },
  { name: 'Linux', category: 'OS', icon: Cpu },
  { name: 'Android', category: 'Mobile', icon: Layout },
  { name: 'Encryption', category: 'Security', icon: Lock },
];

export const EDUCATION = [
  {
    school: 'Adama Science and Technology University (ASTU)',
    degree: 'B.Sc. in Software Engineering',
    period: '2023 // Present',
    description: 'Third-year student focusing on software architecture, algorithms, and advanced cybersecurity protocols.',
    status: 'Current'
  }
];
