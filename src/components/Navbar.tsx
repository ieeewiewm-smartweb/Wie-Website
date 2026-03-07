import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Menu, X, Home, Info, Calendar, Globe, UserPlus } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const navItems = [
    { label: "Home", href: "/", isExternal: false, isScroll: false, icon: Home },
    { label: "About", href: "#who-we-are", isExternal: false, isScroll: true, icon: Info },
    { label: "Events & Awards", href: "#activities", isExternal: false, isScroll: true, icon: Calendar },
    { label: "IEEE WIE", href: "https://wie.ieee.org/", isExternal: true, isScroll: false, icon: Globe },
    { label: "Join Us", href: "https://ieeesousb-19feb.vercel.app/", isExternal: true, isScroll: false, icon: UserPlus },
  ];
  
  const handleScrollClick = (event, href) => {
    event.preventDefault();
    setIsOpen(false);
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      setTimeout(() => {
        const navbarHeight = 80;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  };
  
  const renderNavItem = (item, index) => {
    const Icon = item.icon;
    return (
      <li key={index} className="border-b border-white/10 last:border-b-0">
        {item.isExternal ? (
          <a 
            href={item.href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-3 px-6 py-5 text-white hover:bg-white/10 hover:pl-8 transition-all duration-300 text-lg font-semibold tracking-wide group"
            onClick={() => setIsOpen(false)}
          >
            <Icon className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="flex-1">{item.label}</span>
            {item.label === "IEEE WIE" && <ExternalLink className="h-4 w-4 opacity-60" />}
          </a>
        ) : item.isScroll ? (
          <a 
            href={item.href} 
            className="flex items-center gap-3 px-6 py-5 text-white hover:bg-white/10 hover:pl-8 transition-all duration-300 text-lg font-semibold tracking-wide group"
            onClick={(e) => handleScrollClick(e, item.href)}
          >
            <Icon className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity" />
            <span>{item.label}</span>
          </a>
        ) : (
          <Link 
            to={item.href} 
            className="flex items-center gap-3 px-6 py-5 text-white hover:bg-white/10 hover:pl-8 transition-all duration-300 text-lg font-semibold tracking-wide group"
            onClick={() => setIsOpen(false)}
          >
            <Icon className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity" />
            <span>{item.label}</span>
          </Link>
        )}
      </li>
    );
  };
  
  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-purple-100" 
          : "bg-gradient-to-r from-purple-600/95 to-indigo-600/95 backdrop-blur-sm shadow-md"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16 md:h-20 w-full">
            <Link to="/" className="flex items-center flex-shrink-0">
              {scrolled ? (
                <img 
                  src="/wielogo.png" 
                  alt="IEEE WIE Logo" 
                  className="h-12 md:h-16 lg:h-20 w-auto transition-opacity duration-300"
                />
              ) : (
                <img 
                  src="http://ieee.socet.edu.in/wp-content/uploads/2025/03/WIE-LOGO-2.png" 
                  alt="IEEE WIE Logo" 
                  className="h-12 md:h-16 lg:h-20 w-auto transition-opacity duration-300"
                />
              )}
            </Link>
            
            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center gap-x-8 text-base font-semibold">
              {navItems.map((item, index) => (
                <li key={index}>
                  {item.isExternal ? (
                    <a 
                      href={item.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`relative flex items-center gap-1 group pb-1 transition-colors duration-300 ${
                        scrolled ? "text-purple-700 hover:text-purple-900" : "text-white hover:text-purple-100"
                      }`}
                    >
                      <span className="relative pb-1">
                        {item.label}
                        <span className={`absolute left-0 -bottom-1 w-0 h-[2px] group-hover:w-full transition-all duration-300 ease-out ${
                          scrolled ? "bg-gradient-to-r from-purple-600 to-indigo-600" : "bg-gradient-to-r from-purple-200 to-pink-200"
                        }`}></span>
                      </span>
                      {item.label === "IEEE WIE" && <ExternalLink className="h-3 w-3" />}
                    </a>
                  ) : item.isScroll ? (
                    <a 
                      href={item.href} 
                      className={`relative flex items-center group pb-1 transition-colors duration-300 ${
                        scrolled ? "text-purple-700 hover:text-purple-900" : "text-white hover:text-purple-100"
                      }`}
                      onClick={(e) => handleScrollClick(e, item.href)}
                    >
                      <span className="relative pb-1">
                        {item.label}
                        <span className={`absolute left-0 -bottom-1 w-0 h-[2px] group-hover:w-full transition-all duration-300 ease-out ${
                          scrolled ? "bg-gradient-to-r from-purple-600 to-indigo-600" : "bg-gradient-to-r from-purple-200 to-pink-200"
                        }`}></span>
                      </span>
                    </a>
                  ) : (
                    <Link 
                      to={item.href} 
                      className={`relative flex items-center group pb-1 transition-colors duration-300 ${
                        scrolled ? "text-purple-700 hover:text-purple-900" : "text-white hover:text-purple-100"
                      }`}
                    >
                      <span className="relative pb-1">
                        {item.label}
                        <span className={`absolute left-0 -bottom-1 w-0 h-[2px] group-hover:w-full transition-all duration-300 ease-out ${
                          scrolled ? "bg-gradient-to-r from-purple-600 to-indigo-600" : "bg-gradient-to-r from-purple-200 to-pink-200"
                        }`}></span>
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 transition-colors ${
                scrolled 
                  ? "text-purple-700 hover:bg-purple-100 focus:ring-purple-300" 
                  : "text-white hover:bg-purple-700 focus:ring-purple-300"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div 
        className={`fixed top-0 right-0 bottom-0 z-50 w-[320px] bg-gradient-to-b from-purple-700 via-purple-800 to-purple-900 shadow-2xl transform transition-all duration-300 ease-out lg:hidden overflow-hidden ${
          isOpen ? 'translate-x-0 scale-100' : 'translate-x-full scale-95'
        }`}
        style={{ touchAction: 'none' }}
      >
        {/* Animated Radial Glow */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full"></div>
        
        <div className="flex flex-col h-full relative z-10">
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white tracking-wide">Menu</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 focus:outline-none transition-all duration-300"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <ul className="flex flex-col text-white py-2">
              {navItems.map(renderNavItem)}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
