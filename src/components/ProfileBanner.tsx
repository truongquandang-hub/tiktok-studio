import { ExternalLink, CheckCircle2, Video, Users, UserCheck, ShieldCheck, RefreshCw, Trash2, Edit3 } from 'lucide-react';
import type { TikTokAccount } from '../types/dashboard';

interface ProfileBannerProps {
  account: TikTokAccount;
  onSyncAccount: (account: TikTokAccount) => void;
  isSyncing?: boolean;
  onDeleteAccount: (account: TikTokAccount) => void;
  onEditAccount: (account: TikTokAccount) => void;
}

export const ProfileBanner = ({ 
  account, 
  onSyncAccount, 
  isSyncing = false, 
  onDeleteAccount,
  onEditAccount 
}: ProfileBannerProps) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Profile info */}
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <img
              src={account.avatar}
              alt={account.displayName}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-slate-100"
            />
            <div className="absolute -bottom-1 -right-1 bg-black text-cyan-400 p-1 rounded-full border-2 border-white shadow-xs">
              <span className="text-[10px] font-black leading-none block">♪</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">{account.displayName}</h2>
              {account.isVerified && (
                <CheckCircle2 className="w-4 h-4 text-sky-500 fill-sky-50" />
              )}
              <span className="text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> TikTok Content API Connected
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 flex-wrap">
              <span className="font-semibold text-slate-700">{account.username}</span>
              <span>•</span>
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-medium">{account.category}</span>
              <span>•</span>
              <a 
                href={`https://tiktok.com/${account.username}`} 
                target="_blank" 
                rel="noreferrer"
                className="text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5 hover:underline font-medium"
              >
                Xem trên ứng dụng TikTok <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Action Controls & Quick Numbers Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6">
          {/* Quick Numbers Bar */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-medium">Followers</div>
                <div className="text-sm font-bold text-slate-900">{account.followers.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-medium">Đang theo dõi</div>
                <div className="text-sm font-bold text-slate-900">{account.following.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Video className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-medium">Tổng video</div>
                <div className="text-sm font-bold text-slate-900">{account.totalVideos}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons: Sync, Edit & Delete */}
          <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-5">
            <button
              onClick={() => onSyncAccount(account)}
              disabled={isSyncing}
              title="Đồng bộ số liệu thời gian thực mới nhất từ TikTok"
              className="flex items-center gap-1.5 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition-all cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Đang đồng bộ...' : 'Đồng bộ'}</span>
            </button>

            <button
              onClick={() => onEditAccount(account)}
              title="Khớp chính xác số người theo dõi & số video ngoài đời của bạn"
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-500" />
              <span>Khớp số thật</span>
            </button>

            <button
              onClick={() => onDeleteAccount(account)}
              title="Ngắt kết nối và xóa kênh này khỏi hệ thống"
              className="flex items-center gap-1.5 px-2.5 py-2 text-rose-600 hover:text-white hover:bg-rose-600 bg-rose-50 border border-rose-200/60 text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Xóa</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
