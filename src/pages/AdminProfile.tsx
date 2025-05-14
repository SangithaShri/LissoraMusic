import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/services/api";
import { BarChart, Headphones, Heart, ListMusic, LogOut, Settings, User, Users } from "lucide-react";
import AdminDashboard from "@/components/admin/Dashboard";
import Overview from "@/components/admin/Overview";

const AdminProfile = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }

    // If not admin, redirect to regular profile
    if (isAuthenticated && !isAdmin) {
      navigate('/profile');
    }

  }, [isAuthenticated, isAdmin, navigate]);

  if (!user) return null;

  const handleUserManagement = () => {
    navigate("/user-management");
  };

  const handleContentManagement = () => {
    navigate("/content-management");
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-6 pb-24">
      {/* Profile Header */}
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
            <span className="text-xs font-medium uppercase text-lissora-muted">ADMIN PROFILE</span>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <div className="flex gap-4 mt-1 text-sm text-lissora-muted">
              <span className="bg-lissora-accent text-white px-2 py-0.5 rounded-full text-xs">Admin</span>
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

      {/* Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="overview">
          <TabsList >
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <Overview />
          </TabsContent>

          <TabsContent value="dashboard" className="mt-6">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="bg-lissora-surface p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Admin Settings</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-lissora-background rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-2 text-lissora-accent" />
                      User Management
                    </h4>
                    <p className="text-sm text-lissora-muted">Manage users, roles and permissions</p>
                  <Button size="sm" className="mt-3" variant="outline" onClick={handleUserManagement}>
                    Open
                  </Button>
                  </div>

                  <div className="p-4 bg-lissora-background rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <ListMusic className="h-4 w-4 mr-2 text-lissora-accent" />
                      Content Management
                    </h4>
                    <p className="text-sm text-lissora-muted">Manage music, playlists, and podcasts</p>
                    <Button size="sm" className="mt-3" variant="outline" onClick={handleContentManagement}>
                      Open
                    </Button>
                  </div>

                  <div className="p-4 bg-lissora-background rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Settings className="h-4 w-4 mr-2 text-lissora-accent" />
                      System Settings
                    </h4>
                    <p className="text-sm text-lissora-muted">Configure application settings</p>
                    <Button size="sm" className="mt-3" variant="outline">Open</Button>
                  </div>

                  <div className="p-4 bg-lissora-background rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <BarChart className="h-4 w-4 mr-2 text-lissora-accent" />
                      Analytics
                    </h4>
                    <p className="text-sm text-lissora-muted">View usage statistics and reports</p>
                    <Button size="sm" className="mt-3" variant="outline">Open</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminProfile;