import { JSX, ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>

        <p className="hero__subtitle">{siteConfig.tagline}</p>

        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Explore the Patterns →
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="A practical exploration of software design patterns implemented with React Native and TypeScript."
    >
      <HomepageHeader />

      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className="col col--4">
                <div className="text--center">
                  <Heading as="h2">🧠 Learn</Heading>
                  <p>
                    Understand the problem each design pattern solves and when
                    it is useful.
                  </p>
                </div>
              </div>

              <div className="col col--4">
                <div className="text--center">
                  <Heading as="h2">📐 Visualize</Heading>
                  <p>
                    Explore diagrams that make the structure and relationships
                    behind each pattern easier to understand.
                  </p>
                </div>
              </div>

              <div className="col col--4">
                <div className="text--center">
                  <Heading as="h2">💻 Implement</Heading>
                  <p>
                    See how the patterns can be implemented with TypeScript and
                    applied to React Native applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container margin-top--lg margin-bottom--lg">
          <div className="text--center">
            <Heading as="h2">Featured Pattern</Heading>
            <p>
              Start with the Strategy Pattern and explore dynamic payment
              processing through a practical React Native example.
            </p>

            <Link
              className="button button--primary button--lg"
              to="/docs/intro"
            >
              Explore Strategy Pattern →
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
