import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Lock, Shield, Radio, AlertTriangle, Users as UsersIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import Footer from "@/components/ui/Footer";



const Theory = () => {
  return (
    <div className="min-h-screen quantum-bg">
      <div className="starfield" />
      <div className="container mx-auto px-4 py-12 max-w-5xl relative z-10">
        <Link to="/">
          <Button variant="ghost" className="mb-8 hover:bg-primary/10">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary mb-6">
            <Shield className="w-4 h-4" />
            <span className="font-semibold">Quantum Cryptography</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            BB84 Protocol
          </h1>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Understanding the fundamentals of Quantum Key Distribution
          </p>
        </div>

        <div className="space-y-6">
          {/* What is BB84 */}
          <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Radio className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-3 gradient-text">What is BB84?</h2>
                <p className="text-white/85 leading-relaxed text-lg">
                  BB84 is the first quantum key distribution protocol, invented by <strong className="text-primary">Charles Bennett</strong> and <strong className="text-primary">Gilles Brassard</strong> in 1984. 
                  It uses quantum mechanics to establish a secret key between two parties (Alice and Bob) in a way that detects 
                  any eavesdropping attempts by a third party (Eve).
                </p>
              </div>
            </div>
          </Card>

          {/* Photon Polarization Bases */}
          <Card className="p-8 bg-card/80 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-3 gradient-text">Photon Polarization Bases</h2>
                <p className="text-white/85 mb-6 text-lg">
                  BB84 uses two measurement bases for photon polarization. The polarization states are color-coded to match the 3D visualization.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-xl">
                <h3 className="font-bold text-xl mb-4 text-primary flex items-center gap-2">
                  <span className="text-2xl">+</span> Rectilinear Basis
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-background/40 rounded-lg">
                    <span className="polar-badge">
                      <span className="polar-dot" style={{background:'var(--polar-vertical)'}}></span>
                      <span className="polar-vertical font-semibold">Vertical (|)</span>
                    </span>
                    <span className="text-white/60">→</span>
                    <span className="text-white/90 font-mono">Bit 0</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-background/40 rounded-lg">
                    <span className="polar-badge">
                      <span className="polar-dot" style={{background:'var(--polar-horizontal)'}}></span>
                      <span className="polar-horizontal font-semibold">Horizontal (—)</span>
                    </span>
                    <span className="text-white/60">→</span>
                    <span className="text-white/90 font-mono">Bit 1</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/30 rounded-xl">
                <h3 className="font-bold text-xl mb-4 text-secondary flex items-center gap-2">
                  <span className="text-2xl">×</span> Diagonal Basis
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-background/40 rounded-lg">
                    <span className="polar-badge">
                      <span className="polar-dot" style={{background:'var(--polar-diagonal)'}}></span>
                      <span className="polar-diagonal font-semibold">Diagonal (/)</span>
                    </span>
                    <span className="text-white/60">→</span>
                    <span className="text-white/90 font-mono">Bit 0</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-background/40 rounded-lg">
                    <span className="polar-badge">
                      <span className="polar-dot" style={{background:'var(--polar-antidiagonal)'}}></span>
                      <span className="polar-antidiagonal font-semibold">Anti-diagonal (\)</span>
                    </span>
                    <span className="text-white/60">→</span>
                    <span className="text-white/90 font-mono">Bit 1</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Protocol Steps */}
          <Card className="p-8 bg-card/80 backdrop-blur-sm border-secondary/20 hover:border-secondary/40 transition-all">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <UsersIcon className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-3 gradient-text">Protocol Steps</h2>
                <p className="text-white/70 text-lg">
                  The BB84 protocol follows these six key steps
                </p>
              </div>
            </div>
            
            <ol className="space-y-4">
              <li className="flex gap-4 p-4 bg-primary/5 rounded-lg border border-primary/10 hover:border-primary/30 transition-all">
                <span className="flex-shrink-0 w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold text-lg">1</span>
                <div className="flex-1">
                  <strong className="text-white/95 text-lg">Alice prepares photons</strong>
                  <p className="text-white/75 mt-1">
                    She randomly chooses bits (0 or 1) and randomly selects a basis (+ or ×) for each bit. She encodes the bit as a polarized photon.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 p-4 bg-accent/5 rounded-lg border border-accent/10 hover:border-accent/30 transition-all">
                <span className="flex-shrink-0 w-10 h-10 bg-accent/20 text-accent rounded-full flex items-center justify-center font-bold text-lg">2</span>
                <div className="flex-1">
                  <strong className="text-white/95 text-lg">Alice sends photons</strong>
                  <p className="text-white/75 mt-1">
                    She transmits the polarized photons to Bob through a quantum channel (e.g., optical fiber).
                  </p>
                </div>
              </li>
              <li className="flex gap-4 p-4 bg-secondary/5 rounded-lg border border-secondary/10 hover:border-secondary/30 transition-all">
                <span className="flex-shrink-0 w-10 h-10 bg-secondary/20 text-secondary rounded-full flex items-center justify-center font-bold text-lg">3</span>
                <div className="flex-1">
                  <strong className="text-white/95 text-lg">Bob measures</strong>
                  <p className="text-white/75 mt-1">
                    Bob randomly chooses a basis for each incoming photon and measures it.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 p-4 bg-primary/5 rounded-lg border border-primary/10 hover:border-primary/30 transition-all">
                <span className="flex-shrink-0 w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold text-lg">4</span>
                <div className="flex-1">
                  <strong className="text-white/95 text-lg">Basis reconciliation</strong>
                  <p className="text-white/75 mt-1">
                    After all photons are sent, Alice and Bob publicly compare their bases (not the bits!). They keep only the bits where their bases matched.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 p-4 bg-accent/5 rounded-lg border border-accent/10 hover:border-accent/30 transition-all">
                <span className="flex-shrink-0 w-10 h-10 bg-accent/20 text-accent rounded-full flex items-center justify-center font-bold text-lg">5</span>
                <div className="flex-1">
                  <strong className="text-white/95 text-lg">Error checking</strong>
                  <p className="text-white/75 mt-1">
                    They check a subset of bits to detect eavesdropping. If Eve intercepts photons, she introduces errors since she doesn't know the correct basis.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 p-4 bg-secondary/5 rounded-lg border border-secondary/10 hover:border-secondary/30 transition-all">
                <span className="flex-shrink-0 w-10 h-10 bg-secondary/20 text-secondary rounded-full flex items-center justify-center font-bold text-lg">6</span>
                <div className="flex-1">
                  <strong className="text-white/95 text-lg">Secret key</strong>
                  <p className="text-white/75 mt-1">
                    The remaining matching bits form the secure key for encryption.
                  </p>
                </div>
              </li>
            </ol>
          </Card>

          {/* Eavesdropping Detection */}
          <Card className="p-8 bg-gradient-to-br from-destructive/15 to-destructive/5 border-destructive/30 hover:border-destructive/50 transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-destructive/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-3 gradient-text">Why is Eavesdropping Detectable?</h2>
                <p className="text-white/85 leading-relaxed text-lg">
                  If Eve intercepts a photon, she must measure it (causing it to collapse to a definite state) and 
                  resend it. Since she doesn't know Alice's basis, she has a <strong className="text-destructive">50% chance</strong> of measuring in the wrong basis. 
                  This introduces errors that Alice and Bob can detect during their error-checking phase. The laws of 
                  quantum mechanics make <strong className="text-destructive">perfect interception impossible</strong>!
                </p>
              </div>
            </div>
          </Card>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link to="/simulation">
              <Button size="lg" className="bg-gradient-quantum hover:shadow-glow-primary transition-all group">
                Try the 3D Simulator
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Theory;
