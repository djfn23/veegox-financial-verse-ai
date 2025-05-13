
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./logo";
import { Menu, X } from "lucide-react";
import WalletConnect from "./wallet-connect";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const navItems = [
    { name: "Explorer", href: "/explore" },
    { name: "Produits", href: "#", children: [
      { name: "Crédit", href: "/lending" },
      { name: "Épargne", href: "/savings" },
      { name: "Investissement IA", href: "/ai-investing" },
    ]},
    { name: "Tokens", href: "/tokens" },
    { name: "Gouvernance", href: "/governance" },
    { name: "Whitepaper", href: "/whitepaper" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-veegox-darker-bg/80 backdrop-blur-md border-b border-veegox-dark-bg/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <WalletConnect />
            <Link to="/dashboard">
              <Button
                variant="outline"
                className="border-veegox-purple/50 text-white"
              >
                Dashboard
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-veegox-purple/20 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-veegox-dark-bg">
            {navItems.map((item) => (
              item.children ? (
                <div key={item.name}>
                  <div className="px-3 py-2 text-base font-medium text-gray-300">
                    {item.name}
                  </div>
                  <div className="pl-4 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-veegox-purple/20 hover:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-veegox-purple/20 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
            <div className="pt-4 pb-3 space-y-2">
              <WalletConnect />
              <Link to="/dashboard" className="w-full block" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-veegox-purple/50 text-white"
                >
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
