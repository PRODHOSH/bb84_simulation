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
          <div>
            <h1 className="text-4xl font-bold mb-2 gradient-text">
              Quantum Key Distribution Simulator
            </h1>
              <p className="text-white/85">
              Interactive BB84 protocol with real-time 3D visualization and analytics
            </p>
          </div>

          {/* Simulation Controls */}
          <Card className="p-6 bg-card/70 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4">Simulation Controls</h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="photon-count" className="text-white/90">Number of Photons: {photonCount}</Label>
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
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="eve-mode" className="cursor-pointer">
                  Include Eavesdropper (Eve)
                </Label>
                <Switch
                  id="eve-mode"
                  checked={eveEnabled}
                  onCheckedChange={setEveEnabled}
                  disabled={isSimulating}
                />
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleStart}
                  disabled={isSimulating && currentPhotonIndex < photons.length - 1}
                  className="bg-gradient-quantum flex-1 glow-primary"
                >
                  <Play className="mr-2 w-4 h-4" />
                  {isSimulating ? "Running Simulation..." : "Run Simulation"}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  disabled={!isSimulating}
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
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">How to Use the Simulator</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Adjust the number of photons to simulate (8-32)</li>
                    <li>• Toggle the eavesdropper to see how Eve affects the protocol</li>
                    <li>• Click "Run Simulation" to watch photons travel in 3D</li>
                    <li>• Green photons = basis match (key bit kept)</li>
                    <li>• Red photons = basis mismatch (bit discarded)</li>
                    <li>• View analytics to see key efficiency and error rates</li>
                  </ul>
                  <Link to="/theory" className="inline-block mt-4">
                    <Button variant="link" className="px-0 text-primary">
                      Learn more about BB84 Protocol →
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Simulation;
