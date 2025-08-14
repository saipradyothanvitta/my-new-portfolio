import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ArrowRight, X, Menu, Code, Laptop, User, MessageCircle, Send, MessageSquare, FileText, Palette, GraduationCap } from 'lucide-react';

// --- Data Configuration ---
// Centralize personal data to make the portfolio easily customizable.
const portfolioData = {
  name: "Sai Pradyothan Vitta",
  githubUsername: "saipradyothanvitta",
  profileImage: "https://avatars.githubusercontent.com/u/189428240?s=400&u=be0ac2681cbab30ae52a8efc3e8e00c357099c8f&v=4",
  resumeUrl: "https://drive.google.com/file/d/1c1xeslSz8eGbEvxITpfQSlspsrwP_7Zv/view?usp=sharing",
  socialLinks: {
    github: "https://github.com/saipradyothanvitta",
    linkedin: "https://www.linkedin.com/in/sai-pradyothan-vitta-2359b9253/",
    email: "mailto:vittasaipradyothan@gmail.com",
  },
  themes: [
    { name: 'Default', primary: '#ef4444', secondary: '#06b6d4', glowPrimary: 'rgba(239, 68, 68, 0.5)', glowSecondary: 'rgba(6, 182, 212, 0.5)' },
    { name: 'Forest', primary: '#22c55e', secondary: '#f97316', glowPrimary: 'rgba(34, 197, 94, 0.5)', glowSecondary: 'rgba(249, 115, 22, 0.5)' },
    { name: 'Violet', primary: '#8b5cf6', secondary: '#ec4899', glowPrimary: 'rgba(139, 92, 246, 0.5)', glowSecondary: 'rgba(236, 72, 153, 0.5)' },
    { name: 'Ocean', primary: '#3b82f6', secondary: '#14b8a6', glowPrimary: 'rgba(59, 130, 246, 0.5)', glowSecondary: 'rgba(20, 184, 166, 0.5)' },
  ],
  bio: [
    "I'm a passionate and dedicated full-stack developer with a focus on building engaging, performant, and scalable web applications. With a strong foundation in modern web technologies, I love transforming complex problems into elegant, user-friendly solutions.",
    "My skills span the entire stack, from designing intuitive frontends with **React** and **Tailwind CSS** to building robust backends with **Node.js** and managing databases like **MongoDB** and **PostgreSQL**.",
    "I'm a firm believer in continuous learning and always eager to explore new tools and frameworks to stay at the forefront of technology."
  ],
  education: [
    {
      degree: "UG In Computer Science",
      institution: "Bennett University (B.Tech)/BU",
      dates: "2022-2026 | Pursuing",
      imageUrl: "https://www.reviewadda.com/assets/uploads/college/logo/logo1.png"
    }
  ],
  projects: [
    {
      id: 1,
      name: "Crazy-Chat",
      description: "Developed a full-stack, real-time chat application using the MERN stack (React, Node.js, Express) and Socket.IO to implement features like live messaging, typing indicators, and online user counts.",
      tags: ["React", "Node.js", "JavaScript", "React.js", "Socket.IO", "Express.js"],
      githubUrl: "https://github.com/saipradyothanvitta/crazy-chat-app",
      demoUrl: "https://crazy-chat.netlify.app/"
    },
    {
      id: 2,
      name: "Image-Captioning-Model",
      description: "Developed VisionGPT2, a hybrid image-captioning system that integrates a transformer-based Vision Transformer (ViT) encoder with GPT‑2 for language generation, enabling coherent, context-aware image descriptions.",
      tags: ["Python", "Pandas", "NumPy", "PyTorch"],
      githubUrl: "https://github.com/saipradyothanvitta/Image-Captioning-Model-Vision-Transformers-GPT-2-",
      demoUrl: "#"
    },
    {
      id: 3,
      name: "Project Three",
      description: "A mobile-first platform for local artists to showcase and sell their work. I built a dynamic gallery, user authentication with social logins, and integrated a payment gateway. This was a great opportunity to explore Next.js and Firebase for a modern, scalable architecture.",
      tags: ["Next.js", "Firebase", "Tailwind CSS"],
      githubUrl: "#",
      demoUrl: "#"
    },
    {
      id: 4,
      name: "Project Four",
      description: "A collaborative project management tool with real-time updates and task tracking. It features a Kanban board interface, live chat, and user permissions. The backend was built with Express and PostgreSQL to handle complex relational data.",
      tags: ["React", "Express", "PostgreSQL"],
      githubUrl: "#",
      demoUrl: "#"
    },
  ]
};

// --- Reusable Components ---

const IntroScreen = ({ onFinish }) => {
  const handleIntroClick = () => {
    const introElement = document.getElementById('intro-container');
    if (introElement) {
      introElement.classList.add('fade-out-effect');
      setTimeout(onFinish, 2000);
    }
  };

  return (
    <div id="intro-container" className="fixed top-0 left-0 w-full h-full bg-black flex flex-col items-center justify-center text-white z-[100] cursor-pointer" onClick={handleIntroClick}>
      <div className="futuristic-background"></div>
      <div className="text-center relative z-10 p-4">
        <p className="cinematic-subtitle">A Digital Production</p>
        <h1 className="cinematic-title">The Developer's Journey</h1>
        <p className="cinematic-tagline">Click to embark on a new experience.</p>
      </div>
    </div>
  );
};

const EducationCard = ({ education }) => (
  <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-6 border border-gray-800 hover:border-primary-color transition-colors duration-300">
    <img src={education.imageUrl} alt={`${education.institution} building`} className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-md" />
    <div className="w-full md:w-2/3 text-center md:text-left">
      <h3 className="text-xl sm:text-2xl font-bold text-white">{education.degree}</h3>
      <p className="text-base sm:text-lg text-gray-300 mt-1">{education.institution}</p>
      <p className="text-sm sm:text-md font-semibold text-primary-color mt-2">{education.dates}</p>
    </div>
  </div>
);

const ProjectCard = ({ project }) => (
  <div className="bg-gray-900 p-6 md:p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 group project-card-border">
    <div className="flex items-center mb-4">
      <Laptop className="text-primary-color mr-4" size={24} />
      <h3 className="text-xl md:text-2xl font-bold text-white">{project.name}</h3>
    </div>
    <p className="text-sm md:text-base text-gray-400 mb-6">{project.description}</p>
    <div className="flex flex-wrap gap-2 mb-6">
      {project.tags.map(tag => (
        <span key={tag} className="bg-gray-800 text-primary-color text-xs font-medium px-3 py-1 rounded-full project-card-tag transition-colors">
          {tag}
        </span>
      ))}
    </div>
    <div className="flex gap-4">
      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary-color hover:text-white transition-colors font-semibold">
        View Demo <ArrowRight className="ml-2 w-5 h-5" />
      </a>
      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary-color hover:text-white transition-colors font-semibold">
        <Github className="mr-2 w-5 h-5" /> Code
      </a>
    </div>
  </div>
);

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: `Hello! I am ${portfolioData.name}'s A.I. Assistant. Ask me anything about their projects, skills, or professional background.` }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatWindowRef = useRef(null);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    const newUserMessage = { role: 'user', text: userMessage };
    setChatHistory(prev => [...prev, newUserMessage]);
    const currentMessage = userMessage;
    setUserMessage('');
    setIsLoading(true);

    const prompt = `You are an AI assistant for ${portfolioData.name}. Answer questions based on this info:\nBio: ${portfolioData.bio.join(' ')}\nProjects: ${JSON.stringify(portfolioData.projects, null, 2)}\nHistory: ${chatHistory.map(m => `${m.role}: ${m.text}`).join('\n')}\nuser: ${currentMessage}\nai:`;

    try {
      const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
      const apiKey = ""; 
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
      
      let response;
      for (let i = 0; i < 3; i++) {
        try {
          response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
          if (response.ok) break;
        } catch (error) {
          console.error(`Attempt ${i + 1} failed: ${error}`);
          if (i < 2) await new Promise(resolve => setTimeout(resolve, 2 ** i * 1000));
        }
      }

      if (!response || !response.ok) throw new Error('API request failed.');

      const result = await response.json();
      const aiResponseText = result.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that.";
      setChatHistory(prev => [...prev, { role: 'ai', text: aiResponseText }]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setChatHistory(prev => [...prev, { role: 'ai', text: 'Oops! Something went wrong.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="flex-grow flex flex-col h-full">
      <div className="p-4 border-b border-primary-color">
        <h3 className="text-xl font-bold text-white flex items-center">A.I. Assistant ✨</h3>
      </div>
      <div ref={chatWindowRef} className="flex-grow overflow-y-auto space-y-4 p-4 custom-scrollbar">
        {chatHistory.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-xl max-w-[80%] ${message.role === 'user' ? 'bg-secondary-color text-white' : 'bg-gray-800 text-gray-200'}`}>
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && <div className="flex justify-start"><div className="p-3 rounded-xl bg-gray-800 text-gray-400 animate-pulse">Typing...</div></div>}
      </div>
      <form onSubmit={handleChatSubmit} className="p-4 flex gap-2 border-t border-primary-color">
        <input type="text" value={userMessage} onChange={(e) => setUserMessage(e.target.value)} placeholder="Ask me a question..." className="flex-grow px-4 py-2 bg-gray-800 border border-primary-color rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary-color transition-colors" disabled={isLoading} />
        <button type="submit" className="p-3 bg-gradient-to-r from-primary-color to-secondary-color text-white rounded-xl shadow-lg hover-gradient-shift focus:outline-none focus:ring-2 focus:ring-primary-color/50 transition-all duration-300" disabled={isLoading}>
          <Send size={24} />
        </button>
      </form>
    </div>
  );
};

const ThemeToggleButton = ({ themes, onThemeChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full text-gray-300 hover:text-white transition-colors">
                <Palette size={24} />
            </button>
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 p-2 bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700 flex gap-2">
                    {themes.map(theme => (
                        <button
                            key={theme.name}
                            title={theme.name}
                            onClick={() => {
                                onThemeChange(theme);
                                setIsOpen(false);
                            }}
                            className="w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
                            style={{ background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})` }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};


const PortfolioMain = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(portfolioData.themes[0]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', currentTheme.primary);
    root.style.setProperty('--secondary-color', currentTheme.secondary);
    root.style.setProperty('--glow-color-1', currentTheme.glowPrimary);
    root.style.setProperty('--glow-color-2', currentTheme.glowSecondary);
  }, [currentTheme]);

  const sections = [
    { id: 'hero', title: 'Home', icon: <Code size={24} /> },
    { id: 'about', title: 'About', icon: <User size={24} /> },
    { id: 'education', title: 'Education', icon: <GraduationCap size={24} /> },
    { id: 'projects', title: 'Projects', icon: <Laptop size={24} /> },
    { id: 'contact', title: 'Contact', icon: <MessageCircle size={24} /> },
  ];

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <div className="bg-gray-950 text-gray-200 min-h-screen font-sans isolate">
      <div className="futuristic-background"></div>
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950 bg-opacity-90 backdrop-blur-md shadow-lg transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <a href="#hero" className="flex items-center hover:scale-105 transition-transform duration-300" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
            <Code className="text-primary-color mr-2" size={28} />
            <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-color to-secondary-color">{portfolioData.name}</span>
          </a>
          
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {sections.map(section => (
              <button key={section.id} onClick={() => scrollToSection(section.id)} className="text-base lg:text-lg text-gray-300 hover:text-primary-color transition-colors font-medium relative group">
                {section.title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-color transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <ThemeToggleButton themes={portfolioData.themes} onThemeChange={setCurrentTheme} />
          </nav>
          
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggleButton themes={portfolioData.themes} onThemeChange={setCurrentTheme} />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-full transition-colors">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden bg-gray-950 shadow-md">
            <nav className="flex flex-col p-4 space-y-2">
              {sections.map(section => (
                <button key={section.id} onClick={() => scrollToSection(section.id)} className="text-left py-3 px-4 text-gray-300 hover:text-primary-color transition-colors text-lg font-medium flex items-center">
                  {section.icon}
                  <span className="ml-3">{section.title}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>
      
      <main className="pt-24 relative z-10">
        <section id="hero" className="container mx-auto px-4 sm:px-6 py-24 md:py-32 flex flex-col items-center justify-center min-h-screen text-center">
          <div className="max-w-4xl text-white">
            <p className="text-xl md:text-2xl lg:text-3xl font-light text-gray-400 mb-4 animate-fade-in-up">Hello, I'm</p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary-color to-secondary-color cinematic-hero-text-glow">
              {portfolioData.name}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-12 animate-fade-in-up delay-200">
              A <span className="font-bold text-primary-color">Full Stack Developer</span> crafting elegant and robust digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 animate-fade-in-up delay-400">
              <button onClick={() => scrollToSection('projects')} className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 border border-transparent text-base md:text-lg font-semibold rounded-full shadow-lg text-white bg-gradient-to-r from-primary-color to-secondary-color hover-gradient-shift focus:outline-none focus:ring-4 focus:ring-primary-color/50 transition-all duration-300">
                Explore My Work
              </button>
              <a href={portfolioData.resumeUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 border-2 border-secondary-color text-base md:text-lg font-semibold rounded-full text-secondary-color hover:bg-secondary-color/20 transition-colors duration-300">
                My Resume
              </a>
              <button onClick={() => scrollToSection('contact')} className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 border-2 border-primary-color text-base md:text-lg font-semibold rounded-full text-primary-color hover:bg-primary-color/20 transition-colors duration-300">
                Let's Connect
              </button>
            </div>
          </div>
        </section>

        <section id="about" className="container mx-auto px-4 sm:px-6 py-24 md:py-32">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 md:mb-16">About Me</h2>
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 md:gap-16 max-w-5xl mx-auto">
            <div className="w-full lg:w-1/3 flex justify-center">
              <div className="w-56 h-56 md:w-72 md:h-72 relative group">
                <div className="absolute w-full h-full bg-gradient-to-br from-primary-color to-secondary-color rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img src={portfolioData.profileImage} alt={`Profile of ${portfolioData.name}`} className="relative w-full h-full object-cover rounded-full shadow-2xl transition-transform duration-500 hover:scale-105" />
              </div>
            </div>
            <div className="w-full lg:w-2/3 text-base md:text-lg text-gray-400 flex flex-col justify-center h-full text-center lg:text-left">
              {portfolioData.bio.map((p, i) => <p key={i} className="mb-6 last:mb-0 leading-relaxed" dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary-color font-semibold">$1</strong>') }} />)}
              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                <a href={portfolioData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 font-semibold text-gray-200 bg-gray-800/50 border-2 border-gray-700 rounded-full hover:bg-gray-700/50 hover:border-primary-color transition-all duration-300">
                  <Github size={20} />
                  GitHub
                </a>
                <a href={portfolioData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 font-semibold text-gray-200 bg-gray-800/50 border-2 border-gray-700 rounded-full hover:bg-gray-700/50 hover:border-primary-color transition-all duration-300">
                  <Linkedin size={20} />
                  LinkedIn
                </a>
                <a href={portfolioData.socialLinks.email} className="inline-flex items-center gap-2 px-5 py-3 font-semibold text-gray-200 bg-gray-800/50 border-2 border-gray-700 rounded-full hover:bg-gray-700/50 hover:border-primary-color transition-all duration-300">
                  <Mail size={20} />
                  Email
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="container mx-auto px-4 sm:px-6 py-24 md:py-32">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-3">
              <GraduationCap className="text-primary-color" size={36} />
              My Education
            </h2>
            <p className="text-gray-400 mt-4 italic max-w-2xl mx-auto">"Education is not the learning of facts, but the training of the mind to think."</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            {portfolioData.education.map((edu, index) => (
              <EducationCard key={index} education={edu} />
            ))}
          </div>
        </section>

        <section id="projects" className="container mx-auto px-4 sm:px-6 py-24 md:py-32">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 md:mb-16">My Recent Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {portfolioData.projects.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </section>
        
        <section id="contact" className="container mx-auto px-4 sm:px-6 py-24 md:py-32">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 md:mb-16">Let's Build Something Together</h2>
          <div className="max-w-xl mx-auto bg-gray-900 p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-800">
            <p className="text-center text-gray-400 mb-6 md:mb-8 text-base md:text-lg">I'm always open to new opportunities. Send me a message, and let's connect.</p>
            <form action={`https://formspree.io/f/${portfolioData.githubUsername}`} method="POST">
              <div className="mb-4 md:mb-6"><label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label><input type="text" id="name" name="name" className="w-full px-4 py-2 md:px-5 md:py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-color transition-colors" required /></div>
              <div className="mb-4 md:mb-6"><label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label><input type="email" id="email" name="email" className="w-full px-4 py-2 md:px-5 md:py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-color transition-colors" required /></div>
              <div className="mb-6 md:mb-8"><label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label><textarea id="message" name="message" rows="5" className="w-full px-4 py-2 md:px-5 md:py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-color transition-colors" required></textarea></div>
              <button type="submit" className="w-full px-6 py-3 md:px-8 md:py-4 border border-transparent text-base md:text-lg font-semibold rounded-full shadow-lg text-white bg-gradient-to-r from-primary-color to-secondary-color hover-gradient-shift focus:outline-none focus:ring-4 focus:ring-primary-color/50 transition-all duration-300">Send Message</button>
            </form>
          </div>
        </section>
        
        <footer className="bg-gray-950 py-8 md:py-10 border-t border-gray-900">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <p className="text-gray-500 text-sm md:text-base">&copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end">
        <button onClick={() => setIsChatOpen(!isChatOpen)} className="bg-gradient-to-r from-primary-color to-secondary-color p-4 rounded-full text-white shadow-xl hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-primary-color/50">
          {isChatOpen ? <X size={28} /> : <MessageSquare size={28} />}
        </button>
        <div className={`mt-4 w-[calc(100vw-2rem)] max-w-sm sm:w-80 h-[450px] bg-gray-900 rounded-2xl shadow-2xl flex flex-col border border-primary-color transform transition-all duration-500 ease-in-out ${isChatOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10 pointer-events-none'}`}>
          {isChatOpen && <Chatbot />}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isIntroFinished, setIsIntroFinished] = useState(false);

  useEffect(() => {
    const styleId = 'portfolio-custom-styles';
    if (document.getElementById(styleId)) return;

    const customCss = `
      :root {
        --primary-color: #ef4444;
        --secondary-color: #06b6d4;
        --glow-color-1: rgba(239, 68, 68, 0.1);
        --glow-color-2: rgba(6, 182, 212, 0.1);
      }
      button, a {
        touch-action: manipulation;
      }
      .text-primary-color { color: var(--primary-color); }
      .text-secondary-color { color: var(--secondary-color); }
      .bg-primary-color { background-color: var(--primary-color); }
      .bg-secondary-color { background-color: var(--secondary-color); }
      .border-primary-color { border-color: var(--primary-color); }
      .border-secondary-color { border-color: var(--secondary-color); }
      .hover\\:text-primary-color:hover { color: var(--primary-color); }
      .hover\\:border-primary-color:hover { border-color: var(--primary-color); }
      .from-primary-color { --tw-gradient-from: var(--primary-color); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(239, 68, 68, 0)); }
      .to-secondary-color { --tw-gradient-to: var(--secondary-color); }
      .focus\\:ring-primary-color:focus { --tw-ring-color: var(--primary-color); }
      .focus\\:ring-secondary-color:focus { --tw-ring-color: var(--secondary-color); }
      .focus\\:ring-primary-color\\/50:focus { --tw-ring-color: var(--primary-color); }
      .hover\\:bg-primary-color\\/20:hover { background-color: color-mix(in srgb, var(--primary-color) 20%, transparent); }
      .hover\\:bg-secondary-color\\/20:hover { background-color: color-mix(in srgb, var(--secondary-color) 20%, transparent); }
      .project-card-border { border: 1px solid transparent; }
      .project-card-border:hover { border-color: var(--primary-color); }
      .project-card-tag.group-hover\\:bg-red-900:hover { background-color: color-mix(in srgb, var(--primary-color) 20%, #111827); }
      .hover-gradient-shift:hover { background-position: 100% 0; }
      .bg-gradient-to-r.from-primary-color.to-secondary-color { background-size: 200% auto; transition: background-position 0.5s ease; }
      .futuristic-background {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: #0a0a0a;
        z-index: -10;
        overflow: hidden;
        background-image:
          repeating-conic-gradient(from 0deg at 50% 50%, var(--glow-color-1) 0%, transparent 1%, transparent 10%, var(--glow-color-2) 11%, transparent 12%, transparent 20%),
          radial-gradient(ellipse at center, rgba(0, 0, 0, 0.8) 0%, transparent 70%);
        animation: futuristic-pulse 10s infinite alternate, rotate-gradient 30s linear infinite;
      }
      @keyframes futuristic-pulse { 0%, 100% { opacity: 0.8; } 50% { opacity: 1; } }
      @keyframes rotate-gradient { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .cinematic-hero-text-glow {
        transition: text-shadow 0.3s ease-in-out;
        text-shadow: 0 0 10px var(--glow-color-1), 0 0 20px var(--glow-color-2), 0 0 30px var(--glow-color-1);
      }
      .cinematic-hero-text-glow:hover {
        text-shadow: 0 0 20px color-mix(in srgb, var(--glow-color-1) 80%, white), 0 0 40px color-mix(in srgb, var(--glow-color-2) 80%, white), 0 0 60px color-mix(in srgb, var(--glow-color-1) 60%, white);
      }
      .cinematic-title { font-family: 'Times New Roman', Times, serif; font-size: clamp(2.5rem, 10vw, 8rem); font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; animation: fade-in-up-title 2s ease-out forwards; opacity: 0; text-shadow: 2px 2px 8px rgba(0,0,0,0.7); }
      .cinematic-subtitle { font-family: 'Inter', sans-serif; font-size: clamp(1rem, 4vw, 1.5rem); letter-spacing: 0.3em; opacity: 0; animation: fade-in-up-subtitle 1.5s ease-out 0.5s forwards; }
      .cinematic-tagline { font-family: 'Inter', sans-serif; font-size: clamp(0.8rem, 3vw, 1rem); letter-spacing: 0.2em; margin-top: 2rem; opacity: 0; animation: fade-in-up-tagline 1.5s ease-out 1s forwards, pulse 1.5s infinite 2.5s; }
      @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.05); opacity: 1; } }
      @keyframes fade-in-up-title { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      @keyframes fade-in-up-subtitle { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      @keyframes fade-in-up-tagline { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 0.8; } }
      .fade-out-effect { animation: fade-out-transition 2s ease-out forwards; }
      @keyframes fade-out-transition { from { opacity: 1; } to { opacity: 0; visibility: hidden; } }
      @keyframes fade-in-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
      .animate-fade-in-up.delay-200 { animation-delay: 0.2s; }
      .animate-fade-in-up.delay-400 { animation-delay: 0.4s; }
      .custom-scrollbar::-webkit-scrollbar { width: 8px; }
      .custom-scrollbar::-webkit-scrollbar-track { background: #1e1e1e; border-radius: 10px; }
      .custom-scrollbar::-webkit-scrollbar-thumb { background: #4a4a4a; border-radius: 10px; }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6a6a6a; }
    `;
    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.innerHTML = customCss;
    document.head.appendChild(styleElement);
    
    return () => {
      const el = document.getElementById(styleId);
      if (el) {
        document.head.removeChild(el);
      }
    };
  }, []);

  return (
    <>
      {!isIntroFinished ? (
        <IntroScreen onFinish={() => setIsIntroFinished(true)} />
      ) : (
        <PortfolioMain />
      )}
    </>
  );
};

export default App;
