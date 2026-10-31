import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Send, 
  Check, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import type { TikTokChannel, ScheduledPost, UserProfile } from '../types/dashboard';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  channels: TikTokChannel[];
  initialChannelId?: string;
  currentUser: UserProfile;
  onPostCreated: (post: ScheduledPost) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  channels,
  initialChannelId,
  currentUser,
  onPostCreated,
}) => {
  const [selectedChannels, setSelectedChannels] = useState<string[]>(
    initialChannelId ? [initialChannelId] : [channels[0]?.id || '']
  );
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [scheduledDate, setScheduledDate] = useState('2026-11-01');
  const [scheduledHour, setScheduledHour] = useState('19:30');
  const [publishType, setPublishType] = useState<'schedule' | 'now'>('schedule');
  const [allowComments, setAllowComments] = useState(true);
  const [allowDuet, setAllowDuet] = useState(true);
  const [allowStitch, setAllowStitch] = useState(true);
  const [isCommercial, setIsCommercial] = useState(false);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const toggleChannel = (chId: string) => {
    if (selectedChannels.includes(chId)) {
      if (selectedChannels.length > 1) {
        setSelectedChannels(selectedChannels.filter((id) => id !== chId));
      }
    } else {
      setSelectedChannels([...selectedChannels, chId]);
    }
  };

  const selectAllChannels = () => {
    if (selectedChannels.length === channels.length) {
      setSelectedChannels([channels[0]?.id || '']);
    } else {
      setSelectedChannels(channels.map((c) => c.id));
    }
  };

  const addHashtag = (tag: string) => {
    if (!caption.includes(tag)) {
      setCaption((prev) => (prev ? `${prev} ${tag}` : tag));
    }
  };

  const trendingHashtags = [
    '#learnontiktok', 
    '#fyp', 
    '#xuhuong', 
    '#viral', 
    '#marketing', 
    '#ai', 
    '#review'
  ];

  const handleSubmit = (action: 'submit_approval' | 'direct_schedule' | 'draft') => {
    if (!title.trim() || selectedChannels.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const scheduledTimeStr = publishType === 'now' 
        ? 'Đăng ngay lập tức' 
        : `${scheduledDate} ${scheduledHour}`;

      let postStatus: ScheduledPost['status'] = 'draft';
      if (action === 'submit_approval') {
        postStatus = 'pending_approval';
      } else if (action === 'direct_schedule') {
        postStatus = publishType === 'now' ? 'published' : 'scheduled';
      }

      const extractedTags = caption.match(/#[a-zA-Z0-9_]+/g) || ['#tiktok'];

      const newPost: ScheduledPost = {
        id: `post-${Date.now()}`,
        channelIds: selectedChannels,
        title,
        caption,
        hashtags: extractedTags,
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
        videoDuration: '01:00',
        scheduledTime: scheduledTimeStr,
        status: postStatus,
        author: {
          id: currentUser.id,
          name: currentUser.name,
          avatar: currentUser.avatar,
          role: currentUser.roleTitle,
        },
        approver: action === 'direct_schedule' && (currentUser.role === 'boss' || currentUser.role === 'manager') 
          ? { name: currentUser.name, avatar: currentUser.avatar }
          : undefined,
        notes,
        allowComments,
        allowDuet,
        allowStitch,
        isCommercial,
      };

      onPostCreated(newPost);
      setIsSubmitting(false);
      onClose();
    }, 700);
  };

  const isBossOrManager = currentUser.role === 'boss' || currentUser.role === 'manager';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center font-black text-white text-base shadow-sm">
              ♪
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">Soạn & Lên Lịch Đăng Bài TikTok</h2>
              <p className="text-xs text-slate-300">
                Đăng đồng thời lên nhiều kênh & phân quyền phê duyệt bài
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
          {/* Channel selector checkboxes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-slate-800 text-xs">
                Chọn kênh TikTok đăng tải ({selectedChannels.length} đã chọn):
              </label>
              <button
                type="button"
                onClick={selectAllChannels}
                className="text-indigo-600 hover:text-indigo-800 font-semibold text-xs"
              >
                {selectedChannels.length === channels.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả kênh'}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
              {channels.map((ch) => {
                const isSelected = selectedChannels.includes(ch.id);
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => toggleChannel(ch.id)}
                    className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={ch.avatar}
                        alt={ch.name}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs truncate">{ch.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{ch.handle}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Video Upload Area simulation */}
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              Tệp Video TikTok (MP4, MOV tối đa 500MB)
            </label>
            <div className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-2xl p-5 text-center bg-slate-50/60 hover:bg-indigo-50/30 transition-all cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-2">
                <Upload className="w-5 h-5" />
              </div>
              <div className="font-semibold text-slate-800 text-xs">
                Kéo thả video vào đây, hoặc <span className="text-indigo-600 underline">bấm để chọn video</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Tỷ lệ chuẩn 9:16 (1080x1920) tối ưu cho TikTok FYP
              </p>
            </div>
          </div>

          {/* Title & Caption */}
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              Tiêu đề nội dung <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="VD: Hướng dẫn cách quay video triệu view..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-xs font-semibold text-slate-800"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold text-slate-800">
                Nội dung chú thích (Caption & Hashtags)
              </label>
              <span className="text-[11px] text-slate-400">{caption.length}/2200 ký tự</span>
            </div>
            <textarea
              rows={3}
              placeholder="Viết caption cuốn hút, kêu gọi bình luận và gắn hashtag liên quan..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-xs leading-relaxed"
            />

            {/* Trending tags quick click */}
            <div className="flex items-center gap-1.5 flex-wrap mt-2">
              <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Gợi ý Hashtag hot:
              </span>
              {trendingHashtags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => addHashtag(tag)}
                  className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md text-[10px] font-medium transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule or Instant Post */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <label className="block font-bold text-slate-800 mb-2">Thời gian xuất bản</label>
            <div className="flex items-center gap-4 mb-3">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                <input
                  type="radio"
                  name="publishType"
                  checked={publishType === 'schedule'}
                  onChange={() => setPublishType('schedule')}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span>Lên lịch theo khung giờ vàng</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                <input
                  type="radio"
                  name="publishType"
                  checked={publishType === 'now'}
                  onChange={() => setPublishType('now')}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span>Đăng ngay lập tức</span>
              </label>
            </div>

            {publishType === 'schedule' && (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] text-slate-500 font-medium mb-1">Ngày đăng</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 font-medium mb-1">Giờ đăng (Golden Hours)</label>
                  <select
                    value={scheduledHour}
                    onChange={(e) => setScheduledHour(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white font-semibold text-slate-800"
                  >
                    <option value="11:30">11:30 Trưa (Nghỉ trưa)</option>
                    <option value="18:00">18:00 Chiều (Tan làm/Học)</option>
                    <option value="19:30">19:30 Tối (Khung giờ vàng đỉnh)</option>
                    <option value="21:00">21:00 Tối (Thư giãn trước ngủ)</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* TikTok Advanced Settings */}
          <div>
            <label className="block font-bold text-slate-800 mb-2">Cài đặt tính năng TikTok</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowComments}
                  onChange={(e) => setAllowComments(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                <span className="font-medium text-slate-700">Cho phép Bình luận</span>
              </label>
              <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowDuet}
                  onChange={(e) => setAllowDuet(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                <span className="font-medium text-slate-700">Cho phép Duet</span>
              </label>
              <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowStitch}
                  onChange={(e) => setAllowStitch(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                <span className="font-medium text-slate-700">Cho phép Stitch</span>
              </label>
              <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={isCommercial}
                  onChange={(e) => setIsCommercial(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                <span className="font-medium text-slate-700">Gắn nhãn QC / Shop</span>
              </label>
            </div>
          </div>

          {/* Notes for Approver / Sếp */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Ghi chú cho Sếp / Trưởng nhóm (Nội dung cần lưu ý khi duyệt)
            </label>
            <input
              type="text"
              placeholder="VD: Em đã chỉnh hook 3 giây đầu giật gân hơn, Sếp xem duyệt sớm giúp em nhé!"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-xs"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-[11px] text-slate-500">
              Người tạo: <strong className="text-slate-800">{currentUser.name}</strong> ({currentUser.roleTitle})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSubmit('draft')}
              className="px-3.5 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-100 font-semibold transition-colors"
            >
              Lưu bản nháp
            </button>

            {isBossOrManager ? (
              <button
                type="button"
                disabled={isSubmitting || !title.trim()}
                onClick={() => handleSubmit('direct_schedule')}
                className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                <ShieldCheck className="w-4 h-4" />
                {publishType === 'now' ? 'Phê duyệt & Đăng ngay' : 'Phê duyệt & Lên lịch'}
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting || !title.trim()}
                onClick={() => handleSubmit('submit_approval')}
                className="px-5 py-2 bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-md shadow-pink-500/20 flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                Gửi Sếp phê duyệt
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
