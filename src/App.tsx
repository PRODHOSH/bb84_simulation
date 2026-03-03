import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SimulationProvider } from "./contexts/SimulationContext";
import { AuthProvider } from "./contexts/AuthContext";
import Starfield from "@/components/ui/Starfield";
import LoadingScreen from "@/components/ui/LoadingScreen";
import KeyboardShortcuts from "@/components/ui/KeyboardShortcuts";
import { useState, useEffect, lazy, Suspense } from "react";

// Lazy load all pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Theory = lazy(() => import("./pages/Theory"));
const Simulation = lazy(() => import("./pages/Simulation"));
const Documentation = lazy(() => import("./pages/Documentation"));
const Quiz = lazy(() => import("./pages/Quiz"));
const Auth = lazy(() => import("./pages/Auth"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));



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
          <BrowserRouter>
            <Suspense fallback={<LoadingScreen />}>
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
            </Suspense>
          </BrowserRouter>
        </SimulationProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
