import { json } from '@remix-run/node';
import { Link, useCatch, useLoaderData } from '@remix-run/react';

export const ErrorBoundary = () => <div className="error-container">I did a whoopsies.</div>;

export const CatchBoundary = () => {
  const caught = useCatch();
  if (caught.status === 404) return <div className="error-container">There are no jokes to display.</div>;
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
};

const TableIndexRoute = () => {
  return (
    <div>
      <Link to="def-s-dojo-winter-chronicle-2023">Checkout Def's Dojo Winter Chronicle 2023 Power Rankings</Link>
    </div>
  );
};

export default TableIndexRoute;
