import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { PhotonData } from "@/hooks/useBB84Simulation";
import { Button } from "@/components/ui/button";

interface KeyResultsProps {
  photons: PhotonData[];
  secretKey: (0 | 1)[];
  errorRate: number;
}


const KeyResults = ({ photons, secretKey, errorRate }: KeyResultsProps) => {

  const exportJSON = () => {
    const payload = {
      generatedAt: new Date().toISOString(),
      secretKey,
      errorRate,
      photons,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bb84_results_${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const header = [
      "id",
      "aliceBit",
      "aliceBasis",
      "bobBasis",
      "bobBit",
      "basesMatch",
      "polarization",
      "eveIntercepted",
      "eveIntroducedError",
    ];

    const rows = photons.map((p) => [
      p.id,
      p.aliceBit,
      p.aliceBasis,
      p.bobBasis,
      p.bobBit == null ? "" : p.bobBit,
      p.basesMatch,
      p.polarization,
      p.eveIntercepted ? "true" : "false",
      p.eveIntroducedError ? "true" : "false",
    ]);

    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bb84_results_${new Date().toISOString().replace(/[:.]/g, "-")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Secret Key Display */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-success" />
          Generated Secret Key
        </h2>
        <div className="bg-background/50 p-4 rounded-lg font-mono text-lg tracking-wider">
          {secretKey.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {secretKey.map((bit, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-primary/20 text-primary rounded"
                >
                  {bit}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground">No key generated yet.</span>
          )}
        </div>
        {/* Export buttons */}
        <div className="mt-4 flex gap-3">
          <Button size="sm" className="bg-gradient-quantum" onClick={exportCSV}>
            Export CSV
          </Button>
          <Button size="sm" variant="outline" onClick={exportJSON}>
            Export JSON
          </Button>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Key Length: {secretKey.length} bits</span>
          <span className="text-accent">Binary Format</span>
        </div>
      </Card>

      {/* Error Alert */}
      {errorRate > 0 && (
        <Card className="p-6 bg-destructive/10 border-destructive/30">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-destructive">
            <XCircle className="w-5 h-5" />
            Eavesdropping Detected!
          </h2>
          <p className="text-foreground/90 mb-2">
            Error rate: <span className="font-bold text-destructive">{errorRate.toFixed(1)}%</span>
          </p>
          <p className="text-sm text-muted-foreground">
            High error rate indicates possible eavesdropping. In production, this key would be discarded.
          </p>
        </Card>
      )}

      {/* Detailed Table */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Basis Reconciliation Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                  <th className="text-left p-2">#</th>
                  <th className="text-left p-2">Alice Bit</th>
                  <th className="text-left p-2">Alice Basis</th>
                  <th className="text-left p-2">Bob Basis</th>
                  <th className="text-left p-2">Polarization</th>
                  <th className="text-left p-2">Bob Bit</th>
                  <th className="text-left p-2">Result</th>
              </tr>
            </thead>
            <tbody>
              {photons.map((photon) => (
                <tr
                  key={photon.id}
                  className={`border-b border-border/50 ${
                    photon.basesMatch ? "bg-success/5" : "bg-destructive/5"
                  }`}
                >
                  <td className="p-2">{photon.id + 1}</td>
                  <td className="p-2 font-mono">{photon.aliceBit}</td>
                  <td className="p-2">
                    <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                      {photon.aliceBasis === "rectilinear" ? "+" : "×"}
                    </span>
                  </td>
                  <td className="p-2">
                    <span className="px-2 py-1 bg-secondary/20 text-secondary rounded text-xs">
                      {photon.bobBasis === "rectilinear" ? "+" : "×"}
                    </span>
                  </td>
                    <td className="p-2">
                      {/* Color-coded polarization badge */}
                      <span
                        className="inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-medium"
                        style={{
                            background: photon.polarization === 'vertical' ? 'var(--polar-vertical-bg)'
                              : photon.polarization === 'horizontal' ? 'var(--polar-horizontal-bg)'
                              : photon.polarization === 'diagonal' ? 'var(--polar-diagonal-bg)'
                              : 'var(--polar-antidiagonal-bg)'
                          }}
                      >
                        <span style={{width:10,height:10,background: photon.polarization === 'vertical' ? 'var(--polar-vertical)'
                          : photon.polarization === 'horizontal' ? 'var(--polar-horizontal)'
                          : photon.polarization === 'diagonal' ? 'var(--polar-diagonal)'
                          : 'var(--polar-antidiagonal)', borderRadius:6}} />
                        <span className="whitespace-nowrap text-sm">
                          {photon.polarization === 'vertical' ? '|' : photon.polarization === 'horizontal' ? '—' : photon.polarization === 'diagonal' ? '/' : '\\'}
                        </span>
                      </span>
                    </td>
                  <td className="p-2 font-mono">{photon.bobBit}</td>
                  <td className="p-2">
                    {photon.basesMatch ? (
                      <span className="text-success flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Kept
                      </span>
                    ) : (
                      <span className="text-destructive flex items-center gap-1">
                        <XCircle className="w-4 h-4" />
                        Discarded
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default KeyResults;
