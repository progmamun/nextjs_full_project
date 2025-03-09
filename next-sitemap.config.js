/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://rubshibir.vercel.app', // Replace with your site URL
  generateRobotsTxt: false, // We already have a custom robots.txt
  exclude: ['/studio*', '/api*', '/admin*', '/private*'],
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  outDir: 'public',
} 