import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { MouseFollower } from '../components/MouseFollower';
import { Navbar } from '../components/Navbar';
import { User } from '../types/user';

// Mock 用户数据
const mockUsers: Record<string, User> = {
  peiqing: {
    username: 'peiqing',
    name: 'Peiqing Ye',
    email: 'peiqing6888@gmail.com',
    avatar: 'https://placehold.co/400x400/3C46FF/FFFFFF/png?text=PQ',
    bio: '',
    location: 'Germany',
    company: '',
    website: '',
    loginCount: 286,
    followers: 3,
    following: 1,
    achievements: [],
    skills: [],
    plan: {
      type: 'free',
      trialDays: 4
    },
    quota: {
      postJob: {
        used: 4,
        limit: 5
      },
      findJob: {
        used: 3,
        limit: null
      }
    }
  },
  johndoe: {
    username: 'johndoe',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://placehold.co/400x400/3C46FF/FFFFFF/png?text=JD',
    bio: 'Senior Frontend Developer | React Expert',
    location: 'San Francisco, CA',
    company: 'TechCorp',
    website: 'https://johndoe.dev',
    loginCount: 156,
    followers: 245,
    following: 123,
    achievements: ['🌟', '💫', '🔥'],
    skills: ['React', 'TypeScript', 'Node.js'],
    plan: {
      type: 'pro'
    },
    quota: {
      postJob: {
        used: 12,
        limit: 20
      },
      findJob: {
        used: 8,
        limit: null
      }
    }
  },
  janedoe: {
    username: 'janedoe',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    avatar: 'https://placehold.co/400x400/3C46FF/FFFFFF/png?text=JD',
    bio: 'Full Stack Developer | Open Source Contributor',
    location: 'London, UK',
    company: 'DevStudio',
    website: 'https://janedoe.tech',
    loginCount: 208,
    followers: 178,
    following: 89,
    achievements: ['⭐️', '🚀', '💎'],
    skills: ['Python', 'Django', 'AWS'],
    plan: {
      type: 'business'
    },
    quota: {
      postJob: {
        used: 45,
        limit: 100
      },
      findJob: {
        used: 15,
        limit: null
      }
    }
  }
};

export default function Profile() {
  const { username } = useParams();
  // 根据 URL 参数获取对应用户数据，如果没有则使用默认用户
  const currentUser = username ? mockUsers[username] || mockUsers.peiqing : mockUsers.peiqing;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <MouseFollower />
      <Navbar />

      <div className="max-w-[90rem] mx-auto px-4">
        {/* 标题部分 */}
        <div className="pt-24 mb-12">
          <motion.h1 
            className="text-6xl font-bold mb-4 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Settings
          </motion.h1>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            You can manage your account, billing, and team settings here.
          </motion.p>
        </div>

        {/* 卡片网格布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-6">
          {/* 左侧栏 */}
          <div className="space-y-6">
            {/* Basic Information Card */}
            <motion.div 
              className="p-6 bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Basic Information</h2>
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    value={currentUser.name}
                    readOnly
                    className="w-full bg-transparent border-0 border-b border-gray-200 dark:border-gray-800 pb-2 focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={currentUser.email}
                    readOnly
                    className="w-full bg-transparent border-0 border-b border-gray-200 dark:border-gray-800 pb-2 focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 transition-colors text-gray-500 dark:text-gray-400"
                  />
                </div>
              </div>
            </motion.div>

            {/* Account Card */}
            <motion.div 
              className="p-6 bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <h2 className="text-2xl font-semibold">Account</h2>
                <span className="text-sm text-gray-500">Pro Trial</span>
                <span className="text-sm text-gray-500">4 days remaining</span>
              </div>
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                  UPGRADE TO PRO
                </button>
                <button className="px-4 py-2 bg-transparent text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                  UPGRADE TO BUSINESS
                </button>
              </div>
              <button className="mt-6 text-sm text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors flex items-center">
                Advanced
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </motion.div>
          </div>

          {/* 右侧 - Usage 卡片 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-6 bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Usage</h2>
              <div className="space-y-8">
                {/* Post Job */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center justify-between flex-1 mr-4">
                      <span className="text-sm">Post Job</span>
                      <span className="text-sm">
                        {currentUser.quota.postJob.used} / {currentUser.quota.postJob.limit}
                      </span>
                    </div>
                    <button className="px-3 py-1 text-xs bg-transparent border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 rounded-md hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                      Manage
                    </button>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-500 rounded-full" 
                      style={{ 
                        width: `${(currentUser.quota.postJob.used / currentUser.quota.postJob.limit) * 100}%` 
                      }} 
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    You've used {currentUser.quota.postJob.used} posts out of your {currentUser.quota.postJob.limit} job posts quota.
                    {currentUser.plan.type === 'free' && (
                      <span className="ml-1">Upgrade to Pro for more posts.</span>
                    )}
                  </p>
                </div>

                {/* Find Job */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center justify-between flex-1 mr-4">
                      <span className="text-sm">Find Job</span>
                      <span className="text-sm">3 / No Limit</span>
                    </div>
                    <button className="px-3 py-1 text-xs bg-transparent border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 rounded-md hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                      Manage
                    </button>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '30%' }} />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    You've used 3 applications. You have no monthly quota.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 