// Climate Chatbot - AI-powered assistant for climate questions
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, X, Send, Loader2, Sparkles, 
  Settings, Lightbulb, HelpCircle, Leaf, Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import aiService from '@/services/aiService';

export default function ClimateChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  
  // Settings
  const [apiKey, setApiKey] = useState('');
  const [baseURL, setBaseURL] = useState('https://api.openai.com/v1');
  const [model, setModel] = useState('claude-3-5-sonnet-20241022');
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Check if AI is configured
  useEffect(() => {
    // Try to load from localStorage
    const savedKey = localStorage.getItem('ai_api_key');
    const savedURL = localStorage.getItem('ai_base_url');
    const savedModel = localStorage.getItem('ai_model');
    
    if (savedKey && savedURL && savedModel) {
      setApiKey(savedKey);
      setBaseURL(savedURL);
      setModel(savedModel);
      aiService.initialize(savedKey, savedURL, savedModel);
      setIsConfigured(true);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !showSettings) {
      inputRef.current?.focus();
    }
  }, [isOpen, showSettings]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: '🌍 Hi! I\'m your Climate Action assistant! Ask me anything about climate change, SDG 13, or how you can help save our planet! 🌱',
        timestamp: new Date()
      }]);
    }
  }, [isOpen]);

  const saveSettings = () => {
    if (!apiKey || !baseURL || !model) {
      alert('Please fill in all fields!');
      return;
    }
    
    // Save to localStorage
    localStorage.setItem('ai_api_key', apiKey);
    localStorage.setItem('ai_base_url', baseURL);
    localStorage.setItem('ai_model', model);
    
    // Initialize AI service
    aiService.initialize(apiKey, baseURL, model);
    setIsConfigured(true);
    setShowSettings(false);
    
    alert('✅ AI configured successfully!');
  };

  const handleSend = async () => {
    if (!inputMessage.trim()) return;
    
    if (!isConfigured) {
      alert('Please configure your API key first! Click the settings icon.');
      setShowSettings(true);
      return;
    }

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Get conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await aiService.askQuestion(inputMessage, conversationHistory);
      
      const assistantMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        role: 'assistant',
        content: '❌ Sorry, I encountered an error. Please check your API settings and try again.',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "What is SDG 13?",
    "How can I reduce my carbon footprint?",
    "What causes climate change?",
    "Give me eco-friendly tips"
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Chatbot Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-green-500/50 transition-all"
          >
            <MessageCircle className="w-8 h-8" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] max-h-[80vh]"
          >
            <Card className="h-full flex flex-col bg-slate-900 border-slate-700 shadow-2xl">
              {/* Header */}
              <CardHeader className="border-b border-slate-700 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Climate Assistant</CardTitle>
                      <p className="text-xs text-green-100">
                        {isConfigured ? '🟢 AI Ready' : '🔴 Setup Required'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSettings(!showSettings)}
                      className="text-white hover:bg-white/20"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Settings Panel */}
              {showSettings && (
                <div className="p-4 bg-slate-800 border-b border-slate-700">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    AI Configuration
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">API Key</label>
                      <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="sk-..."
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Base URL</label>
                      <input
                        type="text"
                        value={baseURL}
                        onChange={(e) => setBaseURL(e.target.value)}
                        placeholder="https://api.openai.com/v1"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Model</label>
                      <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder="claude-3-5-sonnet-20241022"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white text-sm"
                      />
                    </div>
                    <Button
                      onClick={saveSettings}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Save Settings
                    </Button>
                  </div>
                </div>
              )}

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        msg.role === 'user'
                          ? 'bg-green-600 text-white'
                          : msg.isError
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : 'bg-slate-800 text-slate-200'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      <p className="text-xs opacity-50 mt-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-slate-800 rounded-2xl px-4 py-3 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-green-400" />
                      <span className="text-sm text-slate-400">Thinking...</span>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Quick Questions */}
              {messages.length <= 1 && !isLoading && (
                <div className="px-4 pb-2">
                  <p className="text-xs text-slate-400 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickQuestion(q)}
                        className="text-xs px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full border border-slate-600 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-slate-700">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about climate action..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-green-500 disabled:opacity-50"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-green-600 hover:bg-green-700 rounded-full w-10 h-10 p-0"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
