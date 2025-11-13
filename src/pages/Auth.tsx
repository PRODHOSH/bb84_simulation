import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { signInWithEmail, signUpWithEmail } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/ui/Footer';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!formData.username.trim()) {
          toast({
            title: "Username Required",
            description: "Please enter a username",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }

        const { data, error } = await signUpWithEmail(
          formData.email,
          formData.password,
          formData.username
        );

        if (error) {
          toast({
            title: "Sign Up Failed",
            description: error.message,
            variant: "destructive"
          });
        } else if (data.user) {
          // Check if email confirmation is required
          if (data.user.identities && data.user.identities.length === 0) {
            toast({
              title: "Email Already Registered",
              description: "Please sign in with your existing account",
              variant: "destructive"
            });
          } else if (data.session) {
            // Auto-confirmed, user is logged in
            toast({
              title: "Account Created! 🎉",
              description: "Redirecting to quiz...",
            });
            setTimeout(() => navigate('/quiz'), 500);
          } else {
            // Email confirmation required
            toast({
              title: "Check Your Email! 📧",
              description: "We sent you a confirmation link. If you don't see it, check spam folder.",
            });
            setMode('signin');
          }
        }
      } else {
        const { data, error } = await signInWithEmail(formData.email, formData.password);

        if (error) {
          toast({
            title: "Sign In Failed",
            description: error.message === "Invalid login credentials" 
              ? "Wrong email or password. Please try again."
              : error.message,
            variant: "destructive"
          });
        } else if (data.user) {
          toast({
            title: "Welcome Back! 🎉",
            description: "Redirecting to quiz...",
          });
          setTimeout(() => navigate('/quiz'), 500);
        }
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="starfield" />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors">
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <div className="inline-block mb-4 px-4 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full">
            <span className="text-blue-400 text-sm font-medium">🔐 Authentication</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 gradient-text">
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-300">
            {mode === 'signin' 
              ? 'Sign in to take the quantum quiz' 
              : 'Join the quantum learning community'}
          </p>
        </div>

        <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700/50 p-8">
          {/* Email/Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  <User size={16} className="inline mr-2" />
                  Username
                </label>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="bg-black/30 border-gray-700 text-white"
                  required={mode === 'signup'}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                <Mail size={16} className="inline mr-2" />
                Email
              </label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-black/30 border-gray-700 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                <Lock size={16} className="inline mr-2" />
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-black/30 border-gray-700 text-white"
                required
                minLength={6}
              />
              {mode === 'signup' && (
                <p className="text-xs text-gray-400 mt-1">
                  <AlertCircle size={12} className="inline mr-1" />
                  Minimum 6 characters
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-6"
            >
              {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin');
                setFormData({ email: '', password: '', username: '' });
              }}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              {mode === 'signin' ? (
                <>Don't have an account? <span className="font-bold">Sign Up</span></>
              ) : (
                <>Already have an account? <span className="font-bold">Sign In</span></>
              )}
            </button>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-blue-900/20 border-blue-500/30 p-6">
          <h3 className="text-lg font-bold mb-3 text-blue-400">Why Sign In?</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Save your quiz scores and track progress</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Compete on the global leaderboard</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>View your quiz history and improvement</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Secure and privacy-focused authentication</span>
            </li>
          </ul>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;
