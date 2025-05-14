import { useState, useEffect } from "react";
import { SearchResults, Playlist } from "@/types/music";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import MusicCard from "@/components/cards/MusicCard";
import CardGrid from "@/components/ui/CardGrid";
import TrackItem from "@/components/tracklist/TrackItem";
import { toast } from "sonner";

// Mock data
const mockSongs = [
  {
    id: "1",
    title: "Kutti Story",
    artists: [{ id: "a1", name: "Aniruth Ravichander" }, { id: "a2", name: "Thalapathy Vijay" }],
    image: "/attached_assets/img1.jpg",
    duration: 322,
    audioUrl: "/attached_assets/song1.mp3"
  },
  {
    id: "2",
    title: "VIP Title Song",
    artists: [{ id: "a3", name: "Anirudh Ravichander" }],
    image: "/attached_assets/img2.jpg",
    duration: 163,
    audioUrl: "/attached_assets/song2.mp3"
  },
  {
    id: "3",
    title: "Dharala Prabhu Title Track",
    artists: [{ id: "a1", name: "Aniruth Ravichander" }, { id: "a2", name: "Harish Kalyan" }],
    image: "/attached_assets/img3.jpg",
    duration: 242,
    audioUrl: "/attached_assets/song3.mp3"
  },
  {
    id: "4",
    title: "Hukum-Thalaivar Alappara",
    image: "/attached_assets/img4.jpg",
    artists: [{ id: "a1", name: "Aniruth Ravichander" }, { id: "a2", name: "Super Subu" }],
    duration: 326,
    audioUrl: "/attached_assets/song4.mp3"
  },
  {
    id: "5",
    title: "Illuminati",
    image: "/attached_assets/img5.jpg",
    artists: [{ id: "a1", name: "Sushin Shyam" }, { id: "a2", name: "Dabzee, Vinayak Sasikumar" }],
    duration: 322,
    audioUrl: "/attached_assets/song5.mp3"
  },
  {
    id: "6",
    title: "Idhazin Oram-The Innocence of Love",
    image: "/attached_assets/img6.jpg",
    artists: [{ id: "a1", name: "Aniruth Ravichander" }, { id: "a2", name: "Ajesh" }],
    duration: 322,
    audioUrl: "/attached_assets/song6.mp3"
  }
];

const mockPlaylists = [
  {
    id: "1",
    title: "Top 50 Global",
    description: "Your weekly update of the most played tracks",
    image: "/attached_assets/img8.jpg",
    songs: mockSongs,
    songCount: mockSongs.length
  },
  {
    id: "2",
    title: "Top 50 India",
    description: "Your weekly update of the most played tracks",
    image: "/attached_assets/img9.jpg",
    songs: mockSongs,
    songCount: mockSongs.length
  },
  {
    id: "3",
    title: "Trending India",
    description: "Your weekly update of the most played tracks",
    image: "/attached_assets/img10.jpg",
    songs: mockSongs,
    songCount: mockSongs.length
  }
];

const genres = [
  "Rock", "Hip Hop", "Pop", "Electronic", "Jazz", "R&B",
  "Country", "Classical", "Latin", "Metal", "Indie", "Folk"
];

const languages = [
  "Tamil", "English", "Malayalam", "Telugu", "Kannada", "Punjabi",
  "Hindi", "Bengali", "Marathi", "Gujarati", "Urdu", "Spanish"
];

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>({
    songs: [],
    albums: [],
    playlists: [],
    podcasts: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchDebounced = setTimeout(() => {
      const trimmed = query.trim();
      if (trimmed) {
        setLoading(true);
        try {
          const searchResults = {
            songs: mockSongs.filter(song =>
              song.title.toLowerCase().includes(trimmed.toLowerCase()) ||
              song.artists.some(artist => artist.name.toLowerCase().includes(trimmed.toLowerCase()))
            ),
            playlists: mockPlaylists.filter(playlist =>
              playlist.title.toLowerCase().includes(trimmed.toLowerCase())
            ),
            albums: [],
            podcasts: []
          };

          setResults(searchResults);

          const hasResults = searchResults.songs.length > 0 || searchResults.playlists.length > 0;
          if (!hasResults) {
            toast.info(`No results found for "${trimmed}"`);
          }
        } catch (err) {
          console.error("Search error:", err);
          toast.error("Search failed. Please try again.");
        } finally {
          setLoading(false);
        }
      } else {
        setResults({
          songs: [],
          playlists: [],
          albums: [],
          podcasts: []
        });
      }
    }, 400);

    return () => clearTimeout(searchDebounced);
  }, [query]);

  const handleGenreClick = (genre: string) => setQuery(genre);
  const handleLanguageClick = (language: string) => setQuery(language);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="flex flex-col w-full h-full">
      {/* Search Bar */}
      <div className="sticky top-0 bg-lissora-background z-10 pb-4 pt-2 px-6">
        <h1 className="text-2xl font-bold mb-4">Search</h1>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lissora-muted h-5 w-5" />
          <Input
            type="text"
            placeholder="Search songs, artists, playlists..."
            className="pl-10 bg-lissora-surface border-none focus-visible:ring-lissora-accent text-lissora-text w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-lissora-accent border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <div className="mt-6">
            {hasQuery ? (
              <>
                {results.songs.length > 0 && (
                  <div className="mb-10">
                    <h2 className="text-xl font-semibold mb-4">Songs</h2>
                    <div className="flex flex-col gap-2">
                      {results.songs.map((song, index) => (
                        <TrackItem key={song.id} song={song} index={index} />
                      ))}
                    </div>
                  </div>
                )}

                {results.playlists.length > 0 && (
                  <div className="mb-10">
                    <h2 className="text-xl font-semibold mb-4">Playlists</h2>
                    <CardGrid>
                      {results.playlists.map((playlist) => (
                        <MusicCard key={playlist.id} item={playlist} type="playlist" />
                      ))}
                    </CardGrid>
                  </div>
                )}

                {results.songs.length === 0 && results.playlists.length === 0 && (
                  <div className="text-center py-12 text-lissora-muted">
                    No results found for "{query}"
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {genres.map((genre) => (
                      <div
                        key={genre}
                        className="bg-gradient-to-br from-lissora-accent to-lissora-accent/70 aspect-square rounded-lg flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => handleGenreClick(genre)}
                      >
                        <span className="text-white font-semibold text-lg">{genre}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">Search by Language</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {languages.map((lang) => (
                      <div
                        key={lang}
                        className="bg-gradient-to-br from-lissora-accent to-lissora-accent/70 aspect-square rounded-lg flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => handleLanguageClick(lang)}
                      >
                        <span className="text-white font-semibold text-lg">{lang}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;