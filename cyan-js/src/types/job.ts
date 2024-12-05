export interface Job {
  id: string;
  companyName: string;
  position: string;
  tags: string[];
  description: string;
  applicants: number;
  saves: number;
  updatedAt: string;
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
} 