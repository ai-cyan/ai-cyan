import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { MouseFollower } from '../components/MouseFollower';
import { Navbar } from '../components/Navbar';

// Mock 数据
const mockUserStats = {
  current: 1959,
  seasonHigh: 2152,
  wins: 703,
  timePlayed: '178 HRS',
  careerStats: {
    rank: {
      total: 'A++',
      average: 'Top 1%',
      current: 'Elite'
    },
    starsEarned: {
      total: '161,377',
      average: '441/day',
      current: '28 today'
    },
    commits2024: {
      total: '4,205',
      average: '51/day',
      current: '17 today'
    },
    pullRequests: {
      total: '3,622',
      average: '9.9/day',
      current: '19 open'
    },
    issues: {
      total: '1,245',
      average: '3.4/day',
      current: '8 open'
    },
    contributedTo: {
      total: '79,625',
      average: '218/day',
      current: '36 repos'
    }
  },
  languageComparison: [
    { name: 'TypeScript', time: '1,245 hrs', percentage: 100 },
    { name: 'JavaScript', time: '986 hrs', percentage: 75 },
    { name: 'Python', time: '756 hrs', percentage: 60 },
    { name: 'Rust', time: '512 hrs', percentage: 50 },
    { name: 'Go', time: '486 hrs', percentage: 40 },
    { name: 'Java', time: '324 hrs', percentage: 30 },
    { name: 'C++', time: '256 hrs', percentage: 20 },
    { name: 'Ruby', time: '198 hrs', percentage: 15 }
  ],
  verifiedSkills: {
    technical: [
      {
        name: 'TypeScript',
        level: 5,
        verifications: [
          { type: 'GITHUB', count: 1245, details: '1,245 hrs coding time' },
          { type: 'LINKEDIN', count: 28, details: '28 endorsements' },
          { type: 'PROJECT', count: 32, details: '32 production projects' }
        ],
        lastVerified: '2024-03-07',
        blockchainProof: '0x1234...5678'
      },
      // ... 其他技能
    ],
    soft: [
      {
        name: 'Team Leadership',
        level: 4,
        verifications: [
          { type: 'EMPLOYER', count: 5, details: '5 employer verifications' },
          { type: 'PEER', count: 12, details: '12 peer reviews' }
        ],
        lastVerified: '2024-03-05',
        blockchainProof: '0x5678...9012'
      }
    ]
  }
};

export default function UserOverview() {
  const { username } = useParams();

  return (
    <div className="min-h-screen bg-[#1A1B31] text-white">
      <Navbar />
      <MouseFollower />

      <div className="max-w-[90rem] mx-auto px-4 pt-20">
        {/* Header Section */}
        <div className="bg-[#1A1B31] rounded-lg p-6 border border-[#2A2B45]">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-[#2A2B45] rounded-lg overflow-hidden">
              <img 
                src={`https://github.com/${username}.png`} 
                alt={username} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold flex items-center gap-2">
                {username}
                <span className="text-sm bg-[#2A2B45] px-2 py-1 rounded">
                  Verified
                </span>
              </h1>
              <div className="flex gap-8 mt-4 text-gray-300">
                <div>
                  <div className="text-sm">CONTRIBUTIONS</div>
                  <div className="text-2xl font-bold">{mockUserStats.current}</div>
                </div>
                <div>
                  <div className="text-sm">REPOSITORIES</div>
                  <div className="text-2xl font-bold flex items-baseline gap-2">
                    {mockUserStats.seasonHigh}
                    <span className="text-sm text-green-500">
                      {mockUserStats.careerStats.contributedTo.current}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm">PULL REQUESTS</div>
                  <div className="text-2xl font-bold flex items-baseline gap-2">
                    {mockUserStats.wins}
                    <span className="text-sm text-blue-500">
                      {mockUserStats.careerStats.pullRequests.current}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm">TIME PLAYED</div>
                  <div className="text-2xl font-bold flex items-baseline gap-2">
                    {mockUserStats.timePlayed}
                    <span className="text-sm text-purple-500">
                      this year
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* GitHub Stats */}
          <div className="bg-[#1A1B31] rounded-lg p-6 border border-[#2A2B45]">
            <h2 className="text-xl font-bold mb-6">GITHUB STATS</h2>
            <div className="grid grid-cols-2 gap-6">
              <StatsBlock 
                value={mockUserStats.careerStats.rank.current}
                label="RANK"
                average={mockUserStats.careerStats.rank.average}
                total={mockUserStats.careerStats.rank.total}
              />
              <StatsBlock 
                value={mockUserStats.careerStats.starsEarned.current}
                label="STARS EARNED"
                average={mockUserStats.careerStats.starsEarned.average}
                total={mockUserStats.careerStats.starsEarned.total}
              />
              <StatsBlock 
                value={mockUserStats.careerStats.commits2024.current}
                label="COMMITS (2024)"
                average={mockUserStats.careerStats.commits2024.average}
                total={mockUserStats.careerStats.commits2024.total}
              />
              <StatsBlock 
                value={mockUserStats.careerStats.pullRequests.current}
                label="PULL REQUESTS"
                average={mockUserStats.careerStats.pullRequests.average}
                total={mockUserStats.careerStats.pullRequests.total}
              />
              <StatsBlock 
                value={mockUserStats.careerStats.issues.current}
                label="ISSUES"
                average={mockUserStats.careerStats.issues.average}
                total={mockUserStats.careerStats.issues.total}
              />
              <StatsBlock 
                value={mockUserStats.careerStats.contributedTo.current}
                label="CONTRIBUTED TO"
                average={mockUserStats.careerStats.contributedTo.average}
                total={mockUserStats.careerStats.contributedTo.total}
              />
            </div>
          </div>

          {/* Language Stats */}
          <div className="bg-[#1A1B31] rounded-lg p-6 border border-[#2A2B45]">
            <h2 className="text-xl font-bold mb-6">LANGUAGE PROFICIENCY</h2>
            <div className="space-y-4">
              {mockUserStats.languageComparison.map((lang) => (
                <div key={lang.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{lang.name}</span>
                    <span>{lang.time}</span>
                  </div>
                  <div className="h-1.5 bg-[#2A2B45] rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-white/20"
                      initial={{ width: 0 }}
                      animate={{ width: `${lang.percentage}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 在 Stats Grid 后添加新的技能验证部分 */}
        <div className="mt-6">
          <div className="bg-[#1A1B31] rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">VERIFIED SKILLS</h2>
            
            {/* Technical Skills */}
            <div className="mb-8">
              <h3 className="text-sm text-gray-400 mb-4">TECHNICAL SKILLS</h3>
              <div className="grid grid-cols-2 gap-6">
                {mockUserStats.verifiedSkills.technical.map(skill => (
                  <div 
                    key={skill.name}
                    className="bg-[#1A1B31] rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-lg font-bold">{skill.name}</div>
                        <div className="text-sm text-gray-500">
                          Level {skill.level} • Verified {skill.lastVerified}
                        </div>
                      </div>
                      <div className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded">
                        Verified
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {skill.verifications.map(v => (
                        <div 
                          key={v.type}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-400">{v.type}</span>
                          <span>{v.details}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-700/50 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <span>Blockchain Verified:</span>
                        <span className="font-mono">{skill.blockchainProof}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Soft Skills */}
            <div>
              <h3 className="text-sm text-gray-400 mb-4">SOFT SKILLS</h3>
              <div className="grid grid-cols-2 gap-6">
                {mockUserStats.verifiedSkills.soft.map(skill => (
                  <div 
                    key={skill.name}
                    className="bg-[#1A1B31] rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-lg font-bold">{skill.name}</div>
                        <div className="text-sm text-gray-500">
                          Level {skill.level} • Verified {skill.lastVerified}
                        </div>
                      </div>
                      <div className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded">
                        Verified
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {skill.verifications.map(v => (
                        <div 
                          key={v.type}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-400">{v.type}</span>
                          <span>{v.details}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-700/50 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <span>Blockchain Verified:</span>
                        <span className="font-mono">{skill.blockchainProof}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatsBlockProps {
  value: string;
  label: string;
  average: string;
  total: string;
}

function StatsBlock({ value, label, average, total }: StatsBlockProps) {
  return (
    <div className="bg-[#2A2B45] rounded-lg p-4 hover:bg-[#2A2B45]/80 transition-colors">
      <div className="text-2xl font-bold mb-2">{value}</div>
      <div className="text-sm text-gray-400 mb-3">{label}</div>
      <div className="text-xs space-y-1">
        <div className="flex justify-between text-gray-500">
          <span>AVG PER DAY</span>
          <span className="text-gray-400">{average}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>LIFETIME</span>
          <span className="text-gray-400">{total}</span>
        </div>
      </div>
    </div>
  );
} 