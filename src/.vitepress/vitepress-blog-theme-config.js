import path from 'node:path';
import { writeFileSync } from 'node:fs';
import icons from '@jcamp/tailwindcss-plugin-icons';
import { defineConfigWithTheme } from 'vitepress';
import { Feed } from 'feed';
import { createContentLoader } from 'vitepress';
// import { genFeed } from './genFeed'
export async function genFeed(siteConfig) {
  const blogConfig = siteConfig.site.themeConfig.blog ?? {};
  const feedConfig = blogConfig.feed ?? {};
  const baseUrl = feedConfig.baseUrl ?? 'localhost/blog';
  const feed = new Feed({
    title: feedConfig.title ?? blogConfig.title ?? '',
    description: feedConfig.description ?? blogConfig.description ?? '',
    id: feedConfig.id ?? baseUrl,
    link: feedConfig.link ?? baseUrl,
    language: feedConfig.language ?? 'en',
    image: feedConfig.image ?? '',
    favicon: feedConfig.favicon ?? `${baseUrl}/favicon.ico`,
    copyright: feedConfig.copyright ?? '',
  });
  const pattern = `${blogConfig?.postsPath ?? '/blog/posts'}/**/*.md`;
  const output = feedConfig.outputPath ?? '/feed.rss';
  const posts = await createContentLoader(pattern, {
    excerpt: true,
    render: true,
  }).load();
  posts.sort(
    (a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
  );
  for (const { url, excerpt, frontmatter, html } of posts) {
    feed.addItem({
      title: frontmatter.title,
      id: `${baseUrl}${url}`,
      link: `${baseUrl}${url}`,
      description: excerpt,
      content: html,
      author: [
        {
          name: frontmatter.author,
          link: frontmatter.twitter
            ? `https://twitter.com/${frontmatter.twitter}`
            : undefined,
        },
      ],
      date: frontmatter.date,
    });
  }
  writeFileSync(path.join(siteConfig.outDir, output), feed.rss2());
}
export async function processData(
  pageData,
  ctx,
  aside = 'left',
  sidebar = false
) {
  const config = ctx?.siteConfig?.site?.themeConfig;
  const removePrefixSlash = (p) =>
    p.startsWith('/') ? p.slice(1) : '';
  const postsPattern = removePrefixSlash(
    config.blog?.postsPath ?? 'blog/posts'
  );
  const authorsPattern = removePrefixSlash(
    config.blog?.authorsPath ?? 'blog/authors'
  );
  if (pageData.relativePath.includes(postsPattern)) {
    pageData.frontmatter.blog = 'post';
    pageData.frontmatter.aside = aside;
    pageData.frontmatter.sidebar = sidebar;
    pageData.frontmatter.prev = false;
    pageData.frontmatter.next = false;
  }
  if (pageData.relativePath.includes(authorsPattern)) {
    pageData.frontmatter.blog = 'author';
    pageData.frontmatter.aside = aside;
    pageData.frontmatter.sidebar = sidebar;
    pageData.frontmatter.prev = false;
    pageData.frontmatter.next = false;
  }
}
/**
 * Type config helper
 */
export function defineConfig(config) {
  return defineConfigWithTheme({
    vite: {
      optimizeDeps: {
        exclude: ['@jcamp/vitepress-blog-theme'],
      },
    },
    buildEnd: genFeed,
    async transformPageData(pageData, ctx) {
      await processData(pageData, ctx);
    },
    ...config,
  });
}
export const tailwindThemeContent =
  './node_modules/@jcamp/vitepress-blog-theme/src/**/*.{js,ts,vue}';
export function defineTailwindContent(base = './src') {
  return [
    tailwindThemeContent,
    path.join(base, '**/*.md'),
    path.join(base, '.vitepress/**/*.{js,ts,vue}'),
  ];
}
export function defineTailwindConfig(base = './src', config) {
  if (base === null || base === undefined) {
    base = './src';
  }
  return {
    darkMode: 'class',
    // @ts-expect-error icons works once transpiled
    plugins: [icons()],
    content: defineTailwindContent(base),
    ...config,
  };
}
// export { genFeed }
