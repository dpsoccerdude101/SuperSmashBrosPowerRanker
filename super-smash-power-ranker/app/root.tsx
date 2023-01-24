import type { MetaFunction } from '@remix-run/node';
import { Outlet, ScrollRestoration, useCatch } from '@remix-run/react';
import Document from './common/components/Document';
import styles from './styles/app.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const meta: MetaFunction = () => {
  const description = 'An Application to view the Power Ranking of any Super Smash Bros Tournament';
  return {
    charset: 'utf-8',
    description,
    keywords: 'Remix,jokes',
    'twitter:image':
      'https://www.bing.com/th?pid=Sgg&qlt=100&u=https%3A%2F%2Fimages.start.gg%2Fimages%2Ftournament%2F505027%2Fimage-248f55e4772880196db9f1bbd51ef73a-optimized.png&ehk=cuAd2kX7aZwCQ56QlBE9Sod%2BekP7XdR%2Fz8KumwAggLw%3D&w=280&h=280&r=0',
    'twitter:card': 'summary_large_image',
    'twitter:creator': '@dennis_pavlyuk',
    'twitter:title': 'Super Smash Bros Power Ranker',
    'twitter:description': description,
  };
};

type ErrorBoundaryProps = {
  error: Error;
};

export const ErrorBoundary = ({ error }: ErrorBoundaryProps) => {
  console.error(error);

  return (
    <Document title="Uh-oh!">
      <div className="error-container">
        <h1>App Error</h1>
        <pre>{error.message}</pre>
      </div>
    </Document>
  );
};

export const CatchBoundary = () => {
  const caught = useCatch();

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <div className="error-container">
        <h1>
          {caught.status} {caught.statusText}
        </h1>
      </div>
    </Document>
  );
};

const App = () => (
  <Document>
    <Outlet />
    <ScrollRestoration />
  </Document>
);

export default App;
