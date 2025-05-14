import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "../navigation/Sidebar";
import Player from "../player/Player";
import { Outlet } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const { toggleSidebar } = useSidebar();

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-lissora-background text-lissora-text">
      <Sidebar />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Header */}
        <div className="p-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-4"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Main Content */}
        <main className="flex-1 w-full overflow-y-auto pl-10 pr-10">
          <Outlet />
        </main>
      </div>
      <Player />
    </div>
  );
};

export default MainLayout;