import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import Root from "./RootLayout/Root";
import { router } from "./Routes/Routes";
import AuthProvider from "./Context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();


createRoot(document.getElementById("root")).render(
  <div className="roboto-font">
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
          <Root />
        </RouterProvider>
      </QueryClientProvider>
    </AuthProvider>
  </div>
);
