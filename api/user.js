export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader?.replace('Bearer ', '') || req.query.access_token;
  if (!accessToken) return res.status(401).json({ error: 'Missing access_token' });

  try {
    const fields = 'open_id,union_id,avatar_url,avatar_url_100,avatar_large_url,display_name,bio_description,profile_deep_link,is_verified,follower_count,following_count,likes_count,video_count';
    const userRes = await fetch(`https://open.tiktokapis.com/v2/user/info/?fields=${fields}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await userRes.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
