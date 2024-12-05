import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { MouseFollower } from '../components/MouseFollower';
import { Navbar } from '../components/Navbar';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.97]);

  return (
    <div className="min-h-screen bg-background text-text">
      <MouseFollower />
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        className="relative h-screen flex items-center justify-center"
        style={{ opacity, scale }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl px-4"
        >
          <motion.h1 
            className="text-7xl font-bold mb-6 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            The World's Cleanest Remote Platform
          </motion.h1>
          <motion.p 
            className="text-xl dark:text-gray-300 text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Connect with global talents and opportunities
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 30px rgba(200,200,200,0.2)" 
              }}
              whileTap={{ scale: 0.95 }}
              className="theme-button px-8 py-4 rounded-full text-lg font-medium"
            >
              Get Started
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Background Animation */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent dark:to-background-dark to-white" />
          <motion.div 
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at center, rgba(60,70,255,0.1) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <FeatureCard 
              title="Global Opportunities"
              description="Access remote jobs from companies worldwide"
              icon="🌍"
            />
            <FeatureCard 
              title="Smart Matching"
              description="AI-powered job matching for better results"
              icon="🤖"
            />
            <FeatureCard 
              title="Seamless Experience"
              description="Simple and efficient application process"
              icon="✨"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className="p-8 rounded-xl border dark:border-gray-800 border-gray-200 dark:bg-gray-900/50 bg-gray-50/50 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="dark:text-gray-400 text-gray-600">{description}</p>
    </motion.div>
  );
} 