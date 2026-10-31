import { useState, useEffect } from 'react';
import { X, Key, ShieldCheck, Check, ExternalLink, HelpCircle, AlertCircle, Copy } from 'lucide-react';
import { buildTikTokAuthUrl } from '../utils/pkce';

interface TikTokApiSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveConfig: (config: TikTokApiConfig) => void;
  currentConfig?: TikTokApiConfig | null;
}

export interface TikTokApiConfig {
  clientKey: string;
  clientSecret: string;
  rapidApiKey?: string;
  redirectUri: string;
  isConfigured: boolean;
}

export const TikTokApiSettingsModal = ({
  isOpen,
  onClose,
  onSaveConfig,
  currentConfig,
}: TikTokApiSettingsModalProps) => {
  const [activeTab, setActiveTab] = useState<'official' | 'rapidapi'>('official');
  const [clientKey, setClientKey] = useState('aw9dxf9f6qpufpju');
  const [clientSecret, setClientSecret] = useState('jQfsFN3hLOWAx3BwBio9EfW9V0CDWfNY');
  const [rapidApiKey, setRapidApiKey] = useState('');
  const [copied, setCopied] = useState(false);

  const defaultRedirectUri = typeof window !== 'undefined' 
    ? `${window.location.origin}/auth/tiktok/callback`
    : 'http://localhost:5173/auth/tiktok/callback';

  useEffect(() => {
    if (currentConfig) {
      setClientKey(currentConfig.clientKey || 'aw9dxf9f6qpufpju');
      setClientSecret(currentConfig.clientSecret || 'jQfsFN3hLOWAx3BwBio9EfW9V0CDWfNY');
      setRapidApiKey(currentConfig.rapidApiKey || '');
    }
  }, [currentConfig]);

  if (!isOpen) return null;

  const handleCopyRedirectUri = () => {
    navigator.clipboard.writeText(defaultRedirectUri);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const config: TikTokApiConfig = {
      clientKey: clientKey.trim(),
      clientSecret: clientSecret.trim(),
      rapidApiKey: rapidApiKey.trim(),
      redirectUri: defaultRedirectUri,
      isConfigured: !!(clientKey.trim() || rapidApiKey.trim()),
    };
    onSaveConfig(config);
    onClose();
  };

  const handleStartOAuthLogin = async () => {
    if (!clientKey.trim()) return;
    try {
      const authUrl = await buildTikTokAuthUrl(clientKey.trim(), defaultRedirectUri);
      window.location.href = authUrl;
    } catch (err: any) {
      console.error('Failed to build TikTok auth URL:', err);
    }
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
              <h3 className="font-bold text-slate-900 text-base">Cấu Hình TikTok API Key</h3>
              <p className="text-xs text-slate-400">Tích hợp API để lấy video thật và đăng video tự động</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-100 px-6 pt-3 bg-slate-50/40">
          <button
            onClick={() => setActiveTab('official')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'official'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>TikTok for Developers (Khuyên dùng)</span>
          </button>

          <button
            onClick={() => setActiveTab('rapidapi')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'rapidapi'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>RapidAPI / Khác</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {activeTab === 'official' ? (
            <>
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200/70 text-xs text-emerald-900 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Kết nối chính thức (Official TikTok Open API v2):</strong> Cho phép kéo 100% video gốc, người theo dõi thật và kích hoạt tính năng <strong>Đăng video trực tiếp</strong> từ website lên kênh.
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Client Key (App ID) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: aw7abc1234def567..."
                  value={clientKey}
                  onChange={(e) => setClientKey(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Client Secret <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Ví dụ: 9a8b7c6d5e4f3a2b1c..."
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Redirect URI (Dán vào cài đặt App TikTok của bạn)</span>
                  <button
                    type="button"
                    onClick={handleCopyRedirectUri}
                    className="text-indigo-600 hover:text-indigo-800 text-[11px] font-semibold flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copied ? 'Đã copy!' : 'Sao chép'}</span>
                  </button>
                </label>
                <input
                  type="text"
                  readOnly
                  value={defaultRedirectUri}
                  className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-600 font-mono select-all"
                />
              </div>
            </>
          ) : (
            <>
              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200/70 text-xs text-blue-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong>RapidAPI / TikAPI:</strong> Dùng để quét dữ liệu công khai theo @username mà không cần đăng nhập. (Lưu ý: Không dùng để đăng video được).
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  RapidAPI Key (X-RapidAPI-Key)
                </label>
                <input
                  type="password"
                  placeholder="Dán key từ RapidAPI vào đây..."
                  value={rapidApiKey}
                  onChange={(e) => setRapidApiKey(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </>
          )}

          {/* Guide Note */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              Key của bạn được bảo mật an toàn 100% trên bộ nhớ trình duyệt (LocalStorage của thiết bị này) và không bị gửi đi bất kỳ máy chủ bên thứ ba nào.
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl"
            >
              Đóng
            </button>

            <div className="flex items-center gap-2">
              {clientKey.trim() && (
                <button
                  type="button"
                  onClick={handleStartOAuthLogin}
                  className="px-3.5 py-2 text-xs font-bold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Đăng nhập TikTok Ngay</span>
                </button>
              )}

              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-600/30 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Lưu Cấu Hình Key</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
