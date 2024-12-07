import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50"
    >
      <div className="max-w-[90rem] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent"
          >
            Cyan
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Features
            </Link>
            <Link to="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Pricing
            </Link>
            <Link to="/jobs" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Jobs
            </Link>
            <Link to="/forum" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Forum
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link
              to="/signin"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border-gray-700 dark:border-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/post-job"
              className="px-4 py-2 text-sm font-medium bg-gray-800 dark:bg-white text-white dark:text-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-700 dark:hover:bg-gray-50 rounded-lg transition-colors shadow-sm"
            >
              POST A JOB
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
} 