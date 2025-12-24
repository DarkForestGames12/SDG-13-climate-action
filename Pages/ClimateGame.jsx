import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Gamepad2, Heart, Star, Trophy, Zap, 
  Leaf, TreeDeciduous, Sun, CloudRain, Wind, Factory,
  Recycle, Lightbulb, Car, Bike, Home, Droplets,
  ArrowRight, RotateCcw, Volume2, VolumeX, HelpCircle,
  CheckCircle, XCircle, Target, Award, Flame
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const quizQuestions = [
  {
    id: 1,
    category: 'basics',
    question: 'What is the main greenhouse gas causing climate change?',
    options: ['Oxygen', 'Carbon Dioxide (CO₂)', 'Nitrogen', 'Hydrogen'],
    correct: 1,
    explanation: 'Carbon dioxide (CO₂) from burning fossil fuels is the primary driver of climate change, trapping heat in our atmosphere.',
    points: 100,
    icon: Wind
  },
  {
    id: 2,
    category: 'impacts',
    question: 'By how much has the global temperature risen since pre-industrial times?',
    options: ['0.1°C', '0.5°C', '1.1°C', '5°C'],
    correct: 2,
    explanation: 'The Earth has warmed by about 1.1°C since the late 1800s, with most warming occurring in the last 50 years.',
    points: 150,
    icon: Flame
  },
  {
    id: 3,
    category: 'solutions',
    question: 'Which energy source produces the LEAST carbon emissions?',
    options: ['Coal', 'Natural Gas', 'Solar Power', 'Oil'],
    correct: 2,
    explanation: 'Solar power produces virtually no carbon emissions during operation, making it one of the cleanest energy sources.',
    points: 100,
    icon: Sun
  },
  {
    id: 4,
    category: 'impacts',
    question: 'What happens to sea levels as global temperatures rise?',
    options: ['They stay the same', 'They decrease', 'They rise', 'They fluctuate randomly'],
    correct: 2,
    explanation: 'Warming causes ice sheets and glaciers to melt, and ocean water expands as it warms, causing sea levels to rise.',
    points: 100,
    icon: Droplets
  },
  {
    id: 5,
    category: 'actions',
    question: 'Which transportation choice has the LOWEST carbon footprint?',
    options: ['Driving alone', 'Flying', 'Cycling', 'Taking a cruise'],
    correct: 2,
    explanation: 'Cycling produces zero direct emissions and is the most climate-friendly way to travel short distances.',
    points: 100,
    icon: Bike
  },
  {
    id: 6,
    category: 'basics',
    question: 'What is the "greenhouse effect"?',
    options: [
      'Plants growing in greenhouses',
      'Gases trapping heat in the atmosphere',
      'The color of the sky',
      'A type of pollution'
    ],
    correct: 1,
    explanation: 'The greenhouse effect is when gases in the atmosphere trap heat from the sun, warming the Earth like a greenhouse.',
    points: 150,
    icon: Home
  },
  {
    id: 7,
    category: 'impacts',
    question: 'How does climate change affect wildlife?',
    options: [
      'Animals adapt instantly',
      'No effect on animals',
      'Habitat loss and extinction risks',
      'All animals benefit'
    ],
    correct: 2,
    explanation: 'Climate change causes habitat loss, disrupts food chains, and puts many species at risk of extinction.',
    points: 150,
    icon: TreeDeciduous
  },
  {
    id: 8,
    category: 'solutions',
    question: 'What does "renewable energy" mean?',
    options: [
      'Energy that never runs out',
      'Energy from sources that naturally replenish',
      'Cheap energy',
      'Energy from burning wood'
    ],
    correct: 1,
    explanation: 'Renewable energy comes from sources like sun, wind, and water that naturally replenish and won\'t run out.',
    points: 100,
    icon: Zap
  },
  {
    id: 9,
    category: 'actions',
    question: 'Which food choice has the LOWEST carbon footprint?',
    options: ['Beef steak', 'Chicken', 'Vegetables', 'Cheese'],
    correct: 2,
    explanation: 'Plant-based foods generally have much lower carbon footprints than animal products, especially beef.',
    points: 100,
    icon: Leaf
  },
  {
    id: 10,
    category: 'basics',
    question: 'What international agreement aims to limit global warming to 1.5°C?',
    options: ['Kyoto Protocol', 'Montreal Protocol', 'Paris Agreement', 'Geneva Convention'],
    correct: 2,
    explanation: 'The Paris Agreement (2015) united 195 countries to limit warming to 1.5°C above pre-industrial levels.',
    points: 200,
    icon: Target
  },
  {
    id: 11,
    category: 'impacts',
    question: 'What are "extreme weather events"?',
    options: [
      'Normal weather patterns',
      'Unusually severe storms, floods, droughts, or heatwaves',
      'Only hurricanes',
      'Weather in extreme locations'
    ],
    correct: 1,
    explanation: 'Extreme weather events are severe conditions like hurricanes, floods, and heatwaves that climate change is making more frequent.',
    points: 150,
    icon: CloudRain
  },
  {
    id: 12,
    category: 'solutions',
    question: 'How does recycling help fight climate change?',
    options: [
      'It doesn\'t help',
      'Reduces energy needed to make new products',
      'Creates more greenhouse gases',
      'Only helps with water conservation'
    ],
    correct: 1,
    explanation: 'Recycling reduces the energy needed to extract and process raw materials, lowering greenhouse gas emissions.',
    points: 100,
    icon: Recycle
  },
  {
    id: 13,
    category: 'actions',
    question: 'What is "carbon neutrality"?',
    options: [
      'Having no carbon in your body',
      'Balancing carbon emissions with carbon removal',
      'Never using electricity',
      'Only eating organic food'
    ],
    correct: 1,
    explanation: 'Carbon neutrality means balancing the carbon you emit with carbon removal through trees, technology, or offsets.',
    points: 200,
    icon: Leaf
  },
  {
    id: 14,
    category: 'impacts',
    question: 'How does climate change affect coral reefs?',
    options: [
      'Makes them stronger',
      'No effect',
      'Causes coral bleaching and death',
      'Helps them grow faster'
    ],
    correct: 2,
    explanation: 'Warmer and more acidic oceans cause coral bleaching, threatening these vital ecosystems that support 25% of marine life.',
    points: 150,
    icon: Droplets
  },
  {
    id: 15,
    category: 'solutions',
    question: 'What is SDG 13?',
    options: [
      'A new smartphone',
      'Climate Action - Take urgent action to combat climate change',
      'A sports league',
      'A scientific formula'
    ],
    correct: 1,
    explanation: 'SDG 13 is the United Nations Sustainable Development Goal focused on taking urgent action to combat climate change.',
    points: 200,
    icon: Target
  }
];

const achievements = [
  { id: 'first_correct', name: 'First Steps', description: 'Answer your first question correctly', icon: Star, requirement: 1 },
  { id: 'streak_3', name: 'On Fire!', description: 'Get 3 correct answers in a row', icon: Flame, requirement: 3 },
  { id: 'streak_5', name: 'Unstoppable', description: 'Get 5 correct answers in a row', icon: Zap, requirement: 5 },
  { id: 'half_way', name: 'Halfway Hero', description: 'Complete half the quiz', icon: Target, requirement: 'half' },
  { id: 'perfect_category', name: 'Category Master', description: 'Get all questions in a category right', icon: Award, requirement: 'category' },
  { id: 'climate_champion', name: 'Climate Champion', description: 'Complete the game with 80%+ score', icon: Trophy, requirement: 80 }
];

// Waste Sorting Items
const sortingItems = [
  { emoji: '🍎', name: 'Apple Core', bin: 'compost' },
  { emoji: '📰', name: 'Newspaper', bin: 'recycle' },
  { emoji: '🍌', name: 'Banana Peel', bin: 'compost' },
  { emoji: '🥤', name: 'Plastic Bottle', bin: 'recycle' },
  { emoji: '🍕', name: 'Pizza Box (greasy)', bin: 'compost' },
  { emoji: '🥫', name: 'Aluminum Can', bin: 'recycle' },
  { emoji: '☕', name: 'Coffee Grounds', bin: 'compost' },
  { emoji: '📦', name: 'Cardboard Box', bin: 'recycle' },
  { emoji: '🥚', name: 'Egg Shells', bin: 'compost' },
  { emoji: '🍾', name: 'Glass Bottle', bin: 'recycle' },
  { emoji: '🧴', name: 'Chip Bag', bin: 'trash' },
  { emoji: '🎈', name: 'Balloon', bin: 'trash' },
  { emoji: '🖍️', name: 'Broken Crayons', bin: 'trash' },
  { emoji: '💊', name: 'Medicine Bottle', bin: 'trash' },
  { emoji: '🧽', name: 'Old Sponge', bin: 'trash' },
  { emoji: '🥬', name: 'Lettuce Leaves', bin: 'compost' },
  { emoji: '📚', name: 'Old Magazine', bin: 'recycle' },
  { emoji: '🧃', name: 'Juice Box', bin: 'recycle' },
  { emoji: '🍞', name: 'Stale Bread', bin: 'compost' },
  { emoji: '🧴', name: 'Shampoo Bottle', bin: 'recycle' }
];

export default function ClimateGame() {
  const [gameState, setGameState] = useState('menu'); // menu, playing, results
  const [gameType, setGameType] = useState(''); // quiz, sorting
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [earnedAchievements, setEarnedAchievements] = useState([]);
  const [categoryScores, setCategoryScores] = useState({});
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showAchievement, setShowAchievement] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  
  // Waste Sorter State
  const [sortingState, setSortingState] = useState({
    items: [],
    currentIndex: 0,
    correctCount: 0,
    compostItems: [],
    recycleItems: [],
    trashItems: []
  });
  const [sortingFeedback, setSortingFeedback] = useState(null);

  // Timer effect
  useEffect(() => {
    let timer;
    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerActive) {
      handleTimeout();
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  const handleTimeout = () => {
    setIsTimerActive(false);
    setLives(prev => prev - 1);
    setStreak(0);
    setShowExplanation(true);
    setSelectedAnswer(-1);
  };

  const checkAchievements = (newScore, newStreak, questionIndex, isCorrect) => {
    const newAchievements = [...earnedAchievements];
    
    // First correct
    if (isCorrect && !newAchievements.includes('first_correct')) {
      newAchievements.push('first_correct');
      setShowAchievement(achievements.find(a => a.id === 'first_correct'));
    }
    
    // Streaks
    if (newStreak >= 3 && !newAchievements.includes('streak_3')) {
      newAchievements.push('streak_3');
      setShowAchievement(achievements.find(a => a.id === 'streak_3'));
    }
    if (newStreak >= 5 && !newAchievements.includes('streak_5')) {
      newAchievements.push('streak_5');
      setShowAchievement(achievements.find(a => a.id === 'streak_5'));
    }
    
    // Halfway
    if (questionIndex >= Math.floor(quizQuestions.length / 2) - 1 && !newAchievements.includes('half_way')) {
      newAchievements.push('half_way');
      setShowAchievement(achievements.find(a => a.id === 'half_way'));
    }
    
    setEarnedAchievements(newAchievements);
  };

  const handleAnswer = (answerIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setIsTimerActive(false);
    
    const question = quizQuestions[currentQuestion];
    const isCorrect = answerIndex === question.correct;
    
    // Update answered questions
    setAnsweredQuestions(prev => [...prev, {
      questionId: question.id,
      correct: isCorrect,
      category: question.category
    }]);
    
    if (isCorrect) {
      const timeBonus = Math.floor(timeLeft * 5);
      const streakBonus = streak * 25;
      const totalPoints = question.points + timeBonus + streakBonus;
      
      setScore(prev => prev + totalPoints);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      
      // Update category scores
      setCategoryScores(prev => ({
        ...prev,
        [question.category]: (prev[question.category] || 0) + 1
      }));
      
      checkAchievements(score + totalPoints, newStreak, currentQuestion, true);
    } else {
      setLives(prev => prev - 1);
      setStreak(0);
    }
    
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (lives <= 0 || currentQuestion >= quizQuestions.length - 1) {
      // Check for climate champion achievement
      const percentage = (score / (quizQuestions.length * 150)) * 100;
      if (percentage >= 80 && !earnedAchievements.includes('climate_champion')) {
        const newAchievements = [...earnedAchievements, 'climate_champion'];
        setEarnedAchievements(newAchievements);
        setShowAchievement(achievements.find(a => a.id === 'climate_champion'));
      }
      setGameState('results');
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(30);
      setIsTimerActive(true);
    }
  };

  const startGame = (type = 'quiz') => {
    setGameType(type);
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setLives(3);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setEarnedAchievements([]);
    setCategoryScores({});
    setAnsweredQuestions([]);
    
    if (type === 'quiz') {
      setTimeLeft(30);
      setIsTimerActive(true);
    } else if (type === 'sorting') {
      setTimeLeft(60);
      setIsTimerActive(true);
      // Shuffle and select 15 random items
      const shuffled = [...sortingItems].sort(() => Math.random() - 0.5).slice(0, 15);
      setSortingState({
        items: shuffled,
        currentIndex: 0,
        correctCount: 0,
        compostItems: [],
        recycleItems: [],
        trashItems: []
      });
    }
  };

  const restartGame = () => {
    startGame(gameType);
  };

  // Achievement popup
  useEffect(() => {
    if (showAchievement) {
      const timer = setTimeout(() => setShowAchievement(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAchievement]);
  
  // Waste Sorter Functions
  const sortItem = (bin) => {
    if (sortingState.currentIndex >= sortingState.items.length) return;
    
    const item = sortingState.items[sortingState.currentIndex];
    const isCorrect = item.bin === bin;
    
    if (isCorrect) {
      const points = 50 + (streak * 10);
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setSortingState(prev => ({
        ...prev,
        correctCount: prev.correctCount + 1,
        [`${bin}Items`]: [...prev[`${bin}Items`], item.emoji]
      }));
      setSortingFeedback({ type: 'correct', message: `✅ Correct! +${points} points`, bin: bin });
    } else {
      setStreak(0);
      const binNames = { compost: '🌱 COMPOST', recycle: '♻️ RECYCLE', trash: '🗑️ TRASH' };
      setSortingFeedback({ 
        type: 'incorrect', 
        message: `❌ Wrong! ${item.name} goes in ${binNames[item.bin]}`,
        correctBin: item.bin
      });
    }
    
    setTimeout(() => {
      setSortingFeedback(null);
      setSortingState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1
      }));
      
      // Check if game is over
      if (sortingState.currentIndex + 1 >= sortingState.items.length) {
        setIsTimerActive(false);
        setTimeout(() => {
          setGameState('results');
        }, 1000);
      }
    }, 1500);
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to={createPageUrl('Home')}>
                <Button variant="ghost" className="text-slate-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Climate Quest</span>
              </div>
              <div className="w-24" />
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-32 h-32 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-500/30">
              <Gamepad2 className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">Climate Quest</h1>
            <p className="text-xl text-slate-400 max-w-lg mx-auto mb-8">
              Test your knowledge about climate change and learn how to protect our planet!
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.button
                onClick={() => startGame('quiz')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="card-3d bg-gradient-to-br from-green-600/30 to-emerald-700/30 rounded-3xl p-8 border border-green-500/50 text-left hover:border-green-400 transition-all group"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🧠</div>
                <h3 className="font-orbitron text-2xl font-bold text-green-400 mb-2">Climate Quiz</h3>
                <p className="text-gray-400 mb-4">Test your knowledge about climate change with challenging questions!</p>
                <div className="flex items-center gap-2 text-green-400">
                  <span>Play Now</span>
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </motion.button>
              
              <motion.button
                onClick={() => startGame('sorting')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="card-3d bg-gradient-to-br from-amber-600/30 to-orange-700/30 rounded-3xl p-8 border border-amber-500/50 text-left hover:border-amber-400 transition-all group"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">♻️</div>
                <h3 className="font-orbitron text-2xl font-bold text-amber-400 mb-2">Waste Sorter</h3>
                <p className="text-gray-400 mb-4">Sort waste into the correct bins as fast as you can!</p>
                <div className="flex items-center gap-2 text-amber-400">
                  <span>Play Now</span>
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </motion.button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-6 text-center">
                <HelpCircle className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">15 Questions</h3>
                <p className="text-slate-400 text-sm">Test your climate knowledge</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-6 text-center">
                <Heart className="w-10 h-10 text-red-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">3 Lives</h3>
                <p className="text-slate-400 text-sm">Don't run out of chances!</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-6 text-center">
                <Trophy className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Achievements</h3>
                <p className="text-slate-400 text-sm">Unlock special badges</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                How to Play
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>• Answer questions about climate change within 30 seconds</p>
              <p>• Earn points for correct answers + time bonuses</p>
              <p>• Build streaks for bonus points</p>
              <p>• Learn from explanations after each question</p>
              <p>• Try to unlock all achievements!</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (gameState === 'playing' && gameType === 'sorting') {
    const currentItem = sortingState.items[sortingState.currentIndex];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900">
        {/* Achievement Popup */}
        <AnimatePresence>
          {showAchievement && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
            >
              <Card className="bg-gradient-to-r from-amber-500 to-orange-500 border-none shadow-2xl">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <showAchievement.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm">Achievement Unlocked!</p>
                    <p className="text-white font-bold">{showAchievement.name}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Header */}
        <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-2xl">♻️</span>
                <span className="font-orbitron text-xl font-bold text-amber-400">Waste Sorter</span>
              </div>

              {/* Score & Streak */}
              <div className="flex items-center gap-4">
                {streak > 0 && (
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                    <Flame className="w-4 h-4 mr-1" />
                    {streak}x Streak
                  </Badge>
                )}
                <div className="text-white font-bold text-xl">
                  <Star className="w-5 h-5 inline text-amber-400 mr-1" />
                  {score}
                </div>
                <div className="text-white font-bold text-xl">
                  <span className="text-red-400">{timeLeft}s</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Item {sortingState.currentIndex + 1} of {sortingState.items.length}</span>
              <span>{sortingState.correctCount} correct</span>
            </div>
            <Progress value={((sortingState.currentIndex + 1) / sortingState.items.length) * 100} className="h-2" />
          </div>

          {/* Timer */}
          <div className="mb-6">
            <Progress 
              value={(timeLeft / 60) * 100} 
              className={`h-2 ${timeLeft <= 10 ? '[&>div]:bg-red-500' : '[&>div]:bg-amber-500'}`}
            />
          </div>

          {currentItem && (
            <>
              <p className="text-gray-400 mb-6 text-center">Click on the correct bin to sort this item!</p>
              
              {/* Current Item */}
              <motion.div
                key={currentItem.emoji}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mb-8"
              >
                <div className="inline-block bg-gray-900/80 rounded-2xl p-6 border border-amber-500/30">
                  <div className="text-7xl mb-2">{currentItem.emoji}</div>
                  <p className="text-xl font-bold text-white">{currentItem.name}</p>
                </div>
              </motion.div>

              {/* Bins */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <motion.button
                  onClick={() => sortItem('compost')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-br from-green-600/30 to-green-800/30 rounded-2xl p-6 border-2 border-green-500/50 hover:border-green-400 transition-all text-center"
                >
                  <div className="text-5xl mb-2">🌱</div>
                  <p className="font-bold text-green-400">COMPOST</p>
                  <p className="text-xs text-gray-400 mt-2">Food scraps, yard waste</p>
                </motion.button>
                
                <motion.button
                  onClick={() => sortItem('recycle')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-br from-blue-600/30 to-blue-800/30 rounded-2xl p-6 border-2 border-blue-500/50 hover:border-blue-400 transition-all text-center"
                >
                  <div className="text-5xl mb-2">♻️</div>
                  <p className="font-bold text-blue-400">RECYCLE</p>
                  <p className="text-xs text-gray-400 mt-2">Paper, plastic, glass, metal</p>
                </motion.button>
                
                <motion.button
                  onClick={() => sortItem('trash')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-br from-gray-600/30 to-gray-800/30 rounded-2xl p-6 border-2 border-gray-500/50 hover:border-gray-400 transition-all text-center"
                >
                  <div className="text-5xl mb-2">🗑️</div>
                  <p className="font-bold text-gray-400">TRASH</p>
                  <p className="text-xs text-gray-400 mt-2">Non-recyclable items</p>
                </motion.button>
              </div>

              {/* Feedback */}
              {sortingFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-4 rounded-xl text-center text-lg font-bold ${
                    sortingFeedback.type === 'correct' 
                      ? 'bg-green-500/20 border border-green-500 text-green-400' 
                      : 'bg-red-500/20 border border-red-500 text-red-400'
                  }`}
                >
                  {sortingFeedback.message}
                </motion.div>
              )}

              {/* Sorted Items Display */}
              <div className="grid grid-cols-3 gap-4 text-center text-2xl mt-6">
                <div className="min-h-[40px]">
                  {sortingState.compostItems.join(' ')}
                </div>
                <div className="min-h-[40px]">
                  {sortingState.recycleItems.join(' ')}
                </div>
                <div className="min-h-[40px]">
                  {sortingState.trashItems.join(' ')}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    );
  }

  if (gameState === 'playing' && gameType === 'quiz') {
    const question = quizQuestions[currentQuestion];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
        {/* Achievement Popup */}
        <AnimatePresence>
          {showAchievement && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
            >
              <Card className="bg-gradient-to-r from-amber-500 to-orange-500 border-none shadow-2xl">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <showAchievement.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm">Achievement Unlocked!</p>
                    <p className="text-white font-bold">{showAchievement.name}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Header */}
        <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Lives */}
                <div className="flex items-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Heart
                      key={i}
                      className={`w-6 h-6 ${i < lives ? 'text-red-500 fill-red-500' : 'text-slate-700'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Score & Streak */}
              <div className="flex items-center gap-4">
                {streak > 0 && (
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                    <Flame className="w-4 h-4 mr-1" />
                    {streak}x Streak
                  </Badge>
                )}
                <div className="text-white font-bold text-xl">
                  <Star className="w-5 h-5 inline text-amber-400 mr-1" />
                  {score}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
              <span>{question.points} points</span>
            </div>
            <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-2" />
          </div>

          {/* Timer */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>
                {timeLeft}s
              </div>
            </div>
            <Progress 
              value={(timeLeft / 30) * 100} 
              className={`h-2 ${timeLeft <= 10 ? '[&>div]:bg-red-500' : '[&>div]:bg-cyan-500'}`}
            />
          </div>

          {/* Question Card */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 mb-6">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <question.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="outline" className="text-slate-400 border-slate-600 capitalize">
                    {question.category}
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl leading-relaxed">
                  {question.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {question.options.map((option, index) => {
                  let buttonClass = "w-full p-4 text-left rounded-xl border transition-all ";
                  
                  if (selectedAnswer === null) {
                    buttonClass += "bg-slate-700/50 border-slate-600 hover:border-purple-500 hover:bg-purple-500/10 text-white cursor-pointer";
                  } else if (index === question.correct) {
                    buttonClass += "bg-emerald-500/20 border-emerald-500 text-emerald-300";
                  } else if (index === selectedAnswer) {
                    buttonClass += "bg-red-500/20 border-red-500 text-red-300";
                  } else {
                    buttonClass += "bg-slate-700/30 border-slate-700 text-slate-500";
                  }

                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={buttonClass}
                      whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                      whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-slate-600/50 flex items-center justify-center font-semibold">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{option}</span>
                        {selectedAnswer !== null && index === question.correct && (
                          <CheckCircle className="w-5 h-5 ml-auto text-emerald-400" />
                        )}
                        {selectedAnswer === index && index !== question.correct && (
                          <XCircle className="w-5 h-5 ml-auto text-red-400" />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className={`border mb-6 ${selectedAnswer === question.correct ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-amber-500/10 border-amber-500/30'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Lightbulb className={`w-6 h-6 flex-shrink-0 ${selectedAnswer === question.correct ? 'text-emerald-400' : 'text-amber-400'}`} />
                      <div>
                        <p className={`font-semibold mb-1 ${selectedAnswer === question.correct ? 'text-emerald-300' : 'text-amber-300'}`}>
                          {selectedAnswer === question.correct ? 'Correct!' : 'Learning Moment'}
                        </p>
                        <p className="text-slate-300">{question.explanation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  onClick={nextQuestion}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-6 text-lg"
                >
                  {currentQuestion < quizQuestions.length - 1 ? (
                    <>Next Question <ArrowRight className="w-5 h-5 ml-2" /></>
                  ) : (
                    <>See Results <Trophy className="w-5 h-5 ml-2" /></>
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    );
  }

  if (gameState === 'results') {
    const correctAnswers = answeredQuestions.filter(q => q.correct).length;
    const percentage = Math.round((correctAnswers / quizQuestions.length) * 100);
    
    let grade, gradeColor, gradeMessage;
    if (percentage >= 90) {
      grade = 'S'; gradeColor = 'from-amber-400 to-yellow-500'; gradeMessage = 'Climate Champion! Outstanding!';
    } else if (percentage >= 80) {
      grade = 'A'; gradeColor = 'from-emerald-400 to-green-500'; gradeMessage = 'Excellent! You really know your stuff!';
    } else if (percentage >= 70) {
      grade = 'B'; gradeColor = 'from-blue-400 to-cyan-500'; gradeMessage = 'Great job! Keep learning!';
    } else if (percentage >= 60) {
      grade = 'C'; gradeColor = 'from-purple-400 to-pink-500'; gradeMessage = 'Good effort! Room to improve!';
    } else {
      grade = 'D'; gradeColor = 'from-orange-400 to-red-500'; gradeMessage = 'Keep trying! Every bit of knowledge helps!';
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to={createPageUrl('Home')}>
                <Button variant="ghost" className="text-slate-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Results</span>
              </div>
              <div className="w-24" />
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
          >
            <div className={`w-32 h-32 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${gradeColor} flex items-center justify-center shadow-2xl`}>
              <span className="text-6xl font-bold text-white">{grade}</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{gradeMessage}</h1>
            <p className="text-slate-400">You've completed Climate Quest!</p>
          </motion.div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white">{score}</p>
                <p className="text-slate-400 text-sm">Total Score</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white">{correctAnswers}/{quizQuestions.length}</p>
                <p className="text-slate-400 text-sm">Correct</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-6 text-center">
                <Flame className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white">{maxStreak}</p>
                <p className="text-slate-400 text-sm">Best Streak</p>
              </CardContent>
            </Card>
          </div>

          {earnedAchievements.length > 0 && (
            <Card className="bg-slate-800/50 border-slate-700/50 mb-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  Achievements Earned
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                {earnedAchievements.map(id => {
                  const achievement = achievements.find(a => a.id === id);
                  return (
                    <div key={id} className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <achievement.icon className="w-6 h-6 text-amber-400" />
                      <div>
                        <p className="text-white font-medium text-sm">{achievement.name}</p>
                        <p className="text-slate-400 text-xs">{achievement.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}

          <div className="flex gap-4">
            <Button
              onClick={restartGame}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-6"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </Button>
            <Link to={createPageUrl('Home')} className="flex-1">
              <Button variant="outline" className="w-full border-slate-700 text-slate-300 py-6">
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return null;
}