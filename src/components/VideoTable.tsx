import { useState } from 'react';
import { 
  Search, 
  ArrowUpDown, 
  ExternalLink, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2, 
  Play, 
  TrendingUp
} from 'lucide-react';
import type { VideoPost } from '../types/dashboard';

interface VideoTableProps {
  videos: VideoPost[];
  onSelectVideo: (video: VideoPost) => void;
  activeChannelUsername?: string;
}

type SortField = 'views' | 'likes' | 'comments' | 'shares' | 'saves' | 'engagementRate' | 'publishedAt';

export const VideoTable = ({ videos, onSelectVideo, activeChannelUsername }: VideoTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [channelFilter, setChannelFilter] = useState<'all' | 'current'>('all');
  const [sortField, setSortField] = useState<SortField>('views');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredVideos = videos
    .filter((v) => {
      const matchSearch = v.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchChannel = channelFilter === 'all' || 
        (v.channelUsername && activeChannelUsername && v.channelUsername.toLowerCase() === activeChannelUsername.toLowerCase());
      return matchSearch && matchChannel;
    })
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'string') {
        return sortDirection === 'asc' 
          ? (aVal as string).localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal as string);
      }
      return sortDirection === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden mb-8">
      {/* Table Header Controls */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 text-sm">
              Thống kê bài đăng đa kênh (Video Performance)
            </h3>
            <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full font-bold">
              {filteredVideos.length} video
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Theo dõi lượt xem, tim, comment, tỷ lệ tương tác của từng video trên tất cả các kênh
          </p>
        </div>

        {/* Search & Channel Filter */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Channel Filter Toggle */}
          {activeChannelUsername && (
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setChannelFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  channelFilter === 'all' ? 'bg-white text-slate-800 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Tất cả kênh
              </button>
              <button
                onClick={() => setChannelFilter('current')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  channelFilter === 'current' ? 'bg-white text-slate-800 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Chỉ {activeChannelUsername}
              </button>
            </div>
          )}

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm tiêu đề, hashtag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-52 sm:w-60 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/70 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4 min-w-[280px]">Video & Tiêu đề</th>
              <th className="py-3 px-3">Kênh TikTok</th>
              <th 
                onClick={() => handleSort('views')}
                className="py-3 px-3 cursor-pointer hover:text-slate-800 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>Views</span>
                  <ArrowUpDown className={`w-3 h-3 ${sortField === 'views' ? 'text-indigo-600 font-bold' : 'text-slate-300'}`} />
                </div>
              </th>
              <th 
                onClick={() => handleSort('likes')}
                className="py-3 px-3 cursor-pointer hover:text-slate-800 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <Heart className="w-3.5 h-3.5 text-pink-400" />
                  <span>Likes</span>
                  <ArrowUpDown className={`w-3 h-3 ${sortField === 'likes' ? 'text-indigo-600 font-bold' : 'text-slate-300'}`} />
                </div>
              </th>
              <th 
                onClick={() => handleSort('comments')}
                className="py-3 px-3 cursor-pointer hover:text-slate-800 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
                  <span>Comments</span>
                  <ArrowUpDown className={`w-3 h-3 ${sortField === 'comments' ? 'text-indigo-600 font-bold' : 'text-slate-300'}`} />
                </div>
              </th>
              <th 
                onClick={() => handleSort('shares')}
                className="py-3 px-3 cursor-pointer hover:text-slate-800 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Shares</span>
                  <ArrowUpDown className={`w-3 h-3 ${sortField === 'shares' ? 'text-indigo-600 font-bold' : 'text-slate-300'}`} />
                </div>
              </th>
              <th 
                onClick={() => handleSort('engagementRate')}
                className="py-3 px-4 cursor-pointer hover:text-slate-800 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                  <span>Engagement</span>
                  <ArrowUpDown className={`w-3 h-3 ${sortField === 'engagementRate' ? 'text-indigo-600 font-bold' : 'text-slate-300'}`} />
                </div>
              </th>
              <th className="py-3 px-3 text-center">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredVideos.map((video) => (
              <tr 
                key={video.id}
                onClick={() => onSelectVideo(video)}
                className="hover:bg-indigo-50/40 transition-colors cursor-pointer group"
              >
                {/* Thumbnail & Meta */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-18 rounded-lg overflow-hidden bg-slate-900 shrink-0 shadow-xs group-hover:ring-2 group-hover:ring-indigo-500 transition-all">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-white/90 text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-sm transition-opacity">
                          <Play className="w-3 h-3 fill-slate-900 ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/75 text-white text-[9px] font-bold px-1 rounded">
                        {video.duration}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        {video.isNew && (
                          <span className="bg-pink-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full animate-pulse">
                            VỪA ĐĂNG
                          </span>
                        )}
                        <p className="font-semibold text-slate-800 group-hover:text-indigo-600 line-clamp-2 leading-relaxed">
                          {video.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span>{video.publishedAt}</span>
                        <span>•</span>
                        <span className="text-pink-600 font-medium">TikTok Direct</span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Channel Badge */}
                <td className="py-3.5 px-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                    <span className="text-pink-500">♪</span> {video.channelUsername}
                  </span>
                </td>

                {/* Views */}
                <td className="py-3.5 px-3 text-right font-bold text-slate-800 tabular-nums">
                  {video.views.toLocaleString()}
                </td>

                {/* Likes */}
                <td className="py-3.5 px-3 text-right font-medium text-slate-700 tabular-nums">
                  {video.likes.toLocaleString()}
                </td>

                {/* Comments */}
                <td className="py-3.5 px-3 text-right font-medium text-slate-700 tabular-nums">
                  {video.comments.toLocaleString()}
                </td>

                {/* Shares */}
                <td className="py-3.5 px-3 text-right font-medium text-slate-700 tabular-nums">
                  {video.shares.toLocaleString()}
                </td>

                {/* Engagement Rate */}
                <td className="py-3.5 px-4 text-right">
                  <span className={`inline-block px-2.5 py-1 rounded-full font-bold tabular-nums text-xs ${
                    video.engagementRate >= 16 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : video.engagementRate >= 13
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {video.engagementRate}%
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onSelectVideo(video)}
                    title="Xem chi tiết"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors inline-flex"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredVideos.length === 0 && (
        <div className="py-12 text-center text-slate-400">
          Không tìm thấy video nào phù hợp với bộ lọc hiện tại.
        </div>
      )}
    </div>
  );
};
