
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PiggyBank, TrendingUp, Shield, Zap, Lock, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const Savings = () => {
  const savingsProducts = [
    {
      title: "sVEX Vault",
      apy: "8.5%",
      description: "Earn stable yields on our USD-pegged sVEX token",
      risk: "Low",
      minDeposit: "100 sVEX"
    },
    {
      title: "VEX Liquidity Pool",
      apy: "12.3%",
      description: "Provide liquidity and earn from trading fees",
      risk: "Medium",
      minDeposit: "50 VEX"
    },
    {
      title: "Multi-Asset Vault",
      apy: "15.7%",
      description: "Diversified yield farming across multiple protocols",
      risk: "High",
      minDeposit: "0.1 ETH"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-veegox-dark-bg via-veegox-darker-bg to-veegox-dark-bg">
          <div className="max-w-7xl mx-auto text-center">
            <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
              High-Yield Savings
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Earn More with <span className="text-gradient">Smart Savings</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Put your crypto to work with our high-yield savings products. 
              Earn competitive returns while maintaining liquidity and security.
            </p>
            <Button size="lg" className="bg-veegox-gradient hover:opacity-90">
              Start Earning Today
            </Button>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Choose Your Savings Strategy</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Different risk profiles for different goals. All products are audited and secured by smart contracts.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {savingsProducts.map((product, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4">
                    <Badge variant={product.risk === 'Low' ? 'default' : product.risk === 'Medium' ? 'secondary' : 'destructive'}>
                      {product.risk} Risk
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{product.title}</CardTitle>
                    <div className="text-3xl font-bold text-green-400">{product.apy} APY</div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription>{product.description}</CardDescription>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Min. Deposit:</span>
                        <span>{product.minDeposit}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-veegox-gradient hover:opacity-90">
                      Deposit Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-veegox-dark-bg">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Save with Veegox?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-veegox-purple/20 flex items-center justify-center mx-auto mb-4 text-veegox-purple">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <CardTitle>Competitive Yields</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Earn up to 15.7% APY with our optimized yield farming strategies
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-veegox-purple/20 flex items-center justify-center mx-auto mb-4 text-veegox-purple">
                    <Shield className="h-6 w-6" />
                  </div>
                  <CardTitle>Secure & Audited</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    All smart contracts are audited by leading security firms
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-veegox-purple/20 flex items-center justify-center mx-auto mb-4 text-veegox-purple">
                    <Zap className="h-6 w-6" />
                  </div>
                  <CardTitle>Instant Withdrawals</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Access your funds anytime with no lock-up periods on most products
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">Earnings Calculator</CardTitle>
                <CardDescription>
                  Estimate your potential earnings with our savings products
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Initial Deposit</label>
                    <input 
                      type="number" 
                      placeholder="1000" 
                      className="w-full p-3 rounded-lg bg-veegox-card-bg border border-gray-600 focus:border-veegox-purple outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Time Period</label>
                    <select className="w-full p-3 rounded-lg bg-veegox-card-bg border border-gray-600 focus:border-veegox-purple outline-none">
                      <option>1 Year</option>
                      <option>6 Months</option>
                      <option>3 Months</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Expected APY</label>
                    <select className="w-full p-3 rounded-lg bg-veegox-card-bg border border-gray-600 focus:border-veegox-purple outline-none">
                      <option>8.5% (sVEX Vault)</option>
                      <option>12.3% (VEX LP)</option>
                      <option>15.7% (Multi-Asset)</option>
                    </select>
                  </div>
                </div>
                
                <div className="text-center p-6 bg-veegox-dark-bg rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Estimated Earnings</div>
                  <div className="text-3xl font-bold text-green-400">$85.00</div>
                  <div className="text-sm text-gray-400">Total Value: $1,085.00</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Savings;
