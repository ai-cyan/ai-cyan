import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      <input
        className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-transparent"
        {...props}
      />
    </div>
  );
} 