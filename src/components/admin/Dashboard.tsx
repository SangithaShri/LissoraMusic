
import { BarChart, LineChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-lissora-muted">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,256</div>
            <p className="text-xs text-purple-500 mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-lissora-muted">Active Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">829</div>
            <p className="text-xs text-purple-500 mt-1">+5% from yesterday</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-lissora-muted">Total Listens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,234</div>
            <p className="text-xs text-purple-500 mt-1">+8% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-lissora-muted">Avg. Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32 min</div>
            <p className="text-xs text-purple-500 mt-1">+3% from last week</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="w-full h-full relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <LineChart className="h-6 w-6 text-lissora-muted" />
                <span className="ml-2 text-sm text-lissora-muted">
                  Growth chart visualization
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Listens by Day</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="w-full h-full relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <BarChart className="h-6 w-6 text-lissora-muted" />
                <span className="ml-2 text-sm text-lissora-muted">
                  Listens by day chart visualization
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Additional sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Avatar className="h-9 w-9 bg-purple-500">
                  <AvatarFallback>EW</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">New user registered: Emma Wilson</p>
                  <p className="text-xs text-lissora-muted">5 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">New podcast added: The Growth Mindset</p>
                  <p className="text-xs text-lissora-muted">15 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Avatar className="h-9 w-9 bg-purple-500">
                  <AvatarFallback>CV</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Featured playlist updated: Chill Vibes</p>
                  <p className="text-xs text-lissora-muted">1 hour ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="h-9 w-9 rounded-full bg-orange-500 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21a9 9 0 0 1-9-9c0-1.88.63-3.44 1.69-4.78"></path>
                    <path d="M8 10V7c0-1.1 9-1.1 9 0v3"></path>
                    <path d="M12 21a9 9 0 0 0 9-9c0-1.88-.63-3.44-1.69-4.78"></path>
                    <path d="M10 10h6m-3 0v11"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">System update completed: v1.2.4</p>
                  <p className="text-xs text-lissora-muted">3 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Genres</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="w-full h-full relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="h-40 w-40" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e0e0e0" strokeWidth="10" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#9b87f5" strokeWidth="10" strokeDasharray="251" strokeDashoffset="0" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#7E69AB" strokeWidth="10" strokeDasharray="251" strokeDashoffset="91" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#D6BCFA" strokeWidth="10" strokeDasharray="251" strokeDashoffset="157" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#8B5CF6" strokeWidth="10" strokeDasharray="251" strokeDashoffset="205" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="30" fill="none" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-semibold">Pop 35%</span>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4">
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-lissora-accent mr-1"></span>
                  <span>Pop</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-7E69AB mr-1"></span>
                  <span>Hip Hop</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-D6BCFA mr-1"></span>
                  <span>Rock</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-8B5CF6 mr-1"></span>
                  <span>R&B</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-gray-500 mr-1"></span>
                  <span>Others</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
