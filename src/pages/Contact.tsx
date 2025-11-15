import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Mail, Github, Linkedin, Twitter, Send, User, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/ui/Footer';

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData for Google Form
      const googleFormData = new FormData();
      googleFormData.append('entry.1478158167', formData.name);
      googleFormData.append('entry.384186664', formData.email);
      googleFormData.append('entry.517333600', formData.subject);
      googleFormData.append('entry.1686267960', formData.message);

      // Submit to Google Form silently
      await fetch('https://docs.google.com/forms/d/e/1FAIpQLSfWe_62YoSAQjCDKMYF-zfHJtlcu2QSqsq6sT-d4FTLND3LnQ/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        body: googleFormData
      });

      // Show success message
      toast({
        title: "Connection Successful! ✅",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Connection Successful! ✅",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    {
      name: 'Gmail',
      icon: Mail,
      url: 'mailto:prodhosh3@gmail.com',
      color: 'hover:text-red-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/prodhoshvs',
      color: 'hover:text-blue-400'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/PRODHOSH',
      color: 'hover:text-purple-400'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://x.com/itzprodhosh',
      color: 'hover:text-cyan-400'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
      <div className="starfield" />
      
      <div className="relative z-10 flex-1 container mx-auto px-3 sm:px-4 py-6 sm:py-12 max-w-6xl w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 sm:mb-8 transition-colors text-sm sm:text-base">
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block mb-4 px-4 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full">
            <span className="text-blue-400 text-sm font-medium">📬 Get In Touch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 gradient-text">
            Contact Me
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* Left Column - Profile & Social Links */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700/50 p-6 sm:p-8">
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Profile Photo */}
                <img 
                  src={`${import.meta.env.BASE_URL}images/prodhosh_photo.jpg`}
                  alt="Prodhosh VS"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-blue-500/50 object-[center_30%]"
                />
                
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Prodhosh VS</h2>
                  <p className="text-gray-400 text-sm sm:text-base">Web Developer</p>
                  <p className="text-gray-400 text-sm sm:text-base">ML & AI Enthusiast</p>
                </div>

                <p className="text-gray-300 text-sm sm:text-base">
                  Passionate about web development, machine learning, artificial intelligence, and building innovative solutions.
                </p>
              </div>
            </Card>

            {/* Social Links Card */}
            <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700/50 p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-4 gradient-text">Connect With Me</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-4 bg-black/30 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all ${link.color}`}
                    >
                      <Icon size={24} />
                      <span className="font-medium text-sm">{link.name}</span>
                    </a>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Right Column - Contact Form */}
          <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700/50 p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 gradient-text">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  <User size={16} className="inline mr-2" />
                  Name
                </label>
                <Input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-black/30 border-gray-700 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  <Mail size={16} className="inline mr-2" />
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-black/30 border-gray-700 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  <MessageSquare size={16} className="inline mr-2" />
                  Subject
                </label>
                <Input
                  type="text"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="bg-black/30 border-gray-700 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  <MessageSquare size={16} className="inline mr-2" />
                  Message
                </label>
                <Textarea
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-black/30 border-gray-700 text-white min-h-[150px]"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-6 text-base"
              >
                {loading ? 'Sending...' : (
                  <>
                    <Send size={18} className="mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>

        {/* Quick Info Card */}
        <Card className="bg-blue-900/20 border-blue-500/30 p-6">
          <h3 className="text-lg font-bold mb-3 text-blue-400">Quick Response</h3>
          <p className="text-sm text-gray-300">
            💡 I typically respond within 24-48 hours. For urgent matters, feel free to reach out directly via email at{' '}
            <a href="mailto:prodhosshan@gmail.com" className="text-blue-400 hover:text-blue-300 underline">
              prodhosshan@gmail.com
            </a>
          </p>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
