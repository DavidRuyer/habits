import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useEffect } from "react";

import styles from "./styles/app.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Habits",
  viewport: "width=device-width,initial-scale=1",
  "apple-mobile-web-app-capable": "yes",
});

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function App() {
  // Handle vhs in mobile devices : https://stackoverflow.com/questions/61308575/tailwind-h-screen-doesn-t-work-properly-on-mobile-devices
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--vh",
      window.innerHeight * 0.01 + "px"
    );
  }, []);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-screen gradient-light text-white">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
