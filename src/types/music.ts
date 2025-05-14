
export interface Artist {
  id: string;
  name: string;
  image?: string;
  genre?: string;
  monthlyListeners?: number;
}

export interface Song {
  id: string;
  title: string;
  image: string;
  artists: Artist[];
  duration: number; // in seconds
  audioUrl: string;
}

export interface Album {
  id: string;
  title: string;
  image: string;
  artists: Artist[];
  songs: Song[];
  year: number;
  description?: string;
}

export interface Playlist {
  id: string;
  title: string;
  image: string;
  description: string;
  songs: Song[];
  songCount: number;
}

export interface Podcast {
  id: string;
  title: string;
  image: string;
  description: string;
  episodes: PodcastEpisode[];
}

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  duration: number;
  audioUrl: string;
  releaseDate: string;
}

export interface SearchResults {
  songs: Song[];
  albums: Album[];
  playlists: Playlist[];
  podcasts: Podcast[];
  artists?: Artist[];
}

export type PlayerState = "playing" | "paused" | "loading";

export interface PlayerContextType {
  currentSong: Song | null;
  queue: Song[];
  playerState: PlayerState;
  currentTime: number;
  duration: number;
  volume: number;
  isShuffling: boolean;
  repeatMode: "off" | "all" | "one";
  play: (song: Song) => void;
  playPlaylist: (playlist: Playlist | Album, songIndex?: number) => void;
  pause: () => void;
  resume: () => void;
  next: () => void;
  prev: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  toggleLike: (songId: string) => void;
  isLiked: (songId: string) => boolean;
}
