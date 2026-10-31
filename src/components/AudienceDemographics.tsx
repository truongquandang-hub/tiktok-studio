import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { DemographicData } from '../types/dashboard';
import { Users2, MapPin, Cake } from 'lucide-react';

interface AudienceDemographicsProps {
  data: DemographicData;
}

export const AudienceDemographics: React.FC<AudienceDemographicsProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs mb-6">
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Users2 className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-slate-800 text-sm">
              Nhân khẩu học & Khán giả (Audience Demographics)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Dữ liệu phân bổ theo giới tính, độ tuổi và khu vực địa lý của người xem
          </p>
        </div>
        <span className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
          Cập nhật từ TikTok Analytics API
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Gender */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-2">
            <span>Phân bố Giới tính</span>
          </div>

          <div className="h-44 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.gender}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {data.gender.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any, name: any) => [`${value}%`, name]}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-slate-400 font-medium">Nữ chiếm</span>
              <span className="text-lg font-black text-pink-600">64%</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
            {data.gender.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-bold text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Age Distribution */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-3">
            <Cake className="w-3.5 h-3.5 text-amber-500" />
            <span>Độ tuổi người xem</span>
          </div>

          <div className="space-y-3 my-auto">
            {data.age.map((item) => (
              <div key={item.range} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">{item.range} tuổi</span>
                  <span className="text-slate-900">{item.percentage}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-200/60 text-center">
            Nhóm tuổi chủ lực: <strong className="text-slate-700">18 - 24 tuổi (46%)</strong>
          </div>
        </div>

        {/* 3. Countries */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-3">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            <span>Quốc gia & Vùng lãnh thổ</span>
          </div>

          <div className="space-y-2.5 my-auto">
            {data.countries.slice(0, 5).map((item) => (
              <div key={item.country} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-700 font-medium">
                  <span className="text-sm">{item.flag}</span>
                  <span className="truncate max-w-[120px]">{item.country}</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-[11px]">{item.count}</span>
                  <span className="font-bold text-slate-900 w-10 text-right">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-200/60 text-center">
            Top 1: <strong className="text-slate-700">Việt Nam (82.4%)</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
