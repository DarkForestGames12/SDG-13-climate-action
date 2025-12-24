import React from 'react';

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Poppins:wght@300;400;600;700&display=swap');
        
        * { 
          font-family: 'Poppins', sans-serif;
          scroll-behavior: smooth;
        }
        
        .font-orbitron { 
          font-family: 'Orbitron', sans-serif !important; 
        }
        
        :root {
          --background: 222.2 84% 4.9%;
          --foreground: 210 40% 98%;
          --primary: 142.1 76.2% 36.3%;
          --primary-foreground: 355.7 100% 97.3%;
        }
        
        /* Animated gradient background */
        .hero-bg {
          background: linear-gradient(-45deg, #0f4c3a, #1a5d4a, #0d3d5c, #134e5e);
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
        }
        
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* Glowing effect */
        .glow {
          box-shadow: 0 0 60px rgba(34, 197, 94, 0.4);
        }
        
        .glow-text {
          text-shadow: 0 0 30px rgba(34, 197, 94, 0.6);
        }
        
        /* Card hover effects */
        .card-3d {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }
        
        .card-3d:hover {
          transform: translateY(-10px) rotateX(5deg);
          box-shadow: 0 30px 60px rgba(0,0,0,0.3);
        }
        
        /* Pulse animation */
        .pulse-green {
          animation: pulseGreen 2s infinite;
        }
        
        @keyframes pulseGreen {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          50% { box-shadow: 0 0 0 20px rgba(34, 197, 94, 0); }
        }
        
        /* Earth rotation */
        .earth-rotate {
          animation: earthSpin 30s linear infinite;
        }
        
        @keyframes earthSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Floating particles */
        .particle {
          position: absolute;
          border-radius: 50%;
          animation: float 20s infinite;
          opacity: 0.3;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(120deg); }
          66% { transform: translateY(20px) rotate(240deg); }
        }
        
        /* Leaf falling animation */
        .leaf {
          animation: leafFall linear infinite;
        }
        
        @keyframes leafFall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        
        /* Progress bar animation */
        .progress-animate {
          animation: progressFill 2s ease-out forwards;
        }
        
        @keyframes progressFill {
          from { width: 0%; }
        }
        
        @media print {
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
          .print\\:bg-white { background: white !important; }
          .print\\:border-gray-300 { border-color: #d1d5db !important; }
          .print\\:mb-8 { margin-bottom: 2rem !important; }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1a1a2e;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #22c55e;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #16a34a;
        }
        
        /* Global transitions */
        a, button {
          transition: all 0.2s ease;
        }
      `}</style>
      {children}
    </div>
  );
}