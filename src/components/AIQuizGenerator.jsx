// AI Quiz Generator Component
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, AlertCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import aiService from '@/services/aiService';

export default function AIQuizGenerator({ onQuestionsGenerated, onCancel }) {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  // Settings
  const [apiKey, setApiKey] = useState(localStorage.getItem('ai_api_key') || '');
  const [baseURL, setBaseURL] = useState(localStorage.getItem('ai_base_url') || 'https://api.openai.com/v1');
  const [model, setModel] = useState(localStorage.getItem('ai_model') || 'claude-3-5-sonnet-20241022');

  const saveSettings = () => {
    if (!apiKey || !baseURL || !model) {
      alert('Please fill in all fields!');
      return;
    }
    
    localStorage.setItem('ai_api_key', apiKey);
    localStorage.setItem('ai_base_url', baseURL);
    localStorage.setItem('ai_model', model);
    
    aiService.initialize(apiKey, baseURL, model);
    setShowSettings(false);
    alert('✅ AI configured successfully!');
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic!');
      return;
    }

    if (!aiService.isReady()) {
      setError('Please configure your API key first!');
      setShowSettings(true);
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const questions = await aiService.generateQuizQuestions(topic, difficulty, questionCount);
      
      // Add icons to questions
      const questionsWithIcons = questions.map((q, i) => ({
        ...q,
        id: i + 1,
        icon: Sparkles // Default icon for AI-generated questions
      }));

      onQuestionsGenerated(questionsWithIcons);
    } catch (err) {
      console.error('Generation error:', err);
      setError(err.message || 'Failed to generate questions. Please check your API settings.');
    } finally {
      setIsGenerating(false);
    }
  };

  const suggestedTopics = [
    'Renewable Energy',
    'Ocean Acidification',
    'Carbon Footprint',
    'Deforestation',
    'Climate Solutions',
    'Greenhouse Gases'
  ];

  if (showSettings) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto"
      >
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="w-5 h-5" />
              AI Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-slate-400 block mb-2">API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-2">Base URL</label>
              <input
                type="text"
                value={baseURL}
                onChange={(e) => setBaseURL(e.target.value)}
                placeholder="https://api.openai.com/v1"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-2">Model</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="claude-3-5-sonnet-20241022"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={saveSettings} className="flex-1 bg-green-600 hover:bg-green-700">
                Save Settings
              </Button>
              <Button onClick={() => setShowSettings(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto"
    >
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            AI Quiz Generator
          </CardTitle>
          <p className="text-slate-400 text-sm">
            Create custom climate quiz questions using AI!
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Topic Input */}
          <div>
            <label className="text-sm text-slate-400 block mb-2">Quiz Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Renewable Energy, Ocean Acidification..."
              className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              disabled={isGenerating}
            />
          </div>

          {/* Suggested Topics */}
          <div>
            <p className="text-xs text-slate-500 mb-2">Suggested topics:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedTopics.map((t) => (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  disabled={isGenerating}
                  className="text-xs px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-full border border-slate-600 transition-colors disabled:opacity-50"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label className="text-sm text-slate-400 block mb-2">Difficulty</label>
            <div className="grid grid-cols-3 gap-2">
              {['easy', 'medium', 'hard'].map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  disabled={isGenerating}
                  className={`px-4 py-2 rounded-lg border transition-all capitalize ${
                    difficulty === d
                      ? 'bg-purple-600 border-purple-500 text-white'
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-purple-500'
                  } disabled:opacity-50`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div>
            <label className="text-sm text-slate-400 block mb-2">
              Number of Questions: {questionCount}
            </label>
            <input
              type="range"
              min="3"
              max="10"
              value={questionCount}
              onChange={(e) => setQuestionCount(parseInt(e.target.value))}
              disabled={isGenerating}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>3</span>
              <span>10</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Quiz
                </>
              )}
            </Button>
            <Button
              onClick={onCancel}
              disabled={isGenerating}
              variant="outline"
              className="border-slate-600 text-slate-300"
            >
              Cancel
            </Button>
          </div>

          {/* Settings Link */}
          <button
            onClick={() => setShowSettings(true)}
            className="w-full text-center text-xs text-slate-500 hover:text-slate-400 transition-colors"
          >
            <Settings className="w-3 h-3 inline mr-1" />
            Configure API Settings
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
