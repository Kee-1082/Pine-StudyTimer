import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./pages/Dashboard";
import ThemeSelection from "./pages/ThemeSelection";
import TimerSelection from "./pages/TimerSelection";
import PomodoroTimer from "./pages/timers/PomodoroTimer";
import UltradianTimer from "./pages/timers/UltradianTimer";
import ThirtyThirtyTimer from "./pages/timers/ThirtyThirtyTimer";
import DesktimeTimer from "./pages/timers/DesktimeTimer";
import StopwatchTimer from "./pages/timers/StopwatchTimer";
import MusicPlayer from "./components/MusicPlayer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background text-foreground transition-all duration-500">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/themes" element={<ThemeSelection />} />
              <Route path="/timers/:theme" element={<TimerSelection />} />
              <Route path="/timer/:theme/pomodoro" element={<PomodoroTimer />} />
              <Route path="/timer/:theme/ultradian" element={<UltradianTimer />} />
              <Route path="/timer/:theme/thirty-thirty" element={<ThirtyThirtyTimer />} />
              <Route path="/timer/:theme/desktime" element={<DesktimeTimer />} />
              <Route path="/timer/:theme/stopwatch" element={<StopwatchTimer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <MusicPlayer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;