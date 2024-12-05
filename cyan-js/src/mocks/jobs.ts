import { Job } from '../types/job';

// 生成随机工作数据的辅助函数
const generateMockJob = (id: number): Job => {
  const companies = ['TechCorp', 'DesignStudio', 'DevHub', 'AILabs', 'CloudTech', 'DataSys', 'WebFlow', 'CodeCraft'];
  const positions = ['Frontend Developer', 'Backend Engineer', 'UI/UX Designer', 'Product Manager', 'DevOps Engineer', 'Data Scientist'];
  const tags = ['react', 'typescript', 'python', 'rust', 'golang', 'vue', 'angular', 'node', 'aws', 'docker', 'kubernetes'];
  const locations = ['Remote', 'Hybrid', 'On-site'];
  
  const randomTags = [...new Set([
    tags[Math.floor(Math.random() * tags.length)],
    tags[Math.floor(Math.random() * tags.length)],
    Math.random() > 0.5 ? 'fulltime' : 'remote'
  ])];

  return {
    id: id.toString(),
    companyName: companies[Math.floor(Math.random() * companies.length)],
    position: positions[Math.floor(Math.random() * positions.length)],
    tags: randomTags,
    description: 'Building innovative solutions with cutting-edge technologies',
    applicants: Math.floor(Math.random() * 100) + 10,
    saves: Math.floor(Math.random() * 200) + 50,
    updatedAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString(),
    location: locations[Math.floor(Math.random() * locations.length)],
    salary: {
      min: Math.floor(Math.random() * 40000) + 40000,
      max: Math.floor(Math.random() * 40000) + 80000,
      currency: '$'
    }
  };
};

// 生成42个工作数据（包括原有的2个）
export const mockJobs: Job[] = [
  // 保留原有的两个特定工作
  {
    id: '1',
    companyName: 'TechCorp',
    position: 'Senior Rust Developer',
    tags: ['rust', 'webassembly', 'fulltime'],
    description: 'Building high-performance distributed systems with Rust',
    applicants: 45,
    saves: 128,
    updatedAt: '2024-03-15T10:00:00Z',
    location: 'Remote',
    salary: {
      min: 60000,
      max: 90000,
      currency: '$'
    }
  },
  {
    id: '2',
    companyName: 'DesignStudio',
    position: 'UI/UX Designer',
    tags: ['design', 'figma', 'remote'],
    description: 'Creating beautiful and intuitive user experiences',
    applicants: 32,
    saves: 89,
    updatedAt: '2024-03-14T15:30:00Z',
    location: 'Remote',
    salary: {
      min: 50000,
      max: 70000,
      currency: '$'
    }
  },
  // 生成额外的40个工作数据
  ...Array.from({ length: 40 }, (_, i) => generateMockJob(i + 3))
]; 