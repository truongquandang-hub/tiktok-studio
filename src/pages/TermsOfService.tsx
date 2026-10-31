import { Shield, ArrowLeft, CheckCircle2, Lock, FileText } from 'lucide-react';

export const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans py-12 px-4 sm:px-6 lg:px-8 antialiased">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200/80">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-black text-cyan-400 flex items-center justify-center font-black text-xl shadow-sm">
              ♪
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Terms of Service</h1>
              <p className="text-xs text-slate-400">Điều khoản dịch vụ sử dụng ứng dụng TikTok Studio</p>
            </div>
          </div>
          <a
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Về Dashboard</span>
          </a>
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-8 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
          <div><strong>Hiệu lực từ:</strong> 31/10/2026</div>
          <div>•</div>
          <div><strong>Ứng dụng:</strong> TikTok Studio Pro (Multi-Channel Manager)</div>
          <div>•</div>
          <div className="text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Tuân thủ TikTok Open API Guidelines
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              1. Chấp nhận các điều khoản
            </h2>
            <p>
              Bằng việc truy cập, kết nối tài khoản TikTok hoặc sử dụng bất kỳ tính năng nào của <strong>TikTok Studio Pro</strong> ("Ứng dụng", "chúng tôi"), bạn đồng ý tuân thủ và chịu sự ràng buộc bởi các Điều khoản dịch vụ này cùng Chính sách quyền riêng tư của chúng tôi. Nếu bạn không đồng ý với các điều khoản này, vui lòng ngừng sử dụng ứng dụng.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-600" />
              2. Kết nối và ủy quyền thông qua TikTok API
            </h2>
            <p>
              Ứng dụng của chúng tôi sử dụng giao thức chính thức <strong>TikTok Login Kit</strong> và <strong>Content Posting API</strong> từ TikTok for Developers để cung cấp các dịch vụ:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Đồng bộ và hiển thị thông tin hồ sơ kênh TikTok (Tên hiển thị, ảnh đại diện, số người theo dõi, số video).</li>
              <li>Hiển thị thống kê chỉ số video công khai (Lượt xem, lượt thích, bình luận, chia sẻ) để phục vụ việc phân tích hiệu quả kênh.</li>
              <li>Hỗ trợ người dùng tạo lịch và xuất bản video trực tiếp lên tài khoản TikTok đã được ủy quyền.</li>
            </ul>
            <p>
              Chúng tôi <strong>không bao giờ</strong> yêu cầu hoặc lưu trữ mật khẩu tài khoản TikTok của bạn. Quá trình xác thực được thực hiện hoàn toàn trên máy chủ bảo mật của TikTok thông qua chuẩn OAuth 2.0 PKCE.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-600" />
              3. Trách nhiệm của người dùng khi xuất bản nội dung
            </h2>
            <p>
              Khi sử dụng tính năng xuất bản video lên TikTok thông qua ứng dụng, bạn cam kết:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Bạn là chủ sở hữu hoặc có toàn quyền sử dụng, phân phối nội dung video, âm thanh và hình ảnh tải lên.</li>
              <li>Nội dung video tuân thủ nghiêm ngặt <strong>Tiêu chuẩn Cộng đồng của TikTok (TikTok Community Guidelines)</strong> và pháp luật hiện hành.</li>
              <li>Không tải lên nội dung spam, khiêu dâm, bạo lực, vi phạm bản quyền hoặc lừa đảo.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              4. Ngắt kết nối và gỡ bỏ dữ liệu
            </h2>
            <p>
              Bạn có toàn quyền ngắt kết nối kênh TikTok của mình khỏi ứng dụng bất kỳ lúc nào bằng nút <strong>"Xóa kênh"</strong> ngay trên giao diện bảng điều khiển, hoặc thu hồi quyền truy cập trong phần Cài đặt quyền riêng tư trên ứng dụng di động TikTok của bạn. Khi ngắt kết nối, toàn bộ dữ liệu phân tích liên quan sẽ bị xóa sạch khỏi bộ nhớ.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              5. Giới hạn trách nhiệm
            </h2>
            <p>
              Ứng dụng được cung cấp theo nguyên tắc "nguyên trạng" (as-is). Chúng tôi không chịu trách nhiệm đối với bất kỳ sự gián đoạn dịch vụ nào xuất phát từ việc bảo trì máy chủ của TikTok hoặc việc tài khoản của bạn bị tạm khóa do vi phạm Tiêu chuẩn Cộng đồng của TikTok.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900">6. Thông tin liên hệ</h2>
            <p>
              Nếu bạn có bất kỳ câu hỏi nào về Điều khoản dịch vụ này, vui lòng liên hệ với chúng tôi qua email hỗ trợ của nhà phát triển hoặc mục Hỗ trợ trên bảng điều khiển ứng dụng.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>© 2026 TikTok Studio Pro. Mọi quyền được bảo lưu.</div>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="text-indigo-600 hover:underline font-medium">Privacy Policy (Chính sách bảo mật)</a>
            <a href="/" className="text-slate-600 hover:underline">Về Trang Chủ</a>
          </div>
        </div>
      </div>
    </div>
  );
};
