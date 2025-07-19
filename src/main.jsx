import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import Root from "./RootLayout/Root";
import { router } from "./Routes/Routes";

createRoot(document.getElementById("root")).render(
  <div className="roboto-font">
    <RouterProvider router={router}>
      <Root />
    </RouterProvider>
  </div>
);
