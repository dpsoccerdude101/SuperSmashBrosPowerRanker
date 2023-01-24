import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => ({
  title: "Remix: So great, it's funny!",
  description: 'Remix jokes app. Learn Remix and laugh at the same time!',
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
