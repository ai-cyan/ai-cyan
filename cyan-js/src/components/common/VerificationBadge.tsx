import React from 'react';

interface Props {
  status: 'VERIFIED' | 'PENDING' | 'FAILED';
  className?: string;
}

export function VerificationBadge({ status, className = '' }: Props) {
  const getStatusStyles = () => {
    switch (status) {
      case 'VERIFIED':
        return 'bg-green-500/10 text-green-400';
      case 'PENDING':
        return 'bg-yellow-500/10 text-yellow-400';
      case 'FAILED':
        return 'bg-red-500/10 text-red-400';
    }
  };

  return (
    <div className={`${getStatusStyles()} text-xs px-2 py-1 rounded ${className}`}>
      {status}
    </div>
  );
} 