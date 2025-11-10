import { Github, Link as LinkIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-border/50 bg-background/80 backdrop-blur-sm mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/PRODHOSH/bb84_simulation"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">GitHub Repository</span>
            </a>
            <span className="text-muted-foreground/50">|</span>
            <a
              href="https://prodhosh.github.io/prodhosh-portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group"
            >
              <LinkIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Portfolio</span>
            </a>
          </div>
          <p className="text-sm text-muted-foreground/70">
            © {new Date().getFullYear()} BB84 Quantum Key Distribution. Made with ❤️ for learning.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
