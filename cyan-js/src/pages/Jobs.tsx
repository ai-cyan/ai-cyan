import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MouseFollower } from '../components/MouseFollower';
import { Navbar } from '../components/Navbar';
import { mockJobs } from '../mocks/jobs';
import { formatDistanceToNow } from 'date-fns';
import { Job } from '../types/job';

export default function Jobs() {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 30;
  const totalPages = Math.ceil(mockJobs.length / jobsPerPage);

  const getCurrentJobs = () => {
    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    return mockJobs.slice(startIndex, endIndex);
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <MouseFollower />
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8 pt-32">
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 mb-8">
          <div className="flex items-center">
            <motion.button
              className="px-4 py-2.5 relative font-medium text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-1">
                <span>🔥</span>
                <span>Best Jobs</span>
              </div>
            </motion.button>

            <motion.button
              className="px-4 py-2.5 relative font-medium text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-1">
                <span>🔍</span>
                <span>Categories</span>
              </div>
            </motion.button>

            <motion.button
              className="px-4 py-2.5 relative font-medium text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-1">
                <span>🌟</span>
                <span>Cyanstars</span>
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full ml-1">
                  New
                </span>
              </div>
            </motion.button>
          </div>

          {/* 右侧添加排序选项 */}
          <div className="flex items-center">
            <select className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm border-none outline-none">
              <option value="recent">Most Recent</option>
              <option value="relevant">Most Relevant</option>
              <option value="salary">Highest Salary</option>
            </select>
          </div>
        </div>

        {/* Jobs List with Animation */}
        <motion.div 
          className="space-y-4"
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {getCurrentJobs().map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </motion.div>

        {/* Pagination with Animation */}
        <motion.div 
          className="mt-8 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
            whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
          >
            &lt; Previous
          </motion.button>
          
          <motion.span 
            className="text-sm text-gray-600 dark:text-gray-400"
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            Page {currentPage} of {totalPages}
          </motion.span>
          
          <motion.button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
            whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
          >
            Next &gt;
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

function JobCard({ job }: { job: Job }) {
  const formatSalary = (min: number, max: number, currency: string) => {
    const formatter = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1
    });
    return `💰${currency}${formatter.format(min)} - ${formatter.format(max)}`;
  };

  // 将标签分组：技术标签和薪资标签
  const techTags = job.tags.filter(tag => !['fulltime', 'remote'].includes(tag));
  const salaryTag = job.tags.find(tag => ['fulltime', 'remote'].includes(tag));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 border dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-700 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold hover:text-primary transition-colors">
            {job.companyName}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {job.position}
          </p>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
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
      
      <div className="mt-4 flex items-center flex-wrap gap-2">
        {/* 先显示技术标签 */}
        {techTags.map(tag => (
          <span
            key={tag}
            className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800"
          >
            {tag}
          </span>
        ))}
        
        {/* 最后显示薪资标签 */}
        {salaryTag && (
          <span className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800">
            {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
          </span>
        )}
      </div>
    </motion.div>
  );
} 