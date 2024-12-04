import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-colors duration-200 ${
        isScrolled ? 'dark:bg-black/80 bg-white/80 backdrop-blur-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          whileHover={{ scale: 1.05 }}
        >
          Cyan
        </motion.div>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#jobs">Jobs</NavLink>
          <NavLink href="#about">About</NavLink>
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-gray-800/20 dark:hover:bg-gray-700/50"
          >
            {theme === 'dark' ? (
              <motion.svg 
                className="w-5 h-5" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                animate={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </motion.svg>
            ) : (
              <motion.svg 
                className="w-5 h-5" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                animate={{ rotate: -180 }}
                transition={{ duration: 0.3 }}
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </motion.svg>
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,102,255,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium"
          >
            Sign In
          </motion.button>
        </div>

        <button className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      className="dark:text-gray-300 text-gray-600 hover:text-text transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
} 