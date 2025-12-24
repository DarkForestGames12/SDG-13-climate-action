import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Target, AlertTriangle, FileText, GraduationCap, 
  Globe, Shield, Factory, TreeDeciduous, Users, Lightbulb,
  CheckCircle, ArrowRight, Landmark, BookOpen, Leaf
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const targets = [
  {
    id: '13.1',
    title: 'Strengthen Resilience to Climate Hazards',
    icon: Shield,
    color: 'from-red-500 to-orange-500',
    description: 'Strengthen resilience and adaptive capacity to climate-related hazards and natural disasters in all countries.',
    details: [
      'Build early warning systems for natural disasters',
      'Develop climate-resilient infrastructure',
      'Create disaster risk reduction strategies',
      'Protect vulnerable communities from extreme weather'
    ],
    examples: [
      'Flood defense systems in coastal cities',
      'Drought-resistant farming techniques',
      'Heat wave emergency response plans',
      'Storm-proof building codes'
    ],
    progress: 'Progress is being made with improved early warning systems covering 50% more people since 2015.'
  },
  {
    id: '13.2',
    title: 'Integrate Climate Measures into Policies',
    icon: FileText,
    color: 'from-blue-500 to-cyan-500',
    description: 'Integrate climate change measures into national policies, strategies and planning.',
    details: [
      'Include climate goals in all government decisions',
      'Create national climate action plans (NDCs)',
      'Align economic policies with climate targets',
      'Ensure climate considerations in urban planning'
    ],
    examples: [
      'Carbon pricing and emissions trading',
      'Renewable energy mandates',
      'Green building requirements',
      'Sustainable transportation policies'
    ],
    progress: '194 countries have submitted Nationally Determined Contributions (NDCs) under the Paris Agreement.'
  },
  {
    id: '13.3',
    title: 'Improve Education on Climate Change',
    icon: GraduationCap,
    color: 'from-green-500 to-emerald-500',
    description: 'Improve education, awareness-raising and human and institutional capacity on climate change mitigation, adaptation, impact reduction and early warning.',
    details: [
      'Include climate education in school curricula',
      'Train teachers on climate science',
      'Raise public awareness about climate action',
      'Build capacity for climate research and innovation'
    ],
    examples: [
      'Climate change courses in schools',
      'Public awareness campaigns',
      'Community workshops on sustainability',
      'Youth climate leadership programs'
    ],
    progress: 'Climate education is now included in curricula of over 75% of countries worldwide.'
  },
  {
    id: '13.a',
    title: 'Implement UN Framework Convention',
    icon: Globe,
    color: 'from-purple-500 to-pink-500',
    description: 'Implement the commitment undertaken by developed-country parties to the UNFCCC to mobilize $100 billion annually for climate action in developing countries.',
    details: [
      'Provide climate finance to developing nations',
      'Support technology transfer for clean energy',
      'Fund adaptation projects in vulnerable countries',
      'Build capacity for climate action globally'
    ],
    examples: [
      'Green Climate Fund investments',
      'Technology sharing agreements',
      'Capacity building programs',
      'Joint research initiatives'
    ],
    progress: 'Climate finance reached $83.3 billion in 2020, working toward the $100 billion goal.'
  },
  {
    id: '13.b',
    title: 'Support Developing Countries',
    icon: Users,
    color: 'from-amber-500 to-yellow-500',
    description: 'Promote mechanisms for raising capacity for effective climate change-related planning and management in least developed countries and small island developing States.',
    details: [
      'Focus on women, youth, and marginalized communities',
      'Support small island nations facing sea level rise',
      'Help least developed countries build climate resilience',
      'Ensure inclusive climate decision-making'
    ],
    examples: [
      'Pacific island adaptation programs',
      'African drought resilience initiatives',
      'Women-led climate solutions',
      'Youth climate councils'
    ],
    progress: 'All least developed countries have received support to develop National Adaptation Plans.'
  }
];

const keyFacts = [
  { icon: AlertTriangle, text: '1.5°C warming could be reached by 2030', color: 'text-red-400' },
  { icon: Globe, text: '195 countries signed the Paris Agreement', color: 'text-blue-400' },
  { icon: TreeDeciduous, text: 'Forests absorb 2.6 billion tonnes of CO₂ yearly', color: 'text-green-400' },
  { icon: Factory, text: 'Net zero emissions needed by 2050', color: 'text-purple-400' }
];

export default function SDG13Targets() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900">
      {/* Header */}
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SDG 13 Targets</span>
            </div>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 mb-4">
            UN Sustainable Development Goal 13
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Climate Action
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Take urgent action to combat climate change and its impacts
          </p>

          {/* SDG 13 Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-2xl shadow-orange-500/30 mb-8">
            <span className="text-4xl font-bold text-white">13</span>
          </div>
        </motion.div>

        {/* Key Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-4 mb-12"
        >
          {keyFacts.map((fact, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-4 flex items-center gap-3">
                <fact.icon className={`w-8 h-8 ${fact.color} flex-shrink-0`} />
                <p className="text-slate-300 text-sm">{fact.text}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Targets Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-amber-400" />
            SDG 13 Targets & Indicators
          </h2>

          <div className="space-y-4">
            {targets.map((target, index) => (
              <motion.div
                key={target.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="bg-slate-800/50 border-slate-700/50 overflow-hidden">
                  <Accordion type="single" collapsible>
                    <AccordionItem value={target.id} className="border-none">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-700/30">
                        <div className="flex items-center gap-4 text-left">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${target.color} flex items-center justify-center flex-shrink-0`}>
                            <target.icon className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <Badge variant="outline" className="text-slate-400 border-slate-600 mb-1">
                              Target {target.id}
                            </Badge>
                            <h3 className="text-lg font-semibold text-white">{target.title}</h3>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        <div className="ml-18 pl-4 border-l-2 border-slate-700 space-y-6">
                          {/* Description */}
                          <div>
                            <p className="text-slate-300 leading-relaxed">{target.description}</p>
                          </div>

                          {/* Key Actions */}
                          <div>
                            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                              Key Actions
                            </h4>
                            <ul className="space-y-2">
                              {target.details.map((detail, i) => (
                                <li key={i} className="flex items-start gap-2 text-slate-400">
                                  <span className="text-orange-400 mt-1">•</span>
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Real Examples */}
                          <div>
                            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                              <Globe className="w-4 h-4 text-blue-400" />
                              Real-World Examples
                            </h4>
                            <div className="grid md:grid-cols-2 gap-2">
                              {target.examples.map((example, i) => (
                                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                  <Leaf className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                  <span className="text-slate-300 text-sm">{example}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Progress */}
                          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                            <h4 className="text-emerald-300 font-semibold mb-2 flex items-center gap-2">
                              <ArrowRight className="w-4 h-4" />
                              Current Progress
                            </h4>
                            <p className="text-slate-300 text-sm">{target.progress}</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          <Card className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                Why SDG 13 Matters
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-3">
              <p>Climate change affects every country on every continent. It is disrupting national economies and affecting lives.</p>
              <p>Weather patterns are changing, sea levels are rising, and weather events are becoming more extreme.</p>
              <p>Without action, the world's average surface temperature is projected to rise beyond the critical threshold.</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Landmark className="w-5 h-5 text-blue-400" />
                International Framework
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-3">
              <p><strong className="text-white">Paris Agreement (2015):</strong> 195 nations agreed to limit warming to 1.5°C above pre-industrial levels.</p>
              <p><strong className="text-white">UNFCCC:</strong> The UN Framework Convention on Climate Change coordinates global climate action.</p>
              <p><strong className="text-white">NDCs:</strong> Each country submits Nationally Determined Contributions outlining their climate commitments.</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 border-orange-500/30">
            <CardContent className="p-8">
              <Target className="w-16 h-16 text-orange-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Take Action Now</h2>
              <p className="text-slate-300 mb-6 max-w-lg mx-auto">
                Everyone can contribute to climate action. Calculate your carbon footprint, learn more through our game, and start making eco-friendly choices today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={createPageUrl('CarbonCalculator')}>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    Calculate Your Footprint
                  </Button>
                </Link>
                <Link to={createPageUrl('ClimateGame')}>
                  <Button variant="outline" className="border-orange-500/50 text-orange-300 hover:bg-orange-500/20">
                    Play Climate Quest
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Footer with SDG Targets */}
      <footer className="bg-slate-950 py-12 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
              <Target className="w-5 h-5 text-orange-400" />
              SDG 13 Core Targets
            </h3>
            <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <p className="text-slate-300 text-sm">Strengthen resilience to climate hazards</p>
              </div>
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <FileText className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-slate-300 text-sm">Integrate climate measures into policies</p>
              </div>
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <GraduationCap className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-slate-300 text-sm">Improve education on climate change</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <Globe className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-slate-300 text-sm">Implement UN Framework Convention</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center">
            <p className="text-slate-500 text-sm">
              © 2026 Merryland SDG Exhibition — Grade 8 Climate Action Project
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}