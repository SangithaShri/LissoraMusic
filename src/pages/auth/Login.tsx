
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Music } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-lissora-background p-4 overflow-auto">
    <div className="w-full max-w-md bg-lissora-surface p-6 rounded-xl shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-lissora-accent mb-4">
            <Music className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Login to Lissora</h1>
          <p className="text-lissora-muted mt-2">Enter your credentials to access your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-lissora-background border border-lissora-border focus:outline-none focus:ring-2 focus:ring-lissora-accent"
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-lissora-background border border-lissora-border focus:outline-none focus:ring-2 focus:ring-lissora-accent"
              placeholder="•••••••••"
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-lissora-accent"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm">
                Remember me
              </label>
            </div>
            
            <a href="#" className="text-sm text-lissora-accent hover:underline">
              Forgot password?
            </a>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-lissora-accent text-white rounded-md font-medium hover:bg-lissora-accent/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isLoading ? 'Logging in...' : 'Sign in'}
          </button>
        </form>

        {/* Demo accounts section */}
        <div className="mt-8 pt-6 border-t border-lissora-border">
          <h3 className="text-center text-lissora-muted mb-4">Demo Accounts</h3>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-1">User Account</h4>
              <p>Email: user@example.com</p>
              <p>Password: password</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-1">Admin Account</h4>
              <p>Email: admin@example.com</p>
              <p>Password: admin</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <span className="text-lissora-muted">Don't have an account? </span>
          <Link to="/register" className="text-lissora-accent hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
