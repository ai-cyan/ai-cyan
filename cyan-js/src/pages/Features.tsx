import React from 'react';
import { motion } from 'framer-motion';
import { MouseFollower } from '../components/MouseFollower';
import { Navbar } from '../components/Navbar';

interface FeatureProps {
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
  reversed?: boolean;
}

function Feature({ title, description, icon, imageUrl, reversed }: FeatureProps) {
  return (
    <motion.div 
      className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 py-32`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Text Content */}
      <div className="flex-1 space-y-8">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
          {icon}
        </div>
        <h2 className="text-5xl font-bold tracking-tight">{title}</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Image */}
      <div className="flex-1">
        <motion.div
          className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img 
            src={imageUrl}
            alt={title}
            className="w-full h-auto"
            loading="lazy"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const features = [
    {
      title: "AI-Powered Job Matching",
      description: "Our advanced AI algorithms analyze your skills, experience, and preferences to find the perfect remote opportunities that match your profile. Get personalized job recommendations and increase your chances of landing your dream role.",
      icon: "🤖",
      imageUrl: "https://placehold.co/800x600/2832FF/FFFFFF/png?text=AI+Matching"
    },
    {
      title: "Global Talent Network",
      description: "Connect with top companies and talents worldwide. Break geographical barriers and find the best opportunities regardless of location. Our platform brings together innovative companies and skilled professionals from every corner of the globe.",
      icon: "🌍",
      imageUrl: "https://placehold.co/800x600/9333EA/FFFFFF/png?text=Global+Network",
      reversed: true
    },
    {
      title: "Skill Verification",
      description: "Stand out with verified skills and certifications. Our comprehensive skill assessment system helps you showcase your expertise with credibility. Let your verified achievements speak for themselves and gain a competitive edge.",
      icon: "✨",
      imageUrl: "https://placehold.co/800x600/3B82F6/FFFFFF/png?text=Skill+Verification"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-text">
      <MouseFollower />
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-16 text-center relative">
        <motion.h1 
          className="text-6xl font-bold mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Features that empower
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Everything you need to find the perfect remote opportunity
        </motion.p>

        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4">
        {features.map((feature, index) => (
          <Feature key={index} {...feature} />
        ))}
      </div>
    </div>
  );
} 