import { Users, FileText, Presentation, Code, Cpu, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Team = () => {
  const teamMembers = [
    {
      name: "Raghav",
      role: "Documentation Lead",
      responsibility: "Creating extensive technical documentation and comprehensive project reports covering all aspects of the BB84 protocol, quantum mechanics principles, and simulation methodologies.",
      icon: FileText,
      color: "primary",
    },
    {
      name: "Vijay Nishal",
      role: "Documentation Lead",
      responsibility: "Developing detailed technical reports, research documentation, and in-depth analysis of quantum key distribution mechanisms and security protocols.",
      icon: FileText,
      color: "primary",
    },
    {
      name: "Sachin",
      role: "Presentation Specialist",
      responsibility: "Designing and delivering comprehensive PowerPoint presentations that effectively communicate the concepts, implementation, and significance of Quantum Key Distribution.",
      icon: Presentation,
      color: "accent",
    },
    {
      name: "Sudhir",
      role: "Presentation Specialist",
      responsibility: "Creating engaging presentation materials and visual aids to showcase the QKD protocol, its applications, and the project's innovative features to various audiences.",
      icon: Presentation,
      color: "accent",
    },
    {
      name: "Prodhosh",
      role: "Full-Stack Developer",
      responsibility: "Architecting and developing the interactive web application featuring 3D visualization of the BB84 protocol, real-time photon simulation, and comprehensive analytics dashboard.",
      icon: Code,
      color: "secondary",
    },
    {
      name: "Joshwa",
      role: "Hardware Engineer",
      responsibility: "Designing and constructing the physical working model demonstrating Quantum Key Distribution protocol using optical components, polarizers, and detection systems.",
      icon: Cpu,
      color: "success",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background stars - matching Home page */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-foreground/30 rounded-full animate-pulse-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        {/* Back Button */}
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        {/* Header Section */}
        <div className="max-w-6xl mx-auto text-center space-y-6 mb-16">
          {/* VIT Logo Space */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-card border-2 border-primary/30 rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground text-sm">VIT Logo</span>
            </div>
          </div>

          {/* Project Info Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary">
            <Users className="w-4 h-4" />
            <span>VIT Engineering Physics Project</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-quantum bg-clip-text text-transparent leading-tight">
            Meet Our Team
          </h1>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            This Quantum Key Distribution project is part of the{" "}
            <span className="text-primary font-semibold">
              VIT University Curriculum
            </span>{" "}
            for the Engineering Physics program. Our dedicated team has worked
            collaboratively across multiple domains to bring this innovative
            project to life.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => {
            const Icon = member.icon;
            const colorClasses = {
              primary: "bg-primary/10 border-primary/30 hover:border-primary/50 text-primary",
              accent: "bg-accent/10 border-accent/30 hover:border-accent/50 text-accent",
              secondary: "bg-secondary/10 border-secondary/30 hover:border-secondary/50 text-secondary",
              success: "bg-[hsl(var(--success))]/10 border-[hsl(var(--success))]/30 hover:border-[hsl(var(--success))]/50 text-[hsl(var(--success))]",
            };

            return (
              <div
                key={index}
                className={`p-6 bg-card border rounded-lg transition-all duration-300 hover:shadow-lg ${
                  colorClasses[member.color as keyof typeof colorClasses]
                }`}
              >
                {/* Image placeholder */}
                <div className="mb-6 flex justify-center">
                  <div className="w-32 h-32 bg-muted border-2 border-border rounded-full flex items-center justify-center overflow-hidden">
                    <span className="text-muted-foreground text-xs text-center px-2">
                      Photo
                    </span>
                  </div>
                </div>

                {/* Icon and Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    member.color === 'primary' ? 'bg-primary/10' :
                    member.color === 'accent' ? 'bg-accent/10' :
                    member.color === 'secondary' ? 'bg-secondary/10' :
                    'bg-[hsl(var(--success))]/10'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      member.color === 'primary' ? 'text-primary' :
                      member.color === 'accent' ? 'text-accent' :
                      member.color === 'secondary' ? 'text-secondary' :
                      'text-[hsl(var(--success))]'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {member.name}
                    </h3>
                    <p className={`text-sm font-medium ${
                      member.color === 'primary' ? 'text-primary' :
                      member.color === 'accent' ? 'text-accent' :
                      member.color === 'secondary' ? 'text-secondary' :
                      'text-[hsl(var(--success))]'
                    }`}>
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Responsibility */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.responsibility}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer Message */}
        <div className="mt-20 text-center max-w-4xl mx-auto">
          <div className="p-8 bg-card border border-border rounded-lg">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-quantum bg-clip-text text-transparent">
              Collaborative Excellence
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Through seamless collaboration across software development,
              hardware engineering, documentation, and presentation domains, our
              team has successfully created a comprehensive Quantum Key
              Distribution project that demonstrates both theoretical
              understanding and practical implementation of cutting-edge quantum
              cryptography concepts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
