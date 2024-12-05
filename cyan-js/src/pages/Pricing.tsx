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
  billingType: 'monthly' | 'yearly';
}

function PricingTier({ name, price, yearlyPrice, description, features, billingType }: PricingTierProps) {
  const displayPrice = billingType === 'yearly' ? yearlyPrice || price : price;
  
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative p-10 rounded-3xl border backdrop-blur-sm h-[520px] flex flex-col
        border-gray-200/80 dark:border-gray-800/80 hover:border-gray-300 dark:hover:border-gray-700
        ${name === 'Pro' 
          ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[55%] after:-z-10 after:bg-[radial-gradient(ellipse_at_bottom,rgba(255,59,119,0.15),rgba(162,85,255,0.15)_20%,rgba(255,126,92,0.15)_40%,rgba(0,255,148,0.15)_60%,transparent_80%)] dark:after:opacity-40 before:absolute before:bottom-0 before:left-[-20%] before:right-[-20%] before:h-[55%] before:-z-20 before:blur-[80px] before:bg-[radial-gradient(ellipse_at_bottom,#FF3B77,#A255FF_20%,#FF7E5C_40%,#00FF94_60%,transparent_80%)] before:opacity-15' 
          : ''
        }
        overflow-hidden dark:bg-gray-900/30
      `}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold tracking-tight mb-3">{name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed min-h-[40px]">
          {description}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
            {displayPrice}
          </span>
          {displayPrice !== 'Free' && displayPrice !== 'Custom' && (
            <span className="text-gray-500 dark:text-gray-400 text-base">
              /{billingType === 'yearly' ? 'year' : 'month'}
            </span>
          )}
        </div>
      </div>

      <ul className="space-y-3.5 flex-grow">
        {features.map((feature, index) => (
          <motion.li 
            key={index} 
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <svg 
              className="w-[18px] h-[18px] text-primary/90 mt-1 flex-shrink-0" 
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
            <span className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed">
              {feature}
            </span>
          </motion.li>
        ))}
      </ul>

      <div className="mt-6">
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3.5 rounded-2xl text-[15px] font-medium transition-all
            bg-black text-white dark:bg-gradient-to-r dark:from-gray-100 dark:to-gray-200 dark:text-gray-900
            hover:shadow-lg hover:shadow-gray-950/10 dark:hover:shadow-gray-950/5
            backdrop-blur-sm
          `}
        >
          Get Started
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const [billingType, setBillingType] = useState<'monthly' | 'yearly'>('monthly');

  const pricingTiers = [
    {
      name: "Hobby",
      price: "Free",
      yearlyPrice: "Free",
      description: "Perfect for trying out Cyan's core features",
      features: [
        "Up to 5 job postings per month",
        "Basic AI talent matching",
        "Community access"
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
        "Priority support",
        "Custom branding"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      yearlyPrice: "Custom",
      description: "Advanced features for large organizations",
      features: [
        "All Pro features",
        "Account manager",
        "API access",
        "Custom SLA"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-text">
      <MouseFollower />
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section - Reduced spacing */}
        <div className="pt-32 pb-12 relative">
          <motion.h1 
            className="text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Pricing
          </motion.h1>
          <motion.p 
            className="text-2xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Choose the perfect plan for you
          </motion.p>

          {/* Background Gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          </div>
        </div>

        {/* Billing Toggle - Further reduced spacing */}
        <div className="flex justify-center mb-8">
          <motion.div 
            className="inline-flex items-center p-1 rounded-full border border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.button
              className={`relative px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
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
              className={`relative px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
                billingType === 'yearly' 
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              onClick={() => setBillingType('yearly')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center">
                Yearly
                <span className="ml-1 text-sm font-medium">
                  SAVE 20%
                </span>
              </span>
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
        <div className="pb-24">
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
    </div>
  );
} 