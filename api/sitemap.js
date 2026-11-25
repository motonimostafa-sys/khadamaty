// خريطة الموقع بتتولّد لوحدها من الإعلانات النشطة، على أي دومين الموقع شغال عليه
const SB = 'https://lualdzpsgehrowewsixr.supabase.co';
const KEY = 'sb_publishable_9jbY4Z8Cw9nfjrFsPHC58Q_xDbvsG2g';
module.exports = async (req, res) => {
  const origin = 'https://' + req.headers.host;
  let rows = [];
  try {
    const r = await fetch(`${SB}/rest/v1/ads?select=id,created_at&status=eq.active&order=created_at.desc&limit=5000`, { headers: { apikey: KEY } });
    if (r.ok) rows = await r.json();
  } catch (e) {}
  const pages = ['/', '/about.html', '/contact.html', '/privacy.html', '/terms.html'];
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    pages.map(p => `  <url><loc>${origin}${p}</loc></url>`).join('\n') + '\n' +
    rows.map(a => `  <url><loc>${origin}/ad/${a.id}</loc><lastmod>${String(a.created_at).slice(0, 10)}</lastmod></url>`).join('\n') + '\n</urlset>\n';
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.end(xml);
};
