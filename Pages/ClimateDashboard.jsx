import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { 
  Thermometer, TrendingUp, ArrowLeft, Info, 
  Droplets, Wind, AlertTriangle, Globe, Factory,
  TreeDeciduous, Waves, Sun, CloudRain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';

// Temperature Anomaly Data (1880-2024) - Based on NASA GISS data
const temperatureData = [
  { year: 1880, anomaly: -0.16, description: "Industrial Revolution impact begins. Global temperatures 0.16°C below 20th century average." },
  { year: 1890, anomaly: -0.35, description: "Volcanic activity contributes to cooling. Lower than average temperatures recorded globally." },
  { year: 1900, anomaly: -0.08, description: "Turn of the century. Early fossil fuel use starting to increase with industrialization." },
  { year: 1910, anomaly: -0.42, description: "Cool period due to natural climate variability and low solar activity." },
  { year: 1920, anomaly: -0.25, description: "Post-WWI era. Industrial production and emissions begin recovery." },
  { year: 1930, anomaly: -0.14, description: "Great Depression reduces industrial emissions temporarily, but warming trend emerges." },
  { year: 1940, anomaly: 0.12, description: "First positive anomaly appears. WWII industrial production increases emissions significantly." },
  { year: 1950, anomaly: -0.17, description: "Post-war cooling despite increased emissions. Aerosols may have masked warming." },
  { year: 1960, anomaly: -0.01, description: "Near baseline temperatures. Growing awareness of air pollution effects." },
  { year: 1970, anomaly: -0.01, description: "First Earth Day celebrated. Environmental movement begins amid stable temperatures." },
  { year: 1980, anomaly: 0.26, description: "Clear warming trend established. Scientists raise climate change concerns." },
  { year: 1990, anomaly: 0.44, description: "IPCC formed. Kyoto Protocol discussions begin as warming accelerates." },
  { year: 2000, anomaly: 0.42, description: "New millennium begins with sustained high temperatures. Arctic ice decline observed." },
  { year: 2005, anomaly: 0.69, description: "Hurricane Katrina devastates New Orleans. Link between warming and extreme weather studied." },
  { year: 2010, anomaly: 0.72, description: "Tied for warmest year on record at the time. Arctic sea ice reaches record low." },
  { year: 2015, anomaly: 0.90, description: "Paris Agreement signed. 195 nations commit to limiting warming to 1.5°C above pre-industrial." },
  { year: 2016, anomaly: 1.02, description: "Hottest year ever recorded. Strong El Niño amplifies human-caused warming." },
  { year: 2017, anomaly: 0.92, description: "Second hottest year. Extreme weather events increase globally." },
  { year: 2018, anomaly: 0.85, description: "IPCC special report warns of 1.5°C threshold impacts. Wildfires devastate California." },
  { year: 2019, anomaly: 0.98, description: "Second warmest year. Amazon fires and Australian bushfires capture global attention." },
  { year: 2020, anomaly: 1.02, description: "Tied hottest year. COVID-19 temporarily reduces emissions but warming continues." },
  { year: 2021, anomaly: 0.84, description: "La Niña cooling effect. COP26 in Glasgow pushes for stronger commitments." },
  { year: 2022, anomaly: 0.89, description: "European heat waves break records. Pakistan floods displace millions." },
  { year: 2023, anomaly: 1.18, description: "Hottest year in recorded history. Ocean temperatures reach unprecedented levels." },
  { year: 2024, anomaly: 1.25, description: "Record-breaking temperatures continue. Urgent action needed to prevent catastrophic warming." }
];

// CO2 Concentration Data
const co2Data = [
  { year: 1960, ppm: 316 },
  { year: 1970, ppm: 325 },
  { year: 1980, ppm: 338 },
  { year: 1990, ppm: 354 },
  { year: 2000, ppm: 369 },
  { year: 2010, ppm: 389 },
  { year: 2020, ppm: 413 },
  { year: 2024, ppm: 422 }
];

// Sea Level Rise Data
const seaLevelData = [
  { year: 1993, rise: 0 },
  { year: 1998, rise: 15 },
  { year: 2003, rise: 30 },
  { year: 2008, rise: 50 },
  { year: 2013, rise: 70 },
  { year: 2018, rise: 90 },
  { year: 2023, rise: 110 }
];

// Emissions by Sector
const emissionsBySector = [
  { name: "Energy", value: 73, color: "#ef4444" },
  { name: "Agriculture", value: 12, color: "#22c55e" },
  { name: "Industry", value: 6, color: "#3b82f6" },
  { name: "Waste", value: 3, color: "#a855f7" },
  { name: "Other", value: 6, color: "#64748b" }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = temperatureData.find(d => d.year === label);
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-xl max-w-xs">
        <p className="text-white font-semibold text-lg mb-1">Year: {label}</p>
        <p className={`font-bold text-xl mb-2 ${payload[0].value >= 0 ? 'text-red-400' : 'text-blue-400'}`}>
          {payload[0].value >= 0 ? '+' : ''}{payload[0].value}°C
        </p>
        {data && (
          <p className="text-slate-300 text-sm leading-relaxed">
            {data.description}
          </p>
        )}
      </div>
    );
  }
  return null;
};

const CO2Tooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-xl">
        <p className="text-white font-semibold">Year: {label}</p>
        <p className="text-emerald-400 font-bold text-xl">{payload[0].value} ppm</p>
        <p className="text-slate-400 text-sm">Parts per million CO₂</p>
      </div>
    );
  }
  return null;
};

const SeaLevelTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-xl">
        <p className="text-white font-semibold">Year: {label}</p>
        <p className="text-cyan-400 font-bold text-xl">+{payload[0].value} mm</p>
        <p className="text-slate-400 text-sm">Sea level rise since 1993</p>
      </div>
    );
  }
  return null;
};

export default function ClimateDashboard() {
  const [selectedYear, setSelectedYear] = useState(null);

  const stats = [
    { 
      icon: Thermometer, 
      label: "Current Warming", 
      value: "+1.25°C", 
      subtext: "Above pre-industrial",
      color: "from-red-500 to-orange-500"
    },
    { 
      icon: Wind, 
      label: "CO₂ Level", 
      value: "422 ppm", 
      subtext: "Highest in 800,000 years",
      color: "from-purple-500 to-pink-500"
    },
    { 
      icon: Waves, 
      label: "Sea Level Rise", 
      value: "+110 mm", 
      subtext: "Since 1993",
      color: "from-cyan-500 to-blue-500"
    },
    { 
      icon: AlertTriangle, 
      label: "Arctic Ice Loss", 
      value: "13%", 
      subtext: "Per decade since 1979",
      color: "from-amber-500 to-yellow-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Climate Dashboard</span>
            </div>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold">REAL-TIME DATA</span>
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mt-6 mb-4">
            Climate <span className="text-blue-400">Dashboard</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Visualizing the state of our planet
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                      <p className="text-slate-500 text-xs mt-1">{stat.subtext}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Charts */}
        <Tabs defaultValue="temperature" className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="temperature" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Temperature
            </TabsTrigger>
            <TabsTrigger value="co2" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              CO₂ Levels
            </TabsTrigger>
            <TabsTrigger value="sealevel" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              Sea Level
            </TabsTrigger>
            <TabsTrigger value="emissions" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              Emissions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="temperature">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Thermometer className="w-5 h-5 text-red-400" />
                  Global Temperature Anomaly (1880-2024)
                </CardTitle>
                <p className="text-slate-400 text-sm flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Hover over each bar to see detailed information about that year
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={temperatureData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis 
                        dataKey="year" 
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8' }}
                        tickLine={{ stroke: '#94a3b8' }}
                      />
                      <YAxis 
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8' }}
                        tickLine={{ stroke: '#94a3b8' }}
                        domain={[-0.5, 1.5]}
                        tickFormatter={(value) => `${value}°C`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="anomaly" 
                        radius={[4, 4, 0, 0]}
                        fill="#3b82f6"
                      >
                        {temperatureData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.anomaly >= 0 ? 
                              `rgba(239, 68, 68, ${0.4 + entry.anomaly * 0.5})` : 
                              `rgba(59, 130, 246, ${0.4 + Math.abs(entry.anomaly) * 0.8})`
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center justify-center gap-8">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-blue-500" />
                    <span className="text-slate-400 text-sm">Below Average</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-red-500" />
                    <span className="text-slate-400 text-sm">Above Average</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="co2">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Wind className="w-5 h-5 text-emerald-400" />
                  Atmospheric CO₂ Concentration (1960-2024)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={co2Data}>
                      <defs>
                        <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="year" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" domain={[300, 450]} tickFormatter={(v) => `${v}`} />
                      <Tooltip content={<CO2Tooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="ppm" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        fill="url(#co2Gradient)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sealevel">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Waves className="w-5 h-5 text-cyan-400" />
                  Global Sea Level Rise (1993-2023)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={seaLevelData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="year" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" tickFormatter={(v) => `${v}mm`} />
                      <Tooltip content={<SeaLevelTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="rise" 
                        stroke="#06b6d4" 
                        strokeWidth={3}
                        dot={{ fill: '#06b6d4', strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, fill: '#22d3ee' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emissions">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Factory className="w-5 h-5 text-purple-400" />
                  Global Greenhouse Gas Emissions by Sector
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={emissionsBySector}
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        innerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                        labelLine={{ stroke: '#94a3b8' }}
                      >
                        {emissionsBySector.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e293b', 
                          border: '1px solid #334155',
                          borderRadius: '8px'
                        }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Legend 
                        verticalAlign="bottom"
                        iconType="circle"
                        wrapperStyle={{ color: '#94a3b8' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid md:grid-cols-3 gap-4"
        >
          <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20">
            <CardContent className="p-6">
              <Sun className="w-8 h-8 text-orange-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Warming Acceleration</h3>
              <p className="text-slate-300 text-sm">
                The rate of warming has nearly doubled since 1980. The last decade was the warmest on record.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
            <CardContent className="p-6">
              <CloudRain className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Extreme Weather</h3>
              <p className="text-slate-300 text-sm">
                Climate change is increasing the frequency and intensity of extreme weather events worldwide.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-500/20">
            <CardContent className="p-6">
              <TreeDeciduous className="w-8 h-8 text-emerald-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Hope for Action</h3>
              <p className="text-slate-300 text-sm">
                With immediate action, we can still limit warming to 1.5°C and prevent the worst impacts.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}