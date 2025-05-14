
import { useEffect, useState } from "react";
import { usePlayer } from "@/contexts/PlayerContext";
import { Song } from "@/types/music";
import { ScrollArea } from "@/components/ui/scroll-area";
import TrackItem from "@/components/tracklist/TrackItem";
import { toast } from "sonner";

const RecentlyPlayed = () => {
  const { play } = usePlayer();
  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch recently played songs from localStorage
    const fetchRecentlyPlayed = async () => {
      try {
        setLoading(true);
        // Get the recently played songs
        const savedRecentlyPlayed = localStorage.getItem('recentlyPlayed');
        
        if (!savedRecentlyPlayed) {
          // For demo purposes, add some sample songs if no recently played songs are found
          const sampleSongs: Song[] = [
            {
              id: "1",
              title: "Tum Hi Ho",
              artists: [{ id: "a1", name: "Arijit Singh" }],
              image: "https://c.saavncdn.com/149/Tum-Hi-Ho-From-Aashiqui-2--Hindi-2013-500x500.jpg",
              duration: 269,
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            },
            {
              id: "2",
              title: "Tere Liye",
              artists: [{ id: "a2", name: "Atif Aslam" }],
              image: "https://c.saavncdn.com/147/Prince-Hindi-2010-500x500.jpg",
              duration: 240,
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
            }
          ];
          
          localStorage.setItem('recentlyPlayed', JSON.stringify(sampleSongs));
          setRecentlyPlayed(sampleSongs);
        } else {
          setRecentlyPlayed(JSON.parse(savedRecentlyPlayed));
        }
      } catch (error) {
        console.error("Error fetching recently played songs:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecentlyPlayed();
  }, []);

  const handleRemoveFromRecent = (songId: string) => {
    try {
      const updatedRecentlyPlayed = recentlyPlayed.filter(song => song.id !== songId);
      setRecentlyPlayed(updatedRecentlyPlayed);
      localStorage.setItem('recentlyPlayed', JSON.stringify(updatedRecentlyPlayed));
      toast.success("Song removed from recently played");
    } catch (error) {
      console.error("Error removing song from recently played:", error);
      toast.error("Failed to remove song");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Recently Played</h1>
        <p className="text-lissora-muted">
          {recentlyPlayed.length} {recentlyPlayed.length === 1 ? 'song' : 'songs'}
        </p>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 rounded-full border-2 border-lissora-accent border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <ScrollArea className="h-[calc(100vh-250px)]">
          <div className="space-y-1">
            {recentlyPlayed.length > 0 ? (
              recentlyPlayed.map((song, index) => (
                <TrackItem 
                  key={song.id} 
                  song={song} 
                  index={index} 
                  showDate={true}
                  showRemoveButton={true}
                  onRemove={handleRemoveFromRecent}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-lissora-muted text-lg mb-2">No recently played songs</p>
                <p className="text-lissora-muted">Play a song to see it here</p>
              </div>
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default RecentlyPlayed;
