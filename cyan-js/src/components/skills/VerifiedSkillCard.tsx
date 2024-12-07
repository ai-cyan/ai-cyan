import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '@/types/skill';

interface Props {
  skill: Skill;
  onClick?: () => void;
}

export function VerifiedSkillCard({ skill, onClick }: Props) {
  return (
    <motion.div 
      className="bg-[#1A1B31] rounded-lg p-4 hover:bg-[#1F2037] transition-colors"
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
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
    </motion.div>
  );
} 