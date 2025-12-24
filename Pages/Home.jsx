import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Leaf, Thermometer, Wind, Droplets, Globe, ArrowRight, 
  Gamepad2, Calculator, Target, QrCode, TrendingUp, AlertTriangle,
  TreeDeciduous, Factory, Recycle, Sun, CloudRain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Floating Leaves Component
const FloatingLeaves = () => {
  const leaves = ['🍃', '🌿', '☘️', '🌱', '💚'];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="leaf absolute text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${10 + Math.random() * 20}s`,
            animationDelay: `${Math.random() * 10}s`
          }}
        >
          {leaves[Math.floor(Math.random() * leaves.length)]}
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const [currentStat, setCurrentStat] = useState(0);
  const [currentFact, setCurrentFact] = useState(0);
  
  const climateFacts = [
    "The last decade (2011-2020) was the warmest on record.",
    "CO₂ levels are higher than at any point in the past 800,000 years.",
    "The ocean has absorbed 30% of human-produced CO₂.",
    "We lose 4.7 million hectares of forest each year.",
    "Climate change affects all countries on all continents.",
    "Renewable energy is now cheaper than fossil fuels in most countries.",
    "1 million species are at risk of extinction due to climate change.",
    "The Arctic is warming twice as fast as the global average."
  ];
  
  const stats = [
    { value: "1.1°C", label: "Global Temperature Rise", icon: Thermometer },
    { value: "420+", label: "CO₂ PPM in Atmosphere", icon: Wind },
    { value: "3.4mm", label: "Sea Level Rise per Year", icon: Droplets },
    { value: "1M+", label: "Species at Risk", icon: TreeDeciduous }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % climateFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: TrendingUp,
      title: "Climate Dashboard",
      description: "Interactive visualizations of global temperature data with detailed insights",
      link: "ClimateDashboard",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Calculator,
      title: "Carbon Calculator",
      description: "Calculate your personal carbon footprint and discover ways to reduce it",
      link: "CarbonCalculator",
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: Gamepad2,
      title: "Climate Quest Game",
      description: "Learn about climate change through an engaging interactive adventure",
      link: "ClimateGame",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Target,
      title: "SDG 13 Targets",
      description: "Explore the UN Sustainable Development Goal 13 and its targets",
      link: "SDG13Targets",
      color: "from-orange-500 to-amber-500"
    }
  ];

  const sdgTargets = [
    { icon: AlertTriangle, text: "Strengthen resilience to climate hazards" },
    { icon: Factory, text: "Integrate climate measures into policies" },
    { icon: Globe, text: "Improve education on climate change" },
    { icon: Recycle, text: "Implement UN Framework Convention" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
      <FloatingLeaves />
      
      {/* Hero Section */}
      <section className="hero-bg relative overflow-hidden min-h-screen flex items-center justify-center">
        {/* Animated particles */}
        <div className="absolute inset-0">
          <div className="particle w-4 h-4 bg-green-400" style={{ left: '10%', top: '20%', animationDelay: '0s' }}></div>
          <div className="particle w-6 h-6 bg-emerald-300" style={{ left: '80%', top: '30%', animationDelay: '2s' }}></div>
          <div className="particle w-3 h-3 bg-teal-400" style={{ left: '50%', top: '60%', animationDelay: '4s' }}></div>
          <div className="particle w-5 h-5 bg-green-300" style={{ left: '20%', top: '80%', animationDelay: '6s' }}></div>
          <div className="particle w-4 h-4 bg-emerald-400" style={{ left: '70%', top: '70%', animationDelay: '8s' }}></div>
          <div className="particle w-8 h-8 bg-teal-300" style={{ left: '90%', top: '10%', animationDelay: '10s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6">
              <span className="bg-green-500/20 text-green-400 px-6 py-2 rounded-full text-sm font-semibold border border-green-500/50 animate-pulse">
                🏆 GRADE 8 SCIENCE EXHIBITION
              </span>
            </div>
            
            <h1 className="font-orbitron text-5xl md:text-8xl font-black mb-4 glow-text">
              <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
                MERRYLAND
              </span>
            </h1>
            
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-6 text-white">
              SDG GOAL EXHIBITION
            </h2>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent to-green-400"></div>
              <span className="font-orbitron text-2xl md:text-4xl text-green-400 font-bold">VISION TO ACTION</span>
              <span className="font-orbitron text-4xl md:text-6xl text-yellow-400 font-black">2026</span>
              <div className="h-1 w-20 bg-gradient-to-l from-transparent to-green-400"></div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-8 py-4 border border-green-500/30 glow">
                <span className="text-6xl">🌍</span>
                <p className="font-orbitron text-xl font-bold text-green-400 mt-2">SDG 13</p>
                <p className="text-gray-300">Climate Action</p>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Explore climate change through <span className="text-green-400 font-bold">interactive games</span>, 
              understand its effects, and discover how <span className="text-yellow-400 font-bold">YOU</span> can make a difference!
            </p>

            {/* Animated Stats */}
            <motion.div
              key={currentStat}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 mb-12"
            >
              {React.createElement(stats[currentStat].icon, { 
                className: "w-8 h-8 text-emerald-400" 
              })}
              <div className="text-left">
                <div className="text-3xl font-bold text-white">{stats[currentStat].value}</div>
                <div className="text-slate-400">{stats[currentStat].label}</div>
              </div>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Link to={createPageUrl('ClimateGame')}>
                <Button size="lg" className="group bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:from-green-400 hover:to-emerald-500 transition-all transform hover:scale-105 pulse-green flex items-center gap-2">
                  🎮 Play Games
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Button>
              </Link>
              <Link to={createPageUrl('ClimateDashboard')}>
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur px-8 py-4 rounded-full font-bold text-lg border border-green-500/50 hover:bg-green-500/20 transition-all">
                  📚 Learn More
                </Button>
              </Link>
            </div>
            
            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-8 h-12 border-2 border-green-400 rounded-full flex justify-center pt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* About SDG 13 Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold">UNDERSTANDING THE CRISIS</span>
            <h2 className="font-orbitron text-4xl md:text-6xl font-bold mt-6 mb-4">
              SDG 13: <span className="text-green-400">Climate Action</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Take urgent action to combat climate change and its impacts
            </p>
          </div>
          
          {/* Info Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="card-3d bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl p-8 border border-red-500/30">
              <div className="text-5xl mb-4">🌡️</div>
              <h3 className="font-orbitron text-2xl font-bold mb-4 text-red-400">The Problem</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  Global temperatures rising by 1.1°C since pre-industrial times
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  Sea levels rising 3.7mm per year
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  Extreme weather events increasing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  1 million species at risk of extinction
                </li>
              </ul>
            </div>
            
            <div className="card-3d bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-3xl p-8 border border-yellow-500/30">
              <div className="text-5xl mb-4">⚠️</div>
              <h3 className="font-orbitron text-2xl font-bold mb-4 text-yellow-400">The Causes</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  Burning fossil fuels (coal, oil, gas)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  Deforestation and land-use changes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  Industrial processes and manufacturing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  Agriculture and livestock farming
                </li>
              </ul>
            </div>
            
            <div className="card-3d bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl p-8 border border-green-500/30">
              <div className="text-5xl mb-4">💚</div>
              <h3 className="font-orbitron text-2xl font-bold mb-4 text-green-400">The Solutions</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  Switch to renewable energy sources
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  Plant trees and protect forests
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  Reduce, reuse, recycle
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  Use sustainable transportation
                </li>
              </ul>
            </div>
          </div>
          
          {/* Climate Facts Carousel */}
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl p-8 border border-green-500/30">
            <h3 className="font-orbitron text-2xl font-bold mb-6 text-center">🌍 Climate Facts</h3>
            <div className="text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentFact}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl text-gray-200 mb-6"
                >
                  "{climateFacts[currentFact]}"
                </motion.p>
              </AnimatePresence>
              <div className="flex justify-center gap-2">
                {climateFacts.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentFact(i)}
                    className={`w-3 h-3 rounded-full transition-all ${i === currentFact ? 'bg-green-400' : 'bg-gray-600'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold">LEARN WHILE PLAYING</span>
            <h2 className="font-orbitron text-4xl md:text-6xl font-bold mt-6 mb-4">
              Explore & <span className="text-green-400">Learn</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Discover interactive tools designed to educate and inspire climate action
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={createPageUrl(feature.link)}>
                  <div className="card-3d bg-gradient-to-br from-green-600/30 to-emerald-700/30 rounded-3xl p-8 border border-green-500/50 text-left hover:border-green-400 transition-all group h-full">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-orbitron text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
                    <div className="flex items-center gap-2 text-green-400">
                      <span>Explore Now</span>
                      <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG 13 Targets Preview */}
      <section className="bg-gradient-to-b from-slate-900 to-emerald-950 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-9xl">🎯</div>
          <div className="absolute bottom-10 right-10 text-9xl">🌍</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold">UNITED NATIONS GOALS</span>
            <h2 className="font-orbitron text-4xl md:text-6xl font-bold mt-6 mb-4">
              SDG 13 <span className="text-emerald-400">Targets</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              The official targets set by the United Nations to combat climate change
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {sdgTargets.map((target, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-3d bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-3xl p-6 border border-red-500/30 relative overflow-hidden group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <target.icon className="w-6 h-6 text-red-400" />
                  </div>
                  <p className="text-gray-300 text-sm">{target.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to={createPageUrl('SDG13Targets')}>
              <Button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white px-8 py-4 rounded-full font-bold text-lg">
                Learn More About SDG 13
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* QR Code Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-gradient-to-br from-cyan-600/20 to-blue-700/20 border border-cyan-500/30"
          >
            <span className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">SHARE & SPREAD</span>
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
              Share This <span className="text-cyan-400">App</span>
            </h2>
            <p className="text-gray-400 text-lg mb-6">
              Scan the QR codes to access the app and games on your device!
            </p>
            <Link to={createPageUrl('QRCodes')}>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg">
                <QrCode className="w-5 h-5 mr-2" />
                Get QR Codes
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center earth-rotate">
                  🌍
                </div>
                <span className="font-orbitron font-bold text-xl text-green-400">MERRYLAND</span>
              </div>
              <p className="text-gray-400">SDG Goal Exhibition 2026</p>
              <p className="text-gray-400">Grade 8 - Climate Action Project</p>
            </div>
            
            <div>
              <h4 className="font-orbitron font-bold text-lg mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to={createPageUrl('ClimateDashboard')} className="block text-gray-400 hover:text-green-400 transition">Climate Dashboard</Link>
                <Link to={createPageUrl('CarbonCalculator')} className="block text-gray-400 hover:text-green-400 transition">Carbon Calculator</Link>
                <Link to={createPageUrl('ClimateGame')} className="block text-gray-400 hover:text-green-400 transition">Play Games</Link>
                <Link to={createPageUrl('SDG13Targets')} className="block text-gray-400 hover:text-green-400 transition">SDG 13 Targets</Link>
                <Link to={createPageUrl('QRCodes')} className="block text-gray-400 hover:text-green-400 transition">Share</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-orbitron font-bold text-lg mb-4">SDG 13 Targets</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>• Strengthen resilience to climate hazards</p>
                <p>• Integrate climate measures into policies</p>
                <p>• Improve education on climate change</p>
                <p>• Implement UN Framework Convention</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">Created with 💚 for MERRYLAND SDG Goal Exhibition 2026</p>
            <p className="text-gray-600 text-sm mt-2">"Together, we can learn, play, and take action for a greener future!"</p>
          </div>
        </div>
      </footer>
    </div>
  );
}