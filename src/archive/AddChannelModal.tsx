import React, { useState } from 'react';
import { X, Plus, ShieldCheck, Sparkles } from 'lucide-react';
import type { TikTokChannel, TeamMember } from '../types/dashboard';

interface AddChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamMembers: TeamMember[];
  onAddChannel: (channel: TikTokChannel) => void;
}

export const AddChannelModal: React.FC<AddChannelModalProps> = ({
  isOpen,
  onClose,
  teamMembers,
  onAddChannel,
}) => {
  const [channelName, setChannelName] = useState('');
  const [handle, setHandle] = useState('');
  const [category, setCategory] = useState('Giải trí & Đời sống');
  const [manager, setManager] = useState(teamMembers[1]?.name || 'Trần Linh Chi');
  const [bio, setBio] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!channelName.trim() || !handle.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const formattedHandle = handle.startsWith('@') ? handle : `@${handle}`;
      const newChannel: TikTokChannel = {
        id: `ch-${Date.now()}`,
        name: channelName,
        handle: formattedHandle,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80',
        bio: bio || `Kênh chính thức ${channelName} trên TikTok 🚀`,
        verified: false,
        category,
        followers: 1250,
        following: 45,
        totalLikes: 18400,
        views30d: 45000,
        engagementRate: 8.5,
        postsCount: 5,
        manager,
        status: 'active',
        growthRate: 15.0,
      };

      onAddChannel(newChannel);
      setIsSubmitting(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center justify-center font-bold text-base">
              ♪
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">Kết nối Kênh TikTok Mới</h2>
              <p className="text-xs text-slate-300">Ủy quyền tài khoản TikTok vào hệ thống quản lý</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">
              Tên Kênh TikTok <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="VD: Hà Nội Ăn Gì, Tech Review Pro..."
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-sm"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">
              TikTok Handle (Username) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-medium">@</span>
              <input
                type="text"
                required
                placeholder="username_tiktok"
                value={handle.replace(/^@/, '')}
                onChange={(e) => setHandle(e.target.value)}
                className="w-full pl-8 pr-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-sm font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                Chủ đề nội dung (Niche)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500 text-xs font-medium"
              >
                <option value="Công nghệ & AI">Công nghệ & AI</option>
                <option value="Ẩm thực & Du lịch">Ẩm thực & Du lịch</option>
                <option value="Thời trang & Làm đẹp">Thời trang & Làm đẹp</option>
                <option value="Kinh doanh & Marketing">Kinh doanh & Marketing</option>
                <option value="Giải trí & Đời sống">Giải trí & Đời sống</option>
                <option value="TikTok Shop & Bán hàng">TikTok Shop & Bán lẻ</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                Nhân viên phụ trách chính
              </label>
              <select
                value={manager}
                onChange={(e) => setManager(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500 text-xs font-medium"
              >
                {teamMembers.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name} ({m.roleTitle})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">
              Tiểu sử kênh (Bio)
            </label>
            <textarea
              rows={2}
              placeholder="Mô tả ngắn gọn mục tiêu hoặc nội dung kênh..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-xs"
            />
          </div>

          {/* TikTok API Auth simulation box */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2.5 text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <strong>Xác thực TikTok Open API:</strong> Hệ thống tự động đồng bộ video, lượt xem, người theo dõi và quyền đăng video trực tiếp sau khi hoàn tất kết nối.
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-md shadow-pink-500/20 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Đang ủy quyền...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Xác nhận & Thêm Kênh
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
