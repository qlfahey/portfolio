import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define local content for quick responses
const LOCAL_CONTENT = {
  skills: {
    technical: [
      'GraphQL', 'REST APIs', 'JavaScript', 'Python', 'PHP', 'C#', 'CSS'
    ],
    leadership: [
      'Strategic Thinking', 'Project Management', 'Architecture', 'Team Leadership'
    ],
    ai: [
      'GPT', 'LangChain', 'Agentic workflows', 'Prompt Engineering'
    ]
  },
  about: {
    role: "Solutions Architect at Shopify",
    description: "Passionate about using technology to build solutions that solve real-world problems. Obsessed with AI and the future of intelligent systems.",
    background: "Hi, I'm Quinn Fahey, a passionate Frontend Developer with expertise in creating beautiful and functional user interfaces."
  },
  links: {
    github: "https://github.com/quinnfahey",
    linkedin: "https://linkedin.com/in/quinnfahey",
    twitter: "https://twitter.com/quinn_fahey"
  }
};

// Helper function to check if query matches local content
function matchesLocalContent(query: string): boolean {
  const q = query.toLowerCase();
  return (
    q.includes('skills') ||
    q.includes('about') ||
    q.includes('background') ||
    q.includes('experience') ||
    q.includes('contact') ||
    q.includes('links') ||
    q.includes('role') ||
    q.includes('work')
  );
}

// Helper function to get local content response
function getLocalResponse(query: string): string {
  const q = query.toLowerCase();
  
  if (q.includes('skills') || q.includes('technologies')) {
    return `As Quinn Fahey, I specialize in the following areas:

Technical Skills:
${LOCAL_CONTENT.skills.technical.join(', ')}

Leadership Experience:
${LOCAL_CONTENT.skills.leadership.join(', ')}

AI & Emerging Technologies:
${LOCAL_CONTENT.skills.ai.join(', ')}

These skills reflect my professional experience and areas of expertise. Feel free to ask me more about any specific skill or area!`;
  }
  
  if (q.includes('about') || q.includes('background')) {
    return `${LOCAL_CONTENT.about.background} In my current role as ${LOCAL_CONTENT.about.role}, ${LOCAL_CONTENT.about.description}`;
  }
  
  if (q.includes('role') || q.includes('work')) {
    return `I'm currently working as ${LOCAL_CONTENT.about.role}. ${LOCAL_CONTENT.about.description}`;
  }
  
  if (q.includes('contact') || q.includes('links')) {
    return `You can connect with me (Quinn Fahey) on:
GitHub: ${LOCAL_CONTENT.links.github}
LinkedIn: ${LOCAL_CONTENT.links.linkedin}
Twitter: ${LOCAL_CONTENT.links.twitter}`;
  }
  
  return '';
}

export default function Terminal({ isOpen, onClose }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['Welcome to AI Terminal v1.0', 'Type "help" for available commands']);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Scroll to bottom when history changes
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add command to history
    setHistory(prev => [...prev, `> ${input}`]);

    // Process command
    const command = input.toLowerCase().trim();
    let response = '';

    switch (command) {
      case 'help':
        response = `Available commands:
- help: Show this help message
- clear: Clear terminal
- about: About this terminal
- chat [message]: Chat with AI
- exit: Close terminal`;
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'about':
        response = 'AI Terminal v1.0 - An interactive terminal experience powered by ChatGPT';
        break;
      case 'exit':
        onClose();
        break;
      default:
        if (command.startsWith('chat ')) {
          const message = input.slice(5).trim();
          if (message) {
            // Check if we can handle this locally
            if (matchesLocalContent(message)) {
              response = getLocalResponse(message);
              if (response) {
                setHistory(prev => [...prev, response]);
                setInput('');
                return;
              }
            }
            
            // If no local match or empty response, use OpenAI
            setIsLoading(true);
            try {
              const apiResponse = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
              });
              
              const data = await apiResponse.json();
              
              if (!apiResponse.ok) {
                throw new Error(data.error || 'API request failed');
              }
              
              if (data.error) {
                response = `Error: ${data.error}${data.details ? '\n' + data.details : ''}`;
              } else {
                response = data.response || "Error: No response from AI";
              }
            } catch (error: any) {
              response = `Error: ${error.message || 'Could not connect to AI service'}`;
            } finally {
              setIsLoading(false);
            }
          } else {
            response = 'Please provide a message after "chat"';
          }
        } else {
          response = `Command not found: ${input}. Type "help" for available commands.`;
        }
    }

    if (response) {
      setHistory(prev => [...prev, response]);
    }
    setInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 w-96 h-64 bg-black/90 rounded-lg shadow-xl border border-green-400/20 flex flex-col overflow-hidden"
    >
      <div className="flex items-center justify-between p-2 border-b border-green-400/20">
        <span className="text-green-400 font-mono text-sm">AI Terminal v1.0</span>
        <button 
          onClick={onClose}
          className="text-green-400/60 hover:text-green-400 text-xl"
        >
          ×
        </button>
      </div>
      
      <div 
        ref={historyRef}
        className="flex-1 overflow-auto p-4 font-mono text-sm text-green-400 scrollbar-thin scrollbar-thumb-green-400/20 scrollbar-track-transparent"
      >
        {history.map((line, i) => (
          <p key={i} className="mb-1 whitespace-pre-wrap">{line}</p>
        ))}
        {isLoading && (
          <p className="text-green-400/50 animate-pulse">Processing...</p>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="p-2 border-t border-green-400/20">
        <div className="flex items-center bg-black/50 rounded px-2">
          <span className="text-green-400 mr-2">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-green-400 placeholder-green-400/50 py-1 font-mono text-sm"
            placeholder="Type a command..."
            autoFocus
          />
        </div>
      </form>
    </motion.div>
  );
} 