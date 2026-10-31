import React, { useState } from 'react';
import { X, CheckSquare } from 'lucide-react';
import type { ChannelTask, TeamMember, TikTokChannel, UserProfile } from '../types/dashboard';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  channels: TikTokChannel[];
  teamMembers: TeamMember[];
  currentUser: UserProfile;
  onAddTask: (task: ChannelTask) => void;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  channels,
  teamMembers,
  currentUser,
  onAddTask,
}) => {
  const [title, setTitle] = useState('');
  const [channelId, setChannelId] = useState(channels[0]?.id || '');
  const [assignedMemberId, setAssignedMemberId] = useState(teamMembers[1]?.id || '');
  const [dueDate, setDueDate] = useState('2026-11-03');
  const [priority, setPriority] = useState<ChannelTask['priority']>('high');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const assignedMember = teamMembers.find((m) => m.id === assignedMemberId) || teamMembers[0];

    const newTask: ChannelTask = {
      id: `task-${Date.now()}`,
      channelId,
      title,
      description,
      assignedTo: {
        id: assignedMember.id,
        name: assignedMember.name,
        avatar: assignedMember.avatar,
        role: assignedMember.roleTitle,
      },
      createdBy: {
        name: currentUser.name,
        avatar: currentUser.avatar,
      },
      dueDate,
      priority,
      status: 'todo',
    };

    onAddTask(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 to-indigo-950 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/30 text-indigo-300 flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">Giao Việc Mới Cho Team</h2>
              <p className="text-xs text-slate-300">Phân công quay dựng, kịch bản hoặc chăm sóc kênh</p>
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
              Tên công việc / Yêu cầu <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="VD: Dựng video review ẩm thực tập 4, Lên 10 kịch bản trend..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm font-semibold text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                Kênh TikTok liên quan
              </label>
              <select
                value={channelId}
                onChange={(e) => setChannelId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white text-slate-700 font-semibold text-xs"
              >
                {channels.map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    {ch.name} ({ch.handle})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                Giao cho thành viên nào
              </label>
              <select
                value={assignedMemberId}
                onChange={(e) => setAssignedMemberId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white text-slate-700 font-semibold text-xs"
              >
                {teamMembers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.roleTitle})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                Hạn chót hoàn thành (Deadline)
              </label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                Mức độ ưu tiên
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as ChannelTask['priority'])}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white font-semibold text-xs"
              >
                <option value="urgent">🔴 Khẩn cấp (Làm ngay)</option>
                <option value="high">🟠 Ưu tiên cao</option>
                <option value="medium">🟡 Bình thường</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">
              Mô tả chi tiết yêu cầu & ghi chú
            </label>
            <textarea
              rows={3}
              placeholder="Yêu cầu cụ thể: thời lượng, hook mở đầu, nhạc nền, tài liệu tham khảo..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-xs"
            />
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
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
            >
              <CheckSquare className="w-4 h-4" />
              Giao Việc Ngay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
