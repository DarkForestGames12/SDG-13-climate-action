import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, QrCode, Globe, Gamepad2, Download, Share2,
  Smartphone, Copy, Check, ExternalLink, Printer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

// QR Code component using Google Charts API for real, scannable QR codes
const QRCodeDisplay = ({ value, size = 200, label, icon: Icon }) => {
  // Using Google Charts API to generate actual scannable QR codes
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}`;

  return (
    <div className="flex flex-col items-center">
      <div className="p-4 bg-white rounded-2xl shadow-xl mb-4">
        <img 
          src={qrCodeUrl} 
          alt={`QR Code for ${label}`}
          width={size} 
          height={size}
          className="rounded-lg"
        />
      </div>
      <div className="flex items-center gap-2 text-white">
        <Icon className="w-5 h-5" />
        <span className="font-semibold">{label}</span>
      </div>
    </div>
  );
};

export default function QRCodes() {
  const [copied, setCopied] = useState(null);
  const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://example.com';
  const gameUrl = `${appUrl}${createPageUrl('ClimateGame')}`;
  const dashboardUrl = `${appUrl}${createPageUrl('ClimateDashboard')}`;
  const calculatorUrl = `${appUrl}${createPageUrl('CarbonCalculator')}`;

  const handleCopy = (url, type) => {
    navigator.clipboard.writeText(url);
    setCopied(type);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const qrCodes = [
    {
      id: 'app',
      label: 'Main App',
      url: appUrl,
      icon: Globe,
      color: 'from-emerald-500 to-cyan-500',
      description: 'Scan to access the complete Climate Action app'
    },
    {
      id: 'game',
      label: 'Climate Quest Game',
      url: gameUrl,
      icon: Gamepad2,
      color: 'from-purple-500 to-pink-500',
      description: 'Scan to play the educational climate game'
    },
    {
      id: 'dashboard',
      label: 'Climate Dashboard',
      url: dashboardUrl,
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      description: 'Scan to view climate data visualizations'
    },
    {
      id: 'calculator',
      label: 'Carbon Calculator',
      url: calculatorUrl,
      icon: Globe,
      color: 'from-green-500 to-emerald-500',
      description: 'Scan to calculate your carbon footprint'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50 print:hidden">
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
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">QR Codes</span>
            </div>
            <Button onClick={handlePrint} variant="outline" className="border-slate-700 text-slate-300">
              <Printer className="w-4 h-4 mr-2" />
              Print All
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 print:mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
            <Smartphone className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm">Scan with your phone camera</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Share the Experience
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Use these QR codes to share the Climate Action app and game with visitors at the exhibition
          </p>
        </motion.div>

        {/* QR Codes Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {qrCodes.map((qr, index) => (
            <motion.div
              key={qr.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 overflow-hidden print:bg-white print:border-gray-300">
                <CardHeader className={`bg-gradient-to-r ${qr.color} p-6`}>
                  <CardTitle className="text-white flex items-center gap-3 text-xl">
                    <qr.icon className="w-6 h-6" />
                    {qr.label}
                  </CardTitle>
                  <p className="text-white/80 text-sm">{qr.description}</p>
                </CardHeader>
                <CardContent className="p-8 flex flex-col items-center">
                  <QRCodeDisplay 
                    value={qr.url} 
                    size={200} 
                    label={qr.label}
                    icon={qr.icon}
                  />
                  
                  <div className="w-full mt-6 space-y-3 print:hidden">
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-700/50 text-slate-300 text-sm break-all">
                      <ExternalLink className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{qr.url}</span>
                    </div>
                    
                    <Button
                      onClick={() => handleCopy(qr.url, qr.id)}
                      variant="outline"
                      className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      {copied === qr.id ? (
                        <>
                          <Check className="w-4 h-4 mr-2 text-green-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Link
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="print:hidden"
        >
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-cyan-400" />
                How to Scan QR Codes
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">1. Open Camera</h3>
                <p className="text-slate-400 text-sm">Open your phone's camera app</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">2. Point at Code</h3>
                <p className="text-slate-400 text-sm">Point your camera at the QR code</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">3. Tap Link</h3>
                <p className="text-slate-400 text-sm">Tap the link that appears to open</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Print Footer */}
        <div className="hidden print:block mt-8 text-center border-t border-gray-300 pt-8">
          <h2 className="text-2xl font-bold mb-2">Merryland SDG Goal Exhibition 2026</h2>
          <p className="text-gray-600">Grade 8 - SDG 13: Climate Action</p>
          <p className="text-gray-500 text-sm mt-4">Scan any QR code with your phone camera to access the app</p>
        </div>
      </main>
    </div>
  );
}