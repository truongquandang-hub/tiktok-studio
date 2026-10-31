export type Platform = 'tiktok' | 'instagram' | 'facebook' | 'youtube' | 'twitter' | 'linkedin' | 'pinterest' | 'website';

export type DatePreset = '7d' | '30d' | 'month' | 'prev_month' | 'custom';

export type MainTab = 'analytics' | 'channels' | 'schedule';

export interface TikTokAccount {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  category: string;
  followers: number;
  following: number;
  totalVideos: number;
  views30d: number;
  engagementRate: number;
  growthRate: number;
  isVerified: boolean;
  status: 'connected' | 'expired';
}

export interface KPICardData {
  title: string;
  value: string | number;
  change: number;
  subtext: string;
  icon: string;
}

export interface GrowthDataPoint {
  date: string;
  followers: number;
  newFollowers: number;
  views: number;
  interactions: number;
}

export interface VideoPost {
  id: string;
  channelId: string;
  channelUsername: string;
  title: string;
  thumbnail: string;
  videoUrl?: string;
  publishedAt: string;
  duration: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  engagementRate: number;
  url: string;
  status?: 'published' | 'scheduled';
  isNew?: boolean;
}

export interface DemographicData {
  gender: { name: string; value: number; color: string }[];
  age: { range: string; percentage: number }[];
  countries: { country: string; flag: string; percentage: number; count: string }[];
}
