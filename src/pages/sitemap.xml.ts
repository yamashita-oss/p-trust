import type { APIRoute } from 'astro';

const SITE = 'https://ptrust-web.com';

const pages = [
  { url: '/',            changefreq: 'weekly',  priority: '1.0' },
  { url: '/properties',  changefreq: 'daily',   priority: '0.9' },
  { url: '/about',       changefreq: 'monthly', priority: '0.8' },
  { url: '/news',        changefreq: 'weekly',  priority: '0.7' },
  { url: '/contact',     changefreq: 'monthly', priority: '0.7' },
  { url: '/guide/buy',   changefreq: 'monthly', priority: '0.6' },
  { url: '/guide/sell',  changefreq: 'monthly', priority: '0.6' },
  { url: '/faq',         changefreq: 'monthly', priority: '0.5' },
  { url: '/privacy',     changefreq: 'yearly',  priority: '0.3' },
  { url: '/legal',       changefreq: 'yearly',  priority: '0.3' },
];

const today = new Date().toISOString().split('T')[0];

function buildSitemap(entries: typeof pages): string {
  const urls = entries
    .map(
      ({ url, changefreq, priority }) => `
  <url>
    <loc>${SITE}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
}

export const GET: APIRoute = () => {
  return new Response(buildSitemap(pages), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
