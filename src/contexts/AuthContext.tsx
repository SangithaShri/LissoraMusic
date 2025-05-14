
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '@/services/authService';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // On mount, check if user is already logged in
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      const user = await authService.login(email, password);
      if (user) {
        setUser(user);
        toast.success(`Welcome back, ${user.name}`);
      }
    } catch (error) {
      toast.error('Invalid email or password');
      throw error;
    }
  };
  
  const logout = () => {
    authService.logout();
    setUser(null);
    toast.success('Logged out successfully');
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        logout
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
