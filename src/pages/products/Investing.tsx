
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, LineChart, Shield, Zap, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Investing = () => {
  const strategies = [
    {
      name: "Conservative",
      risk: "Low",
      expectedReturn: "8-12%",
      description: "Stable, low-risk investments focusing on established assets",
      allocation: "70% Stablecoins, 20% ETH, 10% VEX"
    },
    {
      name: "Balanced",
      risk: "Medium",
      expectedReturn: "15-25%",
      description: "Balanced approach between stability and growth",
      allocation: "40% Stablecoins, 40% ETH/BTC, 20% DeFi"
    },
    {
      name: "Aggressive",
      risk: "High",
      expectedReturn: "25-50%",
      description: "High-growth potential with emerging DeFi protocols",
      allocation: "20% Stablecoins, 30% ETH, 50% DeFi/Alt"
    }
  ];

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze market trends and optimize your portfolio"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Risk Management",
      description: "Automated stop-losses and diversification to protect your investments"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Automated Rebalancing",
      description: "Your portfolio is automatically rebalanced to maintain optimal allocation"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Goal-Based Investing",
      description: "Set investment goals and let our AI work towards achieving them"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-veegox-dark-bg via-veegox-darker-bg to-veegox-dark-bg">
          <div className="max-w-7xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
              AI-Powered Investing
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Smart <span className="text-gradient">AI Investing</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Let artificial intelligence manage your crypto portfolio. Our advanced algorithms 
              analyze market data 24/7 to optimize your returns while managing risk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-veegox-gradient hover:opacity-90">
                Start AI Investing
              </Button>
              <Button size="lg" variant="outline" className="border-veegox-purple text-veegox-purple hover:bg-veegox-purple/10">
                View Performance
              </Button>
            </div>
          </div>
        </section>

        {/* Performance Stats */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-green-400">+34.7%</CardTitle>
                  <CardDescription>Average Annual Return</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-veegox-purple">$5.2M</CardTitle>
                  <CardDescription>Assets Under Management</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-veegox-purple">1,543</CardTitle>
                  <CardDescription>Active Investors</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-veegox-purple">98.7%</CardTitle>
                  <CardDescription>Uptime</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Investment Strategies */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-veegox-dark-bg">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">AI Investment Strategies</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Choose from three AI-managed strategies designed to match your risk tolerance and investment goals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {strategies.map((strategy, index) => (
                <Card key={index} className={`relative ${index === 1 ? 'border-veegox-purple' : ''}`}>
                  {index === 1 && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-veegox-purple">Recommended</Badge>
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl">{strategy.name}</CardTitle>
                      <Badge variant={strategy.risk === 'Low' ? 'default' : strategy.risk === 'Medium' ? 'secondary' : 'destructive'}>
                        {strategy.risk} Risk
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-green-400">{strategy.expectedReturn}</div>
                    <div className="text-sm text-gray-400">Expected Annual Return</div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription>{strategy.description}</CardDescription>
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Asset Allocation:</h4>
                      <p className="text-sm text-gray-300">{strategy.allocation}</p>
                    </div>
                    <Button className="w-full bg-veegox-gradient hover:opacity-90">
                      Select Strategy
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* AI Features */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">AI-Powered Features</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Our artificial intelligence works around the clock to optimize your portfolio and maximize returns.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-veegox-purple/20 flex items-center justify-center mx-auto mb-4 text-veegox-purple">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-veegox-dark-bg">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How AI Investing Works</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-veegox-purple flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                <h3 className="text-lg font-bold mb-2">Set Your Goals</h3>
                <p className="text-gray-300 text-sm">Define your investment goals and risk tolerance</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-veegox-purple flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                <h3 className="text-lg font-bold mb-2">AI Analysis</h3>
                <p className="text-gray-300 text-sm">Our AI analyzes market data and creates your strategy</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-veegox-purple flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                <h3 className="text-lg font-bold mb-2">Auto-Invest</h3>
                <p className="text-gray-300 text-sm">AI automatically executes trades and rebalances</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-veegox-purple flex items-center justify-center mx-auto mb-4 text-2xl font-bold">4</div>
                <h3 className="text-lg font-bold mb-2">Track & Optimize</h3>
                <p className="text-gray-300 text-sm">Monitor performance and AI continuously optimizes</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Let AI Manage Your Portfolio?</h2>
            <p className="text-gray-300 mb-8">
              Join thousands of investors who trust our AI to grow their wealth in the crypto markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-veegox-gradient hover:opacity-90" asChild>
                <Link to="/ai-investing">Start AI Investing</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-veegox-purple text-veegox-purple hover:bg-veegox-purple/10">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Investing;
