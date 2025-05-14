import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { api } from "@/services/api";
import { Headphones, Heart, ListMusic, LogOut, Settings, User } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface Activity {
  id: string;
  type: string;
  text: string;
  timestamp: string;
  relatedEntity?: {
    name: string;
    artist?: string;
  };
}

const Profile = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [topTracks, setTopTracks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    userName: user?.name || "",
    phoneNumber: user?.phoneNumber || "",
    age: user?.age || "",
    gender: user?.gender || "",
    address: user?.address || "",
  });

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmed) {
      try {
        logout();
        toast.success("Account deleted successfully");
        navigate("/register");
      } catch (error) {
        toast.error("Failed to delete account");
      }
    }
  };

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      type: "liked",
      text: "Liked Redbone",
      timestamp: "2 hours ago",
      relatedEntity: { name: "Redbone", artist: "Childish Gambino" }
    },
    {
      id: "2",
      type: "playlist",
      text: "Added to playlist Let It Happen",
      timestamp: "yesterday",
      relatedEntity: { name: "Let It Happen", artist: "Tame Impala" }
    },
    {
      id: "3",
      type: "follow",
      text: "Followed The Weeknd",
      timestamp: "2 days ago",
      relatedEntity: { name: "The Weeknd" }
    },
    {
      id: "4",
      type: "created",
      text: "Created playlist Summer Vibes",
      timestamp: "3 days ago",
      relatedEntity: { name: "Summer Vibes" }
    }
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }

    if (isAdmin) {
      navigate('/admin');
    }

    const loadTopTracks = async () => {
      try {
        const songs = await api.getTrendingSongs();
        setTopTracks(songs);
      } catch (error) {
        console.error("Error loading top tracks:", error);
      }
    };

    loadTopTracks();
  }, [isAuthenticated, isAdmin, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Optionally send to backend here
    console.log("Updated Profile Data:", profileData);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <section className="flex-1 overflow-y-auto p-6">
        <div className="relative">
          <div className="h-48 bg-gradient-to-r from-purple-600 to-purple-900 rounded-lg mb-16"></div>
          <div className="absolute bottom-0 left-8 transform translate-y-1/2 flex items-end">
            <Avatar className="h-24 w-24 border-4 border-lissora-background">
              <AvatarImage src="" />
              <AvatarFallback className="bg-lissora-accent text-white text-xl">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 mb-4">
              <span className="text-xs font-medium uppercase text-lissora-muted">PROFILE</span>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <div className="flex gap-4 mt-1 text-sm text-lissora-muted">
                <span>128 Following</span>
                <span>56 Followers</span>
                <span>14 Playlists</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-8 transform translate-y-1/2">
            <Button variant="outline" size="sm" className="mr-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Listening Activity */}
                <div className="lg:col-span-2">
                  <div className="bg-lissora-surface p-4 rounded-lg">
                    <h3 className="flex items-center text-md font-medium mb-4">
                      <Headphones className="mr-2 h-4 w-4 text-lissora-accent" />
                      Listening Activity
                    </h3>
                    <div className="h-48 bg-lissora-background/40 rounded flex items-center justify-center">
                      <p className="text-lissora-muted text-sm">Activity graph placeholder</p>
                    </div>
                  </div>
                </div>

                {/* Top Genres */}
                <div>
                  <div className="bg-lissora-surface p-4 rounded-lg">
                    <h3 className="flex items-center text-md font-medium mb-4">
                      <ListMusic className="mr-2 h-4 w-4 text-lissora-accent" />
                      Top Genres
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["Electronic", "Indie", "Rock", "Alternative", "Pop", "Hip-Hop", "R&B"].map((genre) => (
                        <span key={genre} className="bg-lissora-accent/10 text-lissora-accent px-3 py-1 rounded-full text-sm">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Top Tracks */}
                <div className="lg:col-span-2">
                  <div className="bg-lissora-surface p-4 rounded-lg">
                    <h3 className="flex items-center text-md font-medium mb-4">
                      <Heart className="mr-2 h-4 w-4 text-lissora-accent" />
                      Top Tracks This Month
                    </h3>
                    <div>
                      {topTracks.slice(0, 5).map((song, index) => (
                        <div key={song.id} className="flex items-center justify-between py-2 border-b border-lissora-border last:border-0">
                          <div className="flex items-center">
                            <span className="w-6 text-center text-lissora-muted mr-4">{index + 1}</span>
                            <div>
                              <p className="font-medium">{song.title}</p>
                              <p className="text-sm text-lissora-muted">{song.artists[0].name}</p>
                            </div>
                          </div>
                          <span className="text-sm text-lissora-muted">
                            {23 - index * 3} plays
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <div className="bg-lissora-surface p-4 rounded-lg">
                    <h3 className="flex items-center text-md font-medium mb-4">
                      <ListMusic className="mr-2 h-4 w-4 text-lissora-accent" />
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      {activities.map(activity => (
                        <div key={activity.id} className="flex items-start">
                          <div className="h-8 w-8 bg-lissora-accent rounded-full flex items-center justify-center text-white">
                            {activity.type === 'liked' && <Heart size={16} />}
                            {activity.type === 'playlist' && <ListMusic size={16} />}
                            {activity.type === 'follow' && <User size={16} />}
                            {activity.type === 'created' && <ListMusic size={16} />}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm">{activity.text}</p>
                            <p className="text-xs text-lissora-muted">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="mt-6">
              <div className="bg-lissora-surface p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                {!isEditing ? (
      <>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label className="text-lissora-muted">Name</Label>
                        <p className="text-lg">{user.name}</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-lissora-muted">Email</Label>
                        <p className="text-lg">{user.email}</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-lissora-muted">Phone Number</Label>
                        <p className="text-lg">{profileData.phoneNumber || "Not set"}</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-lissora-muted">Age</Label>
                        <p className="text-lg">{profileData.age || "Not set"}</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-lissora-muted">Gender</Label>
                        <p className="text-lg capitalize">{profileData.gender || "Not set"}</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-lissora-muted">Address</Label>
                        <p className="text-lg">{profileData.address || "Not set"}</p>
                      </div>
                    </div>
                    <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                  </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mt-4">Delete Account</h3>
        <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
      </div>
        </>) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>User Name</Label>
                        <Input
                          value={profileData.userName}
                          onChange={(e) => setProfileData({ ...profileData, userName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input
                          value={profileData.phoneNumber}
                          onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Age</Label>
                        <Input
                          type="number"
                          value={profileData.age}
                          onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <Select
                          value={profileData.gender}
                          onValueChange={(value) => setProfileData({ ...profileData, gender: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Address</Label>
                        <Input
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit">Save</Button>
                      <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                  </form>
                )}
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Profile;
