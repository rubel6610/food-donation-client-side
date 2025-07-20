import { createBrowserRouter } from "react-router";
import Root from "../RootLayout/Root";
import Home from "../HomeLayout/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Dashboard from "../dashboard/Dashboard";
import DashBoardHome from "../dashboard/DashBoardHome";
import PrivateRoutes from "./PrivateRoutes";
import AuthLayout from "../Pages/Authentication/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "home",
        element: <DashBoardHome />,
      },
    ],
  },
]);
