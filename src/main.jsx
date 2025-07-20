import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import Root from "./RootLayout/Root";
import { router } from "./Routes/Routes";
import AuthProvider from "./Context/AuthProvider";

createRoot(document.getElementById("root")).render(
  <div className="roboto-font">
    <AuthProvider>
      <RouterProvider router={router}>
        <Root />
      </RouterProvider>
    </AuthProvider>
  </div>
);
