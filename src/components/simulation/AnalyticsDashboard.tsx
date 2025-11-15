import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PhotonData } from "@/hooks/useBB84Simulation";
import { TrendingUp, Shield, AlertTriangle, CheckCircle, Activity, Eye, Zap } from "lucide-react";
import { useEffect, useState } from "react";


interface AnalyticsDashboardProps {
  photons: PhotonData[];
  secretKey: (0 | 1)[];
  matchedPhotons: PhotonData[];
  errorRate: number;
  eveEnabled: boolean;
}

const AnalyticsDashboard = ({
  photons,
  secretKey,
  matchedPhotons,
  errorRate,
  eveEnabled,
}: AnalyticsDashboardProps) => {
  const [animatedEfficiency, setAnimatedEfficiency] = useState(0);
  const [animatedKeyLength, setAnimatedKeyLength] = useState(0);
  
  const efficiency = photons.length > 0 
    ? Math.round((matchedPhotons.length / photons.length) * 100)
    : 0;

  const interceptedCount = photons.filter(p => p.eveIntercepted).length;
  const errorCount = matchedPhotons.filter(p => p.aliceBit !== p.bobBit).length;
  
  // Animate numbers
  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setAnimatedEfficiency(Math.floor(efficiency * progress));
      setAnimatedKeyLength(Math.floor(secretKey.length * progress));
      
      if (currentStep >= steps) clearInterval(timer);
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [efficiency, secretKey.length]);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Photons</p>
              <p className="text-3xl font-bold mt-1">{photons.length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Bases Matched</p>
              <p className="text-3xl font-bold mt-1 text-success">{matchedPhotons.length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Key Length</p>
              <p className="text-3xl font-bold mt-1 text-accent">{secretKey.length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-accent" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Efficiency</p>
              <p className="text-3xl font-bold mt-1">{efficiency}%</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-secondary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Efficiency Bar */}
      <Card className="p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Key Generation Efficiency</h3>
            <span className="text-sm text-muted-foreground">{efficiency}%</span>
          </div>
          <Progress value={efficiency} className="h-3" />
          <p className="text-sm text-muted-foreground">
            Percentage of photons that contributed to the final key
          </p>
        </div>
      </Card>

      {/* Eve Statistics */}
      {eveEnabled && (
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 bg-destructive/5 border-destructive/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Eavesdropping Activity</h3>
                <p className="text-2xl font-bold text-destructive mb-2">{interceptedCount}</p>
                <p className="text-sm text-muted-foreground">
                  Photons intercepted by Eve
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-destructive/5 border-destructive/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Error Rate</h3>
                <p className="text-2xl font-bold text-destructive mb-2">{errorRate.toFixed(1)}%</p>
                <p className="text-sm text-muted-foreground">
                  Errors in matched bases ({errorCount} errors)
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Real-time Statistics Chart */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Photon State Distribution
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Polarization States</p>
            <div className="space-y-2">
              {['vertical', 'horizontal', 'diagonal', 'antidiagonal'].map(state => {
                const count = photons.filter(p => p.polarization === state).length;
                const percentage = photons.length > 0 ? (count / photons.length) * 100 : 0;
                const stateColors: Record<string, string> = {
                  vertical: '#00f0ff',
                  horizontal: '#60a5fa',
                  diagonal: '#a855f7',
                  antidiagonal: '#ff6ec7'
                };
                return (
                  <div key={state}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: stateColors[state]}} />
                        <span className="text-sm capitalize">{state}</span>
                      </div>
                      <span className="text-sm font-semibold">{count} ({percentage.toFixed(0)}%)</span>
                    </div>
                    <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all duration-500" 
                        style={{width: `${percentage}%`, backgroundColor: stateColors[state]}}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Measurement Outcomes</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <p className="text-xs font-medium text-success">Match</p>
                </div>
                <p className="text-2xl font-bold">{matchedPhotons.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Bases aligned</p>
              </div>
              <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  <p className="text-xs font-medium text-destructive">Mismatch</p>
                </div>
                <p className="text-2xl font-bold">{photons.length - matchedPhotons.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Bases differ</p>
              </div>
              {eveEnabled && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4 text-amber-500" />
                    <p className="text-xs font-medium text-amber-500">Intercepted</p>
                  </div>
                  <p className="text-2xl font-bold">{interceptedCount}</p>
                  <p className="text-xs text-muted-foreground mt-1">By Eve</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Quantum Efficiency Meter */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Quantum Efficiency Meter
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Key Generation Rate</span>
              <span className="text-lg font-bold text-primary">{animatedEfficiency}%</span>
            </div>
            <div className="h-4 bg-secondary/20 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-700 ease-out"
                style={{width: `${animatedEfficiency}%`}}
              >
                <div className="h-full w-full animate-pulse" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-xs text-muted-foreground">Input</p>
              <p className="text-xl font-bold mt-1">{photons.length}</p>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-xs text-muted-foreground">Usable</p>
              <p className="text-xl font-bold mt-1 text-success">{matchedPhotons.length}</p>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-xs text-muted-foreground">Key Bits</p>
              <p className="text-xl font-bold mt-1 text-accent">{animatedKeyLength}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Basis Distribution */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Basis Distribution</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Alice's Bases</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Rectilinear (+)</span>
                <span className="text-sm font-semibold text-primary">
                  {photons.filter(p => p.aliceBasis === "rectilinear").length}
                </span>
              </div>
              <Progress 
                value={(photons.filter(p => p.aliceBasis === "rectilinear").length / photons.length) * 100} 
                className="h-2"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">Diagonal (×)</span>
                <span className="text-sm font-semibold text-primary">
                  {photons.filter(p => p.aliceBasis === "diagonal").length}
                </span>
              </div>
              <Progress 
                value={(photons.filter(p => p.aliceBasis === "diagonal").length / photons.length) * 100} 
                className="h-2"
              />
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Bob's Bases</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Rectilinear (+)</span>
                <span className="text-sm font-semibold text-secondary">
                  {photons.filter(p => p.bobBasis === "rectilinear").length}
                </span>
              </div>
              <Progress 
                value={(photons.filter(p => p.bobBasis === "rectilinear").length / photons.length) * 100} 
                className="h-2"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">Diagonal (×)</span>
                <span className="text-sm font-semibold text-secondary">
                  {photons.filter(p => p.bobBasis === "diagonal").length}
                </span>
              </div>
              <Progress 
                value={(photons.filter(p => p.bobBasis === "diagonal").length / photons.length) * 100} 
                className="h-2"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Security Assessment */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Security Assessment</h3>
        {errorRate === 0 ? (
          <div className="flex items-start gap-3 p-4 bg-success/10 border border-success/20 rounded-lg">
            <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-success">Secure Key Generated</p>
              <p className="text-sm text-muted-foreground mt-1">
                No errors detected. The key is safe to use for encryption.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-destructive">Security Compromised</p>
              <p className="text-sm text-muted-foreground mt-1">
                Error rate of {errorRate.toFixed(1)}% detected. Possible eavesdropping by Eve. This key should be discarded.
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
