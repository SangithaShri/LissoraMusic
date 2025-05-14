
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
  joinedDate: string;
}

const UserManagement = () => {
  const navigate=useNavigate();
  const [users, setUsers] = useState<User[]>([
    { 
      id: '1', 
      name: 'John Doe', 
      email: 'user@example.com', 
      role: 'user', 
      status: 'active',
      joinedDate: 'March 2023'
    },
    { 
      id: '2', 
      name: 'Cassandra', 
      email: 'admin@example.com', 
      role: 'admin', 
      status: 'active',
      joinedDate: 'January 2022'
    },
    { 
      id: '3', 
      name: 'Jaya', 
      email: 'user@example.com', 
      role: 'user', 
      status: 'inactive',
      joinedDate: 'August 2022'
    }
  ]);
  
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user' as 'user' | 'admin'
  });
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const handleBack =() =>{
    navigate('/admin');
  }
  
  const handleAddUser = () => {
    const user: User = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'active',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'user' });
    setIsAddUserOpen(false);
  };
  
  const handleDeactivate = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } 
        : user
    ));
  };
  
  return (
    
    <div className="space-y-6">
      <Button 
        className="bg-lissora-accent hover:bg-lissora-accent/90"
        onClick={handleBack}
      >
        Back
      </Button>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Button 
          className="bg-lissora-accent hover:bg-lissora-accent/90"
          onClick={() => setIsAddUserOpen(true)}
        >
          Add New User
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">NAME</TableHead>
              <TableHead>EMAIL</TableHead>
              <TableHead>ROLE</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead className="text-right">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-4 bg-lissora-accent text-white">
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-lissora-muted">Joined {user.joinedDate}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'active' 
                      ? 'bg-lissora-accent/20 text-lissora-accent' 
                      : 'bg-red-500/20 text-red-500'
                  }`}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="mr-2">Edit</Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => handleDeactivate(user.id)}
                  >
                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Add New User Sheet */}
      <Sheet open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <SheetContent className="w-full md:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold mb-4">Add New User</SheetTitle>
          </SheetHeader>
          
          <div className="space-y-6 my-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input 
                placeholder="Enter name" 
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input 
                placeholder="Enter email" 
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Select 
                value={newUser.role} 
                onValueChange={(value) => setNewUser({...newUser, role: value as 'user' | 'admin'})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline" className="mr-2">Cancel</Button>
            </SheetClose>
            <Button 
              className="bg-lissora-accent hover:bg-lissora-accent/90"
              onClick={handleAddUser}
            >
              Save
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default UserManagement;
