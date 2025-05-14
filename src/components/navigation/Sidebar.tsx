import { Sidebar as ShadcnSidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, SidebarFooter } from "@/components/ui/sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Search, Library, ListMusic, Music, Heart, User, LogOut, Clock, Podcast, Menu } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { api } from "@/services/api";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { state: sidebarState, toggle } = useSidebar();
  const [playlists] = useState([
    {
      id: "1",
      title: "Top 50 Global",
      description: "Your weekly update of the most played tracks",
      image: "/attached_assets/img8.jpg",
    },
    {   
      id: "2",
      title: "Top 50 India",
      image: "/attached_assets/img9.jpg",
      description: "Your weekly update of the most played tracks",
    },
    {   
      id: "3",
      title: "Trending India",
      image: "/attached_assets/img10.jpg",
      description: "Your weekly update of the most played tracks",
    },
    {   
      id: "4",
      title: "Trending Global",
      image: "/attached_assets/img16.jpg",
      description: "Your weekly update of the most played tracks",
    },
    {   
      id: "5",
      title: "Mega Hits",
      image: "/attached_assets/img11.jpg",
      description: "Your weekly update of the most played tracks",
    }
  ]);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success("You've been logged out successfully");
  };

  // Icon-only content when sidebar is collapsed
  const collapsedContent = (
    <>
      <SidebarHeader className="px-4 py-6 flex justify-center">
        <Link to="/" className="flex items-center justify-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-lissora-accent/90">
            <Music className="h-6 w-6 text-white" />
          </div>
        </Link>
        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>

      <SidebarContent className="p-2 overflow-y-auto flex flex-col h-[calc(100vh-180px)]">
        <ScrollArea className="flex-1">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={`flex justify-center ${isActive("/") ? "text-lissora-accent" : ""}`} tooltip="Home">
                    <Link to="/">
                      <Home className={`h-5 w-5 ${isActive("/") ? "text-lissora-accent" : ""}`} />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={`flex justify-center ${isActive("/search") ? "text-lissora-accent" : ""}`} tooltip="Search">
                    <Link to="/search">
                      <Search className={`h-5 w-5 ${isActive("/search") ? "text-lissora-accent" : ""}`} />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={`flex justify-center ${isActive("/library") ? "text-lissora-accent" : ""}`} tooltip="Library">
                    <Link to="/library">
                      <Library className={`h-5 w-5 ${isActive("/library") ? "text-lissora-accent" : ""}`} />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="mt-4 pt-4 border-t border-zinc-800">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={`flex justify-center ${isActive("/profile") ? "text-lissora-accent" : ""}`} tooltip="Profile">
                    <Link to="/profile">
                      <User className={`h-5 w-5 ${isActive("/profile") ? "text-lissora-accent" : ""}`} />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={`flex justify-center ${isActive("/liked") ? "text-lissora-accent" : ""}`} tooltip="Liked Songs">
                    <Link to="/liked">
                      <Heart className={`h-5 w-5 ${isActive("/liked") ? "text-lissora-accent" : ""}`} />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={`flex justify-center ${isActive("/recently-played") ? "text-lissora-accent" : ""}`} tooltip="Recently Played">
                    <Link to="/recently-played">
                      <Clock className={`h-5 w-5 ${isActive("/recently-played") ? "text-lissora-accent" : ""}`} />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={`flex justify-center ${isActive("/podcasts") ? "text-lissora-accent" : ""}`} tooltip="Podcasts">
                    <Link to="/podcasts">
                      <Podcast className={`h-5 w-5 ${isActive("/podcasts") ? "text-lissora-accent" : ""}`} />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t border-zinc-800 p-4">
        {isAuthenticated ? (
          <div className="flex flex-col items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-lissora-accent text-white">
                {user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button 
              variant="ghost" 
              size="sm"
              className="p-1 w-8 h-8 rounded-full hover:bg-zinc-800"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button 
            onClick={handleLogin}
            className="w-full py-2 bg-lissora-accent rounded-md text-white font-medium hover:bg-lissora-accent/90 transition-colors"
          >
            Login
          </Button>
        )}
      </SidebarFooter>
    </>
  );

  // Full content when sidebar is expanded
  const expandedContent = (
    <>
      <SidebarHeader className="px-4 py-6 flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-lissora-accent/90">
            <Music className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-lissora-accent to-lissora-light text-transparent bg-clip-text">
            Lissora
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-2 overflow-hidden flex flex-col h-[calc(100vh-185px)]">
        <ScrollArea className="flex-1 pr-2">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={`font-medium ${isActive("/") ? "text-lissora-accent" : ""}`}>
                    <Link to="/" className="flex items-center gap-3">
                      <Home className={`h-5 w-5 ${isActive("/") ? "text-lissora-accent" : ""}`} />
                      <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={`font-medium ${isActive("/search") ? "text-lissora-accent" : ""}`}>
                    <Link to="/search" className="flex items-center gap-3">
                      <Search className={`h-5 w-5 ${isActive("/search") ? "text-lissora-accent" : ""}`} />
                      <span>Search</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* <SidebarMenuItem>
                  <SidebarMenuButton asChild className={`font-medium ${isActive("/library") ? "text-lissora-accent" : ""}`}>
                    <Link to="/library" className="flex items-center gap-3">
                      <Library className={`h-5 w-5 ${isActive("/library") ? "text-lissora-accent" : ""}`} />
                      <span>Your Library</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem> */}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="mt-4 pt-4 border-t border-zinc-800">
            <SidebarGroupLabel className="text-xs text-lissora-muted uppercase tracking-wider px-4 mb-2">
              Your Collection
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={`font-medium ${isActive("/profile") ? "text-lissora-accent" : ""}`}>
                    <Link to="/profile" className="flex items-center gap-3">
                      <User className={`h-5 w-5 ${isActive("/profile") ? "text-lissora-accent" : ""}`} />
                      <span>Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={`font-medium ${isActive("/liked") ? "text-lissora-accent" : ""}`}>
                    <Link to="/liked" className="flex items-center gap-3">
                      <Heart className={`h-5 w-5 ${isActive("/liked") ? "text-lissora-accent" : ""}`} />
                      <span>Liked Songs</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={`font-medium ${isActive("/recently-played") ? "text-lissora-accent" : ""}`}>
                    <Link to="/recently-played" className="flex items-center gap-3">
                      <Clock className={`h-5 w-5 ${isActive("/recently-played") ? "text-lissora-accent" : ""}`} />
                      <span>Recently Played</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* <SidebarMenuItem>
                  <SidebarMenuButton asChild className={`font-medium ${isActive("/podcasts") ? "text-lissora-accent" : ""}`}>
                    <Link to="/podcasts" className="flex items-center gap-3">
                      <Podcast className={`h-5 w-5 ${isActive("/podcasts") ? "text-lissora-accent" : ""}`} />
                      <span>Podcasts</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem> */}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="mt-4 pt-4 border-t border-zinc-800">
            <SidebarGroupLabel className="text-xs text-lissora-muted uppercase tracking-wider px-4 mb-2">
              Featured Playlists
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {playlists.map(playlist => (
                  <SidebarMenuItem key={playlist.id}>
                    <SidebarMenuButton asChild>
                      <Link 
                        to={`/playlist/${playlist.id}`} 
                        className="flex items-center gap-3 text-sm text-lissora-muted hover:text-lissora-text"
                      >
                        <ListMusic className="h-4 w-4" />
                        <span>{playlist.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Adding more height to ensure scrollability to the bottom */}
          <div className="pb-28"></div>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="border-t border-zinc-800 p-4 sticky bottom-0 bg-lissora-surface">
        {isAuthenticated ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className="bg-lissora-accent text-white">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs text-lissora-muted">{isAdmin ? 'Admin' : 'User'}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="px-2 h-8 flex items-center gap-1"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button 
              onClick={handleQuickLogin}
              className="flex-1 py-2 bg-lissora-accent rounded-md text-white font-medium hover:bg-lissora-accent/90 transition-colors"
            >
              Quick Login
            </Button>
            <Button 
              onClick={handleLogin}
              variant="outline"
              className="flex-1 py-2 rounded-md font-medium"
            >
              Sign In
            </Button>
          </div>
        )}
      </SidebarFooter>
    </>
  );

  const handleToggle = () => {
    toggle();
  };

  return (
    <ShadcnSidebar className="border-r border-zinc-800 h-full transition-all duration-300">
        {sidebarState === "collapsed" ? collapsedContent : expandedContent}
      </ShadcnSidebar>
  );
};

export default Sidebar;