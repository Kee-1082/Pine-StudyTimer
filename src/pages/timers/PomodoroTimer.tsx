import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Logo from '@/components/Logo';
import PageTransition from '@/components/PageTransition';
import BackgroundSelector from '@/components/BackgroundSelector';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowLeft, Play, Pause, RotateCcw, Coffee, Image, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import rainCafe from '@/assets/bg-rain-cafe.jpg';
import oceanView from '@/assets/bg-ocean-view.jpg';
import forest from '@/assets/bg-forest.jpg';
import forestRain from '@/assets/bg-forest-rain.jpg';
import tokyoSunset from '@/assets/bg-tokyo-sunset.jpg';
import darkNycPenthouse from '@/assets/dark-nyc-penthouse.jpg';
import darkTokyoNight from '@/assets/dark-tokyo-night.jpg';
import darkCitySkyline from '@/assets/dark-city-skyline.jpg';
import darkMinimalistStudy from '@/assets/dark-minimalist-study.jpg';
import pastelFloralCafe from '@/assets/pastel-floral-cafe.jpg';
import pastelGardenWindow from '@/assets/pastel-garden-window.jpg';
import pastelFlowersCafe from '@/assets/pastel-flowers-cafe.jpg';
import natureLakeMist from '@/assets/nature-lake-mist.jpg';
import natureOceanPeaceful from '@/assets/nature-ocean-peaceful.jpg';
import natureRainyWindow from '@/assets/nature-rainy-window.jpg';

const motivationalQuotes = [
  "One pomodoro at a time! 🍅",
  "Focus is your secret weapon ⚔️",
  "You're doing great! Keep going! 💪",
  "Progress, not perfection ✨",
  "Every minute counts! ⏰",
  "You've got this, champion! 🏆",
  "Small wins lead to big victories! 🌟",
];

const PomodoroTimer = () => {
  const navigate = useNavigate();
  const { theme } = useParams<{ theme: string }>();
  const { setTheme } = useTheme();
  const { toast } = useToast();
  
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycle, setCycle] = useState(1);
  const [currentQuote, setCurrentQuote] = useState('');
  const [selectedBackground, setSelectedBackground] = useState('rain-cafe');
  const [showBackgroundSelector, setShowBackgroundSelector] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (theme) {
      setTheme(theme as any);
    }
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setCurrentQuote(randomQuote);
  }, [theme, setTheme]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            handleTimerComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    if (!isBreak) {
      // Work session completed
      toast({
        title: "Work Session Complete! 🎉",
        description: "Time for a well-deserved break!",
      });
      
      setIsBreak(true);
      if (cycle % 4 === 0) {
        setTimeLeft(15 * 60); // Long break (15 minutes)
        toast({
          title: "Long Break Time! 🏖️",
          description: "You've completed 4 cycles! Take a 15-minute break.",
        });
      } else {
        setTimeLeft(5 * 60); // Short break (5 minutes)
      }
    } else {
      // Break completed
      toast({
        title: "Break Complete! 💪",
        description: "Ready for another focused session?",
      });
      
      setIsBreak(false);
      setTimeLeft(25 * 60); // Work session (25 minutes)
      setCycle(prev => prev + 1);
      
      // New quote for new session
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      setCurrentQuote(randomQuote);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
    setCycle(1);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const stopAndNavigateHome = () => {
    // Stop the timer
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // Navigate to dashboard
    navigate('/');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalTime = isBreak ? (cycle % 4 === 0 ? 15 * 60 : 5 * 60) : 25 * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const getBackgroundImage = () => {
    switch (selectedBackground) {
      case 'rain-cafe': return rainCafe;
      case 'ocean-view': return oceanView;
      case 'forest': return forest;
      case 'forest-rain': return forestRain;
      case 'tokyo-sunset': return tokyoSunset;
      case 'dark-nyc-penthouse': return darkNycPenthouse;
      case 'dark-tokyo-night': return darkTokyoNight;
      case 'dark-city-skyline': return darkCitySkyline;
      case 'dark-minimalist-study': return darkMinimalistStudy;
      case 'pastel-floral-cafe': return pastelFloralCafe;
      case 'pastel-garden-window': return pastelGardenWindow;
      case 'pastel-flowers-cafe': return pastelFlowersCafe;
      case 'nature-lake-mist': return natureLakeMist;
      case 'nature-ocean-peaceful': return natureOceanPeaceful;
      case 'nature-rainy-window': return natureRainyWindow;
      default: return rainCafe;
    }
  };

  const getBackgroundStyle = () => {
    if (selectedBackground === 'solid-white') {
      return { backgroundColor: '#ffffff' };
    } else if (selectedBackground === 'solid-black') {
      return { backgroundColor: '#000000' };
    } else if (selectedBackground === 'solid-gray') {
      return { backgroundColor: '#6b7280' };
    } else {
      return {
        backgroundImage: `url(${getBackgroundImage()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      };
    }
  };

  return (
    <PageTransition direction="right">
    <div 
      className="min-h-screen p-6 relative overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate(`/timers/${theme}`)}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Logo onClick={stopAndNavigateHome} />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-1">Pomodoro Timer</h1>
            <p className="text-white/80">Cycle {cycle} • {isBreak ? 'Break Time' : 'Focus Time'}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => setShowBackgroundSelector(true)}
              className="text-white hover:bg-white/20"
            >
              <Image className="w-4 h-4 mr-2" />
              Background
            </Button>
          </div>
        </div>

        {/* Main Timer */}
        <div className="text-center space-y-8 animate-fade-in">
          <Card className="p-12 max-w-lg mx-auto bg-white/95 backdrop-blur-md border-white/20 shadow-2xl">
            <div className="space-y-8">
              {/* Status */}
              <div className="flex items-center justify-center space-x-2 text-lg">
                {isBreak ? <Coffee className="w-6 h-6 text-orange-500" /> : <div className="w-6 h-6 text-2xl">🍅</div>}
                <span className="font-semibold">
                  {isBreak ? (cycle % 4 === 0 ? 'Long Break' : 'Short Break') : 'Focus Session'}
                </span>
              </div>

              {/* Timer Display */}
              <div className="text-8xl font-mono font-bold text-primary">
                {formatTime(timeLeft)}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${getProgress()}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={toggleTimer}
                  size="lg"
                  className="px-8"
                >
                  {isRunning ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                  {isRunning ? 'Pause' : 'Start'}
                </Button>
                <Button
                  onClick={resetTimer}
                  variant="outline"
                  size="lg"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </Card>

          {/* Cycle Indicator */}
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`w-4 h-4 rounded-full ${
                  num <= cycle % 4 || (cycle % 4 === 0 && num === 4)
                    ? 'bg-primary' 
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Motivational Quote */}
          <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <p className="text-lg text-white/90 font-medium italic shadow-lg">
              "{currentQuote}"
            </p>
          </div>
        </div>
      </div>

      {/* Background Selector */}
      <BackgroundSelector
        selectedBackground={selectedBackground}
        onBackgroundChange={setSelectedBackground}
        isOpen={showBackgroundSelector}
        onClose={() => setShowBackgroundSelector(false)}
        theme={theme}
      />
    </div>
    </PageTransition>
  );
};

export default PomodoroTimer;