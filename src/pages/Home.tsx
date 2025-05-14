import { useEffect, useState } from "react";
import { Song, Playlist } from "@/types/music";
import MusicCard from "@/components/cards/MusicCard";
import CardGrid from "@/components/ui/CardGrid";
import TrackItem from "@/components/tracklist/TrackItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const mockSongs = [
  {
    id: "1",
    title: "Kutti Story",
    image: "/attached_assets/img1.jpg",
    artists: [{ id: "a1", name: "Aniruth Ravichander" }, { id: "a2", name: "Thalapathy Vijay" }],
    duration: 322,
    audioUrl: "/attached_assets/song1.mp3"
  },
  {
    id: "2",
    title: "VIP Title Song",
    image: "/attached_assets/img2.jpg",
    artists: [{ id: "a3", name: "Anirudh Ravichander" }],
    duration: 163,
    audioUrl: "/attached_assets/song2.mp3"
  },
  {
    id: "3",
    title: "Dharala Prabhu Title Track",
    image: "/attached_assets/img3.jpg",
    artists: [{ id: "a1", name: "Aniruth Ravichander" }, { id: "a2", name: "Harish Kalyan" }],
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
    artists: [{ id: "a1", name: "Sushin Shyam" }, { id: "a2", name: " Dabzee, Vinayak Sasikumar" }],
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
  },
];

const allPlaylists = [
  {
    id: "1",
    title: "Top 50 Global",
    image: "/attached_assets/img8.jpg",
    description: "Your weekly update of the most played tracks",
    songs: mockSongs,
    songCount: mockSongs.length
  },
  {   
    id: "2",
    title: "Top 50 India",
    image: "/attached_assets/img9.jpg",
    description: "Your weekly update of the most played tracks",
    songs: mockSongs,
    songCount: mockSongs.length
  },
  {   
    id: "3",
    title: "Trending India",
    image: "/attached_assets/img10.jpg",
    description: "Your weekly update of the most played tracks",
    songs: mockSongs,
    songCount: mockSongs.length
  },
  {   
    id: "4",
    title: "Trending Global",
    image: "/attached_assets/img16.jpg",
    description: "Your weekly update of the most played tracks",
    songs: mockSongs,
    songCount: mockSongs.length
  },
  {   
    id: "5",
    title: "Mega Hits",
    image: "/attached_assets/img11.jpg",
    description: "Your weekly update of the most played tracks",
    songs: mockSongs,
    songCount: mockSongs.length
  },
  {   
    id: "6",
    title: "Happy Favorites",
    image: "/attached_assets/img15.jpg",
    description: "Your weekly update of the most played tracks",
    songs: mockSongs,
    songCount: mockSongs.length
  }
];

const allPodcasts = allPlaylists.map(playlist => ({
  ...playlist,
  id: `podcast-${playlist.id}`,
  type: 'podcast'
}));

const Home = () => {
  const [trendingSongs, setTrendingSongs] = useState<Song[]>(mockSongs);
  const [showAllPlaylists, setShowAllPlaylists] = useState(false);
  const [showAllPodcasts, setShowAllPodcasts] = useState(false);
  const [loading, setLoading] = useState(false);

  const visiblePlaylists = showAllPlaylists ? allPlaylists : allPlaylists.slice(0, 5);
  const visiblePodcasts = showAllPodcasts ? allPodcasts : allPodcasts.slice(0, 5);

  return (
    <div className="pb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Welcome to Music App</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-lissora-accent border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Trending Songs */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Trending Songs</h2>
              </div>
              <ScrollArea className="h-[400px] rounded-md border p-4">
                <div className="bg-lissora-surface rounded-lg">
                  {trendingSongs.map((song, index) => (
                    <TrackItem key={song.id} song={song} index={index} />
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Featured Playlists */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Featured Playlists</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowAllPlaylists(!showAllPlaylists)}
                >
                  {showAllPlaylists ? (
                    <>Show Less <ChevronDown className="ml-1 h-4 w-4" /></>
                  ) : (
                    <>Show All <ChevronRight className="ml-1 h-4 w-4" /></>
                  )}
                </Button>
              </div>
              <CardGrid>
                {visiblePlaylists.map(playlist => (
                  <MusicCard key={playlist.id} item={playlist} type="playlist" />
                ))}
              </CardGrid>
            </div>

            {/* Podcasts */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Popular Podcasts</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowAllPlaylists(!showAllPlaylists)}
                >
                  {showAllPlaylists ? (
                    <>Show Less <ChevronDown className="ml-1 h-4 w-4" /></>
                  ) : (
                    <>Show All <ChevronRight className="ml-1 h-4 w-4" /></>
                  )}
                </Button>
              </div>
              <CardGrid>
                {visiblePlaylists.map(playlist => (
                  <MusicCard key={playlist.id} item={playlist} type="playlist" />
                ))}
              </CardGrid>
            </div>
          </>
        )}
      </div>
  );
};

export default Home;