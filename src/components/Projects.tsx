'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

// Sample projects data
const projects = [
  {
    title: "E-commerce Platform",
    description: "A fully responsive e-commerce platform with product filtering, cart functionality, and payment processing integration.",
    image: "/placeholder-project.jpg",
    tags: ["React", "Next.js", "Stripe", "Tailwind CSS"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com/yourusername/project"
  },
  {
    title: "Task Management App",
    description: "A drag-and-drop task management application with team collaboration features and real-time updates.",
    image: "/placeholder-project.jpg",
    tags: ["React", "Firebase", "Redux", "Styled Components"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com/yourusername/project"
  },
  {
    title: "Portfolio Website",
    description: "A modern portfolio website (this one!) with smooth animations and responsive design.",
    image: "/placeholder-project.jpg",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com/yourusername/project"
  },
  {
    title: "Weather Dashboard",
    description: "A weather dashboard that shows current weather and forecasts for any location with interactive maps and charts.",
    image: "/placeholder-project.jpg",
    tags: ["JavaScript", "Chart.js", "Weather API", "SCSS"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com/yourusername/project"
  },
  {
    title: "Recipe Finder App",
    description: "An application that helps users find recipes based on available ingredients, with filtering by dietary restrictions.",
    image: "/placeholder-project.jpg",
    tags: ["Vue.js", "Node.js", "MongoDB", "Tailwind CSS"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com/yourusername/project"
  },
  {
    title: "Fitness Tracker",
    description: "A fitness tracking application that allows users to record workouts, track progress, and set goals.",
    image: "/placeholder-project.jpg",
    tags: ["React Native", "TypeScript", "Firebase", "Redux"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com/yourusername/project"
  }
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState("All");
  
  // Get all unique tags
  const allTags = ["All", ...new Set(projects.flatMap(project => project.tags))];
  
  // Filter projects based on selected tag
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(project => project.tags.includes(filter));
    
  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <motion.span 
              className="inline-block text-primary font-mono text-sm tracking-wider uppercase mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              My Work
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Recent Projects
            </motion.h2>
            <motion.div 
              className="w-20 h-1 bg-primary mx-auto rounded-full mb-8"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
            
            {/* Filter tabs */}
            <motion.div 
              className="flex flex-wrap justify-center gap-2 mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {allTags.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => setFilter(tag)}
                  className={`px-4 py-2 text-sm rounded-full transition-all ${
                    filter === tag 
                      ? 'bg-primary text-white' 
                      : 'bg-muted hover:bg-primary/10'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                className="group bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-foreground/50 text-sm">Project Image</span>
                  </div>
                  <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex gap-4">
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-background text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                      >
                        Live Demo
                      </a>
                      <a 
                        href={project.codeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-background text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                      >
                        Source Code
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-foreground/70 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 bg-muted text-foreground/70 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <p className="text-foreground/70">No projects found with the selected filter.</p>
            </motion.div>
          )}
          
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              View more projects on GitHub
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 