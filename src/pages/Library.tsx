import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { Playlist, Album } from "@/types/music";
import MusicCard from "@/components/cards/MusicCard";
import CardGrid from "@/components/ui/CardGrid";

const Library = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"playlists" | "albums">("playlists");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [fetchedPlaylists, fetchedAlbums] = await Promise.all([
          api.getFeaturedPlaylists(),
          api.getNewReleases(),
        ]);

        setPlaylists(fetchedPlaylists || []);
        setAlbums(fetchedAlbums || []);
      } catch (error) {
        console.error("Error fetching library data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Library</h1>
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-full ${
            activeTab === "playlists" ? "bg-primary text-white" : "bg-secondary"
          }`}
          onClick={() => setActiveTab("playlists")}
        >
          Playlists
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            activeTab === "albums" ? "bg-primary text-white" : "bg-secondary"
          }`}
          onClick={() => setActiveTab("albums")}
        >
          Albums
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <CardGrid>
          {activeTab === "playlists"
            ? playlists.map((playlist) => (
                <MusicCard
                  key={playlist.id}
                  item={playlist}
                  type="playlist"
                />
              ))
            : albums.map((album) => (
                <MusicCard
                  key={album.id}
                  item={album}
                  type="album"
                />
              ))}
        </CardGrid>
      )}
    </div>
  );
};

export default Library;