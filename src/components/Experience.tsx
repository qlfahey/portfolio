'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// Sample work experience data
const experiences = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    period: "2022 - Present",
    description: "Lead the frontend development team, implementing modern React applications with Next.js. Improved site performance by 40% and reduced build times by implementing efficient state management and code splitting strategies.",
    skills: ["React", "Next.js", "TypeScript", "Redux", "Tailwind CSS"]
  },
  {
    title: "Frontend Developer",
    company: "Digital Solutions Group",
    period: "2020 - 2022",
    description: "Developed responsive web applications using React and Vue.js. Collaborated with designers to implement pixel-perfect UI components and improved accessibility across all projects.",
    skills: ["React", "Vue.js", "JavaScript", "SCSS", "Webpack"]
  },
  {
    title: "Web Developer",
    company: "Creative Agency XYZ",
    period: "2018 - 2020",
    description: "Created interactive websites for various clients across different industries. Worked closely with the design team to ensure high-quality implementation of visual concepts.",
    skills: ["HTML", "CSS", "JavaScript", "jQuery", "PHP"]
  },
  {
    title: "Junior Developer Intern",
    company: "Startup Ventures",
    period: "2017 - 2018",
    description: "Assisted in the development of web applications and learned modern development practices. Gained hands-on experience with frontend frameworks and version control systems.",
    skills: ["HTML", "CSS", "JavaScript", "Git"]
  }
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section id="experience" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.span 
              className="inline-block text-primary font-mono text-sm tracking-wider uppercase mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              My Journey
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Professional Experience
            </motion.h2>
            <motion.div 
              className="w-20 h-1 bg-primary mx-auto rounded-full"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </div>
          
          <div className="relative">
            {/* Timeline bar */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 w-1 h-full bg-primary/20 rounded-full hidden md:block" />
            
            {/* Experience items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="relative md:grid md:grid-cols-2 md:gap-8 items-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                >
                  {/* Timeline point for desktop */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 w-5 h-5 rounded-full bg-primary border-4 border-background" />
                  
                  {/* Left or right side based on index */}
                  <div className={`md:text-right ${index % 2 === 0 ? 'md:pr-12' : 'md:order-last md:pl-12 md:text-left'}`}>
                    <h3 className="text-xl font-bold text-primary">{exp.title}</h3>
                    <h4 className="text-lg font-medium">{exp.company}</h4>
                    <p className="text-sm text-foreground/70">{exp.period}</p>
                  </div>
                  
                  <div className={index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}>
                    <div className="bg-muted p-6 rounded-lg shadow-sm mt-3 md:mt-0">
                      <p className="text-foreground/80 mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="px-3 py-1 bg-background text-primary text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 