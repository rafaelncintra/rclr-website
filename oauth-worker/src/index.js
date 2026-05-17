const SITE_ORIGIN = 'https://www.rclr.com.br';
const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/auth') {
      const params = new URLSearchParams({
        client_id: env.GITHUB_CLIENT_ID,
        scope: 'repo,user',
        redirect_uri: `${url.origin}/callback`,
      });
      return Response.redirect(`${GITHUB_AUTHORIZE_URL}?${params}`, 302);
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');

      if (!code) {
        return sendMessage('error', 'No code received from GitHub');
      }

      const tokenRes = await fetch(GITHUB_TOKEN_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: `${url.origin}/callback`,
        }),
      });

      const data = await tokenRes.json();

      if (data.error || !data.access_token) {
        return sendMessage('error', data.error_description || 'Token exchange failed');
      }

      return sendMessage('success', { token: data.access_token, provider: 'github' });
    }

    return new Response('Not found', { status: 404 });
  },
};

function sendMessage(status, content) {
  const message = status === 'success'
    ? `authorization:github:success:${JSON.stringify(content)}`
    : `authorization:github:error:${content}`;

  const html = `<!DOCTYPE html>
<html>
<body>
<script>
  (function() {
    function send(msg) {
      window.opener.postMessage(msg, '${SITE_ORIGIN}');
    }
    send('authorizing:github');
    send('${message.replace(/'/g, "\\'")}');
    window.close();
  })();
</script>
</body>
</html>`;

  return new Response(html, { headers: { 'Content-Type': 'text/html' } });
}
