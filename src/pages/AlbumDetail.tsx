
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "@/services/api";
import { Album } from "@/types/music";
import { Play, Pause } from "lucide-react";
import { formatTime } from "@/lib/utils";
import TrackItem from "@/components/tracklist/TrackItem";
import { usePlayer } from "@/contexts/PlayerContext";

const AlbumDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);
  const { playPlaylist, playerState, pause, resume, currentSong } = usePlayer();
  
  const isCurrentAlbum = currentSong && album?.songs.some(song => song.id === currentSong.id);
  const isPlaying = isCurrentAlbum && playerState === "playing";

  useEffect(() => {
    const fetchAlbum = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await api.getAlbum(id);
        if (data) {
          setAlbum(data);
        }
      } catch (error) {
        console.error("Error fetching album:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [id]);

  const handlePlayPause = () => {
    if (!album) return;
    
    if (isCurrentAlbum) {
      if (isPlaying) {
        pause();
      } else {
        resume();
      }
    } else {
      playPlaylist(album);
    }
  };

  const getTotalDuration = () => {
    if (!album) return 0;
    return album.songs.reduce((acc, song) => acc + song.duration, 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 rounded-full border-2 border-lissora-accent border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="text-center py-20">
        <p className="text-xl font-semibold">Album not found</p>
        <p className="text-lissora-muted mt-2">The album you're looking for doesn't exist</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
        <div className="w-48 h-48 shadow-lg rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={album.image} 
            alt={album.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-end">
          <p className="text-sm font-medium uppercase text-lissora-muted">Album</p>
          <h1 className="text-4xl font-bold mt-2">{album.title}</h1>
          <div className="flex items-center mt-3">
            <p className="text-lissora-muted">
              <span className="font-medium text-lissora-text">
                {album.artists.map(artist => artist.name).join(", ")}
              </span>
              <span className="mx-1">•</span>
              <span>{album.year}</span>
              <span className="mx-1">•</span>
              <span>{album.songs.length} songs</span>
              <span className="mx-1">•</span>
              <span>{formatTime(getTotalDuration())}</span>
            </p>
          </div>
          
          <div className="mt-6">
            <button 
              className="bg-lissora-accent hover:bg-lissora-accent/90 transition-colors rounded-full px-8 py-3 flex items-center gap-2"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-5 w-5 fill-white" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 fill-white" />
                  <span>Play</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Track List */}
      <div className="mb-6">
        <div className="bg-lissora-surface/50 p-1 rounded-lg">
          {album.songs.map((song, index) => (
            <TrackItem key={song.id} song={song} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumDetail;
