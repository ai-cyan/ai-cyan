import React from 'react';
import { Input } from '@/components/ui/Input';
import { Skill } from '@/types/skill';

interface Props {
  onNext: (data: Partial<Skill>) => void;
  onBack?: () => void;
}

export function SkillDeclaration({ onNext, onBack }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onNext({
      name: formData.get('name') as string,
      level: parseInt(formData.get('level') as string) as 1 | 2 | 3 | 4 | 5,
      verifications: []
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input 
        label="Skill Name"
        name="name"
        required
        placeholder="e.g. TypeScript"
      />
      
      <div>
        <label className="block text-sm font-medium mb-2">
          Skill Level
        </label>
        <select 
          name="level"
          className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-transparent"
          required
        >
          <option value="1">Beginner</option>
          <option value="2">Elementary</option>
          <option value="3">Intermediate</option>
          <option value="4">Advanced</option>
          <option value="5">Expert</option>
        </select>
      </div>

      <div className="flex justify-between pt-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 text-sm bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg ml-auto"
        >
          Next
        </button>
      </div>
    </form>
  );
} 