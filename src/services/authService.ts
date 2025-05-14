
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<User | null> => {
    try {
      // This is a mock implementation - in a real app, you would call an API
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
      
      // Mock users for demonstration
      const users = {
        "user@example.com": {
          id: "user1",
          email: "user@example.com",
          password: "password",
          name: "John Doe",
          role: "user" as const,
          avatar: ""
        },
        "admin@example.com": {
          id: "admin1",
          email: "admin@example.com",
          password: "admin",
          name: "Admin User",
          role: "admin" as const,
          avatar: ""
        }
      };
      
      const user = users[email];
      
      if (!user || user.password !== password) {
        throw new Error("Invalid credentials");
      }
      
      // Create a simple JWT-like token (this is just for demo)
      // In a real app, you would use a proper JWT library
      const token = btoa(JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
      }));
      
      // Store token in localStorage
      localStorage.setItem("auth_token", token);
      
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem("auth_token");
  },
  
  getCurrentUser: (): User | null => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) return null;
      
      const decoded = JSON.parse(atob(token));
      
      // Check if token is expired
      if (decoded.exp < Date.now()) {
        localStorage.removeItem("auth_token");
        return null;
      }
      
      return {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role
      };
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  },
  
  isAuthenticated: (): boolean => {
    return !!authService.getCurrentUser();
  },
  
  isAdmin: (): boolean => {
    const user = authService.getCurrentUser();
    return user?.role === 'admin';
  }
};
