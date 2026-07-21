import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'TTSwap Docs',
  tagline:
    'Constant Value AMM documentation — one-token-one-pool, zero-IL LP, six-way fees, X402 payments',
  favicon: 'img/favicon.ico',
  titleDelimiter: '·',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  // Set the production url of your site here
  url: 'https://docs.ttswap.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  // trailingSlash: false,
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ttswap', // Usually your GitHub org/user name.
  projectName: 'ttswap-docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Global <head> tags for Google / Bing SEO + social previews
  // Per-page canonical URLs are emitted by Docusaurus; do not set a site-wide canonical here.
  headTags: [
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': 'https://ttswap.io/#organization',
            name: 'TTSwap',
            url: 'https://ttswap.io',
            logo: {
              '@type': 'ImageObject',
              url: 'https://docs.ttswap.io/img/logo.png',
            },
            sameAs: [
              'https://x.com/ttswapfinance',
              'https://t.me/ttswapfinance',
              'https://discord.gg/XygqnmQgX3',
              'https://github.com/ttswap-doc',
            ],
          },
          {
            '@type': 'WebSite',
            '@id': 'https://docs.ttswap.io/#website',
            name: 'TTSwap Docs',
            url: 'https://docs.ttswap.io',
            description:
              'Official TTSWAP documentation: Constant Value AMM, one-token-one-pool, zero-IL LP, six-way fees, X402, and TTS tokenomics.',
            publisher: { '@id': 'https://ttswap.io/#organization' },
            inLanguage: ['en', 'zh-Hans'],
          },
        ],
      }),
    },
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en',
      },
      zh: {
        label: '中文',
        direction: 'ltr',
        htmlLang: 'zh-Hans',
      },
    },
  },

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {from: '/', to: '/documentation/'},
        ],
      },
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en', 'zh'],
        docsRouteBasePath: '/',
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchBarShortcut: false,
        searchBarShortcutHint: false,
      },
    ],
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          path: 'docs',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        pages: false,
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: [
            '/tags/**',
            '/search',
            '/*/search',
            '/**/*_bak*',
            '/**/*bak*',
          ],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);
            return items
              .filter(
                (item) =>
                  !item.url.includes('/page/') &&
                  !item.url.includes('/search') &&
                  !item.url.includes('_bak') &&
                  !item.url.endsWith('/blog'),
              )
              .map((item) => {
                const path = item.url.replace('https://docs.ttswap.io', '');
                // Boost primary documentation entry points for crawl priority
                if (
                  path === '/documentation' ||
                  path === '/documentation/' ||
                  path === '/zh/documentation' ||
                  path === '/zh/documentation/'
                ) {
                  return { ...item, priority: 1.0, changefreq: 'daily' as const };
                }
                if (
                  path.includes('/Get%20Started/') ||
                  path.includes('/Get Started/') ||
                  path.includes('/Trade/') ||
                  path.includes('/Invest') ||
                  path.includes('/Tokenomics/')
                ) {
                  return { ...item, priority: 0.8, changefreq: 'weekly' as const };
                }
                return item;
              });
          },
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    // Open Graph / Twitter social card (absolute URL resolved from site url)
    image: 'img/logo.png',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    metadata: [
      {
        name: 'description',
        content:
          'Official TTSWAP docs: Constant Value AMM (CV-AMM), one-token-one-pool, zero-impermanent-loss LP returns, six-way fee split, X402 payments, and TTS tokenomics.',
      },
      {
        name: 'keywords',
        content:
          'TTSwap, TTSWAP, DEX, DeFi, Constant Value AMM, CV-AMM, Singleton, one-token-one-pool, zero impermanent loss, X402, PayFi, TTS, liquidity provider, buyGood, payGood',
      },
      { name: 'author', content: 'TTSwap' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'bingbot', content: 'index, follow' },
      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'TTSwap Docs' },
      { property: 'og:locale', content: 'en' },
      { property: 'og:locale:alternate', content: 'zh_CN' },
      // Twitter / X
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@ttswapfinance' },
      { name: 'twitter:creator', content: '@ttswapfinance' },
      // Optional: paste verification codes from Search Console / Bing Webmaster after claiming the property
      // { name: 'google-site-verification', content: 'YOUR_GOOGLE_VERIFICATION_CODE' },
      // { name: 'msvalidate.01', content: 'YOUR_BING_VERIFICATION_CODE' },
    ],
    navbar: {
      title: 'TTSwap',
      logo: {
        alt: 'TTSwap Logo',
        src: 'img/logo.png',
        href: '/documentation/',
      },
      items: [
        // 中间菜单
        // { to: '/documentation/', label: 'Documentation', position: 'left' },
        // {
        //   label: 'Activity', position: 'left', items: [
        //     { to: '/docs/articles/publicsale', label: 'Public Sale', },
        //     // { to: '/docs/articles/tokenairdrop', label: 'Token Airdrop', },
        //   ],
        // },
        // {
        //   label: 'Knowledge', position: 'left', items: [
        //    // { to: '/docs/knowledge/userdoc', label: 'User Doc', },
        //     { to: '/docs/knowledge/tokeneconomic', label: 'Token Economic', },
        //     { to: '/docs/knowledge/whitepaper', label: 'WhitePaper', },
        //   ],
        // },
        // {
        //   label: 'Join DAO', position: 'left', items: [
        //     { to: '/docs/community/introduce', label: 'Allocate Commission By Role', },
        //     { to: '/docs/community/ambassador', label: 'Be Ambassador', },
        //     { to: '/docs/community/tokenoperator', label: 'Be Token Operator', },
        //     { to: '/docs/community/gate', label: 'Be Service Provider', },
        //     { to: '/docs/community/builder', label: 'Be Builder', },
        //     { to: '/docs/community/liquidityprovider', label: 'Be Liquidityprovider', },
        //     { to: '/docs/community/investor', label: 'Be Investor', },
        //   ],
        // },

        // 右侧社交图标
        {
          href: 'https://discord.gg/XygqnmQgX3',
          position: 'right',
          className: 'header-discord-link',
          'aria-label': 'Discord',
        },
        {
          href: 'https://t.me/ttswapfinance',
          position: 'right',
          className: 'header-telegram-link',
          'aria-label': 'Telegram',
        },
        {
          href: 'https://x.com/ttswapfinance',
          position: 'right',
          className: 'header-twitter-link',
          'aria-label': 'Twitter',
        },
        {
          href: 'https://github.com/ttswap-doc',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub',
        },
        {
          type: 'localeDropdown',
          position: 'right',
          "dropdownItemsBefore": [],
          "dropdownItemsAfter": []
        },
        // 最右边 Connect Wallet 按钮
        {
          href: 'https://ttswap.io',
          label: 'Launch App',
          position: 'right',
          className: 'navbar-wallet-button',
        },
      ],
    },
    // footer: {
    //   style: 'dark',
    //   links: [
    //     {
    //       title: 'Docs',
    //       items: [
    //         {
    //           label: 'Tutorial',
    //           to: '/docs/whitepaper',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Community',
    //       items: [
    //         {
    //           label: 'Stack Overflow',
    //           href: 'https://stackoverflow.com/questions/tagged/docusaurus',
    //         },
    //         {
    //           label: 'Discord',
    //           href: 'https://discordapp.com/invite/docusaurus',
    //         },
    //         {
    //           label: 'X',
    //           href: 'https://x.com/docusaurus',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'More',
    //       items: [
    //         {
    //           label: 'Blog',
    //           to: '/blog',
    //         },
    //         {
    //           label: 'GitHub',
    //           href: 'https://github.com/facebook/docusaurus',
    //         },
    //       ],
    //     },
    //   ],
    //   copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    // },
    // prism: {
    //   theme: prismThemes.github,
    //   darkTheme: prismThemes.dracula,
    // },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.github,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
