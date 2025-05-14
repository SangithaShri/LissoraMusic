
import { useState } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetClose, 
  SheetFooter 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Playlist {
  id: string;
  name: string;
  tracks: number;
  genre: string;
  language: string;
  featured: boolean;
  image: string;
}

interface Podcast {
  id: string;
  name: string;
  publisher: string;
  genre: string;
  language: string;
  episodes: number;
  image: string;
}

const ContentManagement = () => {
  const navigate=useNavigate();
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: '1',
      name: "Today's Top Hits",
      tracks: 50,
      genre: "rock",
      language: "English",
      featured: true,
      image: "https://via.placeholder.com/50"
    },
    {
      id: '2',
      name: "Chill Vibes",
      tracks: 45,
      genre: "melody",
      language: "English",
      featured: true,
      image: "https://via.placeholder.com/50"
    },
    {
      id: '3',
      name: "Rock Classics",
      tracks: 60,
      genre: "classic",
      language: "Spanish",
      featured: false,
      image: "https://via.placeholder.com/50"
    },
    {
      id: '4',
      name: "Indie Mix",
      tracks: 40,
      genre: "indie",
      language: "Hindi",
      featured: true,
      image: "https://via.placeholder.com/50"
    },
    {
      id: '5',
      name: "Hip Hop Hits",
      tracks: 55,
      genre: "hip hop",
      language: "Tamil",
      featured: true,
      image: "https://via.placeholder.com/50"
    }
  ]);
  
  const [podcasts, setPodcasts] = useState<Podcast[]>([
    {
      id: '1',
      name: "The Joe Rogan Experience",
      publisher: "Joe Rogan",
      genre: "inspirational",
      language: "English",
      episodes: 1800,
      image: "https://via.placeholder.com/50"
    },
    {
      id: '2',
      name: "Stuff You Should Know",
      publisher: "iHeartRadio",
      genre: "general",
      language: "Spanish",
      episodes: 800,
      image: "https://via.placeholder.com/50"
    },
    {
      id: '3',
      name: "Crime Junkie",
      publisher: "Ashley Flowers",
      genre: "crime thriller",
      language: "Tamil",
      episodes: 400,
      image: "https://via.placeholder.com/50"
    },
    {
      id: '4',
      name: "TED Talks Daily",
      publisher: "TED",
      genre: "motivational",
      language: "English",
      episodes: 2300,
      image: "https://via.placeholder.com/50"
    },
    {
      id: '5',
      name: "The Daily",
      publisher: "The New York Times",
      genre: "general",
      language: "English",
      episodes: 1800,
      image: "https://via.placeholder.com/50"
    }
  ]);

  const handleBack =() =>{
    navigate('/admin');
  }
  
  const [isAddTrackOpen, setIsAddTrackOpen] = useState(false);
  const [isAddPodcastOpen, setIsAddPodcastOpen] = useState(false);
  
  return (
    <div className="space-y-6">
      <Button 
        className="bg-lissora-accent hover:bg-lissora-accent/90"
        onClick={handleBack}
      >
        Back
      </Button>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <div className="space-x-2">
          <Button 
            className="bg-lissora-accent hover:bg-lissora-accent/90"
            onClick={() => setIsAddTrackOpen(true)}
          >
            <Plus className="mr-1 h-4 w-4" /> Add Track
          </Button>
          <Button 
            className="bg-lissora-accent hover:bg-lissora-accent/90"
            onClick={() => setIsAddPodcastOpen(true)}
          >
            <Plus className="mr-1 h-4 w-4" /> Add Podcast
          </Button>
        </div>
      </div>

      <Tabs defaultValue="playlists">
        <TabsList>
          <TabsTrigger value="playlists">Featured Playlists</TabsTrigger>
          <TabsTrigger value="podcasts">Featured Podcasts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="playlists" className="mt-4">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PLAYLIST</TableHead>
                  <TableHead>TRACKS</TableHead>
                  <TableHead>GENRE</TableHead>
                  <TableHead>LANGUAGE</TableHead>
                  <TableHead>FEATURED STATUS</TableHead>
                  <TableHead className="text-right">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {playlists.map(playlist => (
                  <TableRow key={playlist.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <img 
                          src={playlist.image} 
                          alt={playlist.name} 
                          className="h-10 w-10 mr-3 rounded"
                        />
                        <span className="font-medium">{playlist.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{playlist.tracks}</TableCell>
                    <TableCell>{playlist.genre}</TableCell>
                    <TableCell>{playlist.language}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        playlist.featured 
                          ? 'bg-green-500/20 text-green-500' 
                          : 'bg-gray-500/20 text-gray-500'
                      }`}>
                        {playlist.featured ? 'yes' : 'no'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="mr-2">Edit</Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="podcasts" className="mt-4">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PODCAST</TableHead>
                  <TableHead>PUBLISHER</TableHead>
                  <TableHead>GENRE</TableHead>
                  <TableHead>LANGUAGE</TableHead>
                  <TableHead>EPISODES</TableHead>
                  <TableHead className="text-right">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {podcasts.map(podcast => (
                  <TableRow key={podcast.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <img 
                          src={podcast.image} 
                          alt={podcast.name} 
                          className="h-10 w-10 mr-3 rounded"
                        />
                        <span className="font-medium">{podcast.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{podcast.publisher}</TableCell>
                    <TableCell>{podcast.genre}</TableCell>
                    <TableCell>{podcast.language}</TableCell>
                    <TableCell>{podcast.episodes}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="mr-2">Edit</Button>
                      <Button variant="ghost" size="sm" className="mr-2">View Episodes</Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Add New Track Sheet */}
      <Sheet open={isAddTrackOpen} onOpenChange={setIsAddTrackOpen}>
        <SheetContent className="w-full md:max-w-md overflow-y-auto max-h-screen">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold mb-4">Add New Track</SheetTitle>
          </SheetHeader>
          
          <div className="space-y-6 my-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input placeholder="Enter title" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Enter description" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Genre</label>
              <Input placeholder="Enter genre" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Language</label>
              <Input placeholder="Enter language" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Poster Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4h-8m-12-4h.02M8 16h8m-8 8h8m-8 8h8m24-24h-8m8 8h-8m8 8h-8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-1 text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  <input type="file" className="hidden" />
                  <button className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-lissora-accent hover:bg-lissora-accent/90">
                    Choose File
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Audio File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4h-8m-12-4h.02M8 16h8m-8 8h8m-8 8h8m24-24h-8m8 8h-8m8 8h-8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-1 text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      MP3, AAC
                    </p>
                  </div>
                  <input type="file" className="hidden" />
                  <button className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-lissora-accent hover:bg-lissora-accent/90">
                    Choose File
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline" className="mr-2">Cancel</Button>
            </SheetClose>
            <Button className="bg-lissora-accent hover:bg-lissora-accent/90">
              Add Track
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      {/* Add New Podcast Sheet */}
      <Sheet open={isAddPodcastOpen} onOpenChange={setIsAddPodcastOpen}>
        <SheetContent className="w-full md:max-w-md overflow-y-auto max-h-screen">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold mb-4">Add New Podcast</SheetTitle>
          </SheetHeader>
          
          <div className="space-y-6 my-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input placeholder="Enter podcast title" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Publisher</label>
              <Input placeholder="Enter publisher name" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Enter description" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Genre</label>
              <Input placeholder="Enter genre" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Language</label>
              <Input placeholder="Enter language" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Cover Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="flex flex-col items-center justify-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4h-8m-12-4h.02M8 16h8m-8 8h8m-8 8h8m24-24h-8m8 8h-8m8 8h-8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-1 text-sm text-gray-500">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
                <input type="file" className="hidden" />
                <button className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-lissora-accent hover:bg-lissora-accent/90">
                  Choose File
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Audio File</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="flex flex-col items-center justify-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4h-8m-12-4h.02M8 16h8m-8 8h8m-8 8h8m24-24h-8m8 8h-8m8 8h-8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-1 text-sm text-gray-500">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    MP3, AAC
                  </p>
                </div>
                <input type="file" className="hidden" />
                <button className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-lissora-accent hover:bg-lissora-accent/90">
                  Choose File
                </button>
              </div>
            </div>
          </div>
          
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline" className="mr-2">Cancel</Button>
            </SheetClose>
            <Button className="bg-lissora-accent hover:bg-lissora-accent/90">
              Add Podcast
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ContentManagement;
