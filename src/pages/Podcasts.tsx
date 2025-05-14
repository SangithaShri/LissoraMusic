import { useState, useEffect } from "react";
import { Podcast } from "@/types/music";
import MusicCard from "@/components/cards/MusicCard";
import CardGrid from "@/components/ui/CardGrid";
import { api } from "@/services/api";
import { toast } from "sonner";

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories] = useState<string[]>([
    "All", "News", "Comedy", "Business", "Education", "Health & Fitness", "Music", "Technology"
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        const allPodcasts = searchQuery 
          ? await api.searchPodcasts(searchQuery)
          : await api.getTopPodcasts();

        // Filter podcasts by category if not "All"
        if (selectedCategory !== "All") {
          const filtered = allPodcasts.filter(podcast => 
            podcast.description?.toLowerCase().includes(selectedCategory.toLowerCase())
          );
          setPodcasts(filtered);
        } else {
          setPodcasts(allPodcasts);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
        toast.error("Failed to load podcasts");
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, [selectedCategory, searchQuery]);

  // Function to convert podcasts to a format compatible with MusicCard
  const podcastToMusicCard = (podcast: Podcast) => {
    return {
      id: podcast.id,
      title: podcast.title,
      image: podcast.image,
      description: podcast.description,
      songs: podcast.episodes.map(episode => ({
        id: episode.id,
        title: episode.title,
        image: episode.image,
        artists: [{ id: "podcast-host", name: podcast.title }],
        duration: episode.duration,
        audioUrl: episode.audioUrl
      })),
      songCount: podcast.episodes.length
    };
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Podcasts</h1>
        <p className="text-lissora-muted">
          Discover interesting podcasts in English and Hindi
        </p>
      </div>

      {/* Category selector */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-4 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-lissora-accent text-white"
                  : "bg-lissora-surface text-lissora-text hover:bg-lissora-accent/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 rounded-full border-2 border-lissora-accent border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <>
          {podcasts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lissora-muted">No podcasts found in this category</p>
              <p className="text-sm text-lissora-muted mt-2">Try selecting a different category</p>
            </div>
          ) : (
            <CardGrid>
              {podcasts.map(podcast => (
                <MusicCard
                  key={podcast.id}
                  item={podcastToMusicCard(podcast)}
                  type="playlist"
                />
              ))}
            </CardGrid>
          )}
        </>
      )}
    </div>
  );
};

export default Podcasts;