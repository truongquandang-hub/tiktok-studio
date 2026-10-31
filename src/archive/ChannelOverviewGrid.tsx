import React, { useState } from 'react';
import { 
  Users, 
  Eye, 
  TrendingUp, 
  Plus, 
  Search, 
  CheckCircle, 
  ArrowUpRight, 
  Send, 
  Video 
} from 'lucide-react';
import type { TikTokChannel } from '../types/dashboard';

interface ChannelOverviewGridProps {
  channels: TikTokChannel[];
  onSelectChannel: (channelId: string) => void;
  onOpenAddChannel: () => void;
  onOpenCreatePost: (channelId?: string) => void;
}

export const ChannelOverviewGrid: React.FC<ChannelOverviewGridProps> = ({
  channels,
  onSelectChannel,
  onOpenAddChannel,
  onOpenCreatePost,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Aggregated calculations
  const totalFollowers = channels.reduce((sum, ch) => sum + ch.followers, 0);
  const totalViews = channels.reduce((sum, ch) => sum + ch.views30d, 0);
  const totalPosts = channels.reduce((sum, ch) => sum + ch.postsCount, 0);
  const avgER = (channels.reduce((sum, ch) => sum + ch.engagementRate, 0) / (channels.length || 1)).toFixed(2);

  const filteredChannels = channels.filter((ch) => {
    const matchSearch = ch.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        ch.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        ch.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = categoryFilter === 'all' || ch.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const categories = ['all', ...Array.from(new Set(channels.map((c) => c.category)))];

  return (
    <div className="space-y-6">
      {/* Top Banner: Aggregated Hub Summary */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        {/* Glow circles */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 rounded-full bg-pink-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-pink-500/20 text-pink-400 border border-pink-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse"></span>
                  Multi-Channel Central Hub
                </span>
                <span className="text-xs text-slate-400">
                  {channels.length} Kênh TikTok đang kết nối
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                Mạng Lưới Kênh TikTok Đa Tài Khoản
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                Gom toàn bộ dữ liệu, phân quyền quản lý cho thành viên và lên lịch đăng bài chéo đa kênh từ một nền tảng duy nhất.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenCreatePost()}
                className="px-4 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-pink-500/25 transition-all hover:scale-102"
              >
                <Send className="w-4 h-4" />
                <span>Đăng Bài Lên Nhiều Kênh</span>
              </button>
              <button
                onClick={onOpenAddChannel}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 border border-white/20 transition-all"
              >
                <Plus className="w-4 h-4 text-cyan-400" />
                <span>+ Thêm Kênh Mới</span>
              </button>
            </div>
          </div>

          {/* Aggregated KPI Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
              <div className="text-xs text-slate-400 font-medium flex items-center justify-between mb-1">
                <span>Tổng Follower Dàn Kênh</span>
                <Users className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-white tracking-tight">
                {totalFollowers.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +19.8% tháng này
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
              <div className="text-xs text-slate-400 font-medium flex items-center justify-between mb-1">
                <span>Lượt Xem 30 Ngày</span>
                <Eye className="w-4 h-4 text-pink-400" />
              </div>
              <div className="text-2xl font-black text-white tracking-tight">
                {(totalViews / 1000000).toFixed(2)}M
              </div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +24.5% so với kỳ trước
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
              <div className="text-xs text-slate-400 font-medium flex items-center justify-between mb-1">
                <span>Tương tác trung bình (ER)</span>
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white tracking-tight">
                {avgER}%
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Chuẩn ngành TikTok (8-15%)
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
              <div className="text-xs text-slate-400 font-medium flex items-center justify-between mb-1">
                <span>Tổng Video Đã Đăng</span>
                <Video className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-black text-white tracking-tight">
                {totalPosts}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Toàn bộ hệ thống {channels.length} kênh
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-[260px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tìm kiếm kênh theo tên, username @..., người phụ trách..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all shrink-0 ${
                  categoryFilter === cat
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'Tất cả lĩnh vực' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Hiển thị <strong>{filteredChannels.length}</strong> / {channels.length} kênh
        </div>
      </div>

      {/* Channel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {filteredChannels.map((channel) => (
          <div
            key={channel.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all p-5 flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Top Channel Header */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={channel.avatar}
                      alt={channel.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 shadow-xs"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-black text-pink-400 text-[10px] font-black flex items-center justify-center border-2 border-white">
                      ♪
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                        {channel.name}
                      </h3>
                      {channel.verified && (
                        <CheckCircle className="w-4 h-4 fill-cyan-500 text-white shrink-0" />
                      )}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">{channel.handle}</div>
                    <span className="inline-block mt-1 text-[10px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-100/80">
                      {channel.category}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Đang hoạt động
                </span>
              </div>

              {/* Channel Bio */}
              <p className="text-xs text-slate-600 line-clamp-2 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                {channel.bio}
              </p>

              {/* Channel Mini Stats */}
              <div className="grid grid-cols-3 gap-2 py-3 px-3.5 bg-slate-50/80 rounded-xl border border-slate-100 mb-4 text-center">
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Followers</div>
                  <div className="text-sm font-black text-slate-900">
                    {channel.followers >= 1000 ? `${(channel.followers / 1000).toFixed(1)}K` : channel.followers}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold flex items-center justify-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" />
                    +{channel.growthRate}%
                  </div>
                </div>

                <div className="border-x border-slate-200/80">
                  <div className="text-[11px] text-slate-400 font-medium">Views 30d</div>
                  <div className="text-sm font-black text-slate-900">
                    {(channel.views30d / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {channel.postsCount} bài đăng
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Tỷ lệ ER</div>
                  <div className="text-sm font-black text-indigo-600">
                    {channel.engagementRate}%
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    Tương tác cao
                  </div>
                </div>
              </div>

              {/* Manager assignment info */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
                <span>Người phụ trách:</span>
                <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
                  {channel.manager}
                </span>
              </div>
            </div>

            {/* Actions for this channel */}
            <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => onSelectChannel(channel.id)}
                className="flex-1 py-2 px-3 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span>Xem Thông Số Kênh</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onOpenCreatePost(channel.id)}
                title="Tạo bài đăng cho riêng kênh này"
                className="py-2 px-3 bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Đăng bài</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
