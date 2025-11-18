import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Presentation, 
  ArrowLeft,
  Eye,
  X,
  User
} from 'lucide-react';
import Footer from '@/components/ui/Footer';

const Documentation = () => {
  const [pdfPreview, setPdfPreview] = useState<{ title: string, url: string } | null>(null);
  const [pdfError, setPdfError] = useState(false);

  // Get base path for assets
  const basePath = import.meta.env.BASE_URL;

  const handleViewPDF = (title: string, url: string) => {
    setPdfPreview({ title, url });
    setPdfError(false);
  };

  // Hardware images - will loop continuously (duplicate for seamless loop)
  const hardwareImages = [
    {
      id: 1,
      title: 'Complete BB84 Hardware Setup',
      description: 'Full quantum key distribution system with laser source, polarization components, and detection units',
      url: `${basePath}images/hardware/hardware_photo_1.jpg`
    },
    {
      id: 2,
      title: 'Optical Polarization System',
      description: 'Precision polarization filters and beam splitters for quantum state preparation',
      url: `${basePath}images/hardware/hardware_photo_2.jpg`
    },
    {
      id: 3,
      title: 'Detection & Measurement Unit',
      description: 'Single-photon detectors and quantum measurement apparatus',
      url: `${basePath}images/hardware/hardware_photo_3.jpg`
    },
    {
      id: 4,
      title: 'Control Electronics & Interface',
      description: 'Electronic control systems and data acquisition interface for quantum communication',
      url: `${basePath}images/hardware/hardware_photo_4.jpg`
    }
  ];

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

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary mb-4">
            <FileText className="w-4 h-4" />
            <span className="font-semibold">Project Resources</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 gradient-text">
            Documentation & Gallery
          </h1>
          <p className="text-lg text-white/75 max-w-3xl mx-auto">
            Access our comprehensive project documentation, presentations, and hardware gallery
          </p>
        </div>

        {/* Documents Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl font-bold gradient-text">Project Documents</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project Report Card */}
            <Card className="p-8 bg-card/90 backdrop-blur-md border-primary/30 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Project Report</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Complete technical documentation of our BB84 quantum key distribution implementation
                  </p>
                </div>
              </div>
              
              {/* Created By */}
              <div className="mb-6 p-4 bg-background/60 rounded-xl border border-border/50">
                <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span className="font-medium">Created By</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Raghav</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Vijay Nishal</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 h-11 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 text-primary font-semibold"
                  onClick={() => handleViewPDF('Project Report', `${basePath}docs/physics_report.pdf`)}
                >
                  <Eye className="mr-2 w-4 h-4" />
                  Preview
                </Button>
                <a 
                  href={`${basePath}docs/physics_report.pdf`}
                  download="BB84_Project_Report.pdf"
                  className="flex-1"
                >
                  <Button className="w-full h-11 bg-primary hover:bg-primary/90 font-semibold shadow-lg shadow-primary/30">
                    <Download className="mr-2 w-4 h-4" />
                    Download
                  </Button>
                </a>
              </div>
            </Card>

            {/* Presentation Card */}
            <Card className="p-8 bg-card/90 backdrop-blur-md border-accent/30 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl group-hover:scale-110 transition-transform">
                  <Presentation className="w-8 h-8 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Presentation Slides</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Comprehensive slides covering quantum cryptography theory and practical implementation
                  </p>
                </div>
              </div>
              
              {/* Created By */}
              <div className="mb-6 p-4 bg-background/60 rounded-xl border border-border/50">
                <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span className="font-medium">Created By</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">Sachin</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">Sudhir</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 h-11 bg-accent/10 hover:bg-accent/20 border border-accent/30 hover:border-accent/50 text-accent font-semibold"
                  onClick={() => handleViewPDF('Presentation Slides', `${basePath}docs/physics_ppt.pdf`)}
                >
                  <Eye className="mr-2 w-4 h-4" />
                  Preview
                </Button>
                <a 
                  href={`${basePath}docs/physics_ppt.pdf`}
                  download="BB84_Presentation.pdf"
                  className="flex-1"
                >
                  <Button className="w-full h-11 bg-accent hover:bg-accent/90 font-semibold shadow-lg shadow-accent/30">
                    <Download className="mr-2 w-4 h-4" />
                    Download
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </div>

        {/* Hardware Gallery Section */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-orange-500" />
              </div>
              <h2 className="text-3xl font-bold gradient-text">Hardware Gallery</h2>
            </div>
          </div>

          {/* Infinite Scrolling Images */}
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/20 backdrop-blur-sm p-8 mb-6">
            <style>{`
              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              
              .scroll-container {
                animation: scroll 20s linear infinite;
                width: fit-content;
              }
              
              .scroll-container:hover {
                animation-play-state: paused;
              }
            `}</style>
            
            <div className="flex gap-6 scroll-container">
              {/* Duplicate images for seamless loop */}
              {[...hardwareImages, ...hardwareImages, ...hardwareImages, ...hardwareImages].map((image, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 w-[400px] group cursor-pointer"
                >
                  <Card className="overflow-hidden border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={image.url} 
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-5 bg-card/90 backdrop-blur-sm">
                      <h3 className="font-bold text-lg mb-2">{image.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {image.description}
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Hardware Created By */}
          <Card className="p-6 bg-card/80 backdrop-blur-md border-orange-500/30">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <User className="w-5 h-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">Hardware Engineering</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">Created By</span>
                  <span className="px-4 py-1.5 bg-orange-500/10 text-orange-500 rounded-full font-semibold">Joshwa</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* PDF Preview Modal */}
        {pdfPreview && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-6xl h-[90vh] bg-background rounded-2xl border border-border shadow-2xl overflow-hidden">
              {/* Modal Header */}
              <div className="absolute top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-10 p-4 flex items-center justify-between">
                <h3 className="text-xl font-bold gradient-text">{pdfPreview.title}</h3>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setPdfPreview(null)}
                  className="hover:bg-destructive/20 hover:text-destructive"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* PDF Embed */}
              <div className="pt-16 h-full bg-muted/10 relative">
                {pdfError ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4">
                    <FileText className="w-16 h-16 text-muted-foreground" />
                    <p className="text-muted-foreground">Unable to preview PDF in browser</p>
                    <a href={pdfPreview.url} download>
                      <Button>
                        <Download className="mr-2 w-4 h-4" />
                        Download PDF Instead
                      </Button>
                    </a>
                  </div>
                ) : (
                  <iframe
                    src={`${pdfPreview.url}#toolbar=0&navpanes=0&scrollbar=1`}
                    className="w-full h-full border-0"
                    title={pdfPreview.title}
                    allow="fullscreen"
                    onError={() => setPdfError(true)}
                  />
                )}
              </div>

              {/* Download Button */}
              <div className="absolute bottom-4 right-4">
                <a href={pdfPreview.url} download>
                  <Button className="shadow-lg">
                    <Download className="mr-2 w-4 h-4" />
                    Download PDF
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default Documentation;
