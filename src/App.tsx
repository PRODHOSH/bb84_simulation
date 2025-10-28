import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { SimulationProvider } from "./contexts/SimulationContext";
import Home from "./pages/Home";
import Theory from "./pages/Theory";
import Simulation from "./pages/Simulation";
import NotFound from "./pages/NotFound";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SimulationProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/theory" element={<Theory />} />
          <Route path="/simulation" element={<Simulation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </SimulationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
