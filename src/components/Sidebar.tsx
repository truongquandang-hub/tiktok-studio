import { 
  BarChart3, 
  Calendar, 
  Plus, 
  Send, 
  LayoutGrid, 
  Flame, 
  MessageCircle, 
  ShieldCheck, 
  HelpCircle,
  CheckCircle2,
  RefreshCw,
  Trash2
} from 'lucide-react';
import type { TikTokAccount, MainTab } from '../types/dashboard';

interface SidebarProps {
  accounts: TikTokAccount[];
  activeAccount: TikTokAccount;
  onSelectAccount: (account: TikTokAccount) => void;
  onOpenConnectAccount: () => void;
  onOpenPublisher: () => void;
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  onSyncAccount: (account: TikTokAccount) => void;
  onDeleteAccount: (account: TikTokAccount) => void;
  onOpenApiSettings: () => void;
  isApiConfigured?: boolean;
}

export const Sidebar = ({ 
  accounts,
  activeAccount,
  onSelectAccount,
  onOpenConnectAccount,
  onOpenPublisher,
  currentTab,
  onSelectTab,
  onSyncAccount,
  onDeleteAccount,
  onOpenApiSettings,
  isApiConfigured = false
}: SidebarProps) => {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0 shrink-0 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-black text-cyan-400 flex items-center justify-center font-black text-xl shadow-lg shadow-cyan-500/20 ring-1 ring-slate-700">
            ♪
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-white text-base tracking-tight">
              TikTok Studio
              <span className="text-[10px] bg-cyan-950 text-cyan-400 font-bold px-1.5 py-0.5 rounded border border-cyan-800/60 uppercase">PRO</span>
            </div>
            <div className="text-xs text-slate-400">Quản lý đa kênh TikTok</div>
          </div>
        </div>
      </div>

      {/* Quick Action: Publish Video Button */}
      <div className="p-3 pb-2">
        <button
          onClick={onOpenPublisher}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-600 hover:opacity-95 text-white rounded-xl text-xs font-bold shadow-md shadow-pink-500/20 transition-all cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>+ Đăng Video Lên TikTok</span>
        </button>
      </div>

      {/* Main Navigation */}
      <div className="px-3 py-2">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1.5">
          Tính Năng Chính
        </div>
        <nav className="space-y-1">
          <button 
            onClick={() => onSelectTab('analytics')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              currentTab === 'analytics'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Phân Tích & Chỉ Số</span>
          </button>

          <button 
            onClick={() => onSelectTab('channels')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              currentTab === 'channels'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Dàn Kênh TikTok ({accounts.length})</span>
            <span className="ml-auto text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-1.5 py-0.2 rounded">MATRIX</span>
          </button>

          <button 
            onClick={onOpenPublisher}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>Lên Lịch Xuất Bản</span>
          </button>

          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Xu Hướng & Âm Thanh Hot</span>
          </button>

          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>Quản Lý Bình Luận</span>
            <span className="ml-auto text-[10px] bg-pink-500 text-white font-bold px-1.5 py-0.2 rounded-full">5</span>
          </button>
        </nav>
      </div>

      {/* Dedicated TikTok Accounts List */}
      <div className="px-3 py-2 flex-1 overflow-y-auto">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2 flex items-center justify-between">
          <span>Kênh TikTok Đang Chạy ({accounts.length})</span>
          <button 
            onClick={onOpenConnectAccount}
            className="text-[10px] text-cyan-400 hover:underline flex items-center gap-0.5 font-bold"
          >
            <Plus className="w-3 h-3" /> Thêm kênh
          </button>
        </div>

        <div className="space-y-1.5">
          {accounts.map((acc) => {
            const isSelected = activeAccount.id === acc.id;
            return (
              <div
                key={acc.id}
                onClick={() => onSelectAccount(acc)}
                className={`w-full group text-left p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800/90 border-cyan-400 text-white shadow-sm'
                    : 'border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="relative shrink-0">
                    <img 
                      src={acc.avatar} 
                      alt={acc.displayName} 
                      className="w-7 h-7 rounded-full object-cover" 
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 bg-black text-cyan-400 p-0.5 rounded-full border border-slate-700">
                      <span className="text-[7px] font-black leading-none block">♪</span>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="font-bold text-xs text-slate-200 truncate flex items-center gap-1">
                      <span>{acc.displayName}</span>
                      {acc.isVerified && (
                        <CheckCircle2 className="w-3 h-3 text-sky-400 fill-sky-950 shrink-0" />
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {acc.username} • {(acc.followers / 1000).toFixed(0)}k followers
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSyncAccount(acc);
                    }}
                    title="Đồng bộ lại kênh này"
                    className="p-1 text-slate-400 hover:text-cyan-300 hover:bg-slate-700/60 rounded-md transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteAccount(acc);
                    }}
                    title="Xóa kênh này khỏi hệ thống"
                    className="p-1 text-slate-400 hover:text-rose-400 hover:bg-rose-500/20 rounded-md transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>

                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400 ml-0.5"></span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-800 space-y-1 text-xs">
        <button 
          onClick={onOpenApiSettings}
          className="w-full flex items-center justify-between px-3 py-2 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800/80 transition-all cursor-pointer group border border-transparent hover:border-slate-700"
        >
          <div className="flex items-center gap-2.5">
            <ShieldCheck className={`w-4 h-4 ${isApiConfigured ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span className="font-medium text-xs">TikTok API Integration</span>
          </div>
          {isApiConfigured ? (
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
              Active
            </span>
          ) : (
            <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded group-hover:text-cyan-400">
              Cài Key
            </span>
          )}
        </button>
        <button 
          onClick={onOpenApiSettings}
          className="w-full flex items-center gap-2.5 px-3 py-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800/50 cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Hướng dẫn & Hỗ trợ</span>
        </button>
      </div>
    </aside>
  );
};
