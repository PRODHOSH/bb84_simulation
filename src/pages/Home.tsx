import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Atom, Sparkles, Users, FileText, Trophy, Mail, Zap, Shield, Activity } from "lucide-react";
import Footer from "@/components/ui/Footer";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import ScrollToTop from "@/components/ui/ScrollToTop";


const Home = () => {
  const [photonCount, setPhotonCount] = useState(0);
  const [simulationCount, setSimulationCount] = useState(0);
  const [successRate, setSuccessRate] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Animated counters
    const animateValue = (setter: (val: number) => void, target: number, duration: number) => {
      const steps = 60;
      const stepTime = duration / steps;
      let current = 0;
      const increment = target / steps;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, stepTime);
    };

    animateValue(setPhotonCount, 10000, 2000);
    animateValue(setSimulationCount, 500, 2000);
    animateValue(setSuccessRate, 99, 2000);

    // Scroll progress indicator
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen quantum-bg relative overflow-hidden">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50">
        <div 
          className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      {/* Subtle starfield overlay (pure CSS) */}
      <div className="starfield" />

      {/* Top Navigation Bar */}
      <div className="relative z-20 container mx-auto px-4 py-4">
        <div className="flex justify-end">
          <Link to="/contact">
            <Button 
              variant="outline"
              className="border-primary/30 hover:bg-primary/10 hover:text-white group"
            >
              <Mail className="mr-2 w-4 h-4" />
              Contact
            </Button>
          </Link>
        </div>
      </div>

  <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/8 border border-primary/20 rounded-full text-sm text-primary">
            <Atom className="w-4 h-4 spin-logo" />
            <span className="font-semibold neon-text">Quantum Cryptography Simulator</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold gradient-text leading-tight">
            BB84 Protocol
            <br />
            <span className="text-4xl md:text-6xl gradient-text">3D Simulator</span>
          </h1>

          <p className="text-xl text-white/85 max-w-2xl mx-auto">
            Experience quantum key distribution in an interactive 3D environment. 
            Watch photons travel through space, see basis matching in real-time, 
            and understand the foundation of quantum-safe communication.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/simulation">
              <Button 
                size="lg" 
                className="bg-gradient-quantum hover:shadow-glow-primary transition-all duration-300 group glow-primary"
              >
                Start 3D Simulation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/theory">
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 hover:text-white"
              >
                Learn the Theory
              </Button>
            </Link>
            <Link to="/quiz">
              <Button 
                size="lg" 
                variant="outline"
                className="border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-500/50 hover:text-white group"
              >
                <Trophy className="mr-2 w-5 h-5" />
                Take Quiz
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <a href="team.html">
              <Button 
                size="lg" 
                variant="outline"
                className="border-accent/30 hover:bg-accent/10 hover:border-accent/50 hover:text-white group"
              >
                <Users className="mr-2 w-5 h-5" />
                Meet the Team
              </Button>
            </a>
            <Link to="/documentation">
              <Button 
                size="lg" 
                variant="outline"
                className="border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:text-white group"
              >
                <FileText className="mr-2 w-5 h-5" />
                Documentation
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Statistics Dashboard */}
        <div className="mt-20 max-w-5xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-primary/30 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2">Platform Statistics</h2>
              <p className="text-muted-foreground">Real-time simulation insights</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-background/40 rounded-xl hover:bg-background/60 transition-all group">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">{photonCount.toLocaleString()}+</div>
                <div className="text-sm text-muted-foreground">Photons Simulated</div>
              </div>
              <div className="text-center p-6 bg-background/40 rounded-xl hover:bg-background/60 transition-all group">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Activity className="w-8 h-8 text-accent" />
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">{simulationCount.toLocaleString()}+</div>
                <div className="text-sm text-muted-foreground">Simulations Run</div>
              </div>
              <div className="text-center p-6 bg-background/40 rounded-xl hover:bg-background/60 transition-all group">
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-secondary" />
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">{successRate}%</div>
                <div className="text-sm text-muted-foreground">Security Rate</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
          <div className="p-6 bg-card/60 border border-border rounded-lg hover:border-primary/50 transition-colors backdrop-blur-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Atom className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Photon Polarization</h3>
            <p className="text-muted-foreground">
              Visualize vertical, horizontal, and diagonal polarization states 
              of individual photons in 3D space.
            </p>
          </div>

          <div className="p-6 bg-card/60 border border-border rounded-lg hover:border-accent/50 transition-colors backdrop-blur-sm">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Basis Matching</h3>
            <p className="text-muted-foreground">
              Watch Alice and Bob's measurement bases align or differ, 
              color-coded for instant understanding.
            </p>
          </div>

          <div className="p-6 bg-card/60 border border-border rounded-lg hover:border-secondary/50 transition-colors backdrop-blur-sm">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Keys</h3>
            <p className="text-muted-foreground">
              Extract the secret key from matched measurements and detect 
              eavesdropping attempts.
            </p>
          </div>
        </div>
      </div>
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Home;
