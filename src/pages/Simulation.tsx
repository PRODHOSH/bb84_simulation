import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Play, RotateCcw, Info } from "lucide-react";
import PhotonScene from "@/components/simulation/PhotonScene";
import { useSimulation } from "@/contexts/SimulationContext";
import KeyResults from "@/components/simulation/KeyResults";
import AnalyticsDashboard from "@/components/simulation/AnalyticsDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/ui/Footer";


const Simulation = () => {
  const {
    photons,
    isSimulating,
    eveEnabled,
    setEveEnabled,
    startSimulation,
    resetSimulation,
    getSecretKey,
    getMatchedPhotons,
    getErrorRate,
  } = useSimulation();

  const [currentPhotonIndex, setCurrentPhotonIndex] = useState(-1);
  const [photonCount, setPhotonCount] = useState(16);

  useEffect(() => {
    if (isSimulating && currentPhotonIndex < photons.length - 1) {
      const timer = setTimeout(() => {
        setCurrentPhotonIndex(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isSimulating, currentPhotonIndex, photons.length]);

  const handleStart = () => {
    setCurrentPhotonIndex(-1);
    startSimulation(photonCount);
  };

  const handleReset = () => {
    setCurrentPhotonIndex(-1);
    resetSimulation();
  };

  const secretKey = getSecretKey();
  const matchedPhotons = getMatchedPhotons();
  const errorRate = getErrorRate();

  return (
    <div className="min-h-screen quantum-bg">
      <div className="starfield" />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary mb-4">
              <Play className="w-4 h-4" />
              <span className="font-semibold">3D Quantum Simulator</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 gradient-text">
              Quantum Key Distribution Simulator
            </h1>
            <p className="text-lg text-white/75 max-w-3xl">
              Interactive BB84 protocol with real-time 3D visualization and analytics
            </p>
          </div>

          {/* Simulation Controls */}
          <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold gradient-text">Simulation Controls</h3>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="photon-count" className="text-white/90 text-base font-medium">
                    Number of Photons
                  </Label>
                  <span className="text-2xl font-bold text-primary">{photonCount}</span>
                </div>
                <Slider
                  id="photon-count"
                  min={8}
                  max={32}
                  step={4}
                  value={[photonCount]}
                  onValueChange={(value) => setPhotonCount(value[0])}
                  disabled={isSimulating}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>8 photons</span>
                  <span>32 photons</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-accent/5 rounded-lg border border-accent/20">
                <div className="flex-1">
                  <Label htmlFor="eve-mode" className="cursor-pointer text-base font-medium">
                    Include Eavesdropper (Eve)
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enable to simulate an attacker intercepting photons
                  </p>
                </div>
                <Switch
                  id="eve-mode"
                  checked={eveEnabled}
                  onCheckedChange={setEveEnabled}
                  disabled={isSimulating}
                />
              </div>

              <div className="flex gap-4 pt-2">
                <Button
                  onClick={handleStart}
                  disabled={isSimulating && currentPhotonIndex < photons.length - 1}
                  className="bg-gradient-quantum flex-1 glow-primary h-12 text-base font-semibold"
                  size="lg"
                >
                  <Play className="mr-2 w-5 h-5" />
                  {isSimulating ? "Running Simulation..." : "Run Simulation"}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  disabled={!isSimulating}
                  className="border-accent/30 hover:bg-accent/10 h-12"
                  size="lg"
                >
                  <RotateCcw className="mr-2 w-4 h-4" />
                  Reset
                </Button>
              </div>
            </div>
          </Card>

          {/* 3D Visualization */}
          {photons.length > 0 && (
            <>
              <PhotonScene photons={photons} currentPhotonIndex={currentPhotonIndex} />

              {/* Legend */}
              <Card className="p-4">
                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-success shadow-glow-success"></div>
                    <span>Bases Match</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive"></div>
                    <span>Bases Differ</span>
                  </div>

                  {/* Polarization legend */}
                  <div className="flex items-center gap-3 md:col-span-2">
                    <div className="flex gap-3 items-center flex-wrap">
                      <div className="flex items-center gap-2">
                        <div style={{width:12,height:12,background:'var(--polar-vertical)',borderRadius:6}} />
                        <span className="text-sm">Vertical (|)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div style={{width:12,height:12,background:'var(--polar-horizontal)',borderRadius:6}} />
                        <span className="text-sm">Horizontal (—)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div style={{width:12,height:12,background:'var(--polar-diagonal)',borderRadius:6}} />
                        <span className="text-sm">Diagonal (/)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div style={{width:12,height:12,background:'var(--polar-antidiagonal)',borderRadius:6}} />
                        <span className="text-sm">Anti-diagonal (\)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Results and Analytics Tabs */}
              <Tabs defaultValue="analytics" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
                  <TabsTrigger value="results">Key Generation Results</TabsTrigger>
                </TabsList>
                
                <TabsContent value="analytics" className="mt-6">
                  <AnalyticsDashboard
                    photons={photons}
                    secretKey={secretKey}
                    matchedPhotons={matchedPhotons}
                    errorRate={errorRate}
                    eveEnabled={eveEnabled}
                  />
                </TabsContent>
                
                <TabsContent value="results" className="mt-6">
                  <KeyResults
                    photons={photons}
                    secretKey={secretKey}
                    errorRate={errorRate}
                  />
                </TabsContent>
              </Tabs>
            </>
          )}

          {/* Educational Info */}
          {!isSimulating && photons.length === 0 && (
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Info className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-4 flex-1">
                  <h3 className="font-bold text-2xl gradient-text">How to Use the Simulator</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-background/40 rounded-lg">
                        <span className="text-primary font-bold">1.</span>
                        <p className="text-white/85">
                          Adjust the number of photons to simulate (8-32)
                        </p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-background/40 rounded-lg">
                        <span className="text-primary font-bold">2.</span>
                        <p className="text-white/85">
                          Toggle the eavesdropper to see how Eve affects the protocol
                        </p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-background/40 rounded-lg">
                        <span className="text-primary font-bold">3.</span>
                        <p className="text-white/85">
                          Click "Run Simulation" to watch photons travel in 3D
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-background/40 rounded-lg">
                        <div className="w-3 h-3 rounded-full bg-success mt-1 flex-shrink-0"></div>
                        <p className="text-white/85">
                          <strong className="text-success">Green photons</strong> = basis match (key bit kept)
                        </p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-background/40 rounded-lg">
                        <div className="w-3 h-3 rounded-full bg-destructive mt-1 flex-shrink-0"></div>
                        <p className="text-white/85">
                          <strong className="text-destructive">Red photons</strong> = basis mismatch (bit discarded)
                        </p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-background/40 rounded-lg">
                        <span className="text-accent font-bold">📊</span>
                        <p className="text-white/85">
                          View analytics to see key efficiency and error rates
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link to="/theory" className="inline-block mt-4">
                    <Button variant="link" className="px-0 text-primary hover:text-primary/80 text-base">
                      Learn more about BB84 Protocol →
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Simulation;
