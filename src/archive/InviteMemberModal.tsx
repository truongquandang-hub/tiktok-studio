import React, { useState } from 'react';
import { X, UserPlus, Crown, Zap, Video, Mic } from 'lucide-react';
import type { TeamMember, TikTokChannel, UserRole } from '../types/dashboard';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  channels: TikTokChannel[];
  onAddMember: (member: TeamMember) => void;
}

export const InviteMemberModal: React.FC<InviteMemberModalProps> = ({
  isOpen,
  onClose,
  channels,
  onAddMember,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('boss');
  const [assignedChannels, setAssignedChannels] = useState<string[]>(['all']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const roleTitles: Record<UserRole, string> = {
    boss: 'Sếp / Giám Đốc (Owner)',
    manager: 'Content Lead / Quản Lý Kênh',
    editor: 'Senior Video Editor',
    creator: 'Content Creator & VJ',
  };

  const handleToggleChannel = (id: string) => {
    if (id === 'all') {
      setAssignedChannels(['all']);
      return;
    }

    const withoutAll = assignedChannels.filter((c) => c !== 'all');
    if (withoutAll.includes(id)) {
      const filtered = withoutAll.filter((c) => c !== id);
      setAssignedChannels(filtered.length === 0 ? ['all'] : filtered);
    } else {
      setAssignedChannels([...withoutAll, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const avatarUrl = role === 'boss'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80';

      const newMember: TeamMember = {
        id: `user-${Date.now()}`,
        name,
        email,
        phone: phone || '0988 888 999',
        role,
        roleTitle: roleTitles[role],
        avatar: avatarUrl,
        assignedChannels,
        status: 'active',
        activeTasks: 0,
      };

      onAddMember(newMember);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">Thêm Thành Viên & Mời Sếp</h2>
              <p className="text-xs text-slate-300">Phân quyền quản lý kênh và phê duyệt nội dung</p>
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
              Họ và Tên <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="VD: Trần Văn Sếp, Nguyễn Thị Hằng..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                Email làm việc <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="email@company.vn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                Số điện thoại
              </label>
              <input
                type="tel"
                placeholder="0912 345 678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-xs"
              />
            </div>
          </div>

          {/* Role selector */}
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              Vai trò & Cấp bậc phân quyền:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {/* Boss */}
              <button
                type="button"
                onClick={() => setRole('boss')}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  role === 'boss'
                    ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-400/20 text-amber-950'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
                  <Crown className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">Sếp / Giám Đốc (Owner)</div>
                  <div className="text-[10px] text-slate-500">Toàn quyền mọi kênh, duyệt bài, xem tài chính</div>
                </div>
              </button>

              {/* Manager */}
              <button
                type="button"
                onClick={() => setRole('manager')}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  role === 'manager'
                    ? 'border-indigo-600 bg-indigo-50/80 ring-2 ring-indigo-400/20 text-indigo-950'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">Content Lead / Quản Lý</div>
                  <div className="text-[10px] text-slate-500">Giao task, duyệt bài các kênh được chỉ định</div>
                </div>
              </button>

              {/* Editor */}
              <button
                type="button"
                onClick={() => setRole('editor')}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  role === 'editor'
                    ? 'border-cyan-600 bg-cyan-50/80 ring-2 ring-cyan-400/20 text-cyan-950'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-600 text-white flex items-center justify-center shrink-0">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">Video Editor (Dựng phim)</div>
                  <div className="text-[10px] text-slate-500">Nhận task dựng video, nộp bài duyệt</div>
                </div>
              </button>

              {/* Creator */}
              <button
                type="button"
                onClick={() => setRole('creator')}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  role === 'creator'
                    ? 'border-pink-600 bg-pink-50/80 ring-2 ring-pink-400/20 text-pink-950'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-pink-600 text-white flex items-center justify-center shrink-0">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">Creator / VJ / KOC</div>
                  <div className="text-[10px] text-slate-500">Quay video, viết kịch bản, nộp duyệt bài</div>
                </div>
              </button>
            </div>
          </div>

          {/* Channels permissions */}
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              Phân quyền quản lý kênh TikTok:
            </label>
            <div className="space-y-1.5 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
              <label className="flex items-center gap-2 p-1.5 hover:bg-white rounded-lg cursor-pointer font-medium text-slate-800">
                <input
                  type="checkbox"
                  checked={assignedChannels.includes('all')}
                  onChange={() => handleToggleChannel('all')}
                  className="rounded text-indigo-600"
                />
                <span>🌐 Tất cả các kênh trong hệ thống</span>
              </label>

              {channels.map((ch) => (
                <label
                  key={ch.id}
                  className="flex items-center gap-2 p-1.5 hover:bg-white rounded-lg cursor-pointer text-slate-700"
                >
                  <input
                    type="checkbox"
                    checked={assignedChannels.includes(ch.id) || assignedChannels.includes('all')}
                    disabled={assignedChannels.includes('all')}
                    onChange={() => handleToggleChannel(ch.id)}
                    className="rounded text-indigo-600"
                  />
                  <span>
                    {ch.name} <strong className="text-slate-400">({ch.handle})</strong>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 hover:opacity-95 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-md shadow-indigo-500/20 disabled:opacity-50"
            >
              <UserPlus className="w-4 h-4" />
              {role === 'boss' ? 'Gửi Lời Mời Đến Sếp' : 'Thêm Thành Viên Vào Team'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
