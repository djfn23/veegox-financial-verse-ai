
import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  textClassName?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "", textClassName = "" }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="h-8 w-8 relative">
        <div className="absolute top-0 left-0 w-4 h-8 rounded-l-full bg-veegox-purple rotate-[15deg] origin-bottom-right"></div>
        <div className="absolute top-0 right-0 w-4 h-8 rounded-r-full bg-veegox-blue -rotate-[15deg] origin-bottom-left"></div>
      </div>
      <span className={`font-bold text-2xl tracking-wide ${textClassName}`}>VEEGOX</span>
    </Link>
  );
};

export default Logo;
