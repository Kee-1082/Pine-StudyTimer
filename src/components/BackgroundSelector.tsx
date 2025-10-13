import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
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

interface BackgroundOption {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface BackgroundSelectorProps {
  selectedBackground: string;
  onBackgroundChange: (background: string) => void;
  isOpen: boolean;
  onClose: () => void;
  theme?: string;
}

const getBackgroundOptions = (theme: string): BackgroundOption[] => {
  switch (theme) {
    case 'dark':
      return [
        {
          id: 'dark-nyc-penthouse',
          name: 'NYC Penthouse',
          image: darkNycPenthouse,
          description: 'Manhattan night view from above'
        },
        {
          id: 'dark-tokyo-night',
          name: 'Tokyo Nightlife',
          image: darkTokyoNight,
          description: 'Neon-lit Tokyo streets'
        },
        {
          id: 'dark-city-skyline',
          name: 'City Skyline',
          image: darkCitySkyline,
          description: 'Modern city lights at night'
        },
        {
          id: 'dark-minimalist-study',
          name: 'Minimalist Study',
          image: darkMinimalistStudy,
          description: 'Clean dark study space'
        }
      ];

    case 'pastel':
      return [
        {
          id: 'pastel-floral-cafe',
          name: 'Floral Cafe',
          image: pastelFloralCafe,
          description: 'Soft flowers and coffee'
        },
        {
          id: 'pastel-garden-window',
          name: 'Garden Window',
          image: pastelGardenWindow,
          description: 'Garden view with pastels'
        },
        {
          id: 'pastel-flowers-cafe',
          name: 'Flowers Cafe',
          image: pastelFlowersCafe,
          description: 'Pink and cream blooms'
        }
      ];

    case 'nature':
      return [
        {
          id: 'forest',
          name: 'Forest',
          image: forest,
          description: 'Serene woodland setting'
        },
        {
          id: 'forest-rain',
          name: 'Forest Rain',
          image: forestRain,
          description: 'Mystical rainy forest'
        },
        {
          id: 'nature-lake-mist',
          name: 'Misty Lake',
          image: natureLakeMist,
          description: 'Peaceful lake in morning mist'
        },
        {
          id: 'nature-ocean-peaceful',
          name: 'Ocean View',
          image: natureOceanPeaceful,
          description: 'Calm ocean waves'
        },
        {
          id: 'nature-rainy-window',
          name: 'Rainy Window',
          image: natureRainyWindow,
          description: 'Forest view in rain'
        }
      ];

    case 'minimalist':
      return [
        {
          id: 'solid-white',
          name: 'Pure White',
          image: '',
          description: 'Clean white background'
        },
        {
          id: 'solid-black',
          name: 'Deep Black',
          image: '',
          description: 'Minimal black background'
        },
        {
          id: 'solid-gray',
          name: 'Soft Gray',
          image: '',
          description: 'Neutral gray tone'
        }
      ];

    default:
      return [
        {
          id: 'rain-cafe',
          name: 'Rainy Cafe',
          image: rainCafe,
          description: 'Cozy cafe with rain on windows'
        },
        {
          id: 'ocean-view',
          name: 'Ocean View',
          image: oceanView,
          description: 'Peaceful ocean horizon'
        },
        {
          id: 'forest',
          name: 'Forest',
          image: forest,
          description: 'Serene woodland setting'
        },
        {
          id: 'forest-rain',
          name: 'Forest Rain',
          image: forestRain,
          description: 'Mystical rainy forest'
        },
        {
          id: 'tokyo-sunset',
          name: 'Tokyo Sunset',
          image: tokyoSunset,
          description: 'Tokyo cafe at golden hour'
        }
      ];
  }
};

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  selectedBackground,
  onBackgroundChange,
  isOpen,
  onClose,
  theme = 'nature'
}) => {
  const { theme: contextTheme } = useTheme();
  const currentTheme = theme || contextTheme;
  const backgroundOptions = getBackgroundOptions(currentTheme);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">Choose Your Study Background</h3>
          <Button variant="ghost" onClick={onClose}>✕</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {backgroundOptions.map((bg) => (
            <div
              key={bg.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedBackground === bg.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => {
                onBackgroundChange(bg.id);
                onClose();
              }}
            >
              {bg.image ? (
                <div 
                  className="h-32 bg-cover bg-center rounded-lg mb-2"
                  style={{ backgroundImage: `url(${bg.image})` }}
                />
              ) : (
                <div 
                  className={`h-32 rounded-lg mb-2 ${
                    bg.id === 'solid-white' ? 'bg-white border-2 border-gray-200' :
                    bg.id === 'solid-black' ? 'bg-black border-2 border-gray-300' :
                    'bg-gray-400'
                  }`}
                />
              )}
              <h4 className="font-medium text-center">{bg.name}</h4>
              <p className="text-sm text-muted-foreground text-center">{bg.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BackgroundSelector;