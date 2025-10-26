import React, { useState, useRef, useEffect, useCallback } from 'react';
import gym_project_img from '../src/assets/gym-project-img.jpg';
import AI_image_project_img from '../src/assets/AI_project_img.png';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  School,
  Menu,
  X,
  Code,
  MonitorSmartphone,
  GitBranch,
  BrainCircuit,
  Award,
  Star
} from 'lucide-react';

const portfolioData = {
  name: "Yash Chandravanshi",
  headline: "FullStack Developer & Graphics Designer",
  location: "Rajasthan, India",
  email: "yash0111chandravanshi@gmail.com",
  links: {
    github: "https://github.com/githubyash2903",
    linkedin: "https://linkedin.com/in/yash-chandravanshi7",
  },
  about: "A passionate and results-driven B.Tech student specializing in Artificial Intelligence & Data Science. With hands-on experience in frontend development, I excel at building modern, responsive, and user-centric web applications. I'm actively seeking opportunities to apply my skills in a challenging and growth-oriented environment.",
  education: {
    degree: "B.Tech in Artificial Intelligence & Data Science",
    institution: "Arya College of Engineering and IT (RTU)",
    duration: "2022 – Present",
    gpa: "CGPA: 7.83/10 (till 5th semester)",
  },
  internship: {
    role: "Frontend Developer Intern",
    company: "Creative Upaay",
    location: "Udaipur",
    duration: "May 2025 – Jul 2025",
    description: [
      "Contributed to a client's full-stack MERN project, implementing UI features that improved usability by 25%.",
      "Collaborated with backend developers to integrate APIs and improve response times by 15%.",
    ],
  },
  skillCategories: [
    {
      title: "Programming Languages",
      icon: Code,
      skills: ["C++", "JavaScript"]
    },
    {
      title: "Web Development",
      icon: MonitorSmartphone,
      skills: ["HTML", "CSS", "Tailwind CSS", "React.js", "Node.js", "Express.js", "SQL", "MongoDB"]
    },
    {
      title: "Tools",
      icon: GitBranch,
      skills: ["Git", "GitHub"]
    },
    {
      title: "Core Competencies",
      icon: BrainCircuit,
      skills: ["Data Structures & Algorithms", "OOPs", "Responsive Design", "Problem Solving"]
    }
  ],
  projects: [
    {
      title: "AI Image Generation Website",
      description: "A full-stack MERN application that integrates an AI API to generate images from text prompts. Features authentication, gallery view, downloads, and user profile management.",
      tech: ["MERN Stack", "React", "Node.js", "MongoDB", "Express.js", "Tailwind CSS", "Vercel"],
      link: "https://github.com/githubyash2903/AI-Image_generator",
      live: null,
      imageUrl: AI_image_project_img
    },
    {
      title: "Gym Exercise Recommendation Website",
      description: "A React-based fitness app with 40+ modular components. Provides personalized workout recommendations based on muscle group, strength-level, and custom search.",
      tech: ["React.js", "React Hooks", "Modular Design", "GitHub"],
      link: "https://github.com/githubyash2903/GYM_project",
      live: "https://gym-rho-eight.vercel.app/" ,
      imageUrl: gym_project_img
      },
  ],
  achievements: [
    "Designed the complete launch collection for a new T-shirt brand (GENFUX), achieving 100+ early sales.",
    "Awarded 2nd Place in CLICK THE CAMPUS 2.0 (Arya Photography Club, 2025).",
  ],
  certifications: ["Programming Essentials in C (2023)", "C++ Spoken Tutorial (2023)", "MongoDB (2024)"]
};

const TiltGlassCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = (height / 2 - y) / (height / 2) * -10;
    const rotateY = (width / 2 - x) / (width / 2) * 10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    cardRef.current.style.transition = 'transform 0.1s linear';
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        bg-black/30 backdrop-blur-lg border border-indigo-500/30 rounded-2xl shadow-xl
        transition-all duration-500 ease-cubic
        ${className}
      `}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

const useScrollSpy = (sectionRefs, options) => {
  const [activeSection, setActiveSection] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    const { current: observer } = observerRef;
    sectionRefs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [sectionRefs, options]);

  return activeSection;
};

const Navbar = ({ activeSection, navLinks }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-xl bg-gray-900/80 border-b border-indigo-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a
            href="#home"
            className="flex-shrink-0 flex items-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400"
          >
            YC
          </a>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`
                  px-3 py-2 rounded-md text-sm font-medium transition-all duration-300
                  ${activeSection === link.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-indigo-900/50'
                  }
                `}
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-300 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-indigo-800/50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium
                  ${activeSection === link.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-indigo-900/50'
                  }
                `}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ sectionRef }) => (
  <section
    ref={sectionRef}
    id="home"
    className="min-h-screen flex items-center justify-center py-24 px-4 relative overflow-hidden"
  >
    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-600 rounded-full opacity-10 filter blur-3xl animate-pulse"></div>
    <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-600 rounded-full opacity-10 filter blur-3xl animate-pulse animation-delay-4000"></div>

    <TiltGlassCard className="p-8 md:p-12 text-center z-10">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
        <span className="block text-gray-200 mb-2">Hello, I'm</span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
          {portfolioData.name}
        </span>
      </h1>
      <p className="mt-6 text-xl md:text-2xl text-indigo-200 max-w-2xl mx-auto">
        {portfolioData.headline}
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <a
          href={portfolioData.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-lg hover:bg-indigo-500 transition-all duration-300 transform hover:scale-105"
        >
          <Linkedin size={20} />
          LinkedIn
        </a>
        <a
          href={portfolioData.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-gray-700/50 text-indigo-200 rounded-lg font-medium shadow-lg hover:bg-gray-600/50 transition-all duration-300 transform hover:scale-105"
        >
          <Github size={20} />
          GitHub
        </a>
        <a
          href={`mailto:${portfolioData.email}`}
          className="flex items-center gap-2 px-6 py-3 bg-gray-700/50 text-indigo-200 rounded-lg font-medium shadow-lg hover:bg-gray-600/50 transition-all duration-300 transform hover:scale-105"
        >
          <Mail size={20} />
          Contact Me
        </a>
      </div>
    </TiltGlassCard>
  </section>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 relative">
    <span className="relative z-10">{children}</span>
    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full z-0"></span>
  </h2>
);

const About = ({ sectionRef }) => (
  <section ref={sectionRef} id="about" className="py-24 px-4">
    <div className="max-w-7xl mx-auto">
      <SectionTitle>About Me</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <TiltGlassCard className="p-6 md:p-8 h-full">
            <p className="text-lg text-gray-200 mb-8 leading-relaxed">
              {portfolioData.about}
            </p>
            
            <h3 className="text-2xl font-semibold text-indigo-300 mb-4 flex items-center gap-2">
              <School size={24} />
              Education
            </h3>
            <div className="relative pl-6 border-l-2 border-indigo-700">
                <span className="absolute -left-[10px] top-1 w-4 h-4 rounded-full bg-indigo-400 border-2 border-gray-900"></span>
                <h4 className="text-lg font-semibold text-white">{portfolioData.education.degree}</h4>
                <p className="text-indigo-300">{portfolioData.education.institution}</p>
                <p className="text-gray-400 text-sm">{portfolioData.education.duration} | {portfolioData.education.gpa}</p>
            </div>

            <h3 className="text-2xl font-semibold text-indigo-300 mt-8 mb-4 flex items-center gap-2">
              <Award size={24} />
              Achievements
            </h3>
            <ul className="list-disc list-outside pl-5 space-y-2 text-gray-200">
              {portfolioData.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>

            <h3 className="text-2xl font-semibold text-indigo-300 mt-8 mb-4 flex items-center gap-2">
              <Star size={24} />
              Certifications
            </h3>
            <ul className="list-disc list-outside pl-5 space-y-2 text-gray-200">
              {portfolioData.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </TiltGlassCard>
        </div>
        
        <div className="md:col-span-2">
          <TiltGlassCard className="p-6 md:p-8 h-full">
            <h3 className="text-2xl font-semibold text-indigo-300 mb-6 flex items-center gap-2">
              <Code size={24} />
              Technical Skills
            </h3>
            <div className="space-y-6">
              {portfolioData.skillCategories.map((category) => (
                <div key={category.title}>
                  <h4 className="text-lg font-semibold text-indigo-200 mb-3 flex items-center gap-2">
                    <category.icon size={20} className="text-cyan-400" />
                    {category.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-indigo-900/70 border border-indigo-700 text-indigo-200 text-sm font-medium px-3 py-1.5 rounded-lg shadow-md hover:bg-indigo-800/70 hover:scale-105 transition-all duration-200 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TiltGlassCard>
        </div>
      </div>
    </div>
  </section>
);

const Experience = ({ sectionRef }) => (
  <section ref={sectionRef} id="experience" className="py-24 px-4 bg-gray-900/30">
    <div className="max-w-4xl mx-auto">
      <SectionTitle>Experience</SectionTitle>
      <TiltGlassCard className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
          <h3 className="text-2xl font-semibold text-white">{portfolioData.internship.role}</h3>
          <p className="text-lg text-indigo-300 font-medium">{portfolioData.internship.company}</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 text-gray-400 text-sm">
          <span>{portfolioData.internship.duration}</span>
          <span>{portfolioData.internship.location}</span>
        </div>
        <ul className="list-disc list-outside pl-5 space-y-2 text-gray-200">
          {portfolioData.internship.description.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </TiltGlassCard>
    </div>
  </section>
);

const Projects = ({ sectionRef }) => (
  <section ref={sectionRef} id="projects" className="py-24 px-4">
    <div className="max-w-7xl mx-auto">
      <SectionTitle>My Projects</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {portfolioData.projects.map((project, index) => (
          <TiltGlassCard key={index} className="flex flex-col h-full overflow-hidden">
            <div className="w-full h-48 md:h-56 overflow-hidden">
              <img 
                src={project.imageUrl}
                alt={`${project.title} screenshot`}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://placehold.co/600x400/1e293b/93c5fd?text=Image+Not+Found'; e.target.alt = 'Image not found'; }}
              />
            </div>

            <div className="p-6 md:p-8 flex-grow flex flex-col">
              <div className="flex-grow">
                <h3 className="text-2xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-indigo-800/50 text-indigo-200 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 mt-auto">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-indigo-300 hover:text-indigo-100 transition-colors"
                  >
                    <Github size={20} />
                    View Code
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-indigo-300 hover:text-indigo-100 transition-colors"
                  >
                    <ExternalLink size={20} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </TiltGlassCard>
        ))}
      </div>
    </div>
  </section>
);

const Contact = ({ sectionRef }) => (
  <section ref={sectionRef} id="contact" className="py-24 px-4 bg-gray-900/30">
    <div className="max-w-3xl mx-auto text-center">
      <SectionTitle>Get In Touch</SectionTitle>
      <TiltGlassCard className="p-8 md:p-12">
        <p className="text-lg text-gray-200 mb-8 max-w-xl mx-auto">
          I'm currently seeking new opportunities and my inbox is always open.
          Whether you have a question or just want to say hi, I'll try my best
          to get back to you!
        </p>
        <a
          href={`mailto:${portfolioData.email}`}
          className="inline-block px-10 py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-lg font-medium rounded-lg shadow-lg hover:from-indigo-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
        >
          Say Hello
        </a>
        <div className="flex justify-center gap-6 mt-10">
          <a
            href={portfolioData.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-300 transition-colors"
          >
            <Github size={32} />
          </a>
          <a
            href={portfolioData.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-300 transition-colors"
          >
            <Linkedin size={32} />
          </a>
          <a
            href={`mailto:${portfolioData.email}`}
            className="text-gray-400 hover:text-indigo-300 transition-colors"
          >
            <Mail size={32} />
          </a>
        </div>
      </TiltGlassCard>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-8 text-center text-gray-500">
    <p>&copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
    <p>Designed & Built by Yash Chandravanshi</p>
  </footer>
);

export default function App() {
  const navLinks = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'experience', name: 'Experience' },
    { id: 'projects', name: 'Projects' },
    { id: 'contact', name: 'Contact' },
  ];

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const sectionRefs = [homeRef, aboutRef, experienceRef, projectsRef, contactRef];

  const activeSection = useScrollSpy(sectionRefs, {
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0,
  });

  return (
    <div className="bg-gray-900 text-gray-100 font-sans leading-normal tracking-tight antialiased">
      <div className="fixed inset-0 -z-10 h-full w-full bg-gray-900 [background-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.3),rgba(255,255,255,0))]"></div>
      
      <Navbar activeSection={activeSection} navLinks={navLinks} />
      
      <main>
        <Hero sectionRef={homeRef} />
        <About sectionRef={aboutRef} />
        <Experience sectionRef={experienceRef} />
        <Projects sectionRef={projectsRef} />
        <Contact sectionRef={contactRef} />
      </main>

      <Footer />
    </div>
  );
}

