export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const CLIENT_KEY = process.env.VITE_TIKTOK_CLIENT_KEY || 'sbaw40uit53ou0bkd6';
  const CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET || 'VBId5AjS0vMHKywbGaNcc7TICyoM3TIX';
  const { code, redirect_uri, code_verifier } = req.body || {};

  try {
    const tokenRes = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_key: CLIENT_KEY,
        client_secret: CLIENT_SECRET,
        code: code || '',
        grant_type: 'authorization_code',
        redirect_uri: redirect_uri || '',
        code_verifier: code_verifier || '',
      }),
    });
    const data = await tokenRes.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
