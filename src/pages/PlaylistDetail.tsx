import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Playlist } from "@/types/music";
import { ChevronLeft, PlayCircle, Pause } from "lucide-react";
import { formatTime } from "@/lib/utils";
import TrackItem from "@/components/tracklist/TrackItem";
import { usePlayer } from "@/contexts/PlayerContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const PlaylistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const isPodcast = id?.startsWith('podcast-');
  const [loading, setLoading] = useState(true);
  const { currentSong, playerState, playPlaylist, pause, resume } = usePlayer();

  const isCurrentPlaylist = currentSong && playlist?.songs.some(song => song.id === currentSong.id);
  const isPlaying = isCurrentPlaylist && playerState === "playing";

  useEffect(() => {
    const fetchPlaylist = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const mockPlaylists: Playlist[] = [
          {
            id: "1",
            title: "Top 50 Global",
            description: "Your weekly update of the most played tracks",
            image: "/attached_assets/img8.jpg",
            songs: [
              {
                id: "1",
                title: "Kutti Story",
                image: "/attached_assets/img1.jpg",
                artists: [
                  { id: "a1", name: "Aniruth Ravichander" },
                  { id: "a2", name: "Thalapathy Vijay" }
                ],
                duration: 322,
                audioUrl: "/attached_assets/song1.mp3"
              },
              {
                id: "2",
                title: "Hukum-Thalaivar Alappara",
                image: "/attached_assets/img4.jpg",
                artists: [
                  { id: "a1", name: "Aniruth Ravichander" },
                  { id: "a2", name: "Super Subu" }
                ],
                duration: 326,
                audioUrl: "/attached_assets/song4.mp3"
              },
              {
                id: "3",
                title: "Illuminati",
                image: "/attached_assets/img5.jpg",
                artists: [
                  { id: "a1", name: "Sushin Shyam" },
                  { id: "a2", name: " Dabzee, Vinayak Sasikumar" }
                ],
                duration: 322,
                audioUrl: "/attached_assets/song5.mp3"
              },
              {
                id: "4",
                title: "Idhazin Oram-The Innocence of Love",
                image: "/attached_assets/img6.jpg",
                artists: [
                  { id: "a1", name: "Aniruth Ravichander" },
                  { id: "a2", name: "Ajesh" }
                ],
                duration: 322,
                audioUrl: "/attached_assets/song6.mp3"
              }
            ],
            songCount: 4
          },
          {
            id: "2",
            title: "Top 50 India",
            image: "/attached_assets/img9.jpg",
            description: "Your weekly update of the most played tracks",
            songs: [
              {
                id: "1",
                title: "Kutti Story",
                image: "/attached_assets/img1.jpg",
                artists: [
                  { id: "a1", name: "Aniruth Ravichander" },
                  { id: "a2", name: "Thalapathy Vijay" }
                ],
                duration: 322,
                audioUrl: "/attached_assets/song1.mp3"
              },
              {
                id: "2",
                title: "Dharala Prabhu Title Track",
                image: "/attached_assets/img3.jpg",
                artists: [
                  { id: "a1", name: "Aniruth Ravichander" },
                  { id: "a2", name: "Harish Kalyan" }
                ],
                duration: 242,
                audioUrl: "/attached_assets/song3.mp3"
              },
              {
                id: "3",
                title: "Illuminati",
                image: "/attached_assets/img5.jpg",
                artists: [
                  { id: "a1", name: "Sushin Shyam" },
                  { id: "a2", name: " Dabzee, Vinayak Sasikumar" }
                ],
                duration: 322,
                audioUrl: "/attached_assets/song5.mp3"
              },
              {
                id: "4",
                title: "VIP Title Song",
                image: "/attached_assets/img2.jpg",
                artists: [
                  { id: "a3", name: "Anirudh Ravichander" }
                ],
                duration: 163,
                audioUrl: "/attached_assets/song2.mp3"
              }
            ],
            songCount: 4
          },
          {
            id: "3",
            title: "Trending India",
            description: "Your weekly update of the most played tracks",
            image: "/attached_assets/img10.jpg",
            songs: [
              {
                id: "1",
                title: "Kutti Story",
                image: "/attached_assets/img1.jpg",
                artists: [
                  { id: "a1", name: "Aniruth Ravichander" },
                  { id: "a2", name: "Thalapathy Vijay" }
                ],
                duration: 322,
                audioUrl: "/attached_assets/song1.mp3"
              },
              {
                id: "2",
                title: "Dharala Prabhu Title Track",
                image: "/attached_assets/img3.jpg",
                artists: [{ id: "a1", name: "Aniruth Ravichander" }, { id: "a2", name: "Harish Kalyan" }],
                duration: 242,
                audioUrl: "/attached_assets/song3.mp3"
              },
              {
                id: "3",
                title: "Illuminati",
                image: "/attached_assets/img5.jpg",
                artists: [
                  { id: "a1", name: "Sushin Shyam" },
                  { id: "a2", name: " Dabzee, Vinayak Sasikumar" }
                ],
                duration: 322,
                audioUrl: "/attached_assets/song5.mp3"
              },
              {
                id: "4",
                title: "Idhazin Oram-The Innocence of Love",
                image: "/attached_assets/img6.jpg",
                artists: [
                  { id: "a1", name: "Aniruth Ravichander" },
                  { id: "a2", name: "Ajesh" }
                ],
                duration: 322,
                audioUrl: "/attached_assets/song6.mp3"
              }
            ],
            songCount: 4
          },
          {
            id: "4",
            title: "Trending Global",
            description: "Your weekly update of the most played tracks",
            image: "/attached_assets/img16.jpg",
            songs: [
              {
                id: "1",
                title: "Kutti Story",
                image: "/attached_assets/img1.jpg",
                artists: [
                  { id: "a1", name: "Aniruth Ravichander" },
                  { id: "a2", name: "Thalapathy Vijay" }
                ],
                duration: 322,
                audioUrl: "/attached_assets/song1.mp3"
              },
              {
                id: "2",
                title: "Dharala Prabhu Title Track",
                image: "/attached_assets/img3.jpg",
                artists: [{ id: "a1", name: "Aniruth Ravichander" }, { id: "a2", name: "Harish Kalyan" }],
                duration: 242,
                audioUrl: "/attached_assets/song3.mp3"
              },
              {
                id: "3",
                title: "Illuminati",
                image: "/attached_assets/img5.jpg",
                artists: [
                  { id: "a1", name: "Sushin Shyam" },
                  { id: "a2", name: " Dabzee, Vinayak Sasikumar" }
                ],
                duration: 322,
                audioUrl: "/attached_assets/song5.mp3"
              },
              {
                id: "4",
                title: "Idhazin Oram-The Innocence of Love",
                image: "/attached_assets/img6.jpg",
                artists: [
                  { id: "a1", name: "Aniruth Ravichander" },
                  { id: "a2", name: "Ajesh" }
                ],
                duration: 322,
                audioUrl: "/attached_assets/song6.mp3"
              }
            ],
            songCount: 4
          },
          {
            id: "5",
            title: "Mega Hits",
            description: "Your weekly update of the most played tracks",
            image: "/attached_assets/img11.jpg",
            songs: [
              {
                id: "1",
                title: "Kutti Story",
                image: "/attached_assets/img1.jpg",
                artists: [
                  { id: "a1", name: "Aniruth Ravichander" },
                  { id: "a2", name: "Thalapathy Vijay" }
                ],
                duration: 322,
                audioUrl: "/attached_assets/song1.mp3"
              },
              {
                id: "2",
                title: "Dharala Prabhu Title Track",
                image: "/attached_assets/img3.jpg",
                artists: [{ id: "a1", name: "Aniruth Ravichander" }, { id: "a2", name: "Harish Kalyan" }],
                duration: 242,
                audioUrl: "/attached_assets/song3.mp3"
              },
              {
                id: "3",
                title: "Illuminati",
                image: "/attached_assets/img5.jpg",
                artists: [
                  { id: "a1", name: "Sushin Shyam" },
                  { id: "a2", name: " Dabzee, Vinayak Sasikumar" }
                ],
                duration: 322,
                audioUrl: "/attached_assets/song5.mp3"
              },
              {
                id: "4",
                title: "Idhazin Oram-The Innocence of Love",
                image: "/attached_assets/img6.jpg",
                artists: [
                  { id: "a1", name: "Aniruth Ravichander" },
                  { id: "a2", name: "Ajesh" }
                ],
                duration: 322,
                audioUrl: "/attached_assets/song6.mp3"
              }
            ],
            songCount: 4
          },
          {
            id: "6",
            title: "Happy Favorites",
            description: "Your weekly update of the most played tracks",
            image: "/attached_assets/img15.jpg",
            songs: [
              {
                id: "1",
                title: "Kutti Story",
                image: "/attached_assets/img1.jpg",
                artists: [
                  { id: "a1", name: "Aniruth Ravichander" },
                  { id: "a2", name: "Thalapathy Vijay" }
                ],
                duration: 322,
                audioUrl: "/attached_assets/song1.mp3"
              },
              {
                id: "2",
                title: "Dharala Prabhu Title Track",
                image: "/attached_assets/img3.jpg",
                artists: [{ id: "a1", name: "Aniruth Ravichander" }, { id: "a2", name: "Harish Kalyan" }],
                duration: 242,
                audioUrl: "/attached_assets/song3.mp3"
              },
              {
                id: "3",
                title: "Illuminati",
                image: "/attached_assets/img5.jpg",
                artists: [
                  { id: "a1", name: "Sushin Shyam" },
                  { id: "a2", name: " Dabzee, Vinayak Sasikumar" }
                ],
                duration: 322,
                audioUrl: "/attached_assets/song5.mp3"
              },
              {
                id: "4",
                title: "Idhazin Oram-The Innocence of Love",
                image: "/attached_assets/img6.jpg",
                artists: [
                  { id: "a1", name: "Aniruth Ravichander" },
                  { id: "a2", name: "Ajesh" }
                ],
                duration: 322,
                audioUrl: "/attached_assets/song6.mp3"
              }
            ],
            songCount: 4
          },
        ];

        const foundPlaylist = mockPlaylists.find(p => p.id === id);
        setPlaylist(foundPlaylist ?? null);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [id]);

  const handlePlayPause = () => {
    if (!playlist) return;

    if (isCurrentPlaylist) {
      isPlaying ? pause() : resume();
    } else {
      playPlaylist(playlist);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 rounded-full border-2 border-lissora-accent border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="text-center py-20">
        <p className="text-xl font-semibold">Playlist not found</p>
        <p className="text-lissora-muted mt-2">The playlist you're looking for doesn't exist</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-lissora-muted hover:text-lissora-text transition-colors"
      >
        <ChevronLeft className="mr-1 h-5 w-5" />
        Back
      </button>

      {/* Header Section */}
      <div className="flex items-start gap-6 mb-8">
        <div className="w-48 h-48 shadow-lg rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={playlist.image} 
            alt={playlist.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-end">
          <p className="text-sm font-medium uppercase text-lissora-muted">{isPodcast ? 'Podcast' : 'Playlist'}</p>
          <h1 className="text-4xl font-bold mt-2">{playlist.title}</h1>
          <p className="text-lissora-muted mt-2">{playlist.description}</p>
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={handlePlayPause}
              className={cn(
                "flex items-center justify-center rounded-full bg-lissora-accent hover:bg-lissora-accent/90 transition-colors",
                "text-white w-12 h-12"
              )}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 fill-current" />
              ) : (
                <PlayCircle className="h-6 w-6 fill-current" />
              )}
            </button>
            <div className="text-sm text-lissora-muted">
              <span>{playlist.songCount} songs</span>
              <span className="mx-1">•</span>
              <span>{formatTime(playlist.songs.reduce((acc, song) => acc + song.duration, 0))}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Track List */}
      <ScrollArea className="flex-1 -mx-4 px-4">
        <div className="space-y-1">
          {playlist.songs.map((song, index) => (
            <TrackItem key={song.id} song={song} index={index} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PlaylistDetail;
