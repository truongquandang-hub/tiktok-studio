import { useState, useEffect } from 'react';
import { X, Check, Edit3, Users, Video, UserCheck, Image, Tag } from 'lucide-react';
import type { TikTokAccount } from '../types/dashboard';

interface EditChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: TikTokAccount | null;
  onSaveAccount: (updatedAccount: TikTokAccount) => void;
}

export const EditChannelModal = ({
  isOpen,
  onClose,
  account,
  onSaveAccount,
}: EditChannelModalProps) => {
  const [displayName, setDisplayName] = useState('');
  const [category, setCategory] = useState('');
  const [followers, setFollowers] = useState<number>(0);
  const [following, setFollowing] = useState<number>(0);
  const [totalVideos, setTotalVideos] = useState<number>(0);
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (account) {
      setDisplayName(account.displayName);
      setCategory(account.category || 'Thời trang & Đời sống');
      setFollowers(account.followers);
      setFollowing(account.following);
      setTotalVideos(account.totalVideos);
      setAvatar(account.avatar);
    }
  }, [account]);

  if (!isOpen || !account) return null;

  const categories = [
    'Thời trang & Đời sống',
    'Công nghệ & AI',
    'Ẩm thực & Review',
    'Giải trí & Hài hước',
    'Kinh doanh & Bán hàng',
    'Giáo dục & Kỹ năng'
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: TikTokAccount = {
      ...account,
      displayName: displayName.trim() || account.displayName,
      category,
      followers: Number(followers) || 0,
      following: Number(following) || 0,
      totalVideos: Number(totalVideos) || 0,
      avatar: avatar.trim() || account.avatar,
      views30d: Math.round((Number(followers) || 0) * 14.5),
    };
    onSaveAccount(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Khớp Số Liệu Thực Tế Kênh</h3>
              <p className="text-xs text-slate-400">Điều chỉnh số liệu đúng với tài khoản TikTok thật của bạn</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/70 text-xs text-amber-900 flex items-start gap-2.5">
            <span className="text-base">💡</span>
            <div>
              <strong>Đồng bộ khớp 100% ngoài đời:</strong> Bạn hãy điền chính xác số Follower, Video thực tế của kênh <strong>{account.username}</strong> vào đây. Toàn bộ biểu đồ và phân tích sẽ được vẽ lại theo số thật này.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tên hiển thị kênh
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Tag className="w-3 h-3 text-slate-400" />
                Chủ đề ngành hàng
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Users className="w-3 h-3 text-indigo-500" />
                Followers thật
              </label>
              <input
                type="number"
                value={followers}
                onChange={(e) => setFollowers(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <UserCheck className="w-3 h-3 text-pink-500" />
                Đang theo dõi
              </label>
              <input
                type="number"
                value={following}
                onChange={(e) => setFollowing(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Video className="w-3 h-3 text-cyan-500" />
                Tổng số video
              </label>
              <input
                type="number"
                value={totalVideos}
                onChange={(e) => setTotalVideos(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Image className="w-3 h-3 text-slate-400" />
              Link ảnh đại diện Avatar thật (Tùy chọn)
            </label>
            <input
              type="text"
              placeholder="https://..."
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono text-[11px]"
            />
          </div>

          {/* Footer buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-600/30 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Lưu & Cập Nhật Số Liệu Thật</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
