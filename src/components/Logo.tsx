import React from 'react';

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ className = "", onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={`flex items-center space-x-2 cursor-pointer transition-transform hover:scale-105 ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <span className="text-2xl">🌲</span>
      <span className="text-xl font-bold text-primary">Pine Timer</span>
    </div>
  );
};

export default Logo;