import axios from 'axios';

const LASTFM_API_KEY = '6cd63d994e51158a2e7f19e0de8cf11d';
const LISTEN_NOTES_API_KEY = '3778ff1be69a4234b9c6d857bff22c36';

const lastFmApi = axios.create({
  baseURL: 'https://ws.audioscrobbler.com/2.0/',
  params: {
    api_key: LASTFM_API_KEY,
    format: 'json'
  }
});

const listenNotesApi = axios.create({
  baseURL: 'https://listen-api.listennotes.com/api/v2',
  headers: {
    'X-ListenAPI-Key': LISTEN_NOTES_API_KEY
  }
});

const handleApiError = (error: any) => {
  console.error('API Error:', error);
  return [];
};

export const api = {
  async getTrendingSongs() {
    try {
      const response = await lastFmApi.get('', {
        params: {
          method: 'chart.gettoptracks',
          limit: 20
        }
      });
      return response.data.tracks.track.map((track: any) => ({
        id: track.mbid || track.url,
        title: track.name,
        artists: [{ id: track.artist.mbid || track.artist.url, name: track.artist.name }],
        image: track.image?.[2]?.['#text'] || 'https://via.placeholder.com/300',
        duration: 180,
        audioUrl: track.url
      }));
    } catch (error) {
      return handleApiError(error);
    }
  },

  async getTopArtists() {
    try {
      const response = await lastFmApi.get('', {
        params: {
          method: 'chart.gettopartists',
          limit: 10
        }
      });
      return response.data.artists.artist.map((artist: any) => ({
        id: artist.mbid || artist.url,
        name: artist.name,
        image: artist.image?.[2]?.['#text'] || 'https://via.placeholder.com/300',
        genre: 'Music',
        monthlyListeners: parseInt(artist.listeners)
      }));
    } catch (error) {
      return handleApiError(error);
    }
  },

  async getFeaturedPlaylists() {
    try {
      const response = await lastFmApi.get('', {
        params: {
          method: 'tag.gettoptracks',
          tag: 'popular',
          limit: 10
        }
      });
      return response.data.tracks.track.map((track: any) => ({
        id: track.mbid || track.url,
        title: `${track.name} Playlist`,
        image: track.image?.[2]?.['#text'] || 'https://via.placeholder.com/300',
        description: `Popular tracks by ${track.artist.name}`,
        songs: [],
        songCount: 10
      }));
    } catch (error) {
      return handleApiError(error);
    }
  },

  async getNewReleases() {
    try {
      const response = await lastFmApi.get('', {
        params: {
          method: 'tag.gettopalbums',
          tag: 'new',
          limit: 10
        }
      });
      return response.data.albums.album.map((album: any) => ({
        id: album.mbid || album.url,
        title: album.name,
        image: album.image?.[2]?.['#text'] || 'https://via.placeholder.com/300',
        artists: [{ id: album.artist.mbid || album.artist.url, name: album.artist.name }],
        songs: [],
        year: new Date().getFullYear(),
        description: `Album by ${album.artist.name}`
      }));
    } catch (error) {
      return handleApiError(error);
    }
  },

  async getTopPodcasts() {
    try {
      const response = await listenNotesApi.get('/best_podcasts', {
        params: {
          region: 'us',
          safe_mode: 1
        }
      });
      return response.data.podcasts.map((podcast: any) => ({
        id: podcast.id,
        title: podcast.title,
        image: podcast.image || 'https://via.placeholder.com/300',
        description: podcast.description,
        episodes: []
      }));
    } catch (error) {
      return handleApiError(error);
    }
  },

  async searchContent(query: string) {
    try {
      const [tracks, artists, albums] = await Promise.all([
        lastFmApi.get('', {
          params: {
            method: 'track.search',
            track: query,
            limit: 10
          }
        }),
        lastFmApi.get('', {
          params: {
            method: 'artist.search',
            artist: query,
            limit: 10
          }
        }),
        lastFmApi.get('', {
          params: {
            method: 'album.search',
            album: query,
            limit: 10
          }
        })
      ]);

      return {
        songs: tracks.data.results.trackmatches.track.map((track: any) => ({
          id: track.mbid || track.url,
          title: track.name,
          artists: [{ id: track.artist, name: track.artist }],
          image: track.image?.[2]?.['#text'] || 'https://via.placeholder.com/300',
          duration: 180,
          audioUrl: track.url
        })),
        artists: artists.data.results.artistmatches.artist.map((artist: any) => ({
          id: artist.mbid || artist.url,
          name: artist.name,
          image: artist.image?.[2]?.['#text'] || 'https://via.placeholder.com/300',
          genre: 'Music',
          monthlyListeners: parseInt(artist.listeners)
        })),
        albums: albums.data.results.albummatches.album.map((album: any) => ({
          id: album.mbid || album.url,
          title: album.name,
          image: album.image?.[2]?.['#text'] || 'https://via.placeholder.com/300',
          artists: [{ id: album.artist, name: album.artist }],
          songs: [],
          year: new Date().getFullYear(),
          description: `Album by ${album.artist}`
        }))
      };
    } catch (error) {
      return { songs: [], artists: [], albums: [] };
    }
  }
};