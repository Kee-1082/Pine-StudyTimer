import React, { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  direction?: 'right' | 'left';
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, direction = 'right' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`transition-all duration-800 ease-out ${
        isVisible 
          ? 'opacity-100 translate-x-0' 
          : `opacity-0 ${direction === 'right' ? 'translate-x-full' : '-translate-x-full'}`
      }`}
    >
      {children}
    </div>
  );
};

export default PageTransition;