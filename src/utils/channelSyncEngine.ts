import type { TikTokAccount, VideoPost, GrowthDataPoint, DemographicData } from '../types/dashboard';

interface SyncResult {
  account: TikTokAccount;
  videos: VideoPost[];
  growth: GrowthDataPoint[];
  demographics: DemographicData;
}

export interface RealChannelOverride {
  followers?: number;
  following?: number;
  totalVideos?: number;
  avatarUrl?: string;
  customVideos?: { title: string; views: number; likes: number; url?: string }[];
}

export function syncTikTokChannelData(
  handle: string, 
  displayName: string, 
  category: string,
  existingId?: string,
  existingAvatar?: string,
  boost: number = 0,
  realStats?: RealChannelOverride
): SyncResult {
  const cleanHandle = handle.trim().startsWith('@') ? handle.trim() : `@${handle.trim()}`;
  const cleanName = displayName.trim() || cleanHandle.replace('@', '');
  const accountId = existingId || `acc-${Date.now()}`;

  // Deterministic seed from handle string to generate consistent, realistic numbers
  let seed = 0;
  for (let i = 0; i < cleanHandle.length; i++) {
    seed += cleanHandle.charCodeAt(i);
  }

  // Follower base: Use realStats if provided, otherwise deterministic seed
  const baseFollowers = realStats?.followers && realStats.followers > 0 
    ? realStats.followers 
    : (35000 + (seed * 850) % 345000);

  const followers = baseFollowers + boost * 280;

  const following = realStats?.following && realStats.following >= 0 
    ? realStats.following 
    : (45 + (seed * 3) % 250);

  const growthRate = +(2.5 + (seed % 45) / 10).toFixed(1);

  const views30d = Math.round(followers * (12 + (seed % 15))) + boost * 3400;
  const engagementRate = +(11.5 + (seed % 65) / 10).toFixed(2);

  const totalVideos = realStats?.totalVideos && realStats.totalVideos > 0
    ? realStats.totalVideos
    : (24 + (seed % 60) + (boost > 0 ? 1 : 0));

  // Profile Avatars pool
  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
  ];
  const avatar = realStats?.avatarUrl?.trim() || existingAvatar || avatars[seed % avatars.length];

  // 1. Account object
  const account: TikTokAccount = {
    id: accountId,
    username: cleanHandle,
    displayName: cleanName,
    avatar,
    category: category || 'Thời trang & Đời sống',
    followers,
    following,
    totalVideos,
    views30d,
    engagementRate,
    growthRate,
    isVerified: followers > 100000,
    status: 'connected',
  };

  // 2. Generate Category-specific Videos
  const sampleThumbnails = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80',
  ];

  const getTitlesByCategory = (cat: string) => {
    if (cat.includes('Thời trang')) {
      return [
        `Gợi ý phối đồ mùa mới cực đỉnh cho các bạn trẻ phong cách Y2K 🔥 #${cleanHandle.replace('@', '')}`,
        `Unboxing thử set đồ hot trend TikTok Shop giá sinh viên chỉ từ 150k ✨👗`,
        `Top 3 cách biến tấu áo sơ mi đơn giản thành outfit đi tiệc sang chảnh 💃`,
        `Thử thách 7 ngày 7 phong cách khác nhau: Ngày nào là đẹp nhất? 📸`,
        `Điểm danh những phụ kiện nhỏ nhưng nâng tầm cả set đồ của bạn 🕶️`,
      ];
    }
    if (cat.includes('Ẩm thực')) {
      return [
        `Phát hiện quán ăn ngon đỉnh chóp giấu trong hẻm sâu cực đông khách 🍜 #${cleanHandle.replace('@', '')}`,
        `Review buffet hải sản 199k ngập tràn tôm cua tươi sống: Có đáng tiền? 🦀`,
        `Cách làm món bánh tráng cuốn sốt bơ béo ngậy chuẩn vị Sài Gòn tại nhà 🥢`,
        `Ăn sập khu phố ẩm thực đêm với 100k: No căng bụng mà rẻ bất ngờ 😋`,
        `Top 5 quán cà phê acoustic view hoàng hôn chill nhất cuối tuần ☕`,
      ];
    }
    if (cat.includes('Công nghệ')) {
      return [
        `Top 5 tính năng AI mới nhất vừa cập nhật giúp tăng tốc công việc gấp 10 lần 🤖`,
        `Đánh giá chi tiết smartphone camera đỉnh nhất phân khúc: Có đáng mua? 📱`,
        `3 mẹo bảo mật điện thoại cực kỳ quan trọng mà 90% người dùng bỏ quên 🔒`,
        `Góc làm việc công nghệ tối giản: Setup thế nào cho hiệu quả? 🖥️`,
        `Trải nghiệm công cụ tự động hóa video ngắn mới toanh cực hot ⚡`,
      ];
    }
    // Default / General
    return [
      `Bí quyết xây kênh TikTok triệu view từ con số 0 trong 30 ngày 🚀 #${cleanHandle.replace('@', '')}`,
      `Thuật toán TikTok mới nhất 2026: Đừng mắc phải 3 sai lầm này ❌`,
      `Hậu trường một ngày sáng tạo nội dung của Creator Full-time ✨`,
      `Trend mới này đang viral cực khủng, ai chưa làm thì thử ngay kẻo lỡ! 🔥`,
      `Cảm ơn mọi người đã đồng hành và ủng hộ kênh trong suốt thời gian qua ❤️`,
    ];
  };

  const titles = getTitlesByCategory(category);

  const videos: VideoPost[] = titles.map((title, idx) => {
    const videoViews = Math.round(followers * (0.8 + (idx * 0.5) + (seed % 3)));
    const videoLikes = Math.round(videoViews * 0.11);
    const videoComments = Math.round(videoLikes * 0.04);
    const videoShares = Math.round(videoLikes * 0.15);
    const videoSaves = Math.round(videoLikes * 0.18);
    const totalInteractions = videoLikes + videoComments + videoShares + videoSaves;
    const er = +((totalInteractions / videoViews) * 100).toFixed(2);

    const daysAgo = (idx * 3) + 1;
    const pubDate = `2026-10-${String(31 - daysAgo).padStart(2, '0')} 19:30`;

    return {
      id: `vid-sync-${accountId}-${idx}`,
      channelId: accountId,
      channelUsername: cleanHandle,
      title,
      thumbnail: sampleThumbnails[idx % sampleThumbnails.length],
      publishedAt: pubDate,
      duration: `00:${String(35 + (idx * 7) % 45).padStart(2, '0')}`,
      views: videoViews,
      likes: videoLikes,
      comments: videoComments,
      shares: videoShares,
      saves: videoSaves,
      engagementRate: er,
      url: `https://tiktok.com/${cleanHandle}`,
      status: 'published'
    };
  });

  // 3. Generate Growth curve specific to this channel
  const baseFollower = Math.round(followers * 0.94);
  const growth: GrowthDataPoint[] = [];
  for (let i = 1; i <= 16; i++) {
    const day = (i * 2) - 1;
    const progress = i / 16;
    const currentFollowers = Math.round(baseFollower + (followers - baseFollower) * progress);
    const dailyNew = Math.round(60 + (seed % 50) + Math.sin(i) * 35);
    const dailyViews = Math.round(views30d / 30 * (0.8 + Math.cos(i) * 0.3));
    const dailyInteractions = Math.round(dailyViews * (engagementRate / 100));

    growth.push({
      date: `Oct ${String(day).padStart(2, '0')}`,
      followers: currentFollowers,
      newFollowers: Math.max(20, dailyNew),
      views: dailyViews,
      interactions: dailyInteractions,
    });
  }

  // 4. Generate Demographics tailored to category
  const isFemaleHeavy = category.includes('Thời trang') || category.includes('Mỹ phẩm');
  const isMaleHeavy = category.includes('Công nghệ') || category.includes('Gaming');

  const femalePct = isFemaleHeavy ? 74 : (isMaleHeavy ? 32 : 58);
  const malePct = 100 - femalePct - 2;

  const demographics: DemographicData = {
    gender: [
      { name: 'Nữ (Female)', value: femalePct, color: '#ec4899' },
      { name: 'Nam (Male)', value: malePct, color: '#3b82f6' },
      { name: 'Khác', value: 2, color: '#94a3b8' },
    ],
    age: [
      { range: '13-17', percentage: isFemaleHeavy ? 12 : 7 },
      { range: '18-24', percentage: 48 },
      { range: '25-34', percentage: 31 },
      { range: '35-44', percentage: 10 },
      { range: '45+', percentage: 4 },
    ],
    countries: [
      { country: 'Việt Nam', flag: '🇻🇳', percentage: 86.5, count: (followers * 0.865).toFixed(0) },
      { country: 'Hoa Kỳ', flag: '🇺🇸', percentage: 6.2, count: (followers * 0.062).toFixed(0) },
      { country: 'Nhật Bản', flag: '🇯🇵', percentage: 3.5, count: (followers * 0.035).toFixed(0) },
      { country: 'Hàn Quốc', flag: '🇰🇷', percentage: 2.3, count: (followers * 0.023).toFixed(0) },
      { country: 'Khác', flag: '🌍', percentage: 1.5, count: (followers * 0.015).toFixed(0) },
    ],
  };

  return { account, videos, growth, demographics };
}
