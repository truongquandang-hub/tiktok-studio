import { useState, useRef } from 'react';
import { 
  X, 
  UploadCloud, 
  Sparkles, 
  Calendar, 
  Clock, 
  Loader2, 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  Music2, 
  AlertCircle,
  Layers,
  Check
} from 'lucide-react';
import type { TikTokAccount, VideoPost } from '../types/dashboard';

interface PostPublisherModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: TikTokAccount[];
  activeAccount: TikTokAccount;
  onPublishSuccess: (newPosts: VideoPost[]) => void;
}

export const PostPublisherModal = ({
  isOpen,
  onClose,
  accounts,
  activeAccount,
  onPublishSuccess,
}: PostPublisherModalProps) => {
  // Support multi-channel cross-posting: array of selected channel IDs
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([activeAccount.id]);
  const [caption, setCaption] = useState('Khám phá video mới cực hot trên kênh tuần này! 🔥 Mọi người thấy thế nào? #xuhuong #fyp #trending');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80');
  const [privacy, setPrivacy] = useState<'public' | 'friends' | 'private'>('public');
  const [allowComments, setAllowComments] = useState(true);
  const [allowDuet, setAllowDuet] = useState(true);
  const [allowStitch, setAllowStitch] = useState(true);
  const [timing, setTiming] = useState<'now' | 'schedule'>('now');
  const [scheduleDate, setScheduleDate] = useState('2026-11-01');
  const [scheduleTime, setScheduleTime] = useState('19:30');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const primaryAcc = accounts.find((a) => a.id === selectedAccountIds[0]) || activeAccount;

  const toggleAccountSelection = (accId: string) => {
    if (selectedAccountIds.includes(accId)) {
      if (selectedAccountIds.length > 1) {
        setSelectedAccountIds(selectedAccountIds.filter((id) => id !== accId));
      }
    } else {
      setSelectedAccountIds([...selectedAccountIds, accId]);
    }
  };

  const trendingHashtags = ['#xuhuong', '#fyp', '#viral', '#tiktokvn', '#review', '#trending'];

  const addHashtag = (tag: string) => {
    if (!caption.includes(tag)) {
      setCaption((prev) => `${prev} ${tag}`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreviewUrl(url);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 250);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);

      // Create a post for each selected channel
      const newPosts: VideoPost[] = selectedAccountIds.map((accId, idx) => {
        const targetAcc = accounts.find((a) => a.id === accId) || activeAccount;
        return {
          id: `vid-${Date.now()}-${idx}`,
          channelId: targetAcc.id,
          channelUsername: targetAcc.username,
          title: caption.trim() || 'Video TikTok mới xuất bản',
          thumbnail: videoPreviewUrl,
          publishedAt: timing === 'now' ? 'Vừa xong' : `${scheduleDate} ${scheduleTime}`,
          duration: '00:45',
          views: 0,
          likes: 0,
          comments: 0,
          shares: 0,
          saves: 0,
          engagementRate: 0,
          url: `https://tiktok.com/${targetAcc.username}`,
          status: timing === 'now' ? 'published' : 'scheduled',
          isNew: true,
        };
      });

      onPublishSuccess(newPosts);
      setIsSubmitting(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-pink-500 flex items-center justify-center text-white text-xs font-black shadow-md">
              +
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Xuất Bản Video Đa Kênh TikTok</h3>
              <p className="text-xs text-slate-400">Đăng tải trực tiếp hoặc lên lịch đồng thời cho nhiều kênh TikTok</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: 2 Columns */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-h-[75vh] overflow-y-auto">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Multi-channel selector */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Chọn các kênh TikTok đăng tải ({selectedAccountIds.length} kênh đã chọn)</span>
                </label>
                <span className="text-[10px] text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded">
                  Hỗ trợ Cross-post đa kênh
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {accounts.map((acc) => {
                  const isChecked = selectedAccountIds.includes(acc.id);
                  return (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => toggleAccountSelection(acc.id)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isChecked
                          ? 'border-indigo-600 bg-indigo-50/70 shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <img src={acc.avatar} alt={acc.displayName} className="w-6 h-6 rounded-full object-cover shrink-0" />
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-slate-800 truncate">{acc.displayName}</div>
                          <div className="text-[10px] text-slate-400 truncate">{acc.username}</div>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                        isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Video File Uploader */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tải lên tệp Video (MP4 / MOV)
              </label>
              <input
                type="file"
                ref={fileInputRef}
                accept="video/mp4,video/quicktime,video/webm"
                onChange={handleFileChange}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50/50 hover:bg-indigo-50/20 rounded-2xl p-4 text-center cursor-pointer transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-800">
                  {videoFile ? videoFile.name : 'Nhấp để chọn video hoặc kéo thả vào đây'}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Định dạng MP4/MOV, độ phân giải tối thiểu 720p, tối đa 1GB
                </div>
              </div>
            </div>

            {/* Caption / Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">
                  Nội dung mô tả (Caption & Hashtags)
                </label>
                <span className="text-[11px] text-slate-400 font-medium">
                  {caption.length} / 2200 ký tự
                </span>
              </div>
              <textarea
                rows={3}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Viết caption cuốn hút cho video TikTok của bạn..."
                className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none transition-all leading-relaxed"
              />

              {/* Hashtag Suggestions */}
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> Gợi ý:
                </span>
                {trendingHashtags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addHashtag(tag)}
                    className="text-[11px] font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 px-2 py-0.5 rounded-md transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Privacy & Settings */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Quyền riêng tư
                </label>
                <select
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-800"
                >
                  <option value="public">🌍 Công khai (Mọi người)</option>
                  <option value="friends">👥 Bạn bè</option>
                  <option value="private">🔒 Chỉ mình tôi</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Thời gian xuất bản
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setTiming('now')}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                      timing === 'now'
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-50 text-slate-700 border-slate-300'
                    }`}
                  >
                    Đăng ngay
                  </button>
                  <button
                    type="button"
                    onClick={() => setTiming('schedule')}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                      timing === 'schedule'
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-50 text-slate-700 border-slate-300'
                    }`}
                  >
                    Lên lịch
                  </button>
                </div>
              </div>
            </div>

            {/* Schedule Inputs if selected */}
            {timing === 'schedule' && (
              <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 grid grid-cols-2 gap-2 animate-in fade-in">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-indigo-600" /> Ngày đăng
                  </label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-indigo-600" /> Giờ đăng
                  </label>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            )}

            {/* Interactive TikTok Toggles */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-700 font-medium">Cho phép người xem bình luận</span>
                <input
                  type="checkbox"
                  checked={allowComments}
                  onChange={(e) => setAllowComments(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-700 font-medium">Cho phép Duet với video này</span>
                <input
                  type="checkbox"
                  checked={allowDuet}
                  onChange={(e) => setAllowDuet(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-700 font-medium">Cho phép Stitch ghép video</span>
                <input
                  type="checkbox"
                  checked={allowStitch}
                  onChange={(e) => setAllowStitch(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
              </div>
            </div>
          </div>

          {/* Right Column: 9:16 TikTok Smartphone Preview (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Xem trước giao diện TikTok (Preview)
            </div>

            {/* Phone Bezel */}
            <div className="w-[260px] h-[480px] bg-slate-950 rounded-[36px] p-2.5 shadow-2xl ring-4 ring-slate-800 relative overflow-hidden select-none">
              {/* Phone Screen */}
              <div className="w-full h-full bg-slate-900 rounded-[28px] overflow-hidden relative flex flex-col justify-between">
                {/* Background Image / Video Poster */}
                <img
                  src={videoPreviewUrl}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

                {/* Top Nav (Following | For You) */}
                <div className="relative z-10 pt-4 flex justify-center items-center gap-4 text-xs font-bold text-white/80">
                  <span className="text-white/60">Đang Follow</span>
                  <span className="text-white border-b-2 border-white pb-0.5">Dành cho bạn</span>
                </div>

                {/* Right Action Icons */}
                <div className="relative z-10 self-end mr-2 mb-16 flex flex-col items-center gap-3.5 text-white">
                  <div className="relative">
                    <img
                      src={primaryAcc.avatar}
                      alt="Avatar"
                      className="w-9 h-9 rounded-full border-2 border-white object-cover"
                    />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] font-bold">
                      +
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <Heart className="w-6 h-6 fill-white text-white drop-shadow" />
                    <span className="text-[10px] font-bold mt-0.5">0</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <MessageCircle className="w-6 h-6 fill-white text-white drop-shadow" />
                    <span className="text-[10px] font-bold mt-0.5">0</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <Bookmark className="w-6 h-6 fill-white text-white drop-shadow" />
                    <span className="text-[10px] font-bold mt-0.5">0</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <Share2 className="w-6 h-6 fill-white text-white drop-shadow" />
                    <span className="text-[10px] font-bold mt-0.5">Chia sẻ</span>
                  </div>
                </div>

                {/* Bottom Overlay: Account & Caption */}
                <div className="relative z-10 p-3 text-white">
                  <div className="font-bold text-xs flex items-center gap-1 mb-1">
                    <span>{primaryAcc.username}</span>
                    {primaryAcc.isVerified && (
                      <span className="w-3 h-3 rounded-full bg-sky-400 text-white flex items-center justify-center text-[8px] font-bold">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] line-clamp-3 leading-snug text-white/90 mb-2">
                    {caption || 'Nhập mô tả video...'}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-white/80">
                    <Music2 className="w-3 h-3 animate-spin" />
                    <span className="truncate">Nhạc gốc - {primaryAcc.displayName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-slate-400" />
            <span>Sẽ đăng đồng thời lên <strong>{selectedAccountIds.length} kênh TikTok</strong> được chọn.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Hủy
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-600 hover:opacity-95 text-white text-xs font-bold rounded-xl shadow-lg shadow-pink-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Đang xuất bản lên {selectedAccountIds.length} kênh ({uploadProgress}%)...</span>
                </>
              ) : (
                <>
                  <span>
                    {timing === 'now' 
                      ? `Đăng lên ${selectedAccountIds.length} kênh TikTok` 
                      : `Lên lịch ${selectedAccountIds.length} kênh`}
                  </span>
                  <span className="text-white font-black text-sm">🚀</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
