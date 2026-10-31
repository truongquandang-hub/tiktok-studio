import React from 'react';
import { 
  Users, 
  Eye, 
  Heart, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Share2, 
  Bookmark, 
  MessageCircle 
} from 'lucide-react';
import type { DatePreset, TikTokAccount } from '../types/dashboard';

interface MetricCardsProps {
  datePreset: DatePreset;
  isComparing: boolean;
  channel?: TikTokAccount | null;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ datePreset, isComparing, channel }) => {
  const is7d = datePreset === '7d';

  const followersCount = (channel && channel.followers) ? channel.followers : 143120;
  const viewsCount = (channel && channel.views30d) ? channel.views30d : 3482900;
  const erVal = (channel && channel.engagementRate) ? `${channel.engagementRate}%` : '11.85%';
  const growthRate = (channel && channel.growthRate) ? channel.growthRate : 3.3;

  const stats = [
    {
      title: 'Tăng trưởng Follower',
      value: is7d ? `+${Math.round(followersCount * 0.015).toLocaleString()}` : `+${Math.round(followersCount * 0.032).toLocaleString()}`,
      total: followersCount.toLocaleString(),
      change: growthRate,
      isPositive: true,
      subtext: isComparing ? 'so với kỳ trước' : 'trong khoảng thời gian chọn',
      icon: Users,
      color: 'indigo'
    },
    {
      title: 'Lượt xem Video (Views)',
      value: is7d ? `${(viewsCount * 0.25 / 1000).toFixed(0)}K` : `${(viewsCount / 1000000).toFixed(2)}M`,
      change: is7d ? 22.4 : 18.4,
      isPositive: true,
      subtext: isComparing ? 'so với kỳ trước (2.94M)' : 'tổng lượt xem toàn bộ video',
      icon: Eye,
      color: 'blue'
    },
    {
      title: 'Tổng tương tác (Interactions)',
      value: is7d ? '106,600' : '412,650',
      breakdown: { likes: '315k', comments: '16.8k', shares: '42k', saves: '38.8k' },
      change: is7d ? 15.1 : 12.6,
      isPositive: true,
      subtext: isComparing ? 'thả tim, cmt, share & lưu' : 'tương tác thực tế',
      icon: Heart,
      color: 'pink'
    },
    {
      title: 'Tỷ lệ tương tác (Engagement)',
      value: erVal,
      change: 1.1,
      isPositive: true,
      subtext: 'Tính trên lượt xem (Interactions / Views)',
      icon: TrendingUp,
      color: 'emerald'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'indigo':
        return { bg: 'bg-indigo-50', text: 'text-indigo-600', ring: 'ring-indigo-100' };
      case 'blue':
        return { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'ring-blue-100' };
      case 'pink':
        return { bg: 'bg-pink-50', text: 'text-pink-600', ring: 'ring-pink-100' };
      case 'emerald':
        return { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-100' };
      default:
        return { bg: 'bg-slate-50', text: 'text-slate-600', ring: 'ring-slate-100' };
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        const colors = getColorClasses(stat.color);
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className={`w-8 h-8 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center ring-4 ${colors.ring}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  {stat.value}
                </span>
                {stat.total && (
                  <span className="text-xs font-medium text-slate-400">
                    / {stat.total}
                  </span>
                )}
              </div>

              {stat.breakdown && (
                <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-2 font-medium">
                  <span className="flex items-center gap-0.5"><Heart className="w-2.5 h-2.5 text-pink-500" /> {stat.breakdown.likes}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5"><MessageCircle className="w-2.5 h-2.5 text-blue-500" /> {stat.breakdown.comments}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5"><Share2 className="w-2.5 h-2.5 text-emerald-500" /> {stat.breakdown.shares}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5"><Bookmark className="w-2.5 h-2.5 text-purple-500" /> {stat.breakdown.saves}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className={`inline-flex items-center font-bold px-2 py-0.5 rounded-full ${
                stat.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
              }`}>
                {stat.isPositive ? (
                  <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                )}
                {stat.change}%
              </span>
              <span className="text-[11px] text-slate-400 truncate ml-2">
                {stat.subtext}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
