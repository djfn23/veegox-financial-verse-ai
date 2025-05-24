
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, PiggyBank, Database, LineChart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Products = () => {
  const products = [
    {
      title: "Decentralized Lending",
      description: "Access crypto-backed loans with competitive rates and flexible terms, all managed by smart contracts.",
      features: ["Collateral-backed loans", "Competitive rates", "Flexible terms", "On-chain credit scoring"],
      icon: <Coins className="h-8 w-8" />,
      link: "/products/lending",
      badge: "DeFi Core",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "High-Yield Savings",
      description: "Earn interest on your crypto assets with our stable sVEX token and liquidity provision programs.",
      features: ["Up to 15.7% APY", "Stable yields", "Instant withdrawals", "Multiple strategies"],
      icon: <PiggyBank className="h-8 w-8" />,
      link: "/products/savings",
      badge: "Popular",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Token Staking",
      description: "Lock your VEX tokens to earn rewards and gain governance rights within the Veegox ecosystem.",
      features: ["Up to 18% APR", "Governance rights", "gVEX rewards", "Multiple tiers"],
      icon: <Database className="h-8 w-8" />,
      link: "/products/staking",
      badge: "Governance",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "AI Investing",
      description: "Let our AI algorithms automatically manage your portfolio with strategies tailored to your risk profile.",
      features: ["AI-powered", "24/7 optimization", "Risk management", "Goal-based investing"],
      icon: <LineChart className="h-8 w-8" />,
      link: "/products/investing",
      badge: "AI-Powered",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const integrations = [
    { name: "Ethereum", logo: "🔷" },
    { name: "Polygon", logo: "🔮" },
    { name: "Arbitrum", logo: "🌀" },
    { name: "Optimism", logo: "🔴" },
    { name: "Chainlink", logo: "🔗" },
    { name: "Uniswap", logo: "🦄" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-veegox-dark-bg via-veegox-darker-bg to-veegox-dark-bg">
          <div className="max-w-7xl mx-auto text-center">
            <Badge className="mb-4 bg-veegox-purple/20 text-veegox-purple border-veegox-purple/30">
              Product Suite
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Complete <span className="text-gradient">DeFi Ecosystem</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Explore our comprehensive suite of decentralized financial products, 
              designed to maximize your returns while minimizing complexity.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {products.map((product, index) => (
                <Card key={index} className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${product.gradient}`} />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary">{product.badge}</Badge>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-start space-x-4">
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${product.gradient} flex items-center justify-center text-white`}>
                        {product.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">{product.title}</CardTitle>
                        <CardDescription className="text-base">{product.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {product.features.map((feature, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-center">
                            <div className="w-2 h-2 bg-veegox-purple rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button className="w-full bg-veegox-gradient hover:opacity-90 group" asChild>
                      <Link to={product.link}>
                        Explore {product.title}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-veegox-dark-bg">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose Veegox Products?</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Our products are built with security, transparency, and user experience at their core.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-xl">🔒 Security First</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    All smart contracts are audited by leading security firms and regularly tested
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-xl">🚀 High Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Optimized for low fees and fast transactions across multiple blockchain networks
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-xl">🎯 User-Centric</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Intuitive interfaces designed for both beginners and advanced DeFi users
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Integrated Protocols</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Built on top of the most trusted and established protocols in DeFi.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {integrations.map((integration, index) => (
                <Card key={index} className="text-center p-6 hover:scale-105 transition-transform">
                  <div className="text-4xl mb-2">{integration.logo}</div>
                  <div className="font-semibold">{integration.name}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-veegox-dark-bg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your DeFi Journey?</h2>
            <p className="text-gray-300 mb-8">
              Choose the products that match your financial goals and start earning today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-veegox-gradient hover:opacity-90" asChild>
                <Link to="/dashboard">Access Dashboard</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-veegox-purple text-veegox-purple hover:bg-veegox-purple/10" asChild>
                <Link to="/contact">Get Support</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
