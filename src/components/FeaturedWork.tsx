'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    title: "Checkout on TV",
    overview: "Enabled users to purchase products directly from their Roku TV remotes.",
    role: "Led the integration project between Shopify and Roku.",
    impact: "Brought T-Commerce to life, allowing shopping directly within the streaming experience.",
    link: "https://newsroom.roku.com/news/2023/07/roku-brings-shopify-checkout-to-tv-streaming/ektu-rgt-1689078021",
    icon: "🛍️",
    tags: ["Roku", "Shopify", "T-Commerce", "Integration"]
  },
  {
    title: "AI + Agentic Commerce",
    overview: "Early exploration of intelligent business agents using OpenAI tech in the Shopify ecosystem.",
    role: "Helped design experimental in-chat shopping flows using GPT + Shopify APIs.",
    impact: "Enabled merchants to explore AI-powered commerce.",
    link: "https://www.testingcatalog.com/openai-and-shopify-poised-for-partnership-as-chatgpt-adds-in-chat-shopping/",
    icon: "🤖",
    tags: ["AI", "OpenAI", "GPT", "Shopify APIs"]
  },
  {
    title: "Drag-and-Drop Funnel Builder",
    overview: "Built a visual funnel builder at Checkout Champ to help non-technical users create commerce sites.",
    role: "Led frontend/backend engineering for the builder.",
    impact: "Empowered entrepreneurs to launch stores without needing developers.",
    link: "https://checkoutchamp.com/features/website-builder",
    icon: "🔧",
    tags: ["Visual Builder", "Frontend", "Backend", "UX"]
  }
];

export default function FeaturedWork() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section id="featured-work" className="section-padding bg-background">
      <div className="container mx-auto px-4">
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
              Featured Work
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Key Projects
            </motion.h2>
            <motion.div 
              className="w-20 h-1 bg-primary mx-auto rounded-full"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="group relative bg-muted rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  <span className="text-4xl mb-4 block">{project.icon}</span>
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-1">Overview</h4>
                      <p className="text-sm text-foreground/80">{project.overview}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-1">My Role</h4>
                      <p className="text-sm text-foreground/80">{project.role}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-1">Why it Mattered</h4>
                      <p className="text-sm text-foreground/80">{project.impact}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-accent/5 text-accent/90 text-xs rounded-full border border-accent/10 hover:bg-accent/10 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Learn More
                    <svg 
                      className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 