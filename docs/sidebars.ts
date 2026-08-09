import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Patterns',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Behavioral',
          collapsed: false,
          items: ['patterns/behavioral/strategy'],
        },
      ],
    },
  ],
};

export default sidebars;
