export type UserType = {
  id: string;
  name: string;
  username: string;
  interviews?: Record<string, string>[];
  profile_picture?: string;
  email: string;
  interview_count: number;
  rank?: {
    weekly: number;
    monthly: number;
    all_time: number;
  };
  resumeData?: Record<string, unknown>;
};