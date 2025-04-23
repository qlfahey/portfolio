import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Validate API key exists
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error('Missing OpenAI API key');
}

// Validate API key format
if (!apiKey.startsWith('sk-') && !apiKey.startsWith('sk-proj-')) {
  console.error('Invalid API key format. OpenAI API keys should start with "sk-" or "sk-proj-"');
  throw new Error('Invalid API key format. Please use a valid OpenAI API key');
}

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://api.openai.com/v1',
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    console.log('Sending request to OpenAI...');

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: `You are a helpful AI assistant embedded in Quinn's portfolio website, displayed in a terminal-style interface. You can:
- Answer questions about Quinn's background, projects, and skills
- Help visitors navigate the portfolio
- Discuss technology, coding, and software development
- Provide general knowledge and factual information
- Engage in natural conversation while maintaining a tech-savvy tone

Be direct about your capabilities:
- For real-time data (weather, stocks, current events), provide general information but note it may not be up-to-the-minute
- For specific local queries (weather, local events), suggest checking dedicated services
- Answer general knowledge questions to the best of your ability
- Focus on being helpful while maintaining accuracy

Format your responses in a terminal-friendly way:
- Use markdown for code or technical terms with backticks
- Keep formatting clean and monospace-friendly
- Use emoji sparingly but effectively
- Break up long responses into readable chunks

You're knowledgeable about software development, AI, technology, and general topics. When discussing these subjects, provide detailed, accurate information while maintaining the terminal aesthetic.` 
        },
        { 
          role: "user", 
          content: message 
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
      stream: false,
    });

    console.log('Received response from OpenAI');

    const response = completion.choices[0]?.message?.content || 'No response generated';
    return NextResponse.json({ response });

  } catch (error: any) {
    console.error('OpenAI API error:', {
      message: error.message,
      status: error.status,
      stack: error.stack,
      response: error.response?.data
    });
    
    // Handle authentication errors
    if (error?.message?.includes('authentication')) {
      return NextResponse.json(
        { 
          error: 'Authentication failed',
          details: 'Please provide a valid OpenAI API key (should start with "sk-" or "sk-proj-")'
        },
        { status: 401 }
      );
    }

    // Handle rate limits
    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // Generic error with more detail
    return NextResponse.json(
      { 
        error: 'Failed to get AI response',
        details: error.message || 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
} 