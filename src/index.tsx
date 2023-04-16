import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { SessionProvider } from "./contexts/session.context";
import { Auth, action as authAction } from "./routes/auth/auth.component";
import { Scrape } from "./routes/scrape/scrape.component";

import "./index.css";

const router = createMemoryRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Auth />,
        action: authAction,
      },
      {
        path: "scrape",
        element: <Scrape />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </React.StrictMode>
);
