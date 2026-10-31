export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader?.replace('Bearer ', '') || req.body?.access_token;
  if (!accessToken) return res.status(401).json({ error: 'Missing access_token' });
  const cursor = req.body?.cursor || 0;
  const maxCount = req.body?.max_count || 15;

  try {
    const fields = 'id,title,video_description,duration,cover_image_url,embed_html,embed_link,like_count,comment_count,share_count,view_count';
    const vidRes = await fetch(`https://open.tiktokapis.com/v2/video/list/?fields=${fields}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ max_count: maxCount, cursor }),
    });
    const data = await vidRes.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
