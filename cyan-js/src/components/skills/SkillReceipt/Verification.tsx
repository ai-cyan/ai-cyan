import React from 'react';
import { Verification as VerificationType } from '@/types/skill';

interface Props {
  verifications: VerificationType[];
}

export function Verification({ verifications }: Props) {
  return (
    <div className="space-y-3">
      {verifications.map((v, i) => (
        <div 
          key={i}
          className="flex justify-between items-center text-sm"
        >
          <span className="text-gray-500 dark:text-gray-400">{v.type}</span>
          <span className="text-gray-700 dark:text-gray-300">{v.details}</span>
        </div>
      ))}
    </div>
  );
} 