
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Web3Provider } from "./context/Web3Context";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Whitepaper from "./pages/Whitepaper";
import Explore from "./pages/Explore";
import Lending from "./pages/Lending";
import Savings from "./pages/Savings";
import Governance from "./pages/Governance";
import AIInvesting from "./pages/AIInvesting";
import Dashboard from "./pages/Dashboard";
import Tokens from "./pages/Tokens";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import TestnetConfig from "./pages/TestnetConfig";

// Add CSS for marquee animation
import "./App.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Web3Provider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/lending" element={<Lending />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/ai-investing" element={<AIInvesting />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tokens" element={<Tokens />} />
            <Route path="/whitepaper" element={<Whitepaper />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testnet-config" element={<TestnetConfig />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Web3Provider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
