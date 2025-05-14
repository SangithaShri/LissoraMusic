
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Music } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration request
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any valid-looking registration
      if (name && email.includes('@') && password.length >= 6) {
        // Store a dummy token
        localStorage.setItem('authToken', 'dummy-jwt-token');
        toast.success('Registration successful!');
        navigate('/profile');
      } else {
        toast.error('Please provide valid information');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration');
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
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-lissora-muted mt-2">Join Lissora to start streaming</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-md bg-lissora-background border border-lissora-border focus:outline-none focus:ring-2 focus:ring-lissora-accent"
              placeholder="John Doe"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
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
              minLength={6}
              required
            />
          </div>
          
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-lissora-background border border-lissora-border focus:outline-none focus:ring-2 focus:ring-lissora-accent"
              placeholder="•••••••••"
              minLength={6}
              required
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              required
              className="h-4 w-4 rounded border-gray-300 text-lissora-accent"
            />
            <label htmlFor="terms" className="ml-2 text-sm">
              I agree to the <a href="#" className="text-lissora-accent hover:underline">Terms of Service</a> and <a href="#" className="text-lissora-accent hover:underline">Privacy Policy</a>
            </label>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-lissora-accent text-white rounded-md font-medium hover:bg-lissora-accent/90 transition-colors disabled:opacity-70"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <span className="text-lissora-muted">Already have an account? </span>
          <Link to="/login" className="text-lissora-accent hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
