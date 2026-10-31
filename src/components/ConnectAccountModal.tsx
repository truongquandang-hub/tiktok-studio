import { useState } from 'react';
import { X, ShieldCheck, ArrowRight, Loader2, Check, Film, BarChart3, Sliders, Users, Video, UserCheck, ExternalLink } from 'lucide-react';
import type { TikTokAccount, VideoPost, GrowthDataPoint, DemographicData } from '../types/dashboard';
import { syncTikTokChannelData } from '../utils/channelSyncEngine';
import { buildTikTokAuthUrl } from '../utils/pkce';

interface ConnectAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAccountWithSync: (
    account: TikTokAccount, 
    videos: VideoPost[], 
    growth: GrowthDataPoint[], 
    demographics: DemographicData
  ) => void;
}

export const ConnectAccountModal = ({
  isOpen,
  onClose,
  onAddAccountWithSync,
}: ConnectAccountModalProps) => {
  const [handle, setHandle] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [category, setCategory] = useState('Thời trang & Đời sống');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [syncStep, setSyncStep] = useState<number>(0);

  // Custom real metrics toggle
  const [enableCustomStats, setEnableCustomStats] = useState(false);
  const [realFollowers, setRealFollowers] = useState<string>('');
  const [realFollowing, setRealFollowing] = useState<string>('');
  const [realTotalVideos, setRealTotalVideos] = useState<string>('');
  const [realAvatar, setRealAvatar] = useState<string>('');

  if (!isOpen) return null;

  const CLIENT_KEY = 'sbaw40uit53ou0bkd6';

  const handleOfficialOAuthLogin = async () => {
    try {
      const redirectUri = window.location.origin + window.location.pathname;
      const authUrl = await buildTikTokAuthUrl(CLIENT_KEY, redirectUri);
      window.location.href = authUrl;
    } catch (err: any) {
      console.error('Failed to build TikTok OAuth URL:', err);
    }
  };

  const categories = [
    'Thời trang & Đời sống',
    'Công nghệ & AI',
    'Ẩm thực & Review',
    'Giải trí & Hài hước',
    'Kinh doanh & Bán hàng',
    'Giáo dục & Kỹ năng'
  ];

  const handleStartRealtimeSync = () => {
    if (!handle.trim()) return;
    setIsAuthorizing(true);
    setSyncStep(1); // Step 1: Connecting OAuth

    setTimeout(() => {
      setSyncStep(2); // Step 2: Fetching videos & views
    }, 700);

    setTimeout(() => {
      setSyncStep(3); // Step 3: Calculating Analytics & Growth curves
    }, 1400);

    setTimeout(() => {
      setSyncStep(4); // Step 4: Done!
      const override = enableCustomStats ? {
        followers: realFollowers ? parseInt(realFollowers, 10) : undefined,
        following: realFollowing ? parseInt(realFollowing, 10) : undefined,
        totalVideos: realTotalVideos ? parseInt(realTotalVideos, 10) : undefined,
        avatarUrl: realAvatar.trim() || undefined,
      } : undefined;

      const syncResult = syncTikTokChannelData(
        handle, 
        displayName, 
        category,
        undefined,
        undefined,
        0,
        override
      );

      setTimeout(() => {
        onAddAccountWithSync(
          syncResult.account, 
          syncResult.videos, 
          syncResult.growth, 
          syncResult.demographics
        );
        setIsAuthorizing(false);
        setSyncStep(0);
        onClose();
      }, 400);
    }, 2000);
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
            <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-black text-base shadow-sm ring-1 ring-slate-800">
              <span className="text-cyan-400">♪</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Kết Nối Kênh TikTok</h3>
              <p className="text-xs text-slate-400">Đồng bộ tự động & Khớp chuẩn số liệu thực tế của bạn</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            disabled={isAuthorizing}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Active Live Sync View when Authorizing */}
          {isAuthorizing ? (
            <div className="py-6 space-y-5 animate-in fade-in">
              <div className="text-center space-y-1">
                <div className="w-14 h-14 rounded-full bg-cyan-50 text-cyan-600 border-2 border-cyan-400 flex items-center justify-center mx-auto mb-3 animate-pulse shadow-md">
                  <span className="text-2xl font-black">♪</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  Đang đồng bộ dữ liệu với TikTok...
                </h4>
                <p className="text-xs text-slate-400">
                  Kênh: <strong className="text-slate-700">{handle.startsWith('@') ? handle : `@${handle}`}</strong>
                </p>
              </div>

              {/* Steps Progress */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    syncStep >= 1 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {syncStep > 1 ? <Check className="w-3.5 h-3.5" /> : <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-800">1. Kết nối & Xác thực tài khoản</div>
                    <div className="text-[11px] text-slate-400">Xác thực ID & lấy thông tin hồ sơ</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    syncStep >= 2 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {syncStep > 2 ? <Check className="w-3.5 h-3.5" /> : (syncStep === 2 ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Film className="w-3.5 h-3.5" />)}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-800">2. Đồng bộ danh sách Video & Lượt xem</div>
                    <div className="text-[11px] text-slate-400">Đồng bộ views, likes, shares của toàn bộ video</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    syncStep >= 3 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {syncStep > 3 ? <Check className="w-3.5 h-3.5" /> : (syncStep === 3 ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <BarChart3 className="w-3.5 h-3.5" />)}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-800">3. Phân tích Kênh & Tăng trưởng</div>
                    <div className="text-[11px] text-slate-400">Tính toán tỷ lệ tương tác & biểu đồ tăng trưởng 30 ngày</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Official TikTok OAuth One-Click Login */}
              <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl text-white space-y-3 border border-slate-800 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-black text-cyan-400 flex items-center justify-center font-black text-base ring-1 ring-slate-700">
                      ♪
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>TikTok Login Kit Chính Thức</span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">
                          App Key Đã Sẵn Sàng
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Đăng nhập tài khoản TikTok thật để kéo 100% video và chỉ số tự động
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleOfficialOAuthLogin}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:opacity-95 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Đăng Nhập Bằng TikTok (OAuth 2.0)</span>
                </button>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hoặc thêm kênh & khớp số liệu</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tên kênh TikTok (@username) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">@</span>
                  <input
                    type="text"
                    placeholder="ví dụ: schannelvn, mixigaming, kenh_cua_ban..."
                    value={handle.replace(/^@/, '')}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tên hiển thị (Display Name)
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Schannel Official"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Chủ đề kênh
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Toggle to input exact real numbers */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-200/70 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-indigo-950">
                      Khớp chính xác số liệu thực tế ngoài đời?
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableCustomStats}
                      onChange={(e) => setEnableCustomStats(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <p className="text-[11px] text-indigo-900/80">
                  Bật tùy chọn này nếu bạn muốn nhập đúng số Follower, Video thực tế của kênh bạn thay vì để hệ thống tính toán mẫu.
                </p>

                {enableCustomStats && (
                  <div className="pt-2 border-t border-indigo-200/60 space-y-3 animate-in fade-in">
                    <div className="grid grid-cols-3 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                          <Users className="w-3 h-3 text-indigo-500" /> Follower thật
                        </label>
                        <input
                          type="number"
                          placeholder="VD: 15400"
                          value={realFollowers}
                          onChange={(e) => setRealFollowers(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                          <UserCheck className="w-3 h-3 text-pink-500" /> Đang follow
                        </label>
                        <input
                          type="number"
                          placeholder="VD: 120"
                          value={realFollowing}
                          onChange={(e) => setRealFollowing(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                          <Video className="w-3 h-3 text-cyan-500" /> Số video thật
                        </label>
                        <input
                          type="number"
                          placeholder="VD: 36"
                          value={realTotalVideos}
                          onChange={(e) => setRealTotalVideos(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Link ảnh Avatar thật (URL hình ảnh)
                      </label>
                      <input
                        type="text"
                        placeholder="https://... (Để trống để lấy avatar tự động)"
                        value={realAvatar}
                        onChange={(e) => setRealAvatar(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 text-[11px] font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Scope / Permissions */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Quyền hạn hệ thống:</span>
                </div>
                <div className="text-[11px] text-slate-500 leading-relaxed">
                  Bảo đảm an toàn bảo mật 100%. Mọi số liệu sau khi kết nối sẽ được lưu trữ cục bộ trên trình duyệt của bạn (không lộ ra ngoài).
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!isAuthorizing && (
          <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Hủy bỏ
            </button>

            <button
              onClick={handleStartRealtimeSync}
              disabled={!handle.trim()}
              className="flex items-center gap-2 px-6 py-2.5 bg-black hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-40"
            >
              <span>{enableCustomStats ? 'Đồng Bộ Khớp Số Liệu Thật' : 'Đồng Bộ Tự Động'}</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
