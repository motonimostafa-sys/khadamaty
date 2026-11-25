module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400');
  res.end(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: https://${req.headers.host}/sitemap.xml\n`);
};
