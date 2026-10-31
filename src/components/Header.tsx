import { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Download, 
  RefreshCw, 
  Check, 
  ChevronDown, 
  Plus, 
  CheckCircle2,
  BarChart3,
  Layers,
  Trash2
} from 'lucide-react';
import type { DatePreset, TikTokAccount, MainTab } from '../types/dashboard';

interface HeaderProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  datePreset: DatePreset;
  onSelectDatePreset: (preset: DatePreset) => void;
  isComparing: boolean;
  onToggleComparing: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onExport: () => void;
  onOpenPublisher: () => void;
  onOpenConnectAccount: () => void;
  accounts: TikTokAccount[];
  activeAccount: TikTokAccount;
  onSelectAccount: (acc: TikTokAccount) => void;
  onDeleteAccount: (acc: TikTokAccount) => void;
}

export const Header = ({
  currentTab,
  onSelectTab,
  datePreset,
  onSelectDatePreset,
  onRefresh,
  isRefreshing,
  onExport,
  onOpenPublisher,
  onOpenConnectAccount,
  accounts,
  activeAccount,
  onSelectAccount,
  onDeleteAccount,
}: HeaderProps) => {
  const [showPresetsDropdown, setShowPresetsDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const presetsMap: Record<DatePreset, { label: string; dateRange: string }> = {
    '7d': { label: '7 ngày qua', dateRange: '24/10/2026 - 31/10/2026' },
    '30d': { label: '30 ngày qua', dateRange: '01/10/2026 - 31/10/2026' },
    'month': { label: 'Tháng này', dateRange: '01/10/2026 - 31/10/2026' },
    'prev_month': { label: 'Tháng trước', dateRange: '01/09/2026 - 30/09/2026' },
    'custom': { label: 'Tùy chọn...', dateRange: '01/10/2026 - 31/10/2026' },
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-3 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left: Account Switcher & Tabs */}
        <div className="flex items-center flex-wrap gap-4">
          {/* Account Selector Pill */}
          <div className="relative">
            <button
              onClick={() => setShowAccountDropdown(!showAccountDropdown)}
              className="flex items-center gap-2.5 bg-slate-100 hover:bg-slate-200/70 border border-slate-200 rounded-xl px-3 py-1.5 transition-colors"
            >
              <div className="relative">
                <img
                  src={activeAccount.avatar}
                  alt={activeAccount.displayName}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
                  <span>{activeAccount.username}</span>
                  {activeAccount.isVerified && (
                    <CheckCircle2 className="w-3 h-3 text-sky-500 fill-sky-50" />
                  )}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
            </button>

            {/* Dropdown for Accounts */}
            {showAccountDropdown && (
              <div 
                className="absolute left-0 mt-1.5 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 text-xs"
                onMouseLeave={() => setShowAccountDropdown(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
                  <span>Kênh TikTok đang kết nối ({accounts.length})</span>
                </div>

                <div className="p-1 space-y-1">
                  {accounts.map((acc) => (
                    <div
                      key={acc.id}
                      onClick={() => {
                        onSelectAccount(acc);
                        setShowAccountDropdown(false);
                      }}
                      className={`w-full text-left p-2 rounded-xl flex items-center justify-between transition-colors cursor-pointer group ${
                        acc.id === activeAccount.id ? 'bg-indigo-50/70 text-indigo-900 font-semibold' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img src={acc.avatar} alt={acc.displayName} className="w-7 h-7 rounded-full object-cover shrink-0" />
                        <div className="min-w-0">
                          <div className="font-bold flex items-center gap-1 truncate">
                            <span>{acc.displayName}</span>
                            {acc.isVerified && <span className="text-sky-500 text-[10px]">✓</span>}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">{acc.username} • {acc.followers.toLocaleString()} follower</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        {acc.id === activeAccount.id && <Check className="w-4 h-4 text-indigo-600" />}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowAccountDropdown(false);
                            onDeleteAccount(acc);
                          }}
                          title="Xóa kênh này"
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-1.5 mt-1 border-t border-slate-100 px-2">
                  <button
                    onClick={() => {
                      setShowAccountDropdown(false);
                      onOpenConnectAccount();
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center justify-center gap-1.5 text-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Thêm kênh TikTok mới</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Mode Tabs: Analytics vs Multi-Channel Overview */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200/60">
            <button
              onClick={() => onSelectTab('analytics')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                currentTab === 'analytics'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Phân Tích Kênh</span>
            </button>

            <button
              onClick={() => onSelectTab('channels')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                currentTab === 'channels'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Quản Lý Đa Kênh ({accounts.length})</span>
            </button>
          </div>
        </div>

        {/* Right: Publish Button & Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* CREATE / PUBLISH VIDEO BUTTON */}
          <button
            onClick={onOpenPublisher}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-600 hover:opacity-95 text-white text-xs font-bold rounded-xl shadow-md shadow-pink-500/20 transition-all cursor-pointer transform hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Đăng Video Lên TikTok</span>
          </button>

          {/* Refresh Data button */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Đồng bộ chỉ số"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors border border-slate-200/80"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-indigo-600' : ''}`} />
          </button>

          {/* Date Picker Presets (if in analytics tab) */}
          {currentTab === 'analytics' && (
            <div className="relative">
              <button
                onClick={() => setShowPresetsDropdown(!showPresetsDropdown)}
                className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-300/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
              >
                <CalendarIcon className="w-3.5 h-3.5 text-indigo-600" />
                <span>{presetsMap[datePreset].label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showPresetsDropdown && (
                <div 
                  className="absolute right-0 mt-1 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 z-50 text-xs"
                  onMouseLeave={() => setShowPresetsDropdown(false)}
                >
                  {(Object.keys(presetsMap) as DatePreset[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        onSelectDatePreset(key);
                        setShowPresetsDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                        datePreset === key ? 'text-indigo-600 font-semibold bg-indigo-50/50' : 'text-slate-600'
                      }`}
                    >
                      <span>{presetsMap[key].label}</span>
                      {datePreset === key && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Export Report */}
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Xuất PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};
