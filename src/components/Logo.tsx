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
      <img 
        src="/lovable-uploads/a80d0085-705e-42dc-9916-caddbb880246.png" 
        alt="Pine Study Timer" 
        className="w-8 h-8 object-contain"
      />
      <span className="text-xl font-bold text-primary">Pine</span>
    </div>
  );
};

export default Logo;