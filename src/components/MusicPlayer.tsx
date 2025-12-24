import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Placeholder music
  const musicUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} src={musicUrl} />
      
      <div className="bg-background border-2 border-foreground p-3 flex items-center gap-3">
        {/* Spinning CD - circular */}
        <div 
          className={`w-10 h-10 rounded-full border-2 border-foreground bg-foreground relative ${
            isPlaying ? 'animate-spin-slow' : ''
          }`}
        >
          {/* CD Center hole */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-background border border-foreground" />
          </div>
          {/* CD ring */}
          <div className="absolute inset-1.5 rounded-full border border-background/30" />
        </div>

        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          className="w-8 h-8 border-2 border-foreground flex items-center justify-center cursor-pointer hover:bg-foreground hover:text-background transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
