import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '@/types/skill';
import { Verification } from './Verification';

interface Props {
  skill: Skill;
}

export function SkillReceipt({ skill }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold">{skill.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Level {skill.level} • Verified {skill.lastVerified}
          </p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs px-2 py-1 rounded">
          Verified
        </div>
      </div>

      <Verification verifications={skill.verifications} />

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <span>Blockchain Proof: </span>
          <code className="font-mono">{skill.blockchainProof}</code>
        </div>
      </div>
    </motion.div>
  );
} 