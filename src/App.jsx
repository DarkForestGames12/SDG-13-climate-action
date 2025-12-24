import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './Layout.jsx';
import Home from './pages/Home';
import ClimateDashboard from './pages/ClimateDashboard';
import CarbonCalculator from './pages/CarbonCalculator';
import ClimateGame from './pages/ClimateGame';
import SDG13Targets from './pages/SDG13Targets';
import QRCodes from './pages/QRCodes';

function App() {
  return (
    <Router>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/climate-dashboard" element={<Layout><ClimateDashboard /></Layout>} />
        <Route path="/carbon-calculator" element={<Layout><CarbonCalculator /></Layout>} />
        <Route path="/climate-game" element={<Layout><ClimateGame /></Layout>} />
        <Route path="/sdg13-targets" element={<Layout><SDG13Targets /></Layout>} />
        <Route path="/qr-codes" element={<Layout><QRCodes /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;