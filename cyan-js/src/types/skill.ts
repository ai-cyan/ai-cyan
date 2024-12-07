export interface Skill {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  verifications: Verification[];
  lastVerified: string;
  blockchainProof: string;
}

export interface Verification {
  type: 'GITHUB' | 'LINKEDIN' | 'PROJECT' | 'EMPLOYER' | 'PEER';
  count: number;
  details: string;
}

export interface SkillStats {
  technical: Skill[];
  soft: Skill[];
} 