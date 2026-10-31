import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  CheckSquare, 
  Crown, 
  Zap, 
  Video, 
  Mic, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Trash2,
  Phone,
  Mail,
  Plus
} from 'lucide-react';
import type { TeamMember, ChannelTask, TikTokChannel, UserProfile } from '../types/dashboard';

interface TeamTaskManagerProps {
  teamMembers: TeamMember[];
  tasks: ChannelTask[];
  channels: TikTokChannel[];
  currentUser: UserProfile;
  onOpenInviteMember: () => void;
  onOpenCreateTask: () => void;
  onUpdateTaskStatus: (taskId: string, newStatus: ChannelTask['status']) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TeamTaskManager: React.FC<TeamTaskManagerProps> = ({
  teamMembers,
  tasks,
  channels,
  currentUser,
  onOpenInviteMember,
  onOpenCreateTask,
  onUpdateTaskStatus,
  onDeleteTask,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'tasks' | 'members'>('tasks');
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [memberFilter, setMemberFilter] = useState<string>('all');

  const filteredTasks = tasks.filter((t) => {
    const matchChannel = channelFilter === 'all' || t.channelId === channelFilter;
    const matchMember = memberFilter === 'all' || t.assignedTo.id === memberFilter;
    return matchChannel && matchMember;
  });

  const todoTasks = filteredTasks.filter((t) => t.status === 'todo');
  const inProgressTasks = filteredTasks.filter((t) => t.status === 'in_progress');
  const reviewTasks = filteredTasks.filter((t) => t.status === 'review');
  const doneTasks = filteredTasks.filter((t) => t.status === 'done');

  const getRoleIcon = (role: TeamMember['role']) => {
    switch (role) {
      case 'boss':
        return <Crown className="w-4 h-4 text-amber-500" />;
      case 'manager':
        return <Zap className="w-4 h-4 text-indigo-500" />;
      case 'editor':
        return <Video className="w-4 h-4 text-cyan-500" />;
      case 'creator':
        return <Mic className="w-4 h-4 text-pink-500" />;
      default:
        return <Users className="w-4 h-4 text-slate-500" />;
    }
  };

  const getPriorityBadge = (priority: ChannelTask['priority']) => {
    switch (priority) {
      case 'urgent':
        return <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.5 rounded font-bold">Gấp</span>;
      case 'high':
        return <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded font-bold">Ưu tiên cao</span>;
      case 'medium':
        return <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">Bình thường</span>;
    }
  };

  const renderTaskCard = (task: ChannelTask) => {
    const channel = channels.find((c) => c.id === task.channelId);

    return (
      <div
        key={task.id}
        className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md transition-all space-y-3 group"
      >
        <div className="flex items-start justify-between gap-2">
          <span className="text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded-md flex items-center gap-1">
            <span className="text-pink-400">♪</span>
            {channel?.name || 'TikTok Channel'}
          </span>
          {getPriorityBadge(task.priority)}
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-900 leading-snug mb-1">
            {task.title}
          </h4>
          {task.description && (
            <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <img
              src={task.assignedTo.avatar}
              alt={task.assignedTo.name}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="truncate max-w-[110px] font-medium text-slate-700">
              {task.assignedTo.name}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <Clock className="w-3 h-3" />
            <span>{task.dueDate}</span>
          </div>
        </div>

        {/* Task Movement Controls */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
          <button
            onClick={() => onDeleteTask(task.id)}
            title="Xóa công việc này"
            className="p-1 text-slate-300 hover:text-rose-600 rounded transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1">
            {task.status !== 'todo' && (
              <button
                onClick={() => {
                  const prevStatus: Record<ChannelTask['status'], ChannelTask['status']> = {
                    done: 'review',
                    review: 'in_progress',
                    in_progress: 'todo',
                    todo: 'todo',
                  };
                  onUpdateTaskStatus(task.id, prevStatus[task.status]);
                }}
                title="Lùi trạng thái"
                className="p-1 text-slate-400 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded border border-slate-200"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            )}

            {task.status !== 'done' && (
              <button
                onClick={() => {
                  const nextStatus: Record<ChannelTask['status'], ChannelTask['status']> = {
                    todo: 'in_progress',
                    in_progress: 'review',
                    review: 'done',
                    done: 'done',
                  };
                  onUpdateTaskStatus(task.id, nextStatus[task.status]);
                }}
                className={`px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 ${
                  task.status === 'review'
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                <span>{task.status === 'review' ? 'Sếp duyệt xong' : 'Chuyển tiếp'}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Quản Trị Đội Ngũ & Phân Chia Công Việc
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Mời Sếp vào giám sát, phân quyền quản lý từng kênh TikTok và giao việc cho Creators/Video Editors.
            <span className="ml-1 text-slate-700 font-semibold">(Đang đăng nhập: {currentUser.name} - {currentUser.roleTitle})</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenInviteMember}
            className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-2xs transition-all"
          >
            <UserPlus className="w-4 h-4 text-pink-400" />
            <span>+ Mời Sếp / Thêm Thành Viên</span>
          </button>

          <button
            onClick={onOpenCreateTask}
            className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-pink-600 hover:opacity-95 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all hover:scale-102"
          >
            <CheckSquare className="w-4 h-4" />
            <span>+ Giao Việc Mới</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs: Bảng việc vs Danh sách thành viên */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('tasks')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'tasks'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Bảng Phân Việc (Kanban Tasks)</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeSubTab === 'tasks' ? 'bg-white text-indigo-600' : 'bg-slate-200 text-slate-700'
            }`}>
              {tasks.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('members')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'members'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Danh Sách Đội Ngũ & Phân Quyền</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeSubTab === 'members' ? 'bg-white text-indigo-600' : 'bg-slate-200 text-slate-700'
            }`}>
              {teamMembers.length}
            </span>
          </button>
        </div>

        {activeSubTab === 'tasks' && (
          <div className="flex items-center gap-2 text-xs">
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 font-medium"
            >
              <option value="all">Tất cả kênh</option>
              {channels.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  {ch.name}
                </option>
              ))}
            </select>

            <select
              value={memberFilter}
              onChange={(e) => setMemberFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 font-medium"
            >
              <option value="all">Tất cả nhân sự</option>
              {teamMembers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Subtab 1: Tasks Kanban Board */}
      {activeSubTab === 'tasks' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
          {/* Column 1: To Do */}
          <div className="bg-slate-100/70 rounded-2xl p-3.5 border border-slate-200">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                  Cần làm (To Do)
                </h3>
              </div>
              <span className="text-xs font-bold bg-white text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                {todoTasks.length}
              </span>
            </div>
            <div className="space-y-3">
              {todoTasks.map(renderTaskCard)}
              {todoTasks.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-400">Không có việc cần làm</div>
              )}
            </div>
          </div>

          {/* Column 2: In Progress */}
          <div className="bg-blue-50/50 rounded-2xl p-3.5 border border-blue-200/80">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                <h3 className="font-bold text-xs text-blue-900 uppercase tracking-wider">
                  Đang làm (In Progress)
                </h3>
              </div>
              <span className="text-xs font-bold bg-white text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                {inProgressTasks.length}
              </span>
            </div>
            <div className="space-y-3">
              {inProgressTasks.map(renderTaskCard)}
              {inProgressTasks.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-400">Chưa có task đang chạy</div>
              )}
            </div>
          </div>

          {/* Column 3: Review / Approval */}
          <div className="bg-amber-50/50 rounded-2xl p-3.5 border border-amber-200/80">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <h3 className="font-bold text-xs text-amber-900 uppercase tracking-wider">
                  Chờ Sếp nghiệm thu (Review)
                </h3>
              </div>
              <span className="text-xs font-bold bg-white text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
                {reviewTasks.length}
              </span>
            </div>
            <div className="space-y-3">
              {reviewTasks.map(renderTaskCard)}
              {reviewTasks.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-400">Không có bài chờ duyệt</div>
              )}
            </div>
          </div>

          {/* Column 4: Done */}
          <div className="bg-emerald-50/50 rounded-2xl p-3.5 border border-emerald-200/80">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <h3 className="font-bold text-xs text-emerald-900 uppercase tracking-wider">
                  Đã hoàn thành (Done)
                </h3>
              </div>
              <span className="text-xs font-bold bg-white text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                {doneTasks.length}
              </span>
            </div>
            <div className="space-y-3">
              {doneTasks.map(renderTaskCard)}
              {doneTasks.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-400">Chưa có task hoàn tất</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Team Members & Roles List */}
      {activeSubTab === 'members' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map((member) => {
              const isBoss = member.role === 'boss';

              return (
                <div
                  key={member.id}
                  className={`bg-white rounded-2xl border p-5 flex flex-col justify-between transition-all shadow-xs hover:shadow-md ${
                    isBoss
                      ? 'border-amber-300 ring-2 ring-amber-100 bg-gradient-to-br from-white via-amber-50/20 to-white'
                      : 'border-slate-200/90'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100 shadow-2xs"
                          />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-xs flex items-center justify-center">
                            {getRoleIcon(member.role)}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-slate-900 text-sm">{member.name}</h3>
                            {isBoss && (
                              <span className="text-[10px] bg-amber-500 text-white font-black px-1.5 py-0.2 rounded-full">
                                SẾP TỔNG
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-semibold text-indigo-600 mt-0.5">
                            {member.roleTitle}
                          </div>
                        </div>
                      </div>

                      <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                        Đang hoạt động
                      </span>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-1.5 py-3 border-y border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{member.phone || '0908 123 456'}</span>
                      </div>
                    </div>

                    {/* Assigned Channels */}
                    <div className="mt-3">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Kênh TikTok được phân quyền quản lý:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {member.assignedChannels.includes('all') ? (
                          <span className="text-[11px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded-md flex items-center gap-1">
                            🌐 Quản lý toàn bộ {channels.length} kênh trong hệ thống
                          </span>
                        ) : (
                          member.assignedChannels.map((chId) => {
                            const ch = channels.find((c) => c.id === chId);
                            return (
                              <span
                                key={chId}
                                className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200"
                              >
                                {ch ? ch.name : chId}
                              </span>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tasks count & actions */}
                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">
                      Đang phụ trách: <strong>{tasks.filter((t) => t.assignedTo.id === member.id && t.status !== 'done').length}</strong> việc
                    </span>

                    <button
                      onClick={onOpenCreateTask}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Giao việc
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
