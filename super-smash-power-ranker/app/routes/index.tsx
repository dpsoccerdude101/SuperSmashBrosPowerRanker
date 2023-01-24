import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => ({
  title: 'Super Smash Bros Power Ranking',
  description: 'An Application to view the Power Ranking of any Super Smash Bros Tournament Series',
});

const IndexRoute = () => (
  <div className="container">
    <div className="content">
      <h1>Super Smash Bros Power Ranking Table</h1>
      <nav>
        <ul>
          <li>
            <Link to="table">Look at Power Ranking Table</Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);

export default IndexRoute;
