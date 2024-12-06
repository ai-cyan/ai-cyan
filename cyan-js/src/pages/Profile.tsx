import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { MouseFollower } from '../components/MouseFollower';
import { Navbar } from '../components/Navbar';
import { mockJobs } from '../mocks/jobs';
import { formatDistanceToNow } from 'date-fns';
import { User } from '../types/user';

// Mock user data
const mockUser: User = {
  username: 'johndoe',
  name: 'John Doe',
  avatar: 'https://placehold.co/400x400/3C46FF/FFFFFF/png?text=JD',
  bio: 'Senior Frontend Developer | React Expert | Open Source Enthusiast',
  location: 'San Francisco, CA',
  company: 'TechCorp',
  website: 'https://johndoe.dev',
  loginCount: 286,
  followers: 222,
  following: 0,
  achievements: ['🌟', '💫', '🔥', '⭐️'],
  skills: ['React', 'TypeScript', 'Node.js', 'GraphQL']
};

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const recentApplications = mockJobs.slice(0, 6);

  // 编辑表单
  const EditForm = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          defaultValue={mockUser.name}
          className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg bg-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Bio</label>
        <textarea
          defaultValue={mockUser.bio}
          rows={3}
          className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg bg-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Company</label>
        <input
          type="text"
          defaultValue={mockUser.company}
          className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg bg-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <input
          type="text"
          defaultValue={mockUser.location}
          className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg bg-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Website</label>
        <input
          type="url"
          defaultValue={mockUser.website}
          className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg bg-transparent"
        />
      </div>
      <div className="flex space-x-3 pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsEditing(false)}
          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium"
        >
          Save
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsEditing(false)}
          className="px-4 py-2 rounded-lg border dark:border-gray-700"
        >
          Cancel
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background text-text">
      <MouseFollower />
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8 pt-32">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - User Info */}
          <div className="md:w-1/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Avatar */}
              <img 
                src={mockUser.avatar} 
                alt={mockUser.name}
                className="w-64 h-64 rounded-full"
              />

              {/* Name and Bio */}
              <div>
                <h1 className="text-3xl font-bold">{mockUser.name}</h1>
                <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-4">{mockUser.username}</h2>
                
                {/* Edit Profile Button */}
                {!isEditing && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 w-full rounded-lg border dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
                  >
                    Edit profile
                  </motion.button>
                )}
                
                {isEditing ? (
                  <EditForm />
                ) : (
                  <>
                    <p className="text-gray-600 dark:text-gray-400">{mockUser.bio}</p>
                    {/* Rest of the profile content */}
                    <div className="space-y-2 text-gray-600 dark:text-gray-400 mt-4">
                      <p className="flex items-center">
                        <span className="mr-2">🏢</span>
                        {mockUser.company}
                      </p>
                      <p className="flex items-center">
                        <span className="mr-2">📍</span>
                        {mockUser.location}
                      </p>
                      <p className="flex items-center">
                        <span className="mr-2">🌐</span>
                        <a href={mockUser.website} className="dark:text-gray-400 hover:underline">
                          {mockUser.website}
                        </a>
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-4">
                <span>
                  <strong>{mockUser.followers}</strong>
                  <span className="text-gray-600 dark:text-gray-400"> followers</span>
                </span>
                <span>·</span>
                <span>
                  <strong>{mockUser.following}</strong>
                  <span className="text-gray-600 dark:text-gray-400"> following</span>
                </span>
              </div>

              {!isEditing && (
                <>
                  {/* Achievements */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Achievements</h3>
                    <div className="flex flex-wrap gap-2">
                      {mockUser.achievements.map((achievement, index) => (
                        <span key={index} className="text-2xl">{achievement}</span>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {mockUser.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* Right Column - Activity & Applications */}
          <div className="md:w-2/3">
            {/* Activity Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold mb-4">Activity Overview</h2>
              <div className="border dark:border-gray-800 rounded-lg p-4">
                <h3 className="text-lg mb-2">
                  {mockUser.loginCount} logins in the last year
                </h3>
                {/* Mock activity graph - you can replace this with a real graph component */}
                <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
              </div>
            </motion.div>

            {/* Recent Applications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold mb-4">Recent Applications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentApplications.map((job) => (
                  <motion.div
                    key={job.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 border dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-700 cursor-pointer"
                    onClick={() => navigate(`/jobs/${job.id}`)}
                  >
                    <h3 className="font-semibold">{job.position}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {job.companyName}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="dark:text-gray-400">
                        {job.salary.currency}{job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                      </span>
                      <span className="text-gray-500">
                        Applied {formatDistanceToNow(new Date(job.updatedAt))} ago
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 