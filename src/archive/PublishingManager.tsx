import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Check, 
  X, 
  Eye, 
  Trash2, 
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import type { ScheduledPost, TikTokChannel, UserProfile } from '../types/dashboard';

interface PublishingManagerProps {
  posts: ScheduledPost[];
  channels: TikTokChannel[];
  currentUser: UserProfile;
  onOpenCreatePost: () => void;
  onApprovePost: (postId: string) => void;
  onRejectPost: (postId: string) => void;
  onDeletePost: (postId: string) => void;
}

export const PublishingManager: React.FC<PublishingManagerProps> = ({
  posts,
  channels,
  currentUser,
  onOpenCreatePost,
  onApprovePost,
  onRejectPost,
  onDeletePost,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending_approval' | 'scheduled' | 'published' | 'draft'>('all');
  const [selectedChannelId, setSelectedChannelId] = useState<string>('all');

  const isBossOrManager = currentUser.role === 'boss' || currentUser.role === 'manager';

  const pendingCount = posts.filter((p) => p.status === 'pending_approval').length;
  const scheduledCount = posts.filter((p) => p.status === 'scheduled').length;
  const publishedCount = posts.filter((p) => p.status === 'published').length;
  const draftCount = posts.filter((p) => p.status === 'draft').length;

  const filteredPosts = posts.filter((post) => {
    const matchStatus = activeFilter === 'all' || post.status === activeFilter;
    const matchChannel = selectedChannelId === 'all' || post.channelIds.includes(selectedChannelId);
    return matchStatus && matchChannel;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Controls */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Lập Lịch & Quản Lý Đăng Bài TikTok
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Tự động xuất bản nội dung đồng thời lên nhiều kênh & quy trình phê duyệt khép kín giữa Nhân viên và Sếp.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCreatePost}
            className="px-4 py-2.5 bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-600 hover:opacity-95 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md shadow-pink-500/20 transition-all hover:scale-102"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ Soạn Bài Đăng Mới</span>
          </button>
        </div>
      </div>

      {/* Pending Approval Alert for Boss/Manager */}
      {pendingCount > 0 && (
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-amber-900 text-xs sm:text-sm">
                Có {pendingCount} bài đăng đang chờ Sếp / Trưởng nhóm phê duyệt!
              </div>
              <p className="text-[11px] text-amber-700 mt-0.5">
                Các thành viên trong team đã nộp video mới. Sếp vui lòng duyệt để hệ thống kịp xuất bản đúng khung giờ vàng.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveFilter('pending_approval')}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors shrink-0"
          >
            Xem bài chờ duyệt ({pendingCount})
          </button>
        </div>
      )}

      {/* Filter Tabs & Channel Selector */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Status Filter buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tất cả ({posts.length})
          </button>

          <button
            onClick={() => setActiveFilter('pending_approval')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeFilter === 'pending_approval'
                ? 'bg-amber-500 text-white shadow-2xs'
                : 'text-amber-700 bg-amber-50 hover:bg-amber-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Chờ duyệt</span>
            {pendingCount > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeFilter === 'pending_approval' ? 'bg-white text-amber-600' : 'bg-amber-200 text-amber-800'
              }`}>
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveFilter('scheduled')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeFilter === 'scheduled'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Đã lên lịch ({scheduledCount})</span>
          </button>

          <button
            onClick={() => setActiveFilter('published')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeFilter === 'published'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Đã xuất bản ({publishedCount})</span>
          </button>

          <button
            onClick={() => setActiveFilter('draft')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'draft'
                ? 'bg-slate-700 text-white'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            Bản nháp ({draftCount})
          </button>
        </div>

        {/* Channel dropdown filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Lọc theo kênh:</span>
          <select
            value={selectedChannelId}
            onChange={(e) => setSelectedChannelId(e.target.value)}
            className="px-3 py-1.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 font-semibold focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Tất cả kênh TikTok</option>
            {channels.map((ch) => (
              <option key={ch.id} value={ch.id}>
                {ch.name} ({ch.handle})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Posts Cards Grid */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">Chưa có bài đăng nào trong mục này</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Bấm nút "Soạn bài đăng mới" để chuẩn bị video và lên lịch xuất bản tự động lên các kênh TikTok.
          </p>
          <button
            onClick={onOpenCreatePost}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Tạo bài đăng ngay
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPosts.map((post) => {
            const isPending = post.status === 'pending_approval';
            const isScheduled = post.status === 'scheduled';
            const isPublished = post.status === 'published';

            return (
              <div
                key={post.id}
                className={`bg-white rounded-2xl border transition-all p-5 flex flex-col justify-between shadow-xs hover:shadow-md ${
                  isPending
                    ? 'border-amber-300 bg-amber-50/20 ring-1 ring-amber-200'
                    : 'border-slate-200/90'
                }`}
              >
                <div>
                  {/* Top Header: Target Channels & Status Badge */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {post.channelIds.map((chId) => {
                        const targetCh = channels.find((c) => c.id === chId);
                        return (
                          <span
                            key={chId}
                            className="inline-flex items-center gap-1 text-[11px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded-lg shadow-2xs"
                          >
                            <span className="text-pink-400">♪</span>
                            {targetCh ? targetCh.name : chId}
                          </span>
                        );
                      })}
                    </div>

                    {/* Status Badge */}
                    <div>
                      {isPending && (
                        <span className="px-2.5 py-1 bg-amber-100 text-amber-800 border border-amber-300/80 rounded-full text-[10px] font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Chờ Sếp duyệt
                        </span>
                      )}
                      {isScheduled && (
                        <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-full text-[10px] font-bold flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Lên lịch: {post.scheduledTime}
                        </span>
                      )}
                      {isPublished && (
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Đã xuất bản
                        </span>
                      )}
                      {post.status === 'draft' && (
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full text-[10px] font-bold">
                          Bản nháp
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Post Content preview */}
                  <div className="flex gap-3.5 mb-3">
                    <div className="relative w-24 h-32 rounded-xl overflow-hidden shrink-0 bg-slate-900">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-bold px-1 rounded">
                        {post.videoDuration || '00:54'}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug mb-1">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2">
                        {post.caption}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {post.hashtags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Notes / Approver info */}
                  {post.notes && (
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-[11px] text-slate-600 mb-3 flex items-start gap-2">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <strong>Ghi chú:</strong> {post.notes}
                      </div>
                    </div>
                  )}

                  {/* Author & Approver Footer */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 py-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span>Tạo bởi: <strong>{post.author.name}</strong></span>
                    </div>

                    {post.approver && (
                      <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Duyệt bởi: {post.approver.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onDeletePost(post.id)}
                    title="Xóa bài đăng"
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Approval Actions for Boss / Manager */}
                  {isPending && isBossOrManager && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onRejectPost(post.id)}
                        className="px-3 py-1.5 border border-rose-200 text-rose-700 hover:bg-rose-50 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Yêu cầu sửa</span>
                      </button>
                      <button
                        onClick={() => onApprovePost(post.id)}
                        className="px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5"
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Duyệt & Lên lịch</span>
                      </button>
                    </div>
                  )}

                  {isPending && !isBossOrManager && (
                    <span className="text-[11px] text-amber-700 font-medium italic">
                      Đang đợi Sếp Nguyễn Hoàng Long duyệt...
                    </span>
                  )}

                  {isScheduled && (
                    <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Sẽ tự động xuất bản đúng giờ</span>
                    </div>
                  )}

                  {isPublished && (
                    <a
                      href="#view"
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Đang mở video trực tiếp trên ứng dụng TikTok!');
                      }}
                      className="text-xs text-indigo-600 hover:underline font-semibold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Xem trên TikTok
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
