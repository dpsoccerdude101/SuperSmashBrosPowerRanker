import { Links, LiveReload, Meta, Scripts } from '@remix-run/react';

type DocumentProps = {
  children: React.ReactNode;
  title?: string;
};

const Document = ({ children, title = `Super Smash Bros Power Ranker` }: DocumentProps) => (
  <html lang="en">
    <head>
      <Meta />
      <title>{title}</title>
      <Links />
    </head>
    <body>
      {children}
      <Scripts />
      <LiveReload />
    </body>
  </html>
);

export default Document;
