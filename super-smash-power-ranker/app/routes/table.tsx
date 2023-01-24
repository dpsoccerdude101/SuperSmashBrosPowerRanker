import type { LinksFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import stylesUrl from 'tabulator-tables/dist/css/tabulator.min.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

const TableRoute = () => {
  return (
    <div className="container">
      <div className="content">
        <h1 className="text-3xl font-bold">Welcome to the Power Ranker!</h1>
      </div>
      <Outlet />
    </div>
  );
};

export default TableRoute;
