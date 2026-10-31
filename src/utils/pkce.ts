export function generateCodeVerifier(length: number = 64): string {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(values).map(x => possible[x % possible.length]).join('');
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const base64 = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return base64;
}

export async function buildTikTokAuthUrl(
  clientKey: string, 
  redirectUri: string,
  scope: string = 'user.info.basic,user.info.profile,user.info.stats'
): Promise<string> {
  const verifier = generateCodeVerifier();
  sessionStorage.setItem('tiktok_code_verifier', verifier);
  localStorage.setItem('tiktok_code_verifier', verifier);

  const challenge = await generateCodeChallenge(verifier);
  const state = `tt_${Date.now()}`;

  const params = new URLSearchParams({
    client_key: clientKey,
    scope,
    response_type: 'code',
    redirect_uri: redirectUri,
    state,
    code_challenge: challenge,
    code_challenge_method: 'S256',
  });

  return `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;
}
