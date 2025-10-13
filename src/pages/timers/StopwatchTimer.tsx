import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Logo from '@/components/Logo';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowLeft, Play, Pause, RotateCcw, Settings, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PageTransition from '@/components/PageTransition';

const motivationalQuotes = [
  "Every second counts! ⏱️",
  "Time is your canvas, paint it well! 🎨",
  "Focus flows like time itself ⚡",
  "Your dedication is timeless ✨",
  "Building greatness, one second at a time 🏗️",
  "Consistency creates magic 🪄",
];

type TimeDisplayMode = 'flipping' | 'sliding' | 'normal';

const StopwatchTimer = () => {
  const navigate = useNavigate();
  const { theme } = useParams<{ theme: string }>();
  const { setTheme } = useTheme();
  const { toast } = useToast();
  
  const [time, setTime] = useState(0); // time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [currentQuote, setCurrentQuote] = useState('');
  const [displayMode, setDisplayMode] = useState<TimeDisplayMode>('normal');
  const [showModeSelector, setShowModeSelector] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const prevTimeRef = useRef<string>('00:00:00');

  useEffect(() => {
    if (theme) {
      setTheme(theme as any);
    }
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setCurrentQuote(randomQuote);
  }, [theme, setTheme]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
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
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      toast({
        title: "Stopwatch Started! 🚀",
        description: "Focus mode activated. Make every second count!",
      });
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    toast({
      title: "Timer Reset ↻",
      description: "Ready for your next focused session!",
    });
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
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const TimeDisplay = ({ timeStr }: { timeStr: string }) => {
    const prevTime = prevTimeRef.current;
    prevTimeRef.current = timeStr;

    const renderDigit = (digit: string, index: number, prevDigit?: string) => {
      const isChanging = prevDigit && digit !== prevDigit;
      
      switch (displayMode) {
        case 'flipping':
          return (
            <div key={index} className="relative inline-block w-16 h-20 overflow-hidden">
              <div 
                className={`absolute inset-0 bg-white text-black flex items-center justify-center text-6xl font-mono font-bold transition-transform duration-300 ${
                  isChanging ? 'animate-flip-down' : ''
                }`}
              >
                {digit}
              </div>
            </div>
          );
          
        case 'sliding':
          return (
            <div key={index} className="relative inline-block w-16 h-20 overflow-hidden">
              <div 
                className={`text-white text-6xl font-mono font-bold transition-transform duration-200 ${
                  isChanging ? 'animate-slide-up' : ''
                }`}
              >
                {digit}
              </div>
            </div>
          );
          
        default:
          return (
            <span key={index} className="text-white text-6xl font-mono font-bold">
              {digit}
            </span>
          );
      }
    };

    return (
      <div className="flex items-center justify-center space-x-1">
        {timeStr.split('').map((char, index) => {
          if (char === ':') {
            return (
              <span key={index} className="text-white text-6xl font-mono font-bold mx-2">
                :
              </span>
            );
          }
          return renderDigit(char, index, prevTime[index]);
        })}
      </div>
    );
  };

  const modeOptions = [
    { id: 'normal', name: 'Normal', icon: '⏱️' },
    { id: 'flipping', name: 'Flipping', icon: '🔄' },
    { id: 'sliding', name: 'Sliding', icon: '⬆️' }
  ];

  return (
    <PageTransition direction="right">
      <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full animate-float"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white/3 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-white/5 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate(`/timers/${theme}`)}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Logo onClick={stopAndNavigateHome} />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-1">Focus Stopwatch</h1>
              <p className="text-white/70">Track your study momentum</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => setShowModeSelector(!showModeSelector)}
              className="text-white hover:bg-white/10"
            >
              <Settings className="w-4 h-4 mr-2" />
              Mode
            </Button>
          </div>

          {/* Mode Selector */}
          {showModeSelector && (
            <div className="mb-8 animate-fade-in">
              <Card className="p-4 bg-white/10 backdrop-blur-md border-white/20">
                <h3 className="text-white font-semibold mb-3">Time Display Mode</h3>
                <div className="flex space-x-4">
                  {modeOptions.map((mode) => (
                    <Button
                      key={mode.id}
                      variant={displayMode === mode.id ? "default" : "ghost"}
                      onClick={() => {
                        setDisplayMode(mode.id as TimeDisplayMode);
                        setShowModeSelector(false);
                      }}
                      className="text-white"
                    >
                      <span className="mr-2">{mode.icon}</span>
                      {mode.name}
                    </Button>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Main Timer */}
          <div className="text-center space-y-8">
            <Card className="p-12 max-w-2xl mx-auto bg-black/60 backdrop-blur-md border-white/20">
              <div className="space-y-8">
                {/* Status */}
                <div className="flex items-center justify-center space-x-2 text-lg">
                  <Zap className={`w-6 h-6 ${isRunning ? 'text-green-400 animate-pulse' : 'text-white'}`} />
                  <span className="font-semibold text-white">
                    {isRunning ? 'Tracking Time' : 'Ready to Focus'}
                  </span>
                </div>

                {/* Timer Display */}
                <div className="py-8">
                  <TimeDisplay timeStr={formatTime(time)} />
                </div>

                {/* Controls */}
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={toggleTimer}
                    size="lg"
                    className="px-8 bg-white text-black hover:bg-gray-200"
                  >
                    {isRunning ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                    {isRunning ? 'Pause' : 'Start'}
                  </Button>
                  <Button
                    onClick={resetTimer}
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </Card>

            {/* Session Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              <Card className="p-4 bg-white/5 border-white/10 text-center">
                <div className="text-2xl font-bold text-white">{Math.floor(time / 3600)}</div>
                <div className="text-sm text-white/70">Hours</div>
              </Card>
              <Card className="p-4 bg-white/5 border-white/10 text-center">
                <div className="text-2xl font-bold text-white">{Math.floor((time % 3600) / 60)}</div>
                <div className="text-sm text-white/70">Minutes</div>
              </Card>
              <Card className="p-4 bg-white/5 border-white/10 text-center">
                <div className="text-2xl font-bold text-white">{time % 60}</div>
                <div className="text-sm text-white/70">Seconds</div>
              </Card>
            </div>

            {/* Motivational Quote */}
            <div className="mt-16">
              <p className="text-lg text-white/80 font-medium italic">
                "{currentQuote}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default StopwatchTimer;