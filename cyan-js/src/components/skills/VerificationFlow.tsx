import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skill } from '@/types/skill';

interface Props {
  onComplete: (skill: Skill) => void;
  onCancel: () => void;
}

export function VerificationFlow({ onComplete, onCancel }: Props) {
  const [step, setStep] = useState(1);
  const [skillData, setSkillData] = useState<Partial<Skill>>({});

  const steps = [
    'Select Skill',
    'Add Proof',
    'Choose Verifiers',
    'Review'
  ];

  return (
    <div className="bg-[#1A1B31] rounded-lg p-6">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${i + 1 <= step ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}
            `}>
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className={`
                w-full h-1 mx-2
                ${i + 1 < step ? 'bg-blue-500' : 'bg-gray-700'}
              `} />
            )}
          </div>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {/* Step content here */}
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 