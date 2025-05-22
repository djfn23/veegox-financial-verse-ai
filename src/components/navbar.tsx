import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Logo } from './logo';
import WalletConnect from './wallet-connect';
import NetworkSwitcher from "./network-switcher";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-veegox-dark-bg/90 backdrop-blur-md z-50 py-4 border-b border-veegox-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo et Navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
            
            {/* Navigation principale - visible sur desktop */}
            <nav className="hidden md:flex space-x-6">
              <Link to="/explore" className="text-gray-400 hover:text-white transition-colors">
                Explorer
              </Link>
              <Link to="/tokens" className="text-gray-400 hover:text-white transition-colors">
                Tokens
              </Link>
              <Link to="/lending" className="text-gray-400 hover:text-white transition-colors">
                Prêts
              </Link>
              <Link to="/savings" className="text-gray-400 hover:text-white transition-colors">
                Épargne
              </Link>
              <Link to="/ai-investing" className="text-gray-400 hover:text-white transition-colors">
                IA Investissement
              </Link>
              <Link to="/governance" className="text-gray-400 hover:text-white transition-colors">
                Gouvernance
              </Link>
              <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                Blog
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/testnet-config" className="hidden sm:inline-block">
              <Button variant="outline" size="sm" className="border-veegox-border text-gray-400 hover:bg-veegox-border/10">
                Testnet
              </Button>
            </Link>
            
            <NetworkSwitcher />
            
            <WalletConnect />
            
            {/* Menu mobile */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu mobile - en overlay */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-veegox-dark-bg z-40 p-4 md:hidden">
          <div className="flex justify-end">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex flex-col space-y-4 items-center mt-12">
            <Link to="/explore" className="text-gray-400 hover:text-white transition-colors text-lg" onClick={toggleMenu}>
              Explorer
            </Link>
            <Link to="/tokens" className="text-gray-400 hover:text-white transition-colors text-lg" onClick={toggleMenu}>
              Tokens
            </Link>
            <Link to="/lending" className="text-gray-400 hover:text-white transition-colors text-lg" onClick={toggleMenu}>
              Prêts
            </Link>
            <Link to="/savings" className="text-gray-400 hover:text-white transition-colors text-lg" onClick={toggleMenu}>
              Épargne
            </Link>
            <Link to="/ai-investing" className="text-gray-400 hover:text-white transition-colors text-lg" onClick={toggleMenu}>
              IA Investissement
            </Link>
            <Link to="/governance" className="text-gray-400 hover:text-white transition-colors text-lg" onClick={toggleMenu}>
              Gouvernance
            </Link>
            <Link to="/blog" className="text-gray-400 hover:text-white transition-colors text-lg" onClick={toggleMenu}>
              Blog
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-lg" onClick={toggleMenu}>
              Contact
            </Link>
            <Link to="/testnet-config" className="text-gray-400 hover:text-white transition-colors text-lg" onClick={toggleMenu}>
              Testnet
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
