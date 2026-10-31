import {
  Activity,
  CheckCircle,
  Send,
  RefreshCw,
  CheckSquare,
  Video,
  BarChart3,
  MessageSquare,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

type ActivityType = "approval" | "post" | "sync" | "task" | "video" | "analytics" | "comment" | "team";

interface ActivityItem {
  id: number;
  avatar: string;
  name: string;
  action: string;
  timeAgo: string;
  type: ActivityType;
}

const typeConfig: Record<ActivityType, { icon: LucideIcon; border: string; iconColor: string; bgColor: string }> = {
  approval: {
    icon: CheckCircle,
    border: "border-l-emerald-500",
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  post: {
    icon: Send,
    border: "border-l-pink-500",
    iconColor: "text-pink-600",
    bgColor: "bg-pink-50",
  },
  sync: {
    icon: RefreshCw,
    border: "border-l-blue-500",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  task: {
    icon: CheckSquare,
    border: "border-l-amber-500",
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  video: {
    icon: Video,
    border: "border-l-violet-500",
    iconColor: "text-violet-600",
    bgColor: "bg-violet-50",
  },
  analytics: {
    icon: BarChart3,
    border: "border-l-cyan-500",
    iconColor: "text-cyan-600",
    bgColor: "bg-cyan-50",
  },
  comment: {
    icon: MessageSquare,
    border: "border-l-orange-500",
    iconColor: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  team: {
    icon: UserPlus,
    border: "border-l-indigo-500",
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
};

const activities: ActivityItem[] = [
  {
    id: 1,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    name: "Trần Linh Chi",
    action: "đã phê duyệt bài đăng 'Top 5 công cụ AI...' trên kênh Creator Studio VN",
    timeAgo: "2 phút trước",
    type: "approval",
  },
  {
    id: 2,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    name: "Vũ Tuấn Anh",
    action: "đã hoàn thành dựng video cho kênh Sài Gòn Ăn Gì",
    timeAgo: "15 phút trước",
    type: "video",
  },
  {
    id: 3,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    name: "Đặng Minh Trang",
    action: "đã nộp bài mới chờ Sếp duyệt trên kênh GenZ Style",
    timeAgo: "30 phút trước",
    type: "post",
  },
  {
    id: 4,
    avatar: "",
    name: "Hệ thống",
    action: "tự động đồng bộ số liệu 4 kênh TikTok thành công",
    timeAgo: "1 giờ trước",
    type: "sync",
  },
  {
    id: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    name: "Sếp Nguyễn Hoàng Long",
    action: "đã giao việc mới cho Vũ Tuấn Anh",
    timeAgo: "2 giờ trước",
    type: "task",
  },
  {
    id: 6,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    name: "Phạm Thanh Hà",
    action: "đã bình luận phản hồi trên bài 'Trend mùa hè 2025' kênh GenZ Style",
    timeAgo: "3 giờ trước",
    type: "comment",
  },
  {
    id: 7,
    avatar: "",
    name: "Hệ thống",
    action: "báo cáo analytics tuần kênh Creator Studio VN đã sẵn sàng",
    timeAgo: "4 giờ trước",
    type: "analytics",
  },
  {
    id: 8,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    name: "Lê Quốc Bảo",
    action: "đã tham gia nhóm quản lý kênh Sài Gòn Ăn Gì",
    timeAgo: "5 giờ trước",
    type: "team",
  },
  {
    id: 9,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    name: "Trần Linh Chi",
    action: "đã lên lịch đăng 3 video cho tuần tới trên kênh Creator Studio VN",
    timeAgo: "6 giờ trước",
    type: "post",
  },
  {
    id: 10,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    name: "Sếp Nguyễn Hoàng Long",
    action: "đã phê duyệt ngân sách quảng cáo tháng 11 cho tất cả kênh",
    timeAgo: "Hôm qua",
    type: "approval",
  },
];

function SystemAvatar({ config }: { config: (typeof typeConfig)[ActivityType] }) {
  const Icon = config.icon;
  return (
    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${config.bgColor}`}>
      <Icon className={`h-4 w-4 ${config.iconColor}`} />
    </div>
  );
}

export const ActivityFeed = () => {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600">
          <Activity className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Hoạt Động Gần Đây Của Team</h3>
          <p className="text-xs text-slate-500">Theo dõi mọi hoạt động trên các kênh TikTok</p>
        </div>
      </div>

      {/* Activity list */}
      <div className="max-h-[480px] overflow-y-auto">
        <ul className="divide-y divide-slate-50">
          {activities.map((item) => {
            const config = typeConfig[item.type];
            const Icon = config.icon;

            return (
              <li
                key={item.id}
                className={`flex items-start gap-3 border-l-3 px-5 py-3.5 transition-colors hover:bg-slate-50/60 ${config.border}`}
              >
                {/* Avatar */}
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-white"
                  />
                ) : (
                  <SystemAvatar config={config} />
                )}

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-snug text-slate-700">
                    <span className="font-semibold text-slate-900">{item.name}</span>{" "}
                    {item.action}
                  </p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <Icon className={`h-3 w-3 ${config.iconColor}`} />
                    <span className="text-xs text-slate-400">{item.timeAgo}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 px-5 py-3 text-center">
        <button className="cursor-pointer text-xs font-medium text-teal-600 transition-colors hover:text-teal-700">
          Xem tất cả hoạt động →
        </button>
      </div>
    </div>
  );
};
