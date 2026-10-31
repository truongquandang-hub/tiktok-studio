import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const CLIENT_KEY = process.env.VITE_TIKTOK_CLIENT_KEY || 'aw9dxf9f6qpufpju';
const CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET || 'jQfsFN3hLOWAx3BwBio9EfW9V0CDWfNY';

function tiktokDevMiddleware(): Plugin {
  return {
    name: 'tiktok-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || '', `http://${req.headers.host}`);

        // 1. Exchange OAuth Code for Access Token
        if (url.pathname === '/api/tiktok/token' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const parsed = JSON.parse(body || '{}');
              const { code, redirect_uri, code_verifier } = parsed;

              const tokenRes = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                  client_key: CLIENT_KEY,
                  client_secret: CLIENT_SECRET,
                  code: code || '',
                  grant_type: 'authorization_code',
                  redirect_uri: redirect_uri || 'http://localhost:5173/auth/tiktok/callback',
                  code_verifier: code_verifier || '',
                }),
              });

              const data = await tokenRes.json();
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // 2. Fetch User Profile
        if (url.pathname === '/api/tiktok/user' && req.method === 'GET') {
          const authHeader = req.headers.authorization;
          const accessToken = authHeader?.replace('Bearer ', '') || url.searchParams.get('access_token');

          if (!accessToken) {
            res.statusCode = 401;
            res.end(JSON.stringify({ error: 'Missing access_token' }));
            return;
          }

          try {
            const fields = 'open_id,union_id,avatar_url,avatar_url_100,avatar_large_url,display_name,bio_description,profile_deep_link,is_verified,follower_count,following_count,likes_count,video_count';
            const userRes = await fetch(`https://open.tiktokapis.com/v2/user/info/?fields=${fields}`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            const data = await userRes.json();
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        // 3. Fetch User Videos
        if (url.pathname === '/api/tiktok/videos' && req.method === 'POST') {
          const authHeader = req.headers.authorization;
          const accessToken = authHeader?.replace('Bearer ', '');

          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const parsed = JSON.parse(body || '{}');
              const token = accessToken || parsed.access_token;
              const cursor = parsed.cursor || 0;
              const maxCount = parsed.max_count || 15;

              const fields = 'id,title,video_description,duration,cover_image_url,embed_html,embed_link,like_count,comment_count,share_count,view_count';
              const vidRes = await fetch(`https://open.tiktokapis.com/v2/video/list/?fields=${fields}`, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ max_count: maxCount, cursor }),
              });

              const data = await vidRes.json();
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    tiktokDevMiddleware(),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
