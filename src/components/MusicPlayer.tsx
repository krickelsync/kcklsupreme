import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Placeholder music - royalty free lofi beat
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

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} src={musicUrl} />
      
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="w-12 h-12 bg-background border-2 border-foreground flex items-center justify-center cursor-pointer hover:bg-foreground hover:text-background transition-colors"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      ) : (
        <div className="bg-background border-2 border-foreground p-4 w-[200px]">
          {/* Header */}
          <div className="flex justify-between items-center mb-3 border-b border-foreground pb-2">
            <span className="text-xs font-mono uppercase tracking-wider">now playing</span>
            <button 
              onClick={() => setIsMinimized(true)}
              className="text-xs hover:opacity-60 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* CD Animation */}
          <div className="flex justify-center mb-4">
            <div 
              className={`w-20 h-20 border-2 border-foreground bg-foreground relative ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
            >
              {/* CD Center hole */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 bg-background border border-foreground" />
              </div>
              {/* CD Lines */}
              <div className="absolute inset-2 border border-background/30" />
              <div className="absolute inset-4 border border-background/20" />
            </div>
          </div>

          {/* Track info */}
          <div className="text-center mb-3">
            <p className="text-xs font-mono uppercase truncate">sample track</p>
            <p className="text-[10px] font-mono text-muted-foreground uppercase">placeholder audio</p>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-2">
            <button
              onClick={togglePlay}
              className="w-10 h-10 border-2 border-foreground flex items-center justify-center cursor-pointer hover:bg-foreground hover:text-background transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </button>
            <button
              onClick={toggleMute}
              className="w-10 h-10 border-2 border-foreground flex items-center justify-center cursor-pointer hover:bg-foreground hover:text-background transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
