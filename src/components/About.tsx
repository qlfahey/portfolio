'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section id="about" className="section-padding bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.span 
              className="inline-block text-primary font-mono text-sm tracking-wider uppercase mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              About Me
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Get to know me
            </motion.h2>
            <motion.div 
              className="w-20 h-1 bg-primary mx-auto rounded-full"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold mb-4 text-primary">Who I Am</h3>
              <div className="space-y-4 text-foreground/80">
                <p>
                  Hi, I'm Quinn Fahey, a passionate Frontend Developer with expertise in 
                  creating beautiful and functional user interfaces. My journey in web 
                  development began over 5 years ago, and I've been in love with crafting 
                  digital experiences ever since.
                </p>
                <p>
                  I specialize in React, Next.js, and modern CSS frameworks like Tailwind. 
                  I believe in writing clean, maintainable code and creating intuitive user 
                  experiences that solve real problems. When I'm not coding, I enjoy hiking, 
                  photography, and exploring new coffee shops.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-4 text-primary">Education & Training</h3>
              <ul className="space-y-4">
                <li className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:w-2 before:h-2 before:bg-primary before:rounded-full">
                  <h4 className="font-medium">B.S. in Computer Science</h4>
                  <p className="text-sm text-foreground/70">University of Technology, 2020</p>
                </li>
                <li className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:w-2 before:h-2 before:bg-primary before:rounded-full">
                  <h4 className="font-medium">Frontend Masters Certification</h4>
                  <p className="text-sm text-foreground/70">Advanced React Patterns, 2021</p>
                </li>
                <li className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:w-2 before:h-2 before:bg-primary before:rounded-full">
                  <h4 className="font-medium">UX/UI Design Specialization</h4>
                  <p className="text-sm text-foreground/70">Design Institute, 2022</p>
                </li>
              </ul>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="p-4 bg-background rounded-lg shadow-sm">
              <h4 className="text-3xl font-bold text-primary">5+</h4>
              <p className="text-sm text-foreground/70">Years Experience</p>
            </div>
            <div className="p-4 bg-background rounded-lg shadow-sm">
              <h4 className="text-3xl font-bold text-primary">50+</h4>
              <p className="text-sm text-foreground/70">Projects Completed</p>
            </div>
            <div className="p-4 bg-background rounded-lg shadow-sm">
              <h4 className="text-3xl font-bold text-primary">15+</h4>
              <p className="text-sm text-foreground/70">Happy Clients</p>
            </div>
            <div className="p-4 bg-background rounded-lg shadow-sm">
              <h4 className="text-3xl font-bold text-primary">3</h4>
              <p className="text-sm text-foreground/70">Awards</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 