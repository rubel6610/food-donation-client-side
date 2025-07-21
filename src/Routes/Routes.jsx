import { createBrowserRouter } from "react-router";
import Root from "../RootLayout/Root";
import Home from "../HomeLayout/Home";
import PrivateRoutes from "./PrivateRoutes";
import AuthLayout from "../Pages/Authentication/AuthLayout";
import DashBoardHome from "../Pages/dashboard/DashBoardHome";
import Dashboard from "../Pages/dashboard/Dashboard";
import UserProfile from "../Pages/dashboard/Profile/UserProfile";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import RequestCharityRole from "./../Pages/dashboard/RequestCharityRole/RequestCharityRole";
import StripeForm from "./../Pages/Stripe/StripeForm";
import PrivateCharityRoutes from "./PrivateCharityRoutes";
import Transaction from "../Pages/dashboard/transactionHistory/Transaction";
import PrivateAdminRoutes from "./PrivateAdminRoutes";
import PendingTransaction from "../Pages/dashboard/transactionHistory/PendingTransaction";
import Users from "../Pages/ManageUsers/Users";

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
        element: (
          <PrivateRoutes>
            <DashBoardHome />
          </PrivateRoutes>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoutes>
            <UserProfile />
          </PrivateRoutes>
        ),
      },
      {
        path: "request-charity-role",
        element: (
          <PrivateRoutes>
            <RequestCharityRole />
          </PrivateRoutes>
        ),
      },
      {
        path: "stripe-payment",
        element: (
          <PrivateRoutes>
            <StripeForm />
          </PrivateRoutes>
        ),
      },
      {
        path: "pending-transactions",
        element: (
          <PrivateAdminRoutes>
            <PendingTransaction />
          </PrivateAdminRoutes>
        ),
      },
      {
        path: "users",
        element:<PrivateAdminRoutes><Users/></PrivateAdminRoutes>,
      },
      {
        path: "charity-role-requests",
        element:<PrivateAdminRoutes><PendingTransaction/></PrivateAdminRoutes>,
      },
      {
        path: "transactions",
        element: (
          <PrivateCharityRoutes>
            <Transaction />
          </PrivateCharityRoutes>
        ),
      },
    ],
  },
]);
