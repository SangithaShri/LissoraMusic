import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Overview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Listening Activity */}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">Listening Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              Activity graph placeholder
            </div>
          </CardContent>
        </Card>

        {/* Top Genres */}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">Top Genres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Electronic</Badge>
              <Badge variant="secondary">Indie</Badge>
              <Badge variant="secondary">Rock</Badge>
              <Badge variant="secondary">Alternative</Badge>
              <Badge variant="secondary">Pop</Badge>
              <Badge variant="secondary">Hip-Hop</Badge>
              <Badge variant="secondary">R&B</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Tracks This Month */}
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Top Tracks This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: "Let It Happen", artist: "Tame Impala", plays: 23 },
              { title: "Redbone", artist: "Childish Gambino", plays: 18 },
              { title: "Midnight City", artist: "M83", plays: 15 },
              { title: "Blinding Lights", artist: "The Weeknd", plays: 12 },
              { title: "Dance Monkey", artist: "Tones and I", plays: 10 },
            ].map((track, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">{index + 1}</span>
                  <div>
                    <p className="font-medium">{track.title}</p>
                    <p className="text-sm text-muted-foreground">{track.artist}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{track.plays} plays</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { type: "liked", song: "Redbone", artist: "Childish Gambino", time: "2 hours ago" },
              { type: "playlist", name: "Let It Happen", artist: "Tame Impala", time: "3 hours ago" },
              { type: "followed", name: "The Weeknd", time: "5 hours ago" },
              { type: "created", playlist: "Summer Vibes", time: "1 week ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{activity.type[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">
                    {activity.type === "liked" && `Liked ${activity.song} by ${activity.artist}`}
                    {activity.type === "playlist" && `Added to playlist: ${activity.name} by ${activity.artist}`}
                    {activity.type === "followed" && `Followed ${activity.name}`}
                    {activity.type === "created" && `Created playlist ${activity.playlist}`}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
