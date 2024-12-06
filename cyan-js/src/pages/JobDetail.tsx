import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MouseFollower } from '../components/MouseFollower';
import { Navbar } from '../components/Navbar';
import { mockJobs } from '../mocks/jobs';
import { formatDistanceToNow } from 'date-fns';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = mockJobs.find(j => j.id === id);

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="min-h-screen bg-background text-text">
      <MouseFollower />
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden"
        >
          {/* Header with improved animation */}
          <motion.div 
            className="p-8 border-b dark:border-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">{job.position}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
                  {job.companyName}
                </p>
              </div>
              <motion.button
                onClick={() => navigate('/jobs')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
              >
                Back to Jobs
              </motion.button>
            </div>
          </motion.div>

          {/* Content with staggered animation */}
          <motion.div 
            className="p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="grid grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="col-span-2 space-y-6">
                <motion.section
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {job.description}
                  </p>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.section>
              </div>

              {/* Sidebar with hover effects */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div 
                  className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="font-semibold mb-4">Job Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Location</p>
                      <p className="font-medium">{job.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Salary</p>
                      <p className="font-medium">
                        {job.salary.currency}{job.salary.min.toLocaleString()} - {job.salary.currency}{job.salary.max.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Posted</p>
                      <p className="font-medium">
                        {formatDistanceToNow(new Date(job.updatedAt))} ago
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium relative overflow-hidden group"
                >
                  <span className="relative z-10">Apply Now</span>
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 