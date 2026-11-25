// صفحة مستقلة لكل إعلان (للسيو ومعاينة الرابط على واتساب وفيسبوك)
// الرابط: /ad/<id>  ← vercel.json بيحوّله لهنا. الدالة بتجيب index.html وتحقن فيه بيانات الإعلان.
const SB = 'https://lualdzpsgehrowewsixr.supabase.co';
const KEY = 'sb_publishable_9jbY4Z8Cw9nfjrFsPHC58Q_xDbvsG2g'; // مفتاح عام، مش سري
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const CATS = { car_sale: 'عربيات للبيع', car_rent: 'عربيات للإيجار', bike_sale: 'موتوسيكلات للبيع', bike_rent: 'موتوسيكلات للإيجار', apt_sale: 'شقق للبيع', apt_rent: 'شقق للإيجار', phone: 'موبايلات', laptop: 'لابتوبات', web: 'مواقع ويب', app: 'تطبيقات وأنظمة', other: 'أخرى' };

module.exports = async (req, res) => {
  const origin = 'https://' + req.headers.host;
  const id = String((req.query && req.query.id) || '');
  let shell;
  try { shell = await (await fetch(origin + '/index.html')).text(); }
  catch (e) { res.statusCode = 502; return res.end('Temporary error'); }

  let ad = null;
  if (UUID.test(id)) {
    try {
      const r = await fetch(`${SB}/rest/v1/ads?id=eq.${id}&select=id,title,description,price,currency,city,category,images,status,created_at&limit=1`, { headers: { apikey: KEY } });
      const rows = r.ok ? await r.json() : [];
      ad = rows && rows[0] && rows[0].status !== 'hidden' ? rows[0] : null;
    } catch (e) { ad = null; }
  }

  // نشيل الميتا القديمة عشان ما تتكررش
  shell = shell
    .replace(/<meta property="og:[^>]*>\s*/g, '')
    .replace(/<meta name="twitter:[^>]*>\s*/g, '')
    .replace(/<meta name="description"[^>]*>\s*/g, '')
    .replace(/<head[^>]*>/, m => m + '<base href="/">');

  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (!ad) {
    shell = shell.replace('</head>', '<meta name="robots" content="noindex"></head>');
    res.statusCode = 404;
    res.setHeader('Cache-Control', 'public, max-age=60');
    return res.end(shell);
  }

  const url = origin + '/ad/' + ad.id;
  const cur = ad.currency || 'EGP';
  const price = ad.price != null ? Number(ad.price).toLocaleString('en-US') + ' ' + cur : '';
  const plain = String(ad.description || '').replace(/\s+/g, ' ').trim();
  const desc = [price, ad.city, plain].filter(Boolean).join(' · ').slice(0, 200);
  const title = `${ad.title} | Zilx خدمات`;
  const imgs = (ad.images || []).filter(u => /^https:\/\//.test(u));
  const ld = {
    '@context': 'https://schema.org', '@type': 'Product', name: ad.title, description: plain.slice(0, 500) || ad.title,
    category: CATS[ad.category] || ad.category, url,
    ...(imgs.length ? { image: imgs } : {}),
    ...(ad.price != null ? { offers: { '@type': 'Offer', price: Number(ad.price), priceCurrency: cur, availability: ad.status === 'sold' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock', url } } : {})
  };
  const head = [
    `<link rel="canonical" href="${esc(url)}">`,
    `<meta name="description" content="${esc(desc)}">`,
    `<meta property="og:type" content="product">`,
    `<meta property="og:site_name" content="Zilx خدمات">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(desc)}">`,
    `<meta property="og:url" content="${esc(url)}">`,
    imgs[0] ? `<meta property="og:image" content="${esc(imgs[0])}">` : '',
    `<meta name="twitter:card" content="${imgs[0] ? 'summary_large_image' : 'summary'}">`,
    `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`
  ].join('\n');
  shell = shell.replace(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`).replace('</head>', head + '\n</head>');
  shell = shell.replace(/<body([^>]*)>/, (m) => m + `<noscript><h1>${esc(ad.title)}</h1><p>${esc(price)} ${esc(ad.city || '')}</p><p>${esc(plain)}</p></noscript>`);

  res.statusCode = 200;
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
  res.end(shell);
};
