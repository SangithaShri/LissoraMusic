import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { PlayerProvider } from "@/contexts/PlayerContext";
import { AuthProvider } from "@/contexts/AuthContext";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import PlaylistDetail from "./pages/PlaylistDetail";
import AlbumDetail from "./pages/AlbumDetail";
import NotFound from "./pages/NotFound";
import LikedSongs from "./pages/LikedSongs";
import RecentlyPlayed from "./pages/RecentlyPlayed";
import Podcasts from "./pages/Podcasts";
import Profile from "./pages/Profile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminProfile from "./pages/AdminProfile";
import { SidebarProvider } from "@/components/ui/sidebar"; //Import SidebarProvider
import UserManagement from "./components/admin/UserManagement";
import ContentManagement from "./components/admin/ContentManagement";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated && location.pathname !== '/login' && location.pathname !== '/register') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PlayerProvider>
            <SidebarProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                      <Route path="/" element={<Home />} />
                      <Route path="/search" element={<Search />} />
                      <Route path="/library" element={<Library />} />
                      <Route path="/playlist/:id" element={<PlaylistDetail />} />
                      <Route path="/album/:id" element={<AlbumDetail />} />
                      <Route path="/liked" element={<LikedSongs />} />
                      <Route path="/podcasts" element={<Podcasts />} />
                      <Route path="/recently-played" element={<RecentlyPlayed />} />
                      <Route path="/profile" element={<Profile />} />
                       <Route path="/admin-profile" element={<AdminProfile />} />
                      <Route path="/user-management" element={<UserManagement />} />
                      <Route path="/content-management" element={<ContentManagement />} />
                      <Route path="/admin" element={<AdminProfile />} />
                      <Route path="*" element={<NotFound />} />
                    </Route>
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </SidebarProvider>
          </PlayerProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;