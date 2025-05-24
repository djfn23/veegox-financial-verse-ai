
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Lock, Vote, Trophy, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Staking = () => {
  const stakingTiers = [
    {
      name: "Starter",
      minStake: "100 VEX",
      apr: "8%",
      lockPeriod: "30 days",
      benefits: ["Basic rewards", "Community access"]
    },
    {
      name: "Advanced",
      minStake: "1,000 VEX",
      apr: "12%",
      lockPeriod: "90 days",
      benefits: ["Enhanced rewards", "Governance rights", "Early access"]
    },
    {
      name: "Elite",
      minStake: "10,000 VEX",
      apr: "18%",
      lockPeriod: "365 days",
      benefits: ["Maximum rewards", "Full voting power", "VIP benefits", "gVEX tokens"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-veegox-dark-bg via-veegox-darker-bg to-veegox-dark-bg">
          <div className="max-w-7xl mx-auto text-center">
            <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">
              Token Staking
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Stake & <span className="text-gradient">Govern</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Lock your VEX tokens to earn rewards and gain governance rights. 
              The longer you stake, the more you earn and the stronger your voice becomes.
            </p>
            <Button size="lg" className="bg-veegox-gradient hover:opacity-90">
              Start Staking
            </Button>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-veegox-purple">$1.8M</CardTitle>
                  <CardDescription>Total Staked</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-veegox-purple">892</CardTitle>
                  <CardDescription>Active Stakers</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-veegox-purple">12.5%</CardTitle>
                  <CardDescription>Average APR</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-veegox-purple">45%</CardTitle>
                  <CardDescription>Supply Staked</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Staking Tiers */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-veegox-dark-bg">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Choose Your Staking Tier</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Different tiers offer different rewards and governance power. 
                Higher stakes unlock exclusive benefits and stronger voting rights.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stakingTiers.map((tier, index) => (
                <Card key={index} className={`relative ${index === 1 ? 'border-veegox-purple' : ''}`}>
                  {index === 1 && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-veegox-purple">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <div className="text-3xl font-bold text-veegox-purple mb-2">{tier.apr} APR</div>
                    <div className="text-sm text-gray-400">Min. Stake: {tier.minStake}</div>
                    <div className="text-sm text-gray-400">Lock Period: {tier.lockPeriod}</div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Benefits:</h4>
                      <ul className="space-y-1">
                        {tier.benefits.map((benefit, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-center">
                            <div className="w-2 h-2 bg-veegox-purple rounded-full mr-2"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full bg-veegox-gradient hover:opacity-90">
                      Stake {tier.minStake}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How Staking Works */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How Staking Works</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-veegox-purple flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold mb-2">Lock VEX</h3>
                <p className="text-gray-300 text-sm">Choose your amount and lock period</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-veegox-purple flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold mb-2">Earn Rewards</h3>
                <p className="text-gray-300 text-sm">Receive daily staking rewards</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-veegox-purple flex items-center justify-center mx-auto mb-4">
                  <Vote className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold mb-2">Get gVEX</h3>
                <p className="text-gray-300 text-sm">Receive governance tokens</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-veegox-purple flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold mb-2">Vote & Govern</h3>
                <p className="text-gray-300 text-sm">Shape the future of Veegox</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-veegox-dark-bg">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Staking Benefits</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4 text-green-400">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <CardTitle>Passive Income</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Earn up to 18% APR on your staked VEX tokens with daily reward distributions
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
                    <Vote className="h-6 w-6" />
                  </div>
                  <CardTitle>Governance Power</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Participate in protocol governance and shape the future of the Veegox ecosystem
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
                    <Database className="h-6 w-6" />
                  </div>
                  <CardTitle>Exclusive Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Get early access to new features, products, and exclusive community events
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Staking;
