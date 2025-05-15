import { Web3Provider } from '@/context/Web3Context';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from '@/components/ui/toaster';

// Pages
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import AdminWallets from '@/pages/AdminWallets';
import NotFound from '@/pages/NotFound';
import Explore from '@/pages/Explore';
import Tokens from '@/pages/Tokens';
import Savings from '@/pages/Savings';
import Lending from '@/pages/Lending';
import AIInvesting from '@/pages/AIInvesting';
import Governance from '@/pages/Governance';
import Blog from '@/pages/Blog';
import Contact from '@/pages/Contact';
import TestnetConfig from '@/pages/TestnetConfig';
import Whitepaper from '@/pages/Whitepaper';
import AdminSetup from '@/pages/AdminSetup';

function App() {
  return (
    <Web3Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tokens" element={<Tokens />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/lending" element={<Lending />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/ai-investing" element={<AIInvesting />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="/testnet-config" element={<TestnetConfig />} />
          <Route path="/admin/wallets" element={<AdminWallets />} />
          <Route path="/admin/setup" element={<AdminSetup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </Web3Provider>
  );
}

export default App;
