import React from 'react';
import { X, Eye, Heart, MessageCircle, Share2, Bookmark, TrendingUp, Calendar, Clock, ExternalLink } from 'lucide-react';
import type { VideoPost } from '../types/dashboard';

interface VideoDetailModalProps {
  video: VideoPost | null;
  onClose: () => void;
}

export const VideoDetailModal: React.FC<VideoDetailModalProps> = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <h3 className="font-bold text-slate-800 text-sm">Chi tiết chỉ số Video TikTok</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="relative w-28 h-36 rounded-xl overflow-hidden bg-slate-900 shrink-0 shadow-md">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover" 
              />
              <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                {video.duration}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-900 text-sm leading-snug mb-2">
                {video.title}
              </h4>
              <div className="space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Ngày đăng: <strong>{video.publishedAt}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Thời lượng: <strong>{video.duration}</strong></span>
                </div>
              </div>

              <div className="mt-3">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Mở trên ứng dụng TikTok <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                <Eye className="w-3.5 h-3.5 text-indigo-600" /> Lượt xem (Views)
              </div>
              <div className="text-lg font-bold text-slate-900">{video.views.toLocaleString()}</div>
            </div>

            <div className="p-3 rounded-xl bg-pink-50/60 border border-pink-100">
              <div className="flex items-center gap-1.5 text-pink-600 text-xs mb-1">
                <Heart className="w-3.5 h-3.5 text-pink-600" /> Lượt thích (Likes)
              </div>
              <div className="text-lg font-bold text-pink-900">{video.likes.toLocaleString()}</div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100">
              <div className="flex items-center gap-1.5 text-blue-600 text-xs mb-1">
                <MessageCircle className="w-3.5 h-3.5 text-blue-600" /> Bình luận
              </div>
              <div className="text-lg font-bold text-blue-900">{video.comments.toLocaleString()}</div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
              <div className="flex items-center gap-1.5 text-emerald-600 text-xs mb-1">
                <Share2 className="w-3.5 h-3.5 text-emerald-600" /> Lượt chia sẻ
              </div>
              <div className="text-lg font-bold text-emerald-900">{video.shares.toLocaleString()}</div>
            </div>

            <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100">
              <div className="flex items-center gap-1.5 text-purple-600 text-xs mb-1">
                <Bookmark className="w-3.5 h-3.5 text-purple-600" /> Lượt lưu lại
              </div>
              <div className="text-lg font-bold text-purple-900">{video.saves.toLocaleString()}</div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100">
              <div className="flex items-center gap-1.5 text-amber-700 text-xs mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-amber-600" /> Engagement
              </div>
              <div className="text-lg font-bold text-amber-900">{video.engagementRate}%</div>
            </div>
          </div>

          {/* Formula calculation explanation */}
          <div className="bg-slate-50 rounded-xl p-3 text-[11px] text-slate-500 border border-slate-200/60">
            <strong>Công thức tính tỷ lệ tương tác (Metricool standard):</strong>
            <div className="font-mono text-slate-700 mt-1">
              ({video.likes.toLocaleString()} + {video.comments.toLocaleString()} + {video.shares.toLocaleString()} + {video.saves.toLocaleString()}) / {video.views.toLocaleString()} × 100 = <strong>{video.engagementRate}%</strong>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
