
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, Shield, TrendingUp, Clock, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const Lending = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Collateral-backed Loans",
      description: "Secure your loans with ETH, VEX, or major stablecoins as collateral"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Competitive Rates",
      description: "Dynamic interest rates based on market conditions and risk assessment"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Flexible Terms",
      description: "Choose loan durations from 30 days to 2 years"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "On-chain Credit Scoring",
      description: "Advanced algorithms analyze your wallet history for better rates"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-veegox-dark-bg via-veegox-darker-bg to-veegox-dark-bg">
          <div className="max-w-7xl mx-auto text-center">
            <Badge className="mb-4 bg-veegox-purple/20 text-veegox-purple border-veegox-purple/30">
              DeFi Lending
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Decentralized <span className="text-gradient">Lending</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Access instant liquidity with crypto-backed loans. No credit checks, 
              no lengthy approvals - just secure, transparent lending powered by smart contracts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-veegox-gradient hover:opacity-90">
                Start Borrowing
              </Button>
              <Button size="lg" variant="outline" className="border-veegox-purple text-veegox-purple hover:bg-veegox-purple/10">
                Become a Lender
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-veegox-purple">$2.5M+</CardTitle>
                  <CardDescription>Total Value Locked</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-veegox-purple">4.2%</CardTitle>
                  <CardDescription>Average Interest Rate</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-veegox-purple">1,247</CardTitle>
                  <CardDescription>Active Loans</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-veegox-dark-bg">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose Veegox Lending?</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Our lending protocol combines the best of DeFi with advanced risk management 
                and user-friendly interfaces.
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

        {/* How it Works */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-veegox-purple flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                <h3 className="text-xl font-bold mb-2">Deposit Collateral</h3>
                <p className="text-gray-300">Secure your loan with supported crypto assets</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-veegox-purple flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                <h3 className="text-xl font-bold mb-2">Get Approved</h3>
                <p className="text-gray-300">Our on-chain scoring system evaluates your loan instantly</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-veegox-purple flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                <h3 className="text-xl font-bold mb-2">Receive Funds</h3>
                <p className="text-gray-300">Get your loan in stablecoins or VEX tokens</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-veegox-dark-bg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Your Loan?</h2>
            <p className="text-gray-300 mb-8">
              Join thousands of users who trust Veegox for their lending needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-veegox-gradient hover:opacity-90" asChild>
                <Link to="/dashboard">Access Dashboard</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-veegox-purple text-veegox-purple hover:bg-veegox-purple/10">
                View Documentation
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Lending;
