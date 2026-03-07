import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
      <div className="flex flex-col items-center">
        <div className={`animate-pulse-scale ${logoLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
          <img
            src="/logo.png"
            alt="Silver Oak University IEEE WIE Logo"
            className="w-48 h-48 md:w-64 md:h-64 object-contain"
            style={{ background: 'transparent' }}
            onLoad={() => setLogoLoaded(true)}
          />
        </div>
        <div className="mt-8 w-20 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;