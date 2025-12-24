import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Calculator, Car, Home, Utensils, ShoppingBag,
  Plane, Leaf, ChevronRight, ChevronLeft, Check, AlertTriangle,
  Zap, Droplets, Trash2, Recycle, TreeDeciduous, Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';

const categories = [
  { id: 'transport', icon: Car, title: 'Transportation', color: 'from-blue-500 to-cyan-500' },
  { id: 'home', icon: Home, title: 'Home Energy', color: 'from-amber-500 to-orange-500' },
  { id: 'food', icon: Utensils, title: 'Food & Diet', color: 'from-green-500 to-emerald-500' },
  { id: 'shopping', icon: ShoppingBag, title: 'Shopping', color: 'from-purple-500 to-pink-500' },
  { id: 'travel', icon: Plane, title: 'Air Travel', color: 'from-red-500 to-rose-500' }
];

export default function CarbonCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState({
    // Transportation
    carMiles: 50,
    carType: 'gasoline',
    publicTransport: 'sometimes',
    
    // Home Energy
    electricityBill: 100,
    heatingType: 'gas',
    renewableEnergy: 'no',
    
    // Food
    dietType: 'mixed',
    localFood: 'sometimes',
    foodWaste: 'some',
    
    // Shopping
    newClothes: 'monthly',
    electronics: 'yearly',
    recycling: 'most',
    
    // Travel
    shortFlights: 0,
    longFlights: 0
  });

  const calculateFootprint = () => {
    let total = 0;

    // Transportation (kg CO2 per year)
    const carEmissions = {
      electric: 0.1,
      hybrid: 0.15,
      gasoline: 0.25,
      diesel: 0.27
    };
    total += answers.carMiles * 52 * carEmissions[answers.carType];

    const publicTransportFactor = {
      never: 0,
      sometimes: -200,
      often: -500,
      always: -800
    };
    total += publicTransportFactor[answers.publicTransport];

    // Home Energy
    total += answers.electricityBill * 12 * 0.5;

    const heatingFactor = {
      electric: 1.0,
      gas: 1.2,
      oil: 1.5,
      renewable: 0.3
    };
    total += 2000 * heatingFactor[answers.heatingType];

    if (answers.renewableEnergy === 'yes') total *= 0.7;
    if (answers.renewableEnergy === 'partial') total *= 0.85;

    // Food
    const dietFactor = {
      vegan: 1500,
      vegetarian: 1700,
      pescatarian: 2000,
      mixed: 2500,
      meatHeavy: 3500
    };
    total += dietFactor[answers.dietType];

    const localFoodFactor = {
      always: 0.8,
      often: 0.9,
      sometimes: 1.0,
      rarely: 1.1
    };
    total *= localFoodFactor[answers.localFood];

    const wasteFactor = {
      none: 0.9,
      some: 1.0,
      lots: 1.2
    };
    total *= wasteFactor[answers.foodWaste];

    // Shopping
    const clothesFactor = {
      rarely: 100,
      quarterly: 200,
      monthly: 400,
      weekly: 800
    };
    total += clothesFactor[answers.newClothes];

    const electronicsFactor = {
      rarely: 50,
      yearly: 150,
      often: 400
    };
    total += electronicsFactor[answers.electronics];

    const recyclingFactor = {
      all: 0.85,
      most: 0.9,
      some: 1.0,
      none: 1.15
    };
    total *= recyclingFactor[answers.recycling];

    // Air Travel
    total += answers.shortFlights * 250;
    total += answers.longFlights * 1500;

    return Math.round(total);
  };

  const getFootprintLevel = (footprint) => {
    if (footprint < 4000) return { level: 'Excellent', color: 'text-emerald-400', bgColor: 'bg-emerald-500' };
    if (footprint < 8000) return { level: 'Good', color: 'text-green-400', bgColor: 'bg-green-500' };
    if (footprint < 12000) return { level: 'Average', color: 'text-yellow-400', bgColor: 'bg-yellow-500' };
    if (footprint < 16000) return { level: 'High', color: 'text-orange-400', bgColor: 'bg-orange-500' };
    return { level: 'Very High', color: 'text-red-400', bgColor: 'bg-red-500' };
  };

  const getTips = (answers) => {
    const tips = [];
    
    if (answers.carType === 'gasoline' || answers.carType === 'diesel') {
      tips.push({ icon: Car, text: 'Consider switching to an electric or hybrid vehicle' });
    }
    if (answers.publicTransport === 'never' || answers.publicTransport === 'sometimes') {
      tips.push({ icon: Car, text: 'Use public transportation more often' });
    }
    if (answers.renewableEnergy === 'no') {
      tips.push({ icon: Zap, text: 'Switch to renewable energy sources' });
    }
    if (answers.dietType === 'meatHeavy' || answers.dietType === 'mixed') {
      tips.push({ icon: Utensils, text: 'Reduce meat consumption, try meatless days' });
    }
    if (answers.localFood === 'rarely' || answers.localFood === 'sometimes') {
      tips.push({ icon: Leaf, text: 'Buy more local and seasonal produce' });
    }
    if (answers.foodWaste === 'lots') {
      tips.push({ icon: Trash2, text: 'Plan meals to reduce food waste' });
    }
    if (answers.recycling !== 'all') {
      tips.push({ icon: Recycle, text: 'Improve your recycling habits' });
    }
    if (answers.shortFlights > 2 || answers.longFlights > 1) {
      tips.push({ icon: Plane, text: 'Consider video calls instead of flying for meetings' });
    }
    
    return tips.slice(0, 5);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-white mb-3 block">How many miles do you drive per week?</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[answers.carMiles]}
                  onValueChange={([value]) => setAnswers({ ...answers, carMiles: value })}
                  max={500}
                  step={10}
                  className="flex-1"
                />
                <span className="text-white font-bold w-20 text-right">{answers.carMiles} mi</span>
              </div>
            </div>

            <div>
              <Label className="text-white mb-3 block">What type of car do you drive?</Label>
              <RadioGroup
                value={answers.carType}
                onValueChange={(value) => setAnswers({ ...answers, carType: value })}
                className="grid grid-cols-2 gap-3"
              >
                {['electric', 'hybrid', 'gasoline', 'diesel'].map((type) => (
                  <div key={type} className="flex items-center">
                    <RadioGroupItem value={type} id={type} className="peer hidden" />
                    <Label
                      htmlFor={type}
                      className="flex-1 p-4 rounded-xl border border-slate-700 bg-slate-800/50 cursor-pointer transition-all peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-500/20 hover:border-slate-600"
                    >
                      <span className="text-white capitalize">{type}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-white mb-3 block">How often do you use public transportation?</Label>
              <RadioGroup
                value={answers.publicTransport}
                onValueChange={(value) => setAnswers({ ...answers, publicTransport: value })}
                className="grid grid-cols-2 gap-3"
              >
                {['never', 'sometimes', 'often', 'always'].map((freq) => (
                  <div key={freq} className="flex items-center">
                    <RadioGroupItem value={freq} id={`pt-${freq}`} className="peer hidden" />
                    <Label
                      htmlFor={`pt-${freq}`}
                      className="flex-1 p-4 rounded-xl border border-slate-700 bg-slate-800/50 cursor-pointer transition-all peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-500/20 hover:border-slate-600"
                    >
                      <span className="text-white capitalize">{freq}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-white mb-3 block">What's your monthly electricity bill? ($)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[answers.electricityBill]}
                  onValueChange={([value]) => setAnswers({ ...answers, electricityBill: value })}
                  max={500}
                  step={10}
                  className="flex-1"
                />
                <span className="text-white font-bold w-20 text-right">${answers.electricityBill}</span>
              </div>
            </div>

            <div>
              <Label className="text-white mb-3 block">What's your primary heating source?</Label>
              <RadioGroup
                value={answers.heatingType}
                onValueChange={(value) => setAnswers({ ...answers, heatingType: value })}
                className="grid grid-cols-2 gap-3"
              >
                {['electric', 'gas', 'oil', 'renewable'].map((type) => (
                  <div key={type} className="flex items-center">
                    <RadioGroupItem value={type} id={`heat-${type}`} className="peer hidden" />
                    <Label
                      htmlFor={`heat-${type}`}
                      className="flex-1 p-4 rounded-xl border border-slate-700 bg-slate-800/50 cursor-pointer transition-all peer-data-[state=checked]:border-orange-500 peer-data-[state=checked]:bg-orange-500/20 hover:border-slate-600"
                    >
                      <span className="text-white capitalize">{type}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-white mb-3 block">Do you use renewable energy?</Label>
              <RadioGroup
                value={answers.renewableEnergy}
                onValueChange={(value) => setAnswers({ ...answers, renewableEnergy: value })}
                className="grid grid-cols-3 gap-3"
              >
                {['yes', 'partial', 'no'].map((opt) => (
                  <div key={opt} className="flex items-center">
                    <RadioGroupItem value={opt} id={`renew-${opt}`} className="peer hidden" />
                    <Label
                      htmlFor={`renew-${opt}`}
                      className="flex-1 p-4 rounded-xl border border-slate-700 bg-slate-800/50 cursor-pointer transition-all peer-data-[state=checked]:border-orange-500 peer-data-[state=checked]:bg-orange-500/20 hover:border-slate-600 text-center"
                    >
                      <span className="text-white capitalize">{opt === 'partial' ? 'Partially' : opt === 'yes' ? 'Yes' : 'No'}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-white mb-3 block">What's your diet type?</Label>
              <RadioGroup
                value={answers.dietType}
                onValueChange={(value) => setAnswers({ ...answers, dietType: value })}
                className="grid grid-cols-2 gap-3"
              >
                {[
                  { value: 'vegan', label: 'Vegan' },
                  { value: 'vegetarian', label: 'Vegetarian' },
                  { value: 'pescatarian', label: 'Pescatarian' },
                  { value: 'mixed', label: 'Mixed' },
                  { value: 'meatHeavy', label: 'Meat Heavy' }
                ].map((diet) => (
                  <div key={diet.value} className="flex items-center">
                    <RadioGroupItem value={diet.value} id={`diet-${diet.value}`} className="peer hidden" />
                    <Label
                      htmlFor={`diet-${diet.value}`}
                      className="flex-1 p-4 rounded-xl border border-slate-700 bg-slate-800/50 cursor-pointer transition-all peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-green-500/20 hover:border-slate-600"
                    >
                      <span className="text-white">{diet.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-white mb-3 block">How often do you buy local food?</Label>
              <RadioGroup
                value={answers.localFood}
                onValueChange={(value) => setAnswers({ ...answers, localFood: value })}
                className="grid grid-cols-2 gap-3"
              >
                {['always', 'often', 'sometimes', 'rarely'].map((freq) => (
                  <div key={freq} className="flex items-center">
                    <RadioGroupItem value={freq} id={`local-${freq}`} className="peer hidden" />
                    <Label
                      htmlFor={`local-${freq}`}
                      className="flex-1 p-4 rounded-xl border border-slate-700 bg-slate-800/50 cursor-pointer transition-all peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-green-500/20 hover:border-slate-600"
                    >
                      <span className="text-white capitalize">{freq}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-white mb-3 block">How much food do you waste?</Label>
              <RadioGroup
                value={answers.foodWaste}
                onValueChange={(value) => setAnswers({ ...answers, foodWaste: value })}
                className="grid grid-cols-3 gap-3"
              >
                {['none', 'some', 'lots'].map((amount) => (
                  <div key={amount} className="flex items-center">
                    <RadioGroupItem value={amount} id={`waste-${amount}`} className="peer hidden" />
                    <Label
                      htmlFor={`waste-${amount}`}
                      className="flex-1 p-4 rounded-xl border border-slate-700 bg-slate-800/50 cursor-pointer transition-all peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-green-500/20 hover:border-slate-600 text-center"
                    >
                      <span className="text-white capitalize">{amount === 'none' ? 'Almost None' : amount === 'some' ? 'Some' : 'A Lot'}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-white mb-3 block">How often do you buy new clothes?</Label>
              <RadioGroup
                value={answers.newClothes}
                onValueChange={(value) => setAnswers({ ...answers, newClothes: value })}
                className="grid grid-cols-2 gap-3"
              >
                {['rarely', 'quarterly', 'monthly', 'weekly'].map((freq) => (
                  <div key={freq} className="flex items-center">
                    <RadioGroupItem value={freq} id={`clothes-${freq}`} className="peer hidden" />
                    <Label
                      htmlFor={`clothes-${freq}`}
                      className="flex-1 p-4 rounded-xl border border-slate-700 bg-slate-800/50 cursor-pointer transition-all peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-500/20 hover:border-slate-600"
                    >
                      <span className="text-white capitalize">{freq}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-white mb-3 block">How often do you buy new electronics?</Label>
              <RadioGroup
                value={answers.electronics}
                onValueChange={(value) => setAnswers({ ...answers, electronics: value })}
                className="grid grid-cols-3 gap-3"
              >
                {['rarely', 'yearly', 'often'].map((freq) => (
                  <div key={freq} className="flex items-center">
                    <RadioGroupItem value={freq} id={`elec-${freq}`} className="peer hidden" />
                    <Label
                      htmlFor={`elec-${freq}`}
                      className="flex-1 p-4 rounded-xl border border-slate-700 bg-slate-800/50 cursor-pointer transition-all peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-500/20 hover:border-slate-600 text-center"
                    >
                      <span className="text-white capitalize">{freq}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-white mb-3 block">How much do you recycle?</Label>
              <RadioGroup
                value={answers.recycling}
                onValueChange={(value) => setAnswers({ ...answers, recycling: value })}
                className="grid grid-cols-2 gap-3"
              >
                {['all', 'most', 'some', 'none'].map((amount) => (
                  <div key={amount} className="flex items-center">
                    <RadioGroupItem value={amount} id={`recycle-${amount}`} className="peer hidden" />
                    <Label
                      htmlFor={`recycle-${amount}`}
                      className="flex-1 p-4 rounded-xl border border-slate-700 bg-slate-800/50 cursor-pointer transition-all peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-500/20 hover:border-slate-600"
                    >
                      <span className="text-white capitalize">{amount === 'all' ? 'Everything' : amount === 'most' ? 'Most Things' : amount === 'some' ? 'Some Things' : 'Nothing'}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-white mb-3 block">Short flights per year (under 3 hours)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[answers.shortFlights]}
                  onValueChange={([value]) => setAnswers({ ...answers, shortFlights: value })}
                  max={20}
                  step={1}
                  className="flex-1"
                />
                <span className="text-white font-bold w-16 text-right">{answers.shortFlights}</span>
              </div>
            </div>

            <div>
              <Label className="text-white mb-3 block">Long flights per year (over 3 hours)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[answers.longFlights]}
                  onValueChange={([value]) => setAnswers({ ...answers, longFlights: value })}
                  max={10}
                  step={1}
                  className="flex-1"
                />
                <span className="text-white font-bold w-16 text-right">{answers.longFlights}</span>
              </div>
            </div>

            <Card className="bg-amber-500/10 border-amber-500/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Plane className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-200 text-sm">
                    Air travel is one of the most carbon-intensive activities. A single long-haul flight can equal several months of car driving emissions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  if (showResults) {
    const footprint = calculateFootprint();
    const level = getFootprintLevel(footprint);
    const tips = getTips(answers);
    const treesNeeded = Math.round(footprint / 22);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to={createPageUrl('Home')}>
                <Button variant="ghost" className="text-slate-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Your Results</span>
              </div>
              <Button onClick={() => { setShowResults(false); setCurrentStep(0); }} variant="outline" className="border-slate-700 text-slate-300">
                Recalculate
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block mb-6">
              <div className={`w-48 h-48 rounded-full ${level.bgColor}/20 flex items-center justify-center mx-auto`}>
                <div className={`w-36 h-36 rounded-full ${level.bgColor}/30 flex items-center justify-center`}>
                  <div className="text-center">
                    <p className={`text-4xl font-bold ${level.color}`}>{(footprint / 1000).toFixed(1)}</p>
                    <p className="text-slate-400 text-sm">tonnes CO₂/year</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">Your Carbon Footprint</h2>
            <p className={`text-xl ${level.color} font-semibold mb-4`}>{level.level}</p>
            <p className="text-slate-400 max-w-lg mx-auto">
              The global average is about 4.8 tonnes per person per year. To limit warming to 1.5°C, we need to reduce to under 2 tonnes per person.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TreeDeciduous className="w-5 h-5 text-emerald-400" />
                    Trees to Offset
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-emerald-400 mb-2">{treesNeeded}</p>
                  <p className="text-slate-400">trees needed to absorb your annual carbon emissions</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Award className="w-5 h-5 text-amber-400" />
                    Your Ranking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-4">
                    {footprint < 4000 && "You're doing great! Your footprint is below the sustainable target."}
                    {footprint >= 4000 && footprint < 8000 && "Good job! You're below the global average."}
                    {footprint >= 8000 && footprint < 12000 && "You're around the average. There's room for improvement."}
                    {footprint >= 12000 && "Your footprint is above average. Check out the tips below!"}
                  </p>
                  <Progress value={Math.min((footprint / 16000) * 100, 100)} className="h-3" />
                  <div className="flex justify-between mt-2 text-xs text-slate-500">
                    <span>0</span>
                    <span>Sustainable (2t)</span>
                    <span>Average (5t)</span>
                    <span>16t+</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Leaf className="w-5 h-5 text-emerald-400" />
                  Tips to Reduce Your Footprint
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tips.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                    >
                      <tip.icon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <p className="text-slate-300">{tip.text}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to={createPageUrl('Home')}>
              <Button variant="ghost" className="text-slate-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Carbon Calculator</span>
            </div>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {categories.map((cat, index) => (
              <div
                key={cat.id}
                className={`flex flex-col items-center ${index <= currentStep ? 'opacity-100' : 'opacity-40'}`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-2 ${index === currentStep ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''}`}>
                  <cat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-slate-400 hidden md:block">{cat.title}</span>
              </div>
            ))}
          </div>
          <Progress value={((currentStep + 1) / categories.length) * 100} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white">
              {React.createElement(categories[currentStep].icon, { className: "w-6 h-6" })}
              {categories[currentStep].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 0}
            className="border-slate-700 text-slate-300"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < categories.length - 1 ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={() => setShowResults(true)}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
            >
              Calculate My Footprint
              <Check className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}