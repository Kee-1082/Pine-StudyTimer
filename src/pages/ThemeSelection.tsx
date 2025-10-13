import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Logo from '@/components/Logo';
import PageTransition from '@/components/PageTransition';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowLeft } from 'lucide-react';

const motivationalQuotes = [
  "Time to make it happen! 💫",
  "Your study zone awaits ✨",
  "Ready to crush those goals? 🎯",
  "Let's create some magic! 🌟",
  "Focus mode: loading... 🚀",
];

const ThemeSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setTheme } = useTheme();
  const [currentQuote, setCurrentQuote] = useState('');
  const selectedThemeFromState = location.state?.selectedTheme;
  const selectedTimer = location.state?.selectedTimer;

  useEffect(() => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setCurrentQuote(randomQuote);
  }, []);

  const themes = [
    {
      id: 'minimalist',
      name: 'Minimalist Clean',
      description: 'Clean white and neutral tones for distraction-free focus',
      icon: '🤍',
      preview: 'bg-gradient-to-br from-slate-50 to-gray-100',
      textColor: 'text-gray-800'
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Easy on the eyes for night study sessions',
      icon: '🌙',
      preview: 'bg-gradient-to-br from-gray-900 to-slate-800',
      textColor: 'text-white'
    },
    {
      id: 'pastel',
      name: 'Soft Pastels',
      description: 'Calming lavender, mint, and baby blue vibes',
      icon: '🌸',
      preview: 'bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100',
      textColor: 'text-gray-700'
    },
    {
      id: 'nature',
      name: 'Nature Inspired',
      description: 'Trees, oceans, and mountain serenity',
      icon: '🌊',
      preview: 'bg-gradient-to-br from-green-100 via-blue-100 to-emerald-100',
      textColor: 'text-green-800'
    }
  ];

  const handleThemeSelect = (themeId: string) => {
    setTheme(themeId as any);
    if (selectedTimer) {
      navigate(`/timer/${themeId}/${selectedTimer}`);
    } else {
      navigate(`/timers/${themeId}`);
    }
  };

  return (
    <PageTransition direction="right">
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/10 p-6 page-transition-enter page-transition-enter-active">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Logo />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-2">Choose Your Study Environment</h1>
            <p className="text-muted-foreground">Select a theme that helps you focus best</p>
          </div>
          <div className="w-32"></div>
        </div>

        {/* Theme Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {themes.map((theme) => (
            <Card 
              key={theme.id}
              className={`p-8 cursor-pointer hover:shadow-xl transition-all duration-500 hover:scale-105 ${
                selectedThemeFromState === theme.id ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
              onClick={() => handleThemeSelect(theme.id)}
            >
              <div className="space-y-6">
                {/* Theme Preview */}
                <div className={`h-32 rounded-lg ${theme.preview} flex items-center justify-center`}>
                  <div className={`text-6xl ${theme.textColor}`}>
                    {theme.icon}
                  </div>
                </div>

                {/* Theme Info */}
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold">{theme.name}</h3>
                  <p className="text-muted-foreground">{theme.description}</p>
                </div>

                {/* Select Button */}
                <Button 
                  className="w-full"
                  variant={selectedThemeFromState === theme.id ? "default" : "outline"}
                >
                  {selectedThemeFromState === theme.id ? 'Selected ✓' : 'Select Theme'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Motivational Quote */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground font-medium italic">
            "{currentQuote}"
          </p>
        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default ThemeSelection;