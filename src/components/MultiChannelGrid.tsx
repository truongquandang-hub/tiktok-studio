import { Users, Eye, TrendingUp, Video, Plus, ArrowUpRight, CheckCircle2, ShieldCheck, Send, BarChart2, Trash2, RefreshCw } from 'lucide-react';
import type { TikTokAccount } from '../types/dashboard';

interface MultiChannelGridProps {
  accounts: TikTokAccount[];
  activeAccount: TikTokAccount;
  onSelectAccountAndGoToAnalytics: (account: TikTokAccount) => void;
  onOpenPublisherForAccount: (account: TikTokAccount) => void;
  onOpenConnectAccount: () => void;
  onDeleteAccount: (account: TikTokAccount) => void;
  onSyncAccount: (account: TikTokAccount) => void;
}

export const MultiChannelGrid = ({
  accounts,
  activeAccount,
  onSelectAccountAndGoToAnalytics,
  onOpenPublisherForAccount,
  onOpenConnectAccount,
  onDeleteAccount,
  onSyncAccount,
}: MultiChannelGridProps) => {
  const totalFollowers = accounts.reduce((acc, curr) => acc + curr.followers, 0);
  const totalViews = accounts.reduce((acc, curr) => acc + curr.views30d, 0);
  const totalVideos = accounts.reduce((acc, curr) => acc + curr.totalVideos, 0);
  const avgEngagement = accounts.length > 0 
    ? (accounts.reduce((acc, curr) => acc + curr.engagementRate, 0) / accounts.length).toFixed(2)
    : '0.00';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Network Overview Stats */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Tổng Quan Dàn Kênh TikTok (Multi-Channel Matrix)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Quản lý tập trung toàn bộ {accounts.length} kênh TikTok, đồng bộ chỉ số và xuất bản video đa kênh
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenConnectAccount}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-cyan-400" />
              <span>+ Kết nối thêm kênh TikTok</span>
            </button>
          </div>
        </div>

        {/* Aggregate Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Số kênh quản lý</span>
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Video className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900">{accounts.length} <span className="text-xs font-normal text-slate-400">kênh</span></div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-0.5">
              <ShieldCheck className="w-3 h-3" /> Tất cả đang kết nối API
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Tổng người theo dõi</span>
              <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Users className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900">{totalFollowers.toLocaleString()}</div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +14.8% toàn hệ thống
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Lượt xem 30 ngày</span>
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Eye className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900">{(totalViews / 1000000).toFixed(2)}M</div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +21.2% so với tháng trước
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Tỷ lệ tương tác TB</span>
              <div className="w-7 h-7 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900">{avgEngagement}%</div>
            <div className="text-[11px] text-slate-400 font-medium mt-1">
              Tính trên {totalVideos} video đã đăng
            </div>
          </div>
        </div>
      </div>

      {/* Channels Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Danh sách các kênh TikTok trong hệ thống ({accounts.length})
          </h3>
          <span className="text-xs text-slate-400">
            Dữ liệu đã được lưu trữ vĩnh viễn (kể cả khi reset trình duyệt)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {accounts.map((acc) => {
            const isActive = acc.id === activeAccount.id;
            return (
              <div
                key={acc.id}
                className={`bg-white rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between relative group ${
                  isActive
                    ? 'border-indigo-500 shadow-lg shadow-indigo-500/5 ring-2 ring-indigo-500/20'
                    : 'border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Channel Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={acc.avatar}
                          alt={acc.displayName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-100"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-black text-cyan-400 p-0.5 rounded-full border border-white">
                          <span className="text-[9px] font-black leading-none block">♪</span>
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1 font-bold text-slate-900 text-sm truncate">
                          <span>{acc.displayName}</span>
                          {acc.isVerified && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 fill-sky-50 shrink-0" />
                          )}
                        </div>
                        <div className="text-xs text-slate-500 truncate">{acc.username}</div>
                        <span className="inline-block mt-1 text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                          {acc.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                        LIVE
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSyncAccount(acc);
                        }}
                        title="Đồng bộ số liệu thời gian thực"
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteAccount(acc);
                        }}
                        title="Xóa kênh này khỏi hệ thống"
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Channel Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-100 text-xs mb-4">
                    <div>
                      <div className="text-[11px] text-slate-400 font-medium">Followers</div>
                      <div className="font-bold text-slate-900 text-sm">
                        {acc.followers.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-emerald-600 font-semibold">+{acc.growthRate}%</div>
                    </div>

                    <div>
                      <div className="text-[11px] text-slate-400 font-medium">Lượt xem 30 ngày</div>
                      <div className="font-bold text-slate-900 text-sm">
                        {(acc.views30d / 1000000).toFixed(2)}M
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">{acc.totalVideos} videos</div>
                    </div>

                    <div>
                      <div className="text-[11px] text-slate-400 font-medium">Tỷ lệ tương tác</div>
                      <div className="font-bold text-slate-900 text-sm">{acc.engagementRate}%</div>
                    </div>

                    <div>
                      <div className="text-[11px] text-slate-400 font-medium">Trạng thái API</div>
                      <div className="font-bold text-emerald-600 text-xs flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Đã kết nối
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectAccountAndGoToAnalytics(acc)}
                    className="flex-1 py-2 px-3 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BarChart2 className="w-3.5 h-3.5" />
                    <span>Xem phân tích</span>
                  </button>

                  <button
                    onClick={() => onOpenPublisherForAccount(acc)}
                    className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Đăng video</span>
                  </button>
                </div>
              </div>
            );
          })}

          {/* Add New Channel Card Button */}
          <div
            onClick={onOpenConnectAccount}
            className="border-2 border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50/40 hover:bg-indigo-50/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group min-h-[240px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center mb-3 transition-colors shadow-sm">
              <Plus className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-800 group-hover:text-indigo-600 mb-1">
              + Kết nối kênh TikTok mới
            </h4>
            <p className="text-xs text-slate-400 max-w-xs">
              Mở rộng hệ thống, thêm tài khoản TikTok vệ tinh hoặc kênh thương hiệu vào bảng quản lý chung.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
