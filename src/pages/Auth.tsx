import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '@/lib/supabase';
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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { error } = await signInWithGoogle();
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      setLoading(false);
    }
    // Success will redirect automatically
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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

      const { error } = await signUpWithEmail(
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
      } else {
        toast({
          title: "Check Your Email! 📧",
          description: "We sent you a confirmation link",
        });
        setMode('signin');
      }
    } else {
      const { error } = await signInWithEmail(formData.email, formData.password);

      if (error) {
        toast({
          title: "Sign In Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Welcome Back! 🎉",
          description: "Redirecting to quiz...",
        });
        setTimeout(() => navigate('/quiz'), 500);
      }
    }

    setLoading(false);
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
          {/* Google Sign In */}
          <Button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white hover:bg-gray-100 text-black font-medium py-6 mb-6"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">Or continue with email</span>
            </div>
          </div>

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
