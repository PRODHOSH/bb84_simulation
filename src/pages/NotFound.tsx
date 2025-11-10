import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "@/components/ui/Footer";


const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col quantum-bg">
      <div className="starfield" />
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-bold gradient-text">404</h1>
          <p className="mb-4 text-xl text-white/85">Oops! Page not found</p>
          <a href="#/" className="text-primary underline hover:text-primary/80 transition-colors">
            Return to Home
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
