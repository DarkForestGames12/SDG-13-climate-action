// Simple AI Service - Works with your OpenAI-compatible API (Claude, etc.)

import { climateKnowledgeBase, systemPrompt } from '../data/climateKnowledgeBase';

/**
 * Simple AI Service
 * 
 * This talks to Claude AI (or any OpenAI-compatible API) to:
 * - Answer climate questions in the chatbot
 * - Generate quiz questions for games
 */

class AIService {
  constructor() {
    // These will be set when you enter your API key in the app
    this.apiKey = null;
    this.baseURL = null;
    this.model = null;
  }

  /**
   * Setup the AI with your API key
   * You'll do this in the app settings
   */
  initialize(apiKey, baseURL, model) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
    this.model = model;
    console.log('✅ AI connected!');
  }

  /**
   * Check if AI is ready to use
   */
  isReady() {
    return this.apiKey !== null;
  }

  /**
   * Ask the AI a question (for chatbot)
   */
  async askQuestion(userQuestion, previousMessages = []) {
    if (!this.isReady()) {
      throw new Error('Please set up your API key first!');
    }

    try {
      // Prepare the conversation
      const messages = [
        {
          role: 'system',
          content: systemPrompt + '\n\nHere is climate information you can use:\n' + JSON.stringify(climateKnowledgeBase, null, 2)
        },
        ...previousMessages,
        {
          role: 'user',
          content: userQuestion
        }
      ];

      // Send to Claude AI
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'AI request failed');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('AI Error:', error);
      throw error;
    }
  }

  /**
   * Generate quiz questions using AI
   */
  async generateQuizQuestions(topic, difficulty = 'medium', count = 5) {
    if (!this.isReady()) {
      throw new Error('Please set up your API key first!');
    }

    const prompt = `Create ${count} multiple-choice quiz questions about "${topic}" for climate education.

Difficulty: ${difficulty}

Return ONLY a JSON array like this (no other text):
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "explanation": "Why this answer is correct",
    "category": "basics",
    "points": 100
  }
]

Make questions fun and educational for students!`;

    try {
      const response = await this.askQuestion(prompt, []);
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Could not create quiz questions');
    } catch (error) {
      console.error('Quiz generation error:', error);
      throw error;
    }
  }

  /**
   * Get a random climate fact
   */
  getRandomFact() {
    const facts = climateKnowledgeBase.facts;
    return facts[Math.floor(Math.random() * facts.length)];
  }

  /**
   * Get eco tips
   */
  getEcoTips(category = null) {
    if (category && climateKnowledgeBase.ecoTips[category]) {
      return climateKnowledgeBase.ecoTips[category];
    }
    return climateKnowledgeBase.ecoTips;
  }
}

// Create one instance to use everywhere
export const aiService = new AIService();
export default aiService;
