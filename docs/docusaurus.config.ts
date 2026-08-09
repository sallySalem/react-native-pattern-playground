import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'React Native Design Patterns Playground',
  tagline:
    'Learn, Visualize, and Implement Design Patterns with React Native + TypeScript',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://sallySalem.github.io',
  baseUrl: '/react-native-pattern-playground/',

  organizationName: 'sallySalem',
  projectName: 'react-native-pattern-playground',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/sallySalem/react-native-pattern-playground/tree/main/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',

    colorMode: {
      respectPrefersColorScheme: true,
    },

    navbar: {
      title: 'Design Patterns',
      logo: {
        alt: 'React Native Design Patterns',
        src: 'img/logo.svg',
      },

      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Patterns',
        },
        {
          href: 'https://github.com/sallySalem/react-native-pattern-playground',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',

      links: [
        {
          title: 'Patterns',
          items: [
            {
              label: 'Strategy',
              to: '/docs/intro',
            },
          ],
        },

        {
          title: 'Project',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/sallySalem/react-native-pattern-playground',
            },
          ],
        },
      ],

      copyright: `Copyright © ${new Date().getFullYear()} Sally Salem. Built with Docusaurus.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
