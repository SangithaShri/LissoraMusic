
import { Album, Artist, Playlist, Song } from "@/types/music";
import { Play, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { usePlayer } from "@/contexts/PlayerContext";
import { cn } from "@/lib/utils";

interface MusicCardProps {
  item: Album | Playlist | Song | Artist | any;
  type: "album" | "playlist" | "song" | "artist";
}

const MusicCard = ({ item, type }: MusicCardProps) => {
  const { play, playPlaylist, toggleLike, isLiked } = usePlayer();
  
  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (type === "song") {
      play(item as Song);
    } else if (type === "album" || type === "playlist") {
      if ((item as Album | Playlist).songs?.length > 0) {
        playPlaylist(item as Album | Playlist);
      }
    } else if (type === "artist") {
      // Artists might not have songs directly available for play
      // For now, we'll just avoid any errors
      const artist = item as Artist;
      if (artist.songs && artist.songs.length > 0) {
        play(artist.songs[0]);
      }
    }
  };
  
  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (type === "song") {
      toggleLike((item as Song).id);
    }
  };
  
  const getLink = () => {
    if (type === "album") return `/album/${item.id}`;
    if (type === "playlist") return `/playlist/${item.id}`;
    if (type === "artist") return `/artist/${item.id}`;
    if (type === "podcast") return `/playlist/${item.id}`; // Use playlist route for podcasts
    return "#"; // For songs, we don't navigate
  };
  
  let subtitle = "";
  if ("artists" in item && item.artists?.length > 0) {
    subtitle = item.artists.map((artist: any) => artist.name).join(", ");
  } else if ("description" in item) {
    subtitle = item.description;
  } else if (type === "artist" && "genre" in item) {
    subtitle = item.genre;
  }

  // Check if the song is liked (only for songs)
  const songIsLiked = type === "song" ? isLiked((item as Song).id) : false;
  
  return (
    <Link to={getLink()} className="relative lissora-card-hover">
      <div className="p-4 lissora-card">
        <div className="relative w-full aspect-square mb-4 rounded-md overflow-hidden bg-lissora-surface shadow-md">
          <img 
            src={item.image} 
            alt={item.title || item.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="text-left">
          <h3 className="font-semibold truncate text-lissora-text">{item.title || item.name}</h3>
          <p className="text-sm text-lissora-muted line-clamp-2 h-10">{subtitle}</p>
        </div>
        
        <div className="absolute flex gap-2 bottom-4 right-4">
          {type === "song" && (
            <button
              onClick={handleLikeClick}
              className={cn(
                "p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110",
                songIsLiked ? "bg-lissora-accent" : "bg-lissora-surface text-lissora-text hover:bg-lissora-surface/90"
              )}
              aria-label={songIsLiked ? "Unlike" : "Like"}
            >
              <Heart className={cn("h-4 w-4", songIsLiked && "fill-white")} />
            </button>
          )}
          <button 
            onClick={handlePlayClick}
            className="lissora-play-button"
            aria-label="Play"
          >
            <Play className="h-4 w-4 fill-white" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default MusicCard;
