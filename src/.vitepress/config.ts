import { defineConfig } from '@jcamp/vitepress-blog-theme/config'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Sincere\'s Blog',
  description: 'Sincere\'s Blog',
  themeConfig: {
    blog: {
      title: 'My AI Written Blog',
      description: 'All these articles were written by AI!',
      defaultAuthor: 'AI Writer',
      path: '/',
      postsPath: '/posts',
      authorsPath: '/authors',
      tagsPath: '/tags',
      categoryIcons: {
        article: 'i-[heroicons-outline/book-open]',
        tutorial: 'i-[heroicons-outline/academic-cap]',
        document: 'i-[heroicons-outline/annotation]',
      },
      tagIcons: {
        github: 'i-[carbon/logo-github]',
        vue: 'i-[carbon/logo-vue]',
      },
    },
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Blog', link: '/' },
      { text: 'Tags', link: '/tags' },
      { text: 'Archives', link: '/archives' },
      // {
      //   text: 'Blog',
      //   items: [
      //     {
      //       text: 'Blog Home',
      //       link: '/blog/',
      //       activeMatch: '/blog/$',
      //     },
      //     {
      //       text: 'Tags',
      //       link: '/blog/tags',
      //       activeMatch: '/blog/tags',
      //     },
      //     {
      //       text: 'Archives',
      //       link: '/blog/archives',
      //       activeMatch: '/blog/archives',
      //     },
      //     // {
      //     //   text: 'RSS Feed',
      //     //   link: '/blog/feed.rss',
      //     // },
      //   ],
      // },
    ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' },
    //     ],
    //   },
    // ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/sincerexie/sincere-blog',
      },
    ],
  },
})
