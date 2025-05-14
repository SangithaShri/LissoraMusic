
import { useEffect, useState } from "react";
import { usePlayer } from "@/contexts/PlayerContext";
import { Song } from "@/types/music";
import { ScrollArea } from "@/components/ui/scroll-area";
import TrackItem from "@/components/tracklist/TrackItem";

const LikedSongs = () => {
  const { isLiked } = usePlayer();
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        setLoading(true);
        const savedLikedSongs = localStorage.getItem('likedSongs');
        if (!savedLikedSongs) {
          setLoading(false);
          return;
        }
        
        const likedIds = new Set(JSON.parse(savedLikedSongs));
        
        // Using the mock songs data
        const mockSongs: Song[] = [
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
            artists: [{ id: "a1", name: "Aniruth Ravichander" }, { id: "a2", name: "Super Subu" }],
            image: "/attached_assets/img4.jpg",
            duration: 326,
            audioUrl: "/attached_assets/song4.mp3"
          },
          {
            id: "5",
            title: "Illuminati",
            artists: [{ id: "a1", name: "Sushin Shyam" }, { id: "a2", name: "Dabzee, Vinayak Sasikumar" }],
            image: "/attached_assets/img5.jpg",
            duration: 322,
            audioUrl: "/attached_assets/song5.mp3"
          },
          {
            id: "6",
            title: "Idhazin Oram-The Innocence of Love",
            artists: [{ id: "a1", name: "Aniruth Ravichander" }, { id: "a2", name: "Ajesh" }],
            image: "/attached_assets/img6.jpg",
            duration: 322,
            audioUrl: "/attached_assets/song6.mp3"
          }
        ];
        
        const filteredSongs = mockSongs.filter(song => likedIds.has(song.id));
        setLikedSongs(filteredSongs);
      } catch (error) {
        console.error("Error fetching liked songs:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLikedSongs();
  }, [isLiked]);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Liked Songs</h1>
        <p className="text-lissora-muted">
          {likedSongs.length} {likedSongs.length === 1 ? 'song' : 'songs'}
        </p>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 rounded-full border-2 border-lissora-accent border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <ScrollArea className="h-[calc(100vh-250px)]">
          <div className="space-y-1">
            {likedSongs.length > 0 ? (
              likedSongs.map((song, index) => (
                <TrackItem 
                  key={song.id} 
                  song={song} 
                  index={index} 
                  showDate={true}
                  showRemoveButton={true}
                  onRemove={() => {}}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-lissora-muted text-lg mb-2">You haven't liked any songs yet</p>
                <p className="text-lissora-muted">Click the heart icon on any song to like it</p>
              </div>
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default LikedSongs;
