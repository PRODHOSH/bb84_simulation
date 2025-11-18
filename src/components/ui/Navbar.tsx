import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './button';
import { Menu, X, Atom } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleNavClick = (path: string, sectionId?: string) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (sectionId) {
          scrollToSection(sectionId);
        }
      }, 100);
    } else if (sectionId) {
      scrollToSection(sectionId);
    }
  };

  const navLinks = [
    { name: 'Home', action: () => navigate('/') },
    { name: 'Simulation', action: () => navigate('/simulation') },
    { name: 'Theory', action: () => handleNavClick('/', 'theory') },
    { name: 'Meet the Team', action: () => window.location.href = `${import.meta.env.BASE_URL}team.html` },
    { name: 'Quiz', action: () => navigate('/quiz') },
    { name: 'Contact', action: () => handleNavClick('/', 'contact') },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/98 backdrop-blur-xl border-b border-primary/30 shadow-2xl shadow-primary/10' 
          : 'bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18 py-3">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <Atom className="w-9 h-9 text-primary group-hover:rotate-180 transition-transform duration-500" />
              <div className="absolute inset-0 blur-xl bg-primary/40 group-hover:bg-primary/60 transition-all" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              BB84 Quantum
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                className="text-sm font-semibold hover:text-primary hover:bg-primary/10 transition-all px-4 py-2 rounded-lg border border-transparent hover:border-primary/30"
                onClick={link.action}
              >
                {link.name}
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-2 pt-2">
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  className="justify-start text-base font-medium hover:text-primary hover:bg-primary/10"
                  onClick={() => {
                    link.action();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {link.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
