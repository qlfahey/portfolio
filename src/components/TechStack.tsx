'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

type SkillCategory = 'Technical' | 'Leadership' | 'AI & Emerging Tech';

interface Skill {
  name: string;
  proficiency: number; // 0-100
  description: string;
  icon: string;
}

const skillCategories: Record<SkillCategory, Skill[]> = {
  'Technical': [
    { name: 'GraphQL', proficiency: 90, description: 'Expert in schema design and API optimization', icon: '⚡' },
    { name: 'REST APIs', proficiency: 95, description: 'Extensive experience building scalable APIs', icon: '🔌' },
    { name: 'JavaScript', proficiency: 95, description: 'Deep knowledge of modern JS ecosystem', icon: '📜' },
    { name: 'Python', proficiency: 85, description: 'Strong focus on data processing and automation', icon: '🐍' },
    { name: 'PHP', proficiency: 80, description: 'Proficient in modern PHP development', icon: '🐘' },
    { name: 'C#', proficiency: 75, description: '.NET development and Azure integration', icon: '🎯' },
    { name: 'CSS', proficiency: 90, description: 'Advanced styling and animations', icon: '🎨' },
  ],
  'Leadership': [
    { name: 'Strategic Thinking', proficiency: 95, description: 'Vision setting and roadmap planning', icon: '🎯' },
    { name: 'Project Management', proficiency: 90, description: 'Leading complex technical initiatives', icon: '📊' },
    { name: 'Architecture', proficiency: 85, description: 'System design and technical planning', icon: '🏗️' },
    { name: 'Team Leadership', proficiency: 95, description: 'Building and mentoring high-performing teams', icon: '👥' },
  ],
  'AI & Emerging Tech': [
    { name: 'GPT', proficiency: 90, description: 'Advanced prompt engineering and API integration', icon: '🤖' },
    { name: 'LangChain', proficiency: 85, description: 'Building complex AI workflows', icon: '⛓️' },
    { name: 'Agentic workflows', proficiency: 80, description: 'Designing autonomous AI systems', icon: '🔄' },
    { name: 'Prompt Engineering', proficiency: 95, description: 'Crafting effective AI interactions', icon: '✨' },
  ],
};

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('Technical');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tech-stack" className="section-padding bg-background relative overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(var(--primary-rgb), 0.05) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.span 
              className="inline-block text-primary font-mono text-sm tracking-wider uppercase mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Skills & Expertise
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Tech Stack
            </motion.h2>
            <motion.div 
              className="w-20 h-1 bg-primary mx-auto rounded-full mb-8"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />

            {/* Category Toggle */}
            <div className="flex justify-center gap-2 mb-12 flex-wrap">
              {(Object.keys(skillCategories) as SkillCategory[]).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === category 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-muted hover:bg-primary/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories[selectedCategory].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="group relative bg-muted rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: `linear-gradient(135deg, var(--muted) 0%, var(--background) 100%)`
                }}
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  {/* Skill Icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl transform group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </span>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {skill.name}
                    </h3>
                  </div>

                  {/* Skill Description */}
                  <p className="text-sm text-foreground/70 mb-4">
                    {skill.description}
                  </p>

                  {/* Proficiency Bar */}
                  <div className="relative h-2 bg-background rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-foreground/60">Proficiency</span>
                    <span className="text-xs font-medium text-primary">{skill.proficiency}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 