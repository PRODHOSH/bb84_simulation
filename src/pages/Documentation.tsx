import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Presentation, 
  Image as ImageIcon, 
  ArrowLeft,
  ExternalLink,
  Camera,
  Zap,
  Upload
} from 'lucide-react';
import Footer from '@/components/ui/Footer';

const Documentation = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Placeholder images - replace with actual hardware photos
  const hardwareImages = [
    {
      id: 1,
      title: 'Complete Setup',
      description: 'Full quantum key distribution hardware setup',
      url: '/images/hardware/setup.jpg',
      placeholder: true
    },
    {
      id: 2,
      title: 'Laser System',
      description: 'Laser source for photon generation',
      url: '/images/hardware/laser.jpg',
      placeholder: true
    },
    {
      id: 3,
      title: 'Polarization Filters',
      description: 'Basis selection mechanism',
      url: '/images/hardware/filters.jpg',
      placeholder: true
    },
    {
      id: 4,
      title: 'Detection Unit',
      description: 'Photon detector and measurement apparatus',
      url: '/images/hardware/detector.jpg',
      placeholder: true
    },
    {
      id: 5,
      title: 'Control Electronics',
      description: 'Control circuits and data processing',
      url: '/images/hardware/electronics.jpg',
      placeholder: true
    },
    {
      id: 6,
      title: 'Team Assembly',
      description: 'Our team working on the hardware',
      url: '/images/hardware/team.jpg',
      placeholder: true
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Starfield Background */}
      <div className="starfield" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors">
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full">
            <span className="text-blue-400 text-sm font-medium">📚 Project Resources</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Documentation & Gallery
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access our comprehensive project documentation, presentations, and hardware gallery
          </p>
        </div>

        {/* Documents Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <FileText className="text-blue-400" size={32} />
            Project Documents
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Project Report Card */}
            <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30 p-8 hover:border-blue-400/50 transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-4 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                  <FileText size={32} className="text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Project Report</h3>
                  <p className="text-gray-400">
                    Complete documentation of our BB84 implementation, methodology, and results
                  </p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Format:</span>
                  <span className="text-white font-medium">PDF</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Pages:</span>
                  <span className="text-white font-medium">~50 pages</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-yellow-400 font-medium">📝 Coming Soon</span>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                disabled
              >
                <Download size={18} className="mr-2" />
                Download Report (Coming Soon)
              </Button>
            </Card>

            {/* Presentation Card */}
            <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 p-8 hover:border-purple-400/50 transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-4 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-colors">
                  <Presentation size={32} className="text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Project Presentation</h3>
                  <p className="text-gray-400">
                    Comprehensive slides covering theory, implementation, and demonstrations
                  </p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Format:</span>
                  <span className="text-white font-medium">PDF</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Slides:</span>
                  <span className="text-white font-medium">~30 slides</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-yellow-400 font-medium">📝 Coming Soon</span>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                disabled
              >
                <Download size={18} className="mr-2" />
                Download PPT (Coming Soon)
              </Button>
            </Card>
          </div>
        </div>

        {/* Hardware Gallery Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Camera className="text-cyan-400" size={32} />
            Hardware Gallery
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hardwareImages.map((image) => (
              <Card 
                key={image.id}
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700/50 p-4 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer"
                onClick={() => image.placeholder ? null : setSelectedImage(image.url)}
              >
                <div className="relative aspect-video mb-4 bg-gray-800 rounded-lg overflow-hidden group-hover:ring-2 ring-cyan-400 transition-all">
                  {image.placeholder ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <ImageIcon size={48} className="text-gray-600 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">Photo Coming Soon</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img 
                        src={image.url} 
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                        <ExternalLink size={24} className="text-white" />
                      </div>
                    </>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-1">{image.title}</h3>
                <p className="text-sm text-gray-400">{image.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Upload Instructions for Team */}
        <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/30 p-8">
          <div className="flex items-start gap-4">
            <Zap size={32} className="text-yellow-400 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3 text-yellow-400 flex items-center gap-2">
                <Upload size={24} />
                For Team Members
              </h3>
              <p className="text-gray-300 mb-4">
                To add the actual documents and hardware photos:
              </p>
              <div className="bg-black/30 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📄</span>
                  <div>
                    <p className="font-bold text-white mb-1">1. Add Project Report</p>
                    <code className="text-sm text-cyan-400">public/docs/report.pdf</code>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <p className="font-bold text-white mb-1">2. Add Presentation</p>
                    <code className="text-sm text-cyan-400">public/docs/presentation.pdf</code>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📸</span>
                  <div>
                    <p className="font-bold text-white mb-1">3. Add Hardware Photos</p>
                    <code className="text-sm text-cyan-400">public/images/hardware/</code>
                    <p className="text-sm text-gray-400 mt-1">Name files: setup.jpg, laser.jpg, filters.jpg, detector.jpg, electronics.jpg, team.jpg</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚙️</span>
                  <div>
                    <p className="font-bold text-white mb-1">4. Update Code</p>
                    <p className="text-sm text-gray-400">Change <code className="text-cyan-400">placeholder: true</code> to <code className="text-cyan-400">placeholder: false</code> in <code className="text-cyan-400">Documentation.tsx</code></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

      </div>

      <Footer />

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="Hardware" 
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Documentation;
