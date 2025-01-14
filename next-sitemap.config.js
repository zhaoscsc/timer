const languages = [
    'x-default','de','en','es','fr','ja','ko','ru'
]


/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://minutetimers.net',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  
  additionalPaths: async (config) => {
    const result = [];

    for (const lang of languages) {
      result.push({
        loc: `/${lang}`,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      });

      for (let duration = 1; duration <= 120; duration++) {
        result.push({
          loc: `/seconds/${duration}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
          alternateRefs: languages.map(l => ({
            href: `${process.env.NEXT_PUBLIC_SITE_URL}${l === 'en' || l === 'x-default'  ? '' : `/${l}`}`,
            hreflang: l
          }))
        });
      }

      for (let duration = 1; duration <= 120; duration++) {
        result.push({
          loc: `/minutes/${duration}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
          // 添加多语言替代链接
          alternateRefs: languages.map(l => ({
            href: `${process.env.NEXT_PUBLIC_SITE_URL}${l === 'en' || l === 'x-default'  ? '' : `/${l}`}`,
            hreflang: l
          }))
        });
      }
      for (let duration = 1; duration <= 120; duration++) {
        result.push({
          loc: `/hours/${duration}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
          alternateRefs: languages.map(l => ({
            href: `${process.env.NEXT_PUBLIC_SITE_URL}${l === 'en' || l === 'x-default'  ? '' : `/${l}`}`,
            hreflang: l
          }))
        });
      }
    }
    
    return result;
  },

  alternateRefs: languages.map(lang => ({
    href: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}`,
    hreflang: lang
  }))
}
