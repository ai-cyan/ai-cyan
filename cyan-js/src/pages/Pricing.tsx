import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MouseFollower } from '../components/MouseFollower';
import { Navbar } from '../components/Navbar';

interface PricingTierProps {
  name: string;
  price: string;
  yearlyPrice?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  billingType: 'monthly' | 'yearly';
}

function PricingTier({ name, price, yearlyPrice, description, features, isPopular, billingType }: PricingTierProps) {
  const displayPrice = billingType === 'yearly' ? yearlyPrice || price : price;
  
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative p-12 rounded-3xl border backdrop-blur-sm ${
        isPopular 
          ? 'border-primary/50 bg-primary/[0.03] dark:bg-primary/[0.08]' 
          : 'border-gray-200/80 dark:border-gray-800/80 hover:border-gray-300 dark:hover:border-gray-700'
      }`}
    >
      {isPopular && (
        <motion.div 
          className="absolute -top-4 left-1/2 -translate-x-1/2"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary/90 text-white shadow-lg shadow-primary/20">
            Most Popular
          </span>
        </motion.div>
      )}

      <div className="mb-12 space-y-4">
        <h3 className="text-2xl font-bold tracking-tight">{name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
            {displayPrice}
          </span>
          {displayPrice !== 'Free' && displayPrice !== 'Custom' && (
            <span className="text-gray-500 dark:text-gray-400 text-lg">
              /{billingType === 'yearly' ? 'year' : 'month'}
            </span>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          {description}
        </p>
      </div>

      <ul className="space-y-5 mb-12">
        {features.map((feature, index) => (
          <motion.li 
            key={index} 
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 * index }}
          >
            <svg 
              className="w-5 h-5 text-primary/90 mt-1 flex-shrink-0" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
            <span className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              {feature}
            </span>
          </motion.li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-5 rounded-2xl text-lg font-medium transition-all ${
          isPopular 
            ? 'bg-primary text-white hover:shadow-lg hover:shadow-primary/20' 
            : 'border-2 border-gray-200/80 dark:border-gray-800/80 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-lg hover:shadow-gray-100/50 dark:hover:shadow-gray-900/50'
        }`}
      >
        Get Started
      </motion.button>
    </motion.div>
  );
}

export default function Pricing() {
  const [billingType, setBillingType] = useState<'monthly' | 'yearly'>('monthly');

  const pricingTiers = [
    {
      name: "Free",
      price: "Free",
      yearlyPrice: "Free",
      description: "Perfect for trying out Cyan's core features",
      features: [
        "Up to 5 job postings per month",
        "Basic AI candidate matching",
        "Standard email support",
        "Community forum access",
        "Basic analytics"
      ]
    },
    {
      name: "Pro",
      price: "$49",
      yearlyPrice: "$470", // 20% off yearly
      description: "Everything you need for growing companies",
      features: [
        "Unlimited job postings",
        "Advanced AI matching system",
        "Priority 24/7 support",
        "Advanced analytics dashboard",
        "Custom company branding",
        "Team collaboration tools"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      yearlyPrice: "Custom",
      description: "Advanced features for large organizations",
      features: [
        "All Pro features included",
        "Dedicated account manager",
        "Custom API integration",
        "Enterprise SLA",
        "Advanced security controls",
        "Custom workflow automation"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-text">
      <MouseFollower />
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-40 pb-24 text-center relative">
        <motion.h1 
          className="text-7xl font-bold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Simple, transparent pricing
        </motion.h1>
        <motion.p 
          className="text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Choose the perfect plan for your business
        </motion.p>

        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        </div>

        {/* Updated Billing Toggle */}
        <motion.div 
          className="mt-12 inline-flex items-center p-1.5 rounded-full border border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.button
            className={`relative px-8 py-2.5 rounded-full text-sm font-medium transition-all ${
              billingType === 'monthly' 
                ? 'text-gray-900 dark:text-white' 
                : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => setBillingType('monthly')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Monthly
            {billingType === 'monthly' && (
              <motion.div
                className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full shadow-sm -z-10"
                layoutId="billingSelector"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
          <motion.button
            className={`relative px-8 py-2.5 rounded-full text-sm font-medium transition-all ${
              billingType === 'yearly' 
                ? 'text-gray-900 dark:text-white' 
                : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => setBillingType('yearly')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Yearly
            <span className="ml-1.5 text-primary text-xs font-bold">SAVE 20%</span>
            {billingType === 'yearly' && (
              <motion.div
                className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full shadow-sm -z-10"
                layoutId="billingSelector"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        </motion.div>
      </div>

      {/* Pricing Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-32">
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {pricingTiers.map((tier, index) => (
            <PricingTier 
              key={index} 
              {...tier} 
              billingType={billingType}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
} 