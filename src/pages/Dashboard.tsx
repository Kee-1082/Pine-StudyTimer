import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Logo from '@/components/Logo';
import pineForestBg from '@/assets/pine-forest-bg.jpg';

const motivationalQuotes = [
  "Coffee in hand, goals in mind ☕",
  "Your future self will thank you 🌟",
  "Progress over perfection, always ✨",
  "Small steps, big dreams 🚀",
  "Focus mode: activated 🎯",
  "You've got this, champion! 💪",
  "One pomodoro at a time 🍅",
  "Consistency is your superpower 🦸‍♀️",
  "Study smart, not just hard 🧠",
  "Excellence is a habit, not an act 🏆"
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setCurrentQuote(randomQuote);
  }, []);

  const themes = [
    {
      id: 'minimalist',
      name: 'Minimalist Clean',
      description: 'Clean white and neutral tones',
      icon: '🤍',
      gradient: 'from-slate-50 to-gray-100'
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Easy on the eyes for night study',
      icon: '🌙',
      gradient: 'from-gray-900 to-slate-800'
    },
    {
      id: 'pastel',
      name: 'Soft Pastels',
      description: 'Calming lavender, mint, and baby blue',
      icon: '🌸',
      gradient: 'from-purple-100 to-pink-100'
    },
    {
      id: 'nature',
      name: 'Nature Inspired',
      description: 'Trees, oceans, and mountain vibes',
      icon: '🌊',
      gradient: 'from-green-100 to-blue-100'
    }
  ];

  const timers = [
    {
      id: 'pomodoro',
      name: 'Pomodoro Technique',
      description: '25 min study → 5 min break',
      time: '25:00',
      icon: '🍅'
    },
    {
      id: 'ultradian',
      name: '90-Minute Flow',
      description: '90 min deep work → 20 min rest',
      time: '90:00',
      icon: '🌊'
    },
    {
      id: 'thirty-thirty',
      name: '30/30 Active',
      description: '30 min study → 30 min active break',
      time: '30:00',
      icon: '⚡'
    },
    {
      id: 'desktime',
      name: 'Flexible Focus',
      description: '45 min work → 15 min break',
      time: '45:00',
      icon: '🎯'
    },
    {
      id: 'stopwatch',
      name: 'Focus Stopwatch',
      description: 'Track your study time',
      time: '∞',
      icon: '⏱️'
    }
  ];

  return (
    <div 
      className="min-h-screen relative p-6 overflow-hidden"
      style={{
        backgroundImage: `url(${pineForestBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Animated overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 animate-pulse" style={{ animationDuration: '4s' }}></div>
      
      {/* Subtle animated mist effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent animate-float" style={{ animationDuration: '8s' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <Logo className="text-2xl" />
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-2">Welcome to Pine</h1>
            <p className="text-muted-foreground">Your focused study companion</p>
          </div>
          <div className="w-32"></div>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Cute floating forest elements */}
          <div className="absolute top-32 right-12 text-6xl animate-float opacity-30">🍃</div>
          <div className="absolute top-64 left-8 text-4xl animate-float opacity-40" style={{ animationDelay: '2s' }}>🌲</div>
          <div className="absolute bottom-32 right-24 text-5xl animate-float opacity-30" style={{ animationDelay: '4s' }}>🦋</div>
          <div className="absolute top-96 right-1/3 text-3xl animate-float opacity-20" style={{ animationDelay: '6s' }}>🌿</div>
          
          {/* Timers Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-center">Study Timer Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 animate-scale-in" style={{ animationDelay: '0.3s' }}>
              {timers.map((timer, index) => (
                <Card 
                  key={timer.id}
                  className="p-6 cursor-pointer hover:shadow-xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 bg-card border-2 hover:border-primary/30 animate-float group relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.5 + 0.5}s` }}
                  onClick={() => navigate('/themes', { state: { selectedTimer: timer.id } })}
                >
                  {/* Cute sparkle effect on hover */}
                  <div className="absolute top-2 right-2 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse">✨</div>
                  
                  <div className="text-center">
                    <div className="text-4xl mb-3 rounded-xl group-hover:rotate-12 group-hover:scale-125 transition-transform duration-300">{timer.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{timer.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{timer.description}</p>
                    <div className="text-2xl font-mono font-bold text-primary">{timer.time}</div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

        </div>

        {/* Motivational Quote */}
        <div className="text-center mt-16 relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-3xl animate-bounce opacity-40">💭</div>
          <p className="text-lg text-muted-foreground font-medium italic">
            "{currentQuote}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;