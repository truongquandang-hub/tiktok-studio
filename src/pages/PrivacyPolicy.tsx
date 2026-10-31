import { ShieldCheck, ArrowLeft, Lock, Eye, Trash2, Database, HelpCircle } from 'lucide-react';

export const PrivacyPolicy = () => {
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
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
              <p className="text-xs text-slate-400">Chính sách bảo mật quyền riêng tư cho ứng dụng TikTok Studio</p>
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
          <div><strong>Cập nhật lần cuối:</strong> 31/10/2026</div>
          <div>•</div>
          <div><strong>Phiên bản:</strong> 1.0.0</div>
          <div>•</div>
          <div className="text-emerald-600 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Tuân thủ chính sách bảo vệ dữ liệu người dùng TikTok
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-indigo-600" />
              1. Giới thiệu & Cam kết bảo mật
            </h2>
            <p>
              <strong>TikTok Studio Pro</strong> ("Ứng dụng", "chúng tôi") cam kết tôn trọng và bảo vệ quyền riêng tư của người dùng. Chính sách quyền riêng tư này giải thích rõ ràng cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin khi bạn kết nối tài khoản TikTok vào hệ thống quản trị của chúng tôi.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-600" />
              2. Dữ liệu chúng tôi thu thập từ TikTok API
            </h2>
            <p>
              Khi bạn chủ động cấp quyền truy cập qua cổng <strong>TikTok Login Kit</strong>, chúng tôi chỉ thu thập các trường dữ liệu tối thiểu sau:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Thông tin hồ sơ công khai (user.info.basic, user.info.profile):</strong> Tên hiển thị (Display Name), ảnh đại diện (Avatar URL), Open ID duy nhất do TikTok cấp và liên kết trang cá nhân.</li>
              <li><strong>Số liệu thống kê kênh (user.info.stats):</strong> Tổng số người theo dõi (Followers), số tài khoản đang theo dõi (Following), tổng số lượt thích và tổng số video đã xuất bản.</li>
              <li><strong>Danh sách video công khai (video.list):</strong> Tiêu đề video, ảnh thu nhỏ (thumbnail), thời lượng, số lượt xem (views), lượt thích (likes), bình luận và chia sẻ của các video trên kênh.</li>
            </ul>
            <p className="p-3 rounded-xl bg-amber-50 text-amber-900 text-xs">
              <strong>Tuyệt đối không thu thập:</strong> Chúng tôi KHÔNG thu thập mật khẩu tài khoản TikTok, tin nhắn riêng tư (DM), danh bạ điện thoại, thông tin thẻ ngân hàng hoặc bất kỳ dữ liệu nhạy cảm nào khác.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-600" />
              3. Mục đích sử dụng dữ liệu
            </h2>
            <p>
              Toàn bộ dữ liệu thu thập được từ TikTok API chỉ được sử dụng cho các mục đích hợp pháp sau:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Hiển thị bảng thống kê, biểu đồ tăng trưởng 30 ngày và đo lường tỷ lệ tương tác (Engagement Rate) cho chính chủ sở hữu kênh.</li>
              <li>Hỗ trợ xuất bản video từ máy tính lên kênh TikTok của bạn thông qua <strong>Content Posting API</strong> theo yêu cầu rõ ràng của bạn.</li>
              <li>Phục vụ nhu cầu quản lý đa kênh tập trung cho người sáng tạo nội dung và doanh nghiệp.</li>
            </ul>
            <p className="font-semibold text-slate-800">
              Cam kết: Chúng tôi KHÔNG BAO GIỜ bán, cho thuê, chia sẻ hoặc thương mại hóa dữ liệu của bạn cho bất kỳ bên thứ ba hay mạng quảng cáo nào.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-rose-600" />
              4. Cơ chế lưu trữ và Hướng dẫn xóa dữ liệu (Data Deletion)
            </h2>
            <p>
              Dữ liệu của bạn được mã hóa an toàn và lưu trữ cục bộ trong trình duyệt của bạn (LocalStorage / SessionStorage). Bạn có toàn quyền xóa bỏ dữ liệu của mình bằng các cách sau:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li><strong>Xóa trực tiếp trên ứng dụng:</strong> Bấm vào nút <strong>"Xóa kênh"</strong> tại giao diện quản lý. Hệ thống sẽ lập tức xóa vĩnh viễn toàn bộ token, video và số liệu phân tích của kênh đó khỏi bộ nhớ.</li>
              <li><strong>Thu hồi quyền từ TikTok:</strong> Mở ứng dụng TikTok trên điện thoại ➔ Cài đặt & Quyền riêng tư ➔ Bảo mật ➔ Quản lý quyền ứng dụng ➔ Chọn <em>TikTok Studio</em> và bấm <strong>Gỡ bỏ quyền truy cập</strong>.</li>
            </ol>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              5. Tuân thủ chính sách nền tảng TikTok
            </h2>
            <p>
              Chính sách này hoàn toàn tuân thủ <strong>TikTok Developer Terms of Service</strong> và các quy định về bảo vệ dữ liệu người dùng (GDPR, CCPA). Nếu có bất kỳ sự thay đổi nào về chính sách bảo mật, chúng tôi sẽ cập nhật công khai ngay tại trang này.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              6. Liên hệ với bộ phận phụ trách bảo mật
            </h2>
            <p>
              Nếu bạn có bất kỳ thắc mắc nào về chính sách bảo mật hoặc yêu cầu hỗ trợ gỡ dữ liệu thủ công, xin vui lòng gửi email về bộ phận kỹ thuật ứng dụng hoặc qua khung hỗ trợ trực tuyến.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>© 2026 TikTok Studio Pro. Tất cả quyền được bảo lưu.</div>
          <div className="flex items-center gap-4">
            <a href="/terms" className="text-indigo-600 hover:underline font-medium">Terms of Service (Điều khoản dịch vụ)</a>
            <a href="/" className="text-slate-600 hover:underline">Về Trang Chủ</a>
          </div>
        </div>
      </div>
    </div>
  );
};
