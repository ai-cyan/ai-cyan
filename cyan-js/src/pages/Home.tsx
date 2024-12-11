import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { MouseFollower } from '../components/MouseFollower';
import { Navbar } from '../components/Navbar';
import { mockJobs } from '../mocks/jobs';
import { formatDistanceToNow } from 'date-fns';
import { Job } from '../types/job';

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
        className="relative min-h-[60vh]"
        style={{ opacity, scale }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-[90rem] px-4 mx-auto pt-[16vh]"
        >
          <motion.h1 
            className="text-[clamp(2.5rem,10vw,6.5rem)] font-bold mb-4 gradient-text tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            The AI Remote Job Board
          </motion.h1>
          <motion.div 
            className="text-xl dark:text-gray-300 text-gray-600 mb-8 space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p>Cyan is the best way to find your next remote role,</p>
            <p>Built to redefine remote work possibilities.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <motion.button
              whileHover={{ 
                scale: 1.02,
                borderColor: "rgba(255, 255, 255, 0.9)",
              }}
              whileTap={{ scale: 0.98 }}
              className="relative px-8 py-3.5 rounded-xl text-lg font-medium bg-black text-white dark:bg-white dark:text-black border border-gray-400/30 dark:border-gray-600/30 hover:border-white/90 dark:hover:border-white/90 transition-colors backdrop-blur-sm"
            >
              <div className="flex items-center space-x-2">
                <span>☺︎</span>
                <span>FIND JOB</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ 
                scale: 1.02,
                borderColor: "rgba(255, 255, 255, 0.9)",
              }}
              whileTap={{ scale: 0.98 }}
              className="relative px-8 py-3.5 rounded-xl text-lg font-medium bg-white text-black dark:bg-black dark:text-white border border-gray-400/30 dark:border-gray-600/30 hover:border-white/90 dark:hover:border-white/90 transition-colors backdrop-blur-sm"
            >
              <div className="flex items-center space-x-2">
                <span>▶</span>
                <span>WATCH DEMO</span>
              </div>
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

      {/* Jobs Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Search and Filter Bar */}
          <motion.div 
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Left side - Search and Categories */}
            <div className="flex flex-wrap items-center gap-2">

                <motion.button
                className="px-4 py-2.5 relative font-medium text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                >
                <div className="flex items-center space-x-1">
                    <span></span>
                    <span>Best Jobs</span>
                </div>
                </motion.button>

              <motion.button
                className="px-4 py-2.5 relative font-medium text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-1">
                  <span></span>
                  <span>Categories</span>
                </div>
              </motion.button>

              <motion.button
                className="px-4 py-2.5 relative font-medium text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-1">
                  <span></span>
                  <span>Cyanstars</span>
                  <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium bg-primary/10 text-gray-400 rounded-full ml-1">
                    New
                  </span>
                </div>
              </motion.button>
            </div>

            {/* Right side - Sort options */}
            <div className="w-full sm:w-auto">
              <select className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm border-none outline-none">
                <option value="recent">Most Recent</option>
                <option value="relevant">Most Relevant</option>
                <option value="salary">Highest Salary</option>
              </select>
            </div>
          </motion.div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 gap-6">
            {mockJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// 复用 Jobs 页面的 JobCard 组件
function JobCard({ job }: { job: Job }) {
  const navigate = useNavigate();
  const formatSalary = (min: number, max: number, currency: string) => {
    const formatter = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1
    });
    return `💰${currency}${formatter.format(min)} - ${formatter.format(max)}`;
  };

  const techTags = job.tags.filter((tag: string) => !['fulltime', 'remote'].includes(tag));
  const salaryTag = job.tags.find((tag: string) => ['fulltime', 'remote'].includes(tag));

  return (
    <motion.div
      onClick={() => navigate(`/jobs/${job.id}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="p-6 border dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-700 transition-colors cursor-pointer relative group"
    >
      <div className="flex flex-col h-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold hover:text-primary transition-colors">
              {job.companyName}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {job.position}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-500 mt-2 sm:mt-0">
            <span>{job.applicants} applicants</span>
            <span>{job.saves} saves</span>
            <span>
              Updated {formatDistanceToNow(new Date(job.updatedAt))} ago
            </span>
          </div>
        </div>
        
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          {job.description}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center flex-wrap gap-2">
            {techTags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800"
              >
                {tag}
              </span>
            ))}
            
            {salaryTag && (
              <span className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800">
                {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
              </span>
            )}
          </div>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              // TODO: 处理申请逻辑
            }}
            className="opacity-0 group-hover:opacity-100 transition-all duration-200 ml-4 flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="inline-flex items-center px-6 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium shadow-md hover:shadow-lg transition-all">
              Apply
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
} 