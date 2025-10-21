import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from 'lucide-react';

const musicTracks = [
  {
    id: 1,
    title: 'Lofi Hip Hop Study',
    url: 'https://www.youtube.com/embed/YOJsKatW-Ts',
    type: 'music'
  },
  {
    id: 2, 
    title: 'Calm Study Beats',
    url: 'https://www.youtube.com/embed/lA9FONoiuFA',
    type: 'music'
  },
  {
    id: 3,
    title: 'Focus Lofi Mix',
    url: 'https://www.youtube.com/embed/lTRiuFIWV54',
    type: 'music'
  },
  {
    id: 4,
    title: 'Study Vibes',
    url: 'https://www.youtube.com/embed/R1r9nLYcqBU',
    type: 'music'
  },
  {
    id: 5,
    title: 'Peaceful Study',
    url: 'https://www.youtube.com/embed/D4VpVRtbx7w',
    type: 'music'
  },

  {
    id: 6,
    title: 'Rain Sounds ☔',
    url: 'https://www.youtube.com/embed/q76bMs-NwRk',
    type: 'ambient'
  },
  {
    id: 7,
    title: 'White Noise 📻',
    url: 'https://www.youtube.com/embed/nMfPqeZjc2c',
    type: 'ambient'
  },
  {
    id: 8,
    title: 'Piano Ambience 🎹',
    url: 'https://www.youtube.com/embed/8plwv25NYRo',
    type: 'ambient'
  },
  {
    id: 9 ,
    title: 'Forest Sounds 🌲',
    url: 'https://www.youtube.com/embed/xNN7iTA57jg',
    type: 'ambient'
  },
  {
    id: 10,
    title: 'Flowing Water 💧',
    url: 'https://www.youtube.com/embed/eKFTSSKCzWA',
    type: 'ambient'
  }
];

const MusicPlayer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([50]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % musicTracks.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + musicTracks.length) % musicTracks.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Note: YouTube embed controls would need postMessage API for full control
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          size="icon"
        >
          <Music className="w-6 h-6" />
        </Button>
      ) : (
        <Card className="w-80 p-4 shadow-xl bg-card/95 backdrop-blur-sm">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-sm">Study Sounds & Ambience</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                ×
              </Button>
            </div>

            {/* Video Player */}
            <div className="aspect-video rounded-lg overflow-hidden bg-muted">
              <iframe
                ref={iframeRef}
                src={`${musicTracks[currentTrack].url}?autoplay=0&controls=1&modestbranding=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Track Info */}
            <div className="text-center">
              <p className="font-medium text-sm">{musicTracks[currentTrack].title}</p>
              <p className="text-xs text-muted-foreground">
                Track {currentTrack + 1} of {musicTracks.length}
              </p>
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={prevTrack}>
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={togglePlay}>
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={nextTrack}>
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>

            {/* Volume */}
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-muted-foreground" />
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground w-8">{volume[0]}%</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MusicPlayer;