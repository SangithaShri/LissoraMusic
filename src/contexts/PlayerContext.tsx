import { createContext, useState, useContext, useEffect, useRef } from "react";
import { Song, Playlist, Album, PlayerContextType, PlayerState } from "@/types/music";
import { toast } from "sonner";

const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [queue, setQueue] = useState<Song[]>([]);
  const [playerState, setPlayerState] = useState<PlayerState>("paused");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [isShuffling, setIsShuffling] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off");
  const [likedSongs, setLikedSongs] = useState<Set<string>>(() => {
  const savedLikedSongs = localStorage.getItem('likedSongs');
  return savedLikedSongs ? new Set(JSON.parse(savedLikedSongs)) : new Set();
});

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    const savedLikedSongs = localStorage.getItem('likedSongs');
    if (savedLikedSongs) {
      setLikedSongs(new Set(JSON.parse(savedLikedSongs)));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const handleLoadedData = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };

    const handleEnded = () => {
      if (repeatMode === "one") {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
      } else if (repeatMode === "all" || queue.length > 0) {
        next();
      } else {
        setPlayerState("paused");
        setCurrentTime(0);
      }
    };

    const handleError = (e: Event) => {
      console.error("Audio error:", e);
      toast.error("Error playing track. Check your internet connection.");
      setPlayerState("paused");
    };

    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("loadeddata", handleLoadedData);
    audioRef.current.addEventListener("ended", handleEnded);
    audioRef.current.addEventListener("error", handleError);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("loadeddata", handleLoadedData);
        audioRef.current.removeEventListener("ended", handleEnded);
        audioRef.current.removeEventListener("error", handleError);
      }
    };
  }, [queue, repeatMode]);

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const playAudio = async () => {
      const fallbackAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
      audioRef.current!.src = currentSong.audioUrl || fallbackAudioUrl;
      audioRef.current!.load();
      setPlayerState("loading");

      try {
        await audioRef.current!.play();
        setPlayerState("playing");
        addToRecentlyPlayed(currentSong);
      } catch (error) {
        console.error("Error playing audio:", error);
        setPlayerState("paused");
        toast.error("Couldn't play the track. Try another song.");
      }
    };

    playAudio();
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (likedSongs.size > 0) {
      localStorage.setItem('likedSongs', JSON.stringify(Array.from(likedSongs)));
    }
  }, [likedSongs]);

  const addToRecentlyPlayed = (song: Song) => {
    const recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed') || '[]');
    const filteredRecent = recentlyPlayed.filter((item: Song) => item.id !== song.id);
    const updatedRecent = [song, ...filteredRecent].slice(0, 20);
    localStorage.setItem('recentlyPlayed', JSON.stringify(updatedRecent));
  };

  const play = (song: Song) => {
    setCurrentSong(song);
    setQueue([song]);
  };

  const playPlaylist = (content: Playlist | Album, songIndex = 0) => {
    if (songIndex >= 0 && songIndex < content.songs.length) {
      setCurrentSong(content.songs[songIndex]);
      setQueue(content.songs);
    } else {
      console.error("Invalid song index");
    }
  };

  const pause = () => {
    if (audioRef.current && playerState === "playing") {
      audioRef.current.pause();
      setPlayerState("paused");
    }
  };

  const resume = () => {
    if (audioRef.current && playerState === "paused") {
      audioRef.current.play()
        .then(() => setPlayerState("playing"))
        .catch(err => {
          console.error("Failed to resume:", err);
          toast.error("Failed to resume playback");
        });
    }
  };

  const next = () => {
    if (!currentSong || queue.length <= 1) return;

    const currentIndex = queue.findIndex(song => song.id === currentSong.id);

    if (currentIndex === -1) return;

    let nextIndex;

    if (isShuffling) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * queue.length);
      } while (randomIndex === currentIndex && queue.length > 1);
      nextIndex = randomIndex;
    } else {
      nextIndex = (currentIndex + 1) % queue.length;
    }

    setCurrentSong(queue[nextIndex]);
  };

  const prev = () => {
    if (!currentSong || queue.length <= 1) return;

    if (currentTime > 3) {
      seek(0);
      return;
    }

    const currentIndex = queue.findIndex(song => song.id === currentSong.id);

    if (currentIndex === -1) return;

    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    setCurrentSong(queue[prevIndex]);
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
  };

  const toggleShuffle = () => {
    setIsShuffling(prev => !prev);
  };

  const toggleRepeat = () => {
    setRepeatMode(mode => {
      if (mode === "off") return "all";
      if (mode === "all") return "one";
      return "off";
    });
  };

  const toggleLike = (songId: string) => {
    setLikedSongs(prevLiked => {
      const newLiked = new Set(prevLiked);
      if (newLiked.has(songId)) {
        newLiked.delete(songId);
        toast.success("Removed from Liked Songs");
      } else {
        newLiked.add(songId);
        toast.success("Added to Liked Songs");
      }
      return newLiked;
    });
  };

  const isLiked = (songId: string) => {
    return likedSongs.has(songId);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        queue,
        playerState,
        currentTime,
        duration,
        volume,
        isShuffling,
        repeatMode,
        play,
        playPlaylist,
        pause,
        resume,
        next,
        prev,
        seek,
        setVolume,
        toggleShuffle,
        toggleRepeat,
        toggleLike,
        isLiked
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;