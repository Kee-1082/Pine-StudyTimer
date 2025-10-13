import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Logo from '@/components/Logo';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowLeft, Play, Pause, RotateCcw, Waves, Settings } from 'lucide-react';
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
  "Deep work mode activated! 🌊",
  "Flow state incoming... 🚀",
  "90 minutes of pure focus! 💎",
  "Embrace the deep dive! 🏊‍♀️",
  "Your focus is unstoppable! ⚡",
  "Building momentum, one minute at a time! 🔥",
];

const UltradianTimer = () => {
  const navigate = useNavigate();
  const { theme } = useParams<{ theme: string }>();
  const { setTheme } = useTheme();
  const { toast } = useToast();
  
  const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [session, setSession] = useState(1);
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
        title: "Deep Work Complete! 🎉",
        description: "Amazing! Time for a restorative break.",
      });
      
      setIsBreak(true);
      setTimeLeft(25 * 60); // 25-minute break
    } else {
      // Break completed
      toast({
        title: "Break Complete! 🌟",
        description: "Ready for another deep work session?",
      });
      
      setIsBreak(false);
      setTimeLeft(90 * 60); // 90-minute work session
      setSession(prev => prev + 1);
      
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
    setTimeLeft(90 * 60);
    setSession(1);
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
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalTime = isBreak ? 25 * 60 : 90 * 60;
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
            <h1 className="text-2xl font-bold text-white mb-1">90-Minute Ultradian</h1>
            <p className="text-white/80">Session {session} • {isBreak ? 'Restoration Break' : 'Deep Work Flow'}</p>
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
                <Waves className={`w-6 h-6 ${isBreak ? 'text-blue-400' : 'text-white'}`} />
                <span className="font-semibold text-white">
                  {isBreak ? 'Restoration Break' : 'Deep Work Session'}
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
                    isBreak ? 'bg-blue-400' : 'bg-white'
                  }`}
                  style={{ width: `${getProgress()}%` }}
                />
              </div>

              {/* Phase Indicator */}
              <div className="text-sm text-white/80">
                {isBreak 
                  ? '🧘‍♀️ Rest & Recharge Phase' 
                  : '🎯 Deep Focus Phase'
                }
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

          {/* Session Progress */}
          <div className="space-y-2">
            <p className="text-sm text-white/80">Session Progress</p>
            <div className="flex justify-center space-x-2">
              {Array.from({ length: Math.min(session, 6) }, (_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < session - 1 ? 'bg-white' : i === session - 1 ? 'bg-white animate-pulse' : 'bg-white/30'
                  }`}
                />
              ))}
              {session > 6 && <span className="text-sm text-white/80">+{session - 6}</span>}
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

export default UltradianTimer;