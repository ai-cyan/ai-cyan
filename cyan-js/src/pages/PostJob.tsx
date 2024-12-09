import React, { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { MouseFollower } from '../components/MouseFollower';
import { Navbar } from '../components/Navbar';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { TagInput } from '../components/ui/TagInput';

interface JobFormData {
  // Basic Info
  companyName: string;
  position: string;
  employmentType: string;
  primaryTag: string;
  tags: string[];
  
  // Job Details
  companyLogo?: File;
  salary: {
    min: number;
    max: number;
  };
  description: string;
  howToApply: string;
  applicantEmail: string;
  applyUrl?: string;
  
  // Company Info
  companyTwitter?: string;
  companyEmail: string;
  invoiceEmail?: string;
  invoiceAddress: string;
  invoiceNotes?: string;
}

const employmentTypes = [
  'Full-time',
  'Part-time',
  'Contract',
  'Freelance',
  'Internship'
];

export default function PostJob() {
  const [formData, setFormData] = useState<JobFormData>({
    companyName: '',
    position: '',
    employmentType: '',
    primaryTag: '',
    tags: [],
    salary: { min: 0, max: 0 },
    description: '',
    howToApply: '',
    applicantEmail: '',
    invoiceAddress: '',
    companyEmail: ''
  });

  const [logoPreview, setLogoPreview] = useState<string>('');

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, companyLogo: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <MouseFollower />
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8 pt-32">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8"
        >
          Post a New Job
        </motion.h1>

        <div className="space-y-8">
          {/* Basic Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800"
          >
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
            <div className="space-y-4">
              <Input
                label="Company Name"
                required
                value={formData.companyName}
                onChange={e => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
              />
              
              <Input
                label="Position"
                required
                value={formData.position}
                onChange={e => setFormData(prev => ({ ...prev, position: e.target.value }))}
              />
              
              <Select
                label="Employment Type"
                required
                options={employmentTypes}
                value={formData.employmentType}
                onChange={(value: string) => setFormData(prev => ({ ...prev, employmentType: value }))}
              />
              
              <Input
                label="Primary Tag"
                required
                value={formData.primaryTag}
                onChange={e => setFormData(prev => ({ ...prev, primaryTag: e.target.value }))}
              />
              
              <TagInput
                label="Tags, Keywords or Stack"
                required
                tags={formData.tags}
                onChange={(tags: string[]) => setFormData(prev => ({ ...prev, tags }))}
              />
            </div>
          </motion.div>

          {/* Job Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800"
          >
            <h2 className="text-xl font-semibold mb-6">Job Details</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Company logo" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm text-gray-500">Logo</span>
                  )}
                  <input
                    type="file"
                    accept=".jpg,.png"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleLogoChange}
                  />
                </div>
                <div className="text-sm text-gray-500">
                  Upload company logo (.jpg or .png)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Minimum Salary (USD)"
                  type="number"
                  value={formData.salary.min}
                  onChange={e => setFormData(prev => ({ 
                    ...prev, 
                    salary: { ...prev.salary, min: Number(e.target.value) }
                  }))}
                />
                <Input
                  label="Maximum Salary (USD)"
                  type="number"
                  value={formData.salary.max}
                  onChange={e => setFormData(prev => ({ 
                    ...prev, 
                    salary: { ...prev.salary, max: Number(e.target.value) }
                  }))}
                />
              </div>

              <Textarea
                label="Job Description"
                required
                value={formData.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                  setFormData(prev => ({ ...prev, description: e.target.value }))
                }
                rows={6}
              />

              <Textarea
                label="How to Apply?"
                value={formData.howToApply}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                  setFormData(prev => ({ ...prev, howToApply: e.target.value }))
                }
                rows={3}
              />

              <Input
                label="Applicant Email (for ATS)"
                required
                type="email"
                value={formData.applicantEmail}
                onChange={e => setFormData(prev => ({ ...prev, applicantEmail: e.target.value }))}
              />

              <Input
                label="Apply URL (Optional)"
                type="url"
                value={formData.applyUrl}
                onChange={e => setFormData(prev => ({ ...prev, applyUrl: e.target.value }))}
              />
            </div>
          </motion.div>

          {/* Company Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800"
          >
            <h2 className="text-xl font-semibold mb-6">Company Information</h2>
            <div className="space-y-4">
              <Input
                label="Company Twitter"
                value={formData.companyTwitter}
                onChange={e => setFormData(prev => ({ ...prev, companyTwitter: e.target.value }))}
              />

              <Input
                label="Company Email"
                required
                type="email"
                value={formData.companyEmail}
                onChange={e => setFormData(prev => ({ ...prev, companyEmail: e.target.value }))}
                helperText="Stays private, for invoice + edit link"
              />

              <Input
                label="Invoice Email"
                type="email"
                value={formData.invoiceEmail}
                onChange={e => setFormData(prev => ({ ...prev, invoiceEmail: e.target.value }))}
                helperText="Stays private"
              />

              <Textarea
                label="Invoice Address"
                required
                value={formData.invoiceAddress}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                  setFormData(prev => ({ ...prev, invoiceAddress: e.target.value }))
                }
                rows={3}
              />

              <Input
                label="Invoice Notes / PO Number"
                value={formData.invoiceNotes}
                onChange={e => setFormData(prev => ({ ...prev, invoiceNotes: e.target.value }))}
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.button
              className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                // TODO: 处理表单提交
                console.log(formData);
              }}
            >
              Post Job
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 