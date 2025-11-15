import { useEffect, useState } from "react";
import { Atom } from "lucide-react";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="starfield" />
      <div className="relative z-10 text-center space-y-8">
        <div className="relative">
          <Atom className="w-24 h-24 text-primary mx-auto animate-spin" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h2 className="text-3xl font-bold gradient-text">
            Initializing Quantum System
          </h2>
          <p className="text-muted-foreground text-lg">
            Preparing BB84 Simulator...
          </p>
        </div>

        <div className="w-64 mx-auto">
          <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">{progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
