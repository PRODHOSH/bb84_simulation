import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { SimulationProvider } from "./contexts/SimulationContext";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Theory from "./pages/Theory";
import Simulation from "./pages/Simulation";
import Documentation from "./pages/Documentation";
import Quiz from "./pages/Quiz";
import Auth from "./pages/Auth";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Starfield from "@/components/ui/Starfield";
import LoadingScreen from "@/components/ui/LoadingScreen";
import KeyboardShortcuts from "@/components/ui/KeyboardShortcuts";
import { useState, useEffect } from "react";



const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <SimulationProvider>
          <Toaster />
          {/* global SPA starfield overlay (behind content) */}
          <Starfield />
          <Sonner />
          <KeyboardShortcuts />
          <HashRouter>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/theory" element={<Theory />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/quiz" element={<Quiz />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        </SimulationProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
