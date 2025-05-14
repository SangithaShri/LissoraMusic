import { Song } from "@/types/music";
import { formatTime } from "@/lib/utils";
import { Play, Pause, Heart, X } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { cn } from "@/lib/utils";

interface TrackItemProps {
  song: Song;
  index: number;
  showDate?: boolean;
  showRemoveButton?: boolean;
  onRemove?: (id: string) => void;
}

const TrackItem = ({ song, index, showDate, showRemoveButton, onRemove }: TrackItemProps) => {
  const { play, currentSong, playerState, pause, resume, isLiked, toggleLike } = usePlayer();

  const isCurrentSong = currentSong?.id === song.id;
  const isPlaying = isCurrentSong && playerState === "playing";
  const songIsLiked = isLiked(song.id);

  const handlePlay = () => {
    if (isCurrentSong) {
      if (isPlaying) {
        pause();
      } else {
        resume();
      }
    } else {
      play(song);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(song.id);
    }
  };

  return (
    <div 
      className={`flex items-center px-4 py-2 hover:bg-lissora-surface rounded-md group relative ${isCurrentSong ? "text-lissora-accent" : ""}`}
      onClick={handlePlay}
    >
      <div className="w-8 flex-shrink-0 flex items-center justify-center">
        <div className="group-hover:hidden">
          <span className={`${isCurrentSong ? "text-lissora-accent" : "text-lissora-muted"} font-medium`}>
            {index + 1}
          </span>
        </div>
        <button 
          className="hidden group-hover:block"
          onClick={(e) => {
            e.stopPropagation();
            handlePlay();
          }}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 text-lissora-accent" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </button>
      </div>
      <div className="ml-4 flex-1 min-w-0">
        <div className="flex items-center">
          <img src={song.image} alt={song.title} className="h-10 w-10 rounded-sm mr-3" />
          <div className="min-w-0">
            <p className={`truncate font-medium ${isCurrentSong ? "text-lissora-accent" : ""}`}>
              {song.title}
            </p>
            <p className="text-sm text-lissora-muted truncate">
              {song.artists.map(artist => artist.name).join(", ")}
            </p>
            {showDate && (
              <p className="text-xs text-lissora-muted">
                {new Date().toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {showRemoveButton && (
          <button
            onClick={handleRemove}
            className="p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity text-lissora-muted hover:text-lissora-text"
            aria-label="Remove"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(song.id);
          }}
          className={cn(
            "p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity",
            songIsLiked ? "text-lissora-accent" : "text-lissora-muted hover:text-lissora-text"
          )}
          aria-label={songIsLiked ? "Unlike" : "Like"}
        >
          <Heart className={cn("h-4 w-4", songIsLiked && "fill-lissora-accent")} />
        </button>
        <div className="w-16 text-right text-sm text-lissora-muted">
          {formatTime(song.duration)}
        </div>
      </div>
    </div>
  );
};

export default TrackItem;