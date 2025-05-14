import { usePlayer } from "@/contexts/PlayerContext";
import { formatTime } from "@/lib/utils";
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX, Repeat, Repeat1, Shuffle, Heart } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const Player = () => {
  const { 
    currentSong, 
    playerState, 
    currentTime, 
    duration, 
    volume,
    isShuffling,
    repeatMode,
    pause, 
    resume, 
    next, 
    prev,
    seek,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    isLiked,
    toggleLike
  } = usePlayer();

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const volumeControlRef = useRef<HTMLDivElement>(null);

  // Format current time and duration
  const formattedCurrentTime = formatTime(currentTime);
  const formattedDuration = formatTime(duration);

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Handle seeking
  const handleSeek = (value: number[]) => {
    seek(value[0]);
  };

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    if (volume > 0) {
      setVolume(0);
    } else {
      setVolume(0.7);
    }
  };

  // Handle clicking outside of volume control to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (volumeControlRef.current && !volumeControlRef.current.contains(event.target as Node)) {
        setShowVolumeSlider(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Return VolumeIcon based on volume level
  const VolumeIcon = () => {
    if (volume === 0) {
      return <VolumeX className="h-5 w-5" />;
    } else if (volume < 0.5) {
      return <Volume1 className="h-5 w-5" />;
    } else {
      return <Volume2 className="h-5 w-5" />;
    }
  };

  // Return RepeatIcon based on repeat mode
  const RepeatIcon = () => {
    if (repeatMode === "one") {
      return <Repeat1 className="h-5 w-5" />;
    } 
    return <Repeat className="h-5 w-5" />;
  };

  if (!currentSong) {
    return <div className="h-20 border-t border-zinc-800"></div>;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-lissora-background border-t border-zinc-800 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Song Info */}
        <div className="flex items-center w-1/4">
          <div className="h-14 w-14 rounded-md overflow-hidden mr-3">
            <img src={currentSong.image} alt={currentSong.title} className="h-full w-full object-cover" />
          </div>
          <div className="truncate">
            <p className="font-medium text-sm truncate">{currentSong.title}</p>
            <p className="text-xs text-lissora-muted truncate">
              {currentSong.artists.map(artist => artist.name).join(", ")}
            </p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center w-2/4">
          <div className="flex items-center space-x-4 mb-2">
            <button 
              onClick={toggleShuffle} 
              className={cn(
                "lissora-control-button",
                isShuffling && "text-lissora-accent"
              )}
              aria-label={isShuffling ? "Disable shuffle" : "Enable shuffle"}
            >
              <Shuffle className="h-5 w-5" />
            </button>
            
            <button onClick={prev} className="lissora-control-button">
              <SkipBack className="h-5 w-5" />
            </button>
            
            {playerState === "playing" ? (
              <button onClick={pause} className="lissora-main-play-button">
                <Pause className="h-5 w-5" />
              </button>
            ) : (
              <button onClick={resume} className="lissora-main-play-button">
                <Play className="h-5 w-5" />
              </button>
            )}
            
            <button onClick={next} className="lissora-control-button">
              <SkipForward className="h-5 w-5" />
            </button>
            
            <button 
              onClick={toggleRepeat} 
              className={cn(
                "lissora-control-button",
                repeatMode !== "off" && "text-lissora-accent"
              )}
              aria-label={`Repeat mode: ${repeatMode}`}
            >
              <RepeatIcon />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center w-full gap-2">
            <span className="text-xs text-lissora-muted">{formattedCurrentTime}</span>
            <div className="flex-1">
              <Slider
                value={[currentTime]}
                min={0}
                max={duration || 100}
                step={1}
                onValueChange={handleSeek}
                className="cursor-pointer"
              />
            </div>
            <span className="text-xs text-lissora-muted">{formattedDuration}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-end w-1/4 gap-4">
          {/* Like Button */}
          <button
            onClick={() => toggleLike(currentSong.id)}
            className={cn(
              "p-2 rounded-md transition-colors",
              isLiked(currentSong.id) ? "text-lissora-accent" : "text-lissora-text hover:text-lissora-accent"
            )}
            aria-label={isLiked(currentSong.id) ? "Unlike" : "Like"}
          >
            <Heart className={cn("h-5 w-5", isLiked(currentSong.id) && "fill-lissora-accent")} />
          </button>

          {/* Volume Control */}
          <div className="relative" ref={volumeControlRef}>
            <div className="flex items-center gap-2">
              <button 
                className="p-2 hover:bg-zinc-800 rounded-md"
                onClick={toggleMute}
                aria-label={volume === 0 ? "Unmute" : "Mute"}
              >
                <VolumeIcon />
              </button>
              
              <div className="hidden md:block w-24">
                <Slider
                  value={[volume]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="cursor-pointer"
                />
              </div>
            </div>
            
            {/* Mobile Volume Slider */}
            <div 
              className={cn(
                "md:hidden absolute bottom-full right-0 p-3 bg-zinc-800 rounded-md mb-2 transition-opacity duration-200",
                showVolumeSlider ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <Slider
                value={[volume]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                orientation="vertical"
                className="h-24 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
