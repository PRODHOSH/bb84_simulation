import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";



const Theory = () => {
  return (
    <div className="min-h-screen quantum-bg">
      <div className="starfield" />
      <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
          BB84 Quantum Key Distribution Protocol
        </h1>

        <div className="space-y-8">
          <Card className="p-6 bg-card/70 backdrop-blur-sm">
            <h2 className="text-2xl md:text-3xl neon-text neon-heading mb-4">What is BB84?</h2>
            <p className="text-white/85 leading-relaxed">
              BB84 is the first quantum key distribution protocol, invented by Charles Bennett and Gilles Brassard in 1984. 
              It uses quantum mechanics to establish a secret key between two parties (Alice and Bob) in a way that detects 
              any eavesdropping attempts by a third party (Eve).
            </p>
          </Card>

          <Card className="p-6 bg-card/70 backdrop-blur-sm">
            <h2 className="text-2xl md:text-3xl neon-text neon-heading mb-4">Photon Polarization Bases</h2>
            <p className="text-white/85 mb-4">
              BB84 uses two measurement bases for photon polarization. Below the polarization names are color-coded to match the 3D scene and legends.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/70 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-primary">Rectilinear Basis (+)</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <span className="polar-badge"><span className="polar-dot" style={{background:'var(--polar-vertical)'}}></span><span className="polar-vertical">Vertical (|)</span></span> = Bit 0</li>
                  <li>• <span className="polar-badge"><span className="polar-dot" style={{background:'var(--polar-horizontal)'}}></span><span className="polar-horizontal">Horizontal (—)</span></span> = Bit 1</li>
                </ul>
              </div>
              <div className="p-4 bg-muted/70 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-secondary">Diagonal Basis (×)</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <span className="polar-badge"><span className="polar-dot" style={{background:'var(--polar-diagonal)'}}></span><span className="polar-diagonal">Diagonal (/)</span></span> = Bit 0</li>
                  <li>• <span className="polar-badge"><span className="polar-dot" style={{background:'var(--polar-antidiagonal)'}}></span><span className="polar-antidiagonal">Anti-diagonal (\)</span></span> = Bit 1</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/70 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Protocol Steps</h2>
            <ol className="space-y-4 text-foreground/90">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center font-semibold">1</span>
                <div>
                  <strong>Alice prepares photons:</strong> She randomly chooses bits (0 or 1) and randomly selects 
                  a basis (+ or ×) for each bit. She encodes the bit as a polarized photon.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center font-semibold">2</span>
                <div>
                  <strong>Alice sends photons:</strong> She transmits the polarized photons to Bob through 
                  a quantum channel (e.g., optical fiber).
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center font-semibold">3</span>
                <div>
                  <strong>Bob measures:</strong> Bob randomly chooses a basis for each incoming photon and measures it.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center font-semibold">4</span>
                <div>
                  <strong>Basis reconciliation:</strong> After all photons are sent, Alice and Bob publicly compare 
                  their bases (not the bits!). They keep only the bits where their bases matched.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center font-semibold">5</span>
                <div>
                  <strong>Error checking:</strong> They check a subset of bits to detect eavesdropping. If Eve intercepts 
                  photons, she introduces errors since she doesn't know the correct basis.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center font-semibold">6</span>
                <div>
                  <strong>Secret key:</strong> The remaining matching bits form the secure key for encryption.
                </div>
              </li>
            </ol>
          </Card>

          <Card className="p-6 bg-destructive/10 border-destructive/30">
            <h2 className="text-2xl font-semibold mb-4 text-destructive">Why is Eavesdropping Detectable?</h2>
            <p className="text-foreground/90 leading-relaxed">
              If Eve intercepts a photon, she must measure it (causing it to collapse to a definite state) and 
              resend it. Since she doesn't know Alice's basis, she has a 50% chance of measuring in the wrong basis. 
              This introduces errors that Alice and Bob can detect during their error-checking phase. The laws of 
              quantum mechanics make perfect interception impossible!
            </p>
          </Card>

          <div className="flex justify-center pt-8">
            <Link to="/simulation">
              <Button size="lg" className="bg-gradient-quantum hover:shadow-glow-primary transition-all">
                See it in Action
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Theory;
