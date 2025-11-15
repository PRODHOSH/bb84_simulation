import { useEffect, useState } from "react";
import { Card } from "./card";
import { Command, X } from "lucide-react";

const KeyboardShortcuts = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Toggle shortcuts panel with Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      
      // Close with Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }

      // Navigation shortcuts (only when shortcuts panel is closed)
      if (!isOpen) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
          e.preventDefault();
          window.location.hash = '#/';
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
          e.preventDefault();
          window.location.hash = '#/simulation';
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
          e.preventDefault();
          window.location.hash = '#/theory';
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'q') {
          e.preventDefault();
          window.location.hash = '#/quiz';
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-50 bg-secondary/80 hover:bg-secondary backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all group"
        title="Keyboard Shortcuts (Ctrl+K)"
      >
        <Command className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="bg-card/95 backdrop-blur-md border-primary/30 p-6 max-w-2xl w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Command className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold gradient-text">Keyboard Shortcuts</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">NAVIGATION</h3>
            <div className="space-y-2">
              {[
                { keys: ['Ctrl', 'H'], desc: 'Go to Home' },
                { keys: ['Ctrl', 'S'], desc: 'Go to Simulation' },
                { keys: ['Ctrl', 'T'], desc: 'Go to Theory' },
                { keys: ['Ctrl', 'Q'], desc: 'Go to Quiz' },
              ].map((shortcut, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background/40 rounded-lg hover:bg-background/60 transition-colors">
                  <span className="text-white/90">{shortcut.desc}</span>
                  <div className="flex gap-2">
                    {shortcut.keys.map((key, i) => (
                      <kbd key={i} className="px-3 py-1.5 bg-primary/20 text-primary text-sm font-semibold rounded border border-primary/30">
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">GENERAL</h3>
            <div className="space-y-2">
              {[
                { keys: ['Ctrl', 'K'], desc: 'Toggle Shortcuts Panel' },
                { keys: ['Esc'], desc: 'Close Modals' },
              ].map((shortcut, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background/40 rounded-lg hover:bg-background/60 transition-colors">
                  <span className="text-white/90">{shortcut.desc}</span>
                  <div className="flex gap-2">
                    {shortcut.keys.map((key, i) => (
                      <kbd key={i} className="px-3 py-1.5 bg-accent/20 text-accent text-sm font-semibold rounded border border-accent/30">
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center pt-4">
            Use <kbd className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded">Cmd</kbd> instead of <kbd className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded">Ctrl</kbd> on Mac
          </p>
        </div>
      </Card>
    </div>
  );
};

export default KeyboardShortcuts;
