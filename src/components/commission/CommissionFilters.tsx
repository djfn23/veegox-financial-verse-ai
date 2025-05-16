
import React, { useState } from "react";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

export interface CommissionFilters {
  startDate: Date | undefined;
  endDate: Date | undefined;
  tokenSymbols: string[];
  transactionTypes: string[];
}

interface CommissionFiltersProps {
  filters: CommissionFilters;
  onFiltersChange: (filters: CommissionFilters) => void;
  availableTokens: string[];
  availableTxTypes: string[];
  onReset: () => void;
}

const CommissionFilters: React.FC<CommissionFiltersProps> = ({
  filters,
  onFiltersChange,
  availableTokens,
  availableTxTypes,
  onReset
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const handleTokenToggle = (token: string) => {
    const newTokens = filters.tokenSymbols.includes(token)
      ? filters.tokenSymbols.filter(t => t !== token)
      : [...filters.tokenSymbols, token];
      
    onFiltersChange({...filters, tokenSymbols: newTokens});
  };
  
  const handleTxTypeToggle = (txType: string) => {
    const newTxTypes = filters.transactionTypes.includes(txType)
      ? filters.transactionTypes.filter(t => t !== txType)
      : [...filters.transactionTypes, txType];
      
    onFiltersChange({...filters, transactionTypes: newTxTypes});
  };
  
  const activeFiltersCount = [
    filters.startDate, 
    filters.endDate,
    ...(filters.tokenSymbols.length > 0 ? [1] : []),
    ...(filters.transactionTypes.length > 0 ? [1] : []),
  ].filter(Boolean).length;
  
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-6">
      <div className="flex gap-2 flex-wrap">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={cn(
                      "justify-start text-left",
                      filters.startDate && "text-primary"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.startDate ? format(filters.startDate, "dd/MM/yyyy") : "Date de début"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.startDate}
                    onSelect={(date) => onFiltersChange({...filters, startDate: date})}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </TooltipTrigger>
            <TooltipContent>
              <p>Filtrer à partir de cette date</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={cn(
                      "justify-start text-left",
                      filters.endDate && "text-primary"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.endDate ? format(filters.endDate, "dd/MM/yyyy") : "Date de fin"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.endDate}
                    onSelect={(date) => onFiltersChange({...filters, endDate: date})}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </TooltipTrigger>
            <TooltipContent>
              <p>Filtrer jusqu'à cette date</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline"
                    className={cn(
                      activeFiltersCount > 0 && "text-primary"
                    )}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filtres avancés
                    {activeFiltersCount > 0 && (
                      <span className="ml-2 rounded-full bg-primary text-primary-foreground w-5 h-5 text-xs flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel>Filtrer par token</DropdownMenuLabel>
                  {availableTokens.map(token => (
                    <DropdownMenuItem key={token} onSelect={e => e.preventDefault()}>
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id={`token-${token}`} 
                          checked={filters.tokenSymbols.includes(token)}
                          onCheckedChange={() => handleTokenToggle(token)}
                        />
                        <label 
                          htmlFor={`token-${token}`}
                          className="text-sm cursor-pointer flex-grow"
                          onClick={() => handleTokenToggle(token)}
                        >
                          {token}
                        </label>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuLabel>Filtrer par type de transaction</DropdownMenuLabel>
                  {availableTxTypes.map(txType => (
                    <DropdownMenuItem key={txType} onSelect={e => e.preventDefault()}>
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id={`txType-${txType}`} 
                          checked={filters.transactionTypes.includes(txType)}
                          onCheckedChange={() => handleTxTypeToggle(txType)}
                        />
                        <label 
                          htmlFor={`txType-${txType}`}
                          className="text-sm cursor-pointer flex-grow"
                          onClick={() => handleTxTypeToggle(txType)}
                        >
                          {txType}
                        </label>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>
              <p>Filtres avancés par token et type de transaction</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {activeFiltersCount > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" onClick={onReset} size="sm">
                Réinitialiser les filtres
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Effacer tous les filtres</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default CommissionFilters;
