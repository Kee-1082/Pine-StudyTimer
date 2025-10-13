import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Logo from '@/components/Logo';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowLeft, Play, Pause, RotateCcw, Zap, Activity, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BackgroundSelector from '@/components/BackgroundSelector';
import PageTransition from '@/components/PageTransition';
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
  "Balance is the key to success! ⚖️",
  "Mind and body in harmony! 🧘‍♀️",
  "Active breaks = active mind! ⚡",
  "Movement fuels focus! 🏃‍♂️",
  "Strong body, sharp mind! 💪",
  "Energy in motion stays in motion! 🔄",
];

const ThirtyThirtyTimer = () => {
  const navigate = useNavigate();
  const { theme } = useParams<{ theme: string }>();
  const { setTheme } = useTheme();
  const { toast } = useToast();
  
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isActiveBreak, setIsActiveBreak] = useState(false);
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
    if (!isActiveBreak) {
      // Study session completed
      toast({
        title: "Study Session Complete! 📚",
        description: "Time for an active break - get moving!",
      });
      
      setIsActiveBreak(true);
      setTimeLeft(30 * 60); // 30-minute active break
    } else {
      // Active break completed
      toast({
        title: "Active Break Complete! 💪",
        description: "Feeling refreshed? Let's get back to studying!",
      });
      
      setIsActiveBreak(false);
      setTimeLeft(30 * 60); // 30-minute study session
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
    setIsActiveBreak(false);
    setTimeLeft(30 * 60);
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
    const totalTime = 30 * 60;
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
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${getBackgroundImage()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      };
    }
  };

  const activeBreakSuggestions = [
    "🚶‍♀️ Take a walk around the block",
    "🧘‍♂️ Do some stretching exercises",
    "💪 Try some jumping jacks or push-ups",
    "🏃‍♂️ Go for a quick jog",
    "🤸‍♀️ Do some yoga poses",
    "🏋️‍♂️ Light workout session"
  ];

  return (
    <PageTransition direction="right">
      <div 
        className="min-h-screen p-6 relative bg-cover bg-center bg-fixed"
        style={getBackgroundStyle()}
      >
      <div className="max-w-4xl mx-auto">
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
            <h1 className="text-2xl font-bold text-white mb-1">30/30 Active Rule</h1>
            <p className="text-white/80">Cycle {cycle} • {isActiveBreak ? 'Active Break' : 'Study Session'}</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => setShowBackgroundSelector(true)}
            className="w-32 text-white hover:bg-white/10"
          >
            <Settings className="w-4 h-4 mr-2" />
            Background
          </Button>
        </div>

        {/* Main Timer */}
        <div className="text-center space-y-8">
          <Card className="p-12 max-w-lg mx-auto bg-black/20 backdrop-blur-md border-white/10">
            <div className="space-y-8">
              {/* Status */}
              <div className="flex items-center justify-center space-x-2 text-lg">
                {isActiveBreak ? 
                  <Activity className="w-6 h-6 text-green-400" /> : 
                  <Zap className="w-6 h-6 text-white" />
                }
                <span className="font-semibold text-white">
                  {isActiveBreak ? 'Active Break Time' : 'Study Session'}
                </span>
              </div>

              {/* Timer Display */}
              <div className="text-8xl font-mono font-bold text-white">
                {formatTime(timeLeft)}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    isActiveBreak ? 'bg-green-400' : 'bg-white'
                  }`}
                  style={{ width: `${getProgress()}%` }}
                />
              </div>

              {/* Activity Suggestions */}
              {isActiveBreak && (
                <div className="bg-green-500/20 backdrop-blur-sm p-4 rounded-lg border border-green-400/30">
                  <p className="text-sm font-semibold text-green-300 mb-2">
                    Try these activities:
                  </p>
                  <div className="text-xs text-green-200 space-y-1">
                    {activeBreakSuggestions.slice(0, 3).map((suggestion, index) => (
                      <div key={index}>{suggestion}</div>
                    ))}
                  </div>
                </div>
              )}

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

          {/* Cycle Balance Indicator */}
          <div className="space-y-2">
            <p className="text-sm text-white/80">Mind-Body Balance</p>
            <div className="flex justify-center space-x-1">
              {Array.from({ length: cycle * 2 }, (_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i % 2 === 0 
                      ? 'bg-white' // Study sessions
                      : 'bg-green-400' // Active breaks
                  } ${
                    i >= (cycle - 1) * 2 + (isActiveBreak ? 1 : 0) 
                      ? 'opacity-50' 
                      : 'opacity-100'
                  }`}
                />
              ))}
            </div>
            <div className="text-xs text-white/80">
              <span className="inline-flex items-center mr-4">
                <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                Study
              </span>
              <span className="inline-flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                Active
              </span>
            </div>
          </div>

          {/* Motivational Quote */}
          <div className="mt-16">
            <p className="text-lg text-white/90 font-medium italic">
              "{currentQuote}"
            </p>
          </div>
        </div>
        </div>

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

export default ThirtyThirtyTimer;