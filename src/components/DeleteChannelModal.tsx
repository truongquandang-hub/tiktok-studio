import { X, Trash2, AlertTriangle } from 'lucide-react';
import type { TikTokAccount } from '../types/dashboard';

interface DeleteChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: TikTokAccount | null;
  onConfirmDelete: (accountId: string) => void;
}

export const DeleteChannelModal = ({
  isOpen,
  onClose,
  account,
  onConfirmDelete,
}: DeleteChannelModalProps) => {
  if (!isOpen || !account) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 pb-4 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2.5 text-rose-600">
            <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center">
              <Trash2 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Xác nhận ngắt kết nối kênh</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <img
              src={account.avatar}
              alt={account.displayName}
              className="w-12 h-12 rounded-full object-cover border border-slate-200"
            />
            <div className="min-w-0">
              <div className="font-bold text-slate-900 text-sm truncate">{account.displayName}</div>
              <div className="text-xs text-slate-500">{account.username}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {account.followers.toLocaleString()} người theo dõi • {account.totalVideos} video
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs leading-relaxed">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-0.5">Lưu ý trước khi xóa:</p>
              <p className="text-amber-800">
                Toàn bộ dữ liệu phân tích chỉ số, lịch sử video và biểu đồ tăng trưởng của kênh <strong>{account.username}</strong> sẽ bị gỡ bỏ khỏi bảng điều khiển. Bạn có thể kết nối lại kênh bất cứ lúc nào.
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200/70 rounded-xl transition-colors cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirmDelete(account.id);
              onClose();
            }}
            className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm shadow-rose-600/30 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Xác nhận xóa kênh</span>
          </button>
        </div>
      </div>
    </div>
  );
};
