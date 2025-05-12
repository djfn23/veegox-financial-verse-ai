
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const WhitepaperHero: React.FC = () => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Lien copié",
      description: "Le lien du whitepaper a été copié dans le presse-papier",
    });
  };

  return (
    <div className="bg-veegox-dark-bg py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Whitepaper Veegox</h1>
          <p className="text-xl text-gray-400">
            Écosystème Financier Décentralisé Multi-token avec IA
          </p>
        </div>
        
        <div className="flex justify-center space-x-4 mb-8">
          <Button variant="outline" onClick={copyToClipboard} className="flex items-center gap-2">
            <Copy className="h-4 w-4" />
            Copier le lien
          </Button>
          <Button className="bg-veegox-gradient flex items-center gap-2">
            <Download className="h-4 w-4" />
            Télécharger le PDF
          </Button>
        </div>
        
        <div className="flex justify-center">
          <ArrowDown className="h-6 w-6 text-veegox-purple animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default WhitepaperHero;
