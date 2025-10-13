import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Logo from '@/components/Logo';
import PageTransition from '@/components/PageTransition';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowLeft, Clock, Users, Zap, Target } from 'lucide-react';

const motivationalQuotes = [
  "Time to get in the zone! 🔥",
  "Choose your weapon of focus 🎯",
  "Ready to make progress? 📈",
  "Let's build that momentum! ⚡",
  "Focus is your superpower! 💪",
];

const TimerSelection = () => {
  const navigate = useNavigate();
  const { theme } = useParams<{ theme: string }>();
  const { setTheme } = useTheme();
  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    if (theme) {
      setTheme(theme as any);
    }
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setCurrentQuote(randomQuote);
  }, [theme, setTheme]);

  const timers = [
    {
      id: 'pomodoro',
      name: 'Pomodoro Technique',
      description: '25 minutes of focused work followed by a 5-minute break',
      time: '25:00',
      icon: Clock,
      color: 'text-red-500',
      bgColor: 'bg-red-50 hover:bg-red-100',
      benefit: 'Perfect for beginners and building focus habits'
    },
    {
      id: 'ultradian',
      name: '90-Minute Ultradian',
      description: '90 minutes of deep work with 20-30 minute rest periods',
      time: '90:00',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      benefit: 'Best for complex projects requiring deep concentration'
    },
    {
      id: 'thirty-thirty',
      name: '30/30 Active Rule',
      description: '30 minutes study, 30 minutes active break (walk, exercise)',
      time: '30:00',
      icon: Zap,
      color: 'text-green-500',
      bgColor: 'bg-green-50 hover:bg-green-100',
      benefit: 'Great for maintaining physical and mental balance'
    },
    {
      id: 'desktime',
      name: 'Flexible Focus',
      description: '45 minutes work with 15-minute breaks - customizable timing',
      time: '45:00',
      icon: Target,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      benefit: 'Ideal for those who want structured flexibility'
    },
    {
      id: 'stopwatch',
      name: 'Focus Stopwatch',
      description: 'Track unlimited study time with animated displays',
      time: '∞',
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 hover:bg-yellow-100',
      benefit: 'Perfect for open-ended study sessions and time tracking'
    }
  ];

  const handleTimerSelect = (timerId: string) => {
    navigate(`/timer/${theme}/${timerId}`);
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
              onClick={() => navigate('/themes')}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Themes
            </Button>
            <Logo />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-2">Choose Your Timer</h1>
            <p className="text-muted-foreground capitalize">
              {theme} theme selected • Pick your focus technique
            </p>
          </div>
          <div className="w-32"></div>
        </div>

        {/* Timer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {timers.map((timer) => {
            const IconComponent = timer.icon;
            return (
              <Card 
                key={timer.id}
                className={`p-8 cursor-pointer hover:shadow-xl transition-all duration-500 hover:scale-105 ${timer.bgColor} border-2 hover:border-primary/30`}
                onClick={() => handleTimerSelect(timer.id)}
              >
                <div className="space-y-6">
                  {/* Timer Header */}
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full bg-white shadow-sm ${timer.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{timer.name}</h3>
                      <div className="text-2xl font-mono font-bold text-primary">{timer.time}</div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    <p className="text-muted-foreground">{timer.description}</p>
                    <div className="bg-white/50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-primary">💡 {timer.benefit}</p>
                    </div>
                  </div>

                  {/* Start Button */}
                  <Button className="w-full text-lg py-6">
                    Start {timer.name}
                  </Button>
                </div>
              </Card>
            );
          })}
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

export default TimerSelection;