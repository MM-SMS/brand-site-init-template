import type { MetadataRoute } from 'next'

// Block all search engine crawlers from indexing the entire site.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  }
}
