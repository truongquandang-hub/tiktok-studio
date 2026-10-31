import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  Bar, 
  Line, 
  ComposedChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import type { GrowthDataPoint } from '../types/dashboard';
import { TrendingUp, Eye } from 'lucide-react';

interface AnalyticsChartsProps {
  data: GrowthDataPoint[];
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ data }) => {
  const [metricTab, setMetricTab] = useState<'total' | 'daily'>('total');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Chart 1: Community Growth (Followers) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-500"></div>
              <h3 className="font-bold text-slate-800 text-sm">
                Tăng trưởng Người theo dõi (Followers)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Diễn biến lượng follower qua từng ngày trên TikTok
            </p>
          </div>

          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setMetricTab('total')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                metricTab === 'total' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Tổng tích lũy
            </button>
            <button
              onClick={() => setMetricTab('daily')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                metricTab === 'daily' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Tăng mỗi ngày
            </button>
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="followerGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="newFollowerGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                domain={metricTab === 'total' ? ['dataMin - 500', 'dataMax + 500'] : [0, 'auto']}
                tickFormatter={(val) => metricTab === 'total' ? `${(val / 1000).toFixed(0)}k` : val}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '12px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                }}
                formatter={(value: any) => [
                  Number(value).toLocaleString() + (metricTab === 'total' ? ' followers' : ' người mới'),
                  metricTab === 'total' ? 'Tổng số Follower' : 'Tăng trong ngày'
                ]}
              />
              {metricTab === 'total' ? (
                <Area
                  type="monotone"
                  dataKey="followers"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#followerGradient)"
                />
              ) : (
                <Area
                  type="monotone"
                  dataKey="newFollowers"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#newFollowerGradient)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1 font-medium text-slate-700">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-600" />
            Đỉnh tăng trưởng cao nhất: 17/10 (+290 followers)
          </span>
          <span className="text-slate-400">Dữ liệu đồng bộ TikTok</span>
        </div>
      </div>

      {/* Chart 2: Views vs Interactions */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-pink-500"></div>
              <h3 className="font-bold text-slate-800 text-sm">
                Lượt xem (Views) & Tương tác (Interactions)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              So sánh lượng video views và hành vi tương tác thực tế
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-3 h-3 rounded-xs bg-indigo-200 block"></span>
              <span>Views</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-3 h-1 rounded-full bg-pink-500 block"></span>
              <span>Interactions</span>
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis 
                yAxisId="left" 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#ec4899' }}
                tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '12px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                }}
                formatter={(val: any, name: any) => [
                  Number(val).toLocaleString(),
                  name === 'views' ? 'Lượt xem (Views)' : 'Tương tác (Likes, Cmt, Share)'
                ]}
              />
              <Bar 
                yAxisId="left" 
                dataKey="views" 
                fill="#c7d2fe" 
                radius={[4, 4, 0, 0]} 
                maxBarSize={28}
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="interactions" 
                stroke="#ec4899" 
                strokeWidth={2.5} 
                dot={{ r: 3, fill: '#ec4899' }} 
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1 font-medium text-slate-700">
            <Eye className="w-3.5 h-3.5 text-indigo-600" />
            Tỷ lệ chuyển đổi tương tác trung bình: 11.85%
          </span>
          <span className="text-slate-400">Top ngày: 17/10 (240k views)</span>
        </div>
      </div>
    </div>
  );
};
