
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Lightbulb, Award, Globe, Shield } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security First",
      description: "We prioritize the security of our users' assets above all else, with regular audits and best practices."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Driven",
      description: "Our platform is governed by the community, ensuring decisions benefit all stakeholders."
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation",
      description: "We continuously push the boundaries of what's possible in decentralized finance."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Accessibility",
      description: "Making DeFi accessible to everyone, regardless of their technical background."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Co-founder & CEO",
      bio: "Former Goldman Sachs VP with 10+ years in traditional finance and 5 years in DeFi.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c"
    },
    {
      name: "Marcus Rodriguez",
      role: "Co-founder & CTO",
      bio: "Former Google engineer specialized in blockchain technology and smart contract development.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    },
    {
      name: "Elena Volkova",
      role: "Head of AI Research",
      bio: "PhD in Machine Learning from MIT, previously worked at OpenAI on financial AI systems.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956"
    },
    {
      name: "David Kim",
      role: "Head of Security",
      bio: "Former Coinbase security architect with expertise in smart contract auditing.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    }
  ];

  const milestones = [
    { year: "2022", event: "Veegox founded", description: "Started with a vision to democratize DeFi" },
    { year: "2022", event: "Seed funding", description: "$2M raised from top VCs" },
    { year: "2023", event: "MVP Launch", description: "First version of the platform goes live" },
    { year: "2023", event: "Security audit", description: "Comprehensive audit by Trail of Bits" },
    { year: "2024", event: "AI Integration", description: "Launch of AI-powered investment strategies" },
    { year: "2024", event: "DAO Governance", description: "Full transition to community governance" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-veegox-dark-bg via-veegox-darker-bg to-veegox-dark-bg">
          <div className="max-w-7xl mx-auto text-center">
            <Badge className="mb-4 bg-veegox-purple/20 text-veegox-purple border-veegox-purple/30">
              About Veegox
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Building the <span className="text-gradient">Future of Finance</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Veegox is a decentralized financial ecosystem that combines traditional DeFi services 
              with cutting-edge AI technology to create a more accessible, efficient, and intelligent 
              financial system for everyone.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-veegox-purple/20 flex items-center justify-center mb-4 text-veegox-purple">
                    <Target className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    To democratize access to sophisticated financial services by combining the 
                    transparency and efficiency of blockchain technology with the intelligence 
                    of artificial intelligence. We believe everyone deserves access to the same 
                    financial tools that were once exclusive to institutions.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-veegox-purple/20 flex items-center justify-center mb-4 text-veegox-purple">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    A world where financial services are accessible, transparent, and intelligent. 
                    Where users have complete control over their assets while benefiting from 
                    advanced AI that works tirelessly to optimize their financial outcomes and 
                    protect their interests.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-veegox-dark-bg">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                These core values guide every decision we make and every feature we build.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center h-full">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-lg bg-veegox-purple/20 flex items-center justify-center mx-auto mb-4 text-veegox-purple">
                      {value.icon}
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{value.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                We're a diverse team of experts from finance, technology, and blockchain, 
                united by our passion for building the future of finance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                      <img 
                        src={`${member.image}?w=96&h=96&fit=crop&crop=face`} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription className="text-veegox-purple font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">{member.bio}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-veegox-dark-bg">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                From inception to becoming a leading DeFi platform, here are the key milestones in our journey.
              </p>
            </div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-veegox-purple flex items-center justify-center text-white font-bold">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold">{milestone.event}</h3>
                    <p className="text-gray-300">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">By the Numbers</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-veegox-purple">$50M+</CardTitle>
                  <CardDescription>Total Value Locked</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-veegox-purple">25,000+</CardTitle>
                  <CardDescription>Active Users</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-veegox-purple">50+</CardTitle>
                  <CardDescription>Countries Served</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-veegox-purple">99.9%</CardTitle>
                  <CardDescription>Uptime</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
