export interface UserSettings {
  email: string;
  name: string;
  // 其他设置相关字段
}

export interface UserPlan {
  type: 'free' | 'pro' | 'business';
  trialDays?: number;
}

export interface UserQuota {
  postJob: {
    used: number;
    limit: number;
  };
  findJob: {
    used: number;
    limit: number | null;  // null 表示无限制
  };
}

export interface User {
  username: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  company: string;
  website: string;
  loginCount: number;
  followers: number;
  following: number;
  achievements: string[];
  skills: string[];
  settings?: UserSettings;
  plan: UserPlan;
  quota: UserQuota;
} 