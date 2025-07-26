import { createBrowserRouter } from "react-router";
import Root from "../RootLayout/Root";
import Home from "../HomeLayout/Home";
import PrivateRoutes from "./PrivateRoutes";
import AuthLayout from "../Pages/Authentication/AuthLayout";
import DashBoardHome from "../Pages/dashboard/DashBoardHome";
import UserProfile from "../Pages/dashboard/Profile/UserProfile";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import RequestCharityRole from "./../Pages/dashboard/RequestCharityRole/RequestCharityRole";
import StripeForm from "./../Pages/Stripe/StripeForm";
import PrivateCharityRoutes from "./PrivateCharityRoutes";
import Transaction from "../Pages/dashboard/transactionHistory/Transaction";
import PrivateAdminRoutes from "./PrivateAdminRoutes";
import PendingCharityRole from "../Pages/dashboard/transactionHistory/PendingCharityRole";
import DashboardLayout from "../Pages/dashboard/DashboardLayout";
import AddDonation from "../Pages/Restaurant/AddDonation";
import ManageUsers from "../Pages/Admin/ManageUsers";
import ManageDonations from "../Pages/Admin/ManageDonations";
import MyDonations from "../Pages/Restaurant/MyDonations";
import UpdateDonation from "../Pages/Restaurant/UpdateDonation";
import PrivateRestaurantRoutes from './PrivateRestaurantRoutes';
import NotFound from "../Pages/NotFoundPage/NotFound";
import AllDonations from "../Pages/AllDonations/AllDonations";
import DonationDetails from "../Pages/AllDonations/DonationDetails";
import MyReviews from "../Pages/Reviews/MyReviews";
import MyDonationRequest from "../Pages/charity/MyDonationRequest";
import ManageRequests from "../Pages/Admin/ManageRequests";
import RequestedDonations from "../Pages/Restaurant/RequestedDonations";
import MyPickups from "../Pages/charity/MyPickups";
import Favorites from "../Pages/Favourites/Favorites";
import ReceivedDonations from "../Pages/charity/ReceivedDonations";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:"donations",
        element:<PrivateRoutes><AllDonations/></PrivateRoutes>
      },
      {
        path:"donation-details/:id",
        element:<PrivateRoutes><DonationDetails></DonationDetails></PrivateRoutes>,
      }
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
        <DashboardLayout />
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
        path: "reviews",
        element: (
          <PrivateRoutes>
            <MyReviews />
          </PrivateRoutes>
        ),
      },
      {
        path: "favorites",
        element: (
          <PrivateRoutes>
            <Favorites />
          </PrivateRoutes>
        ),
      },

      // admin routes
      {
        path: "pending-transactions",
        element: (
          <PrivateAdminRoutes>
            <PendingCharityRole />
          </PrivateAdminRoutes>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateAdminRoutes>
            <ManageUsers />
          </PrivateAdminRoutes>
        ),
      },
      {
        path: "charity-role-requests",
        element: (
          <PrivateAdminRoutes>
            <PendingCharityRole />
          </PrivateAdminRoutes>
        ),
      },
      {
        path:"manage-donations",
        element:<ManageDonations/>
      },
      {
        path:"manage-requests",
        element:<ManageRequests/>
      },

      // restaurant routes
      {
        path: "add-donation",
        element: <PrivateRestaurantRoutes><AddDonation /></PrivateRestaurantRoutes> ,
      },
      {
        path: "my-donations",
        element:<PrivateRestaurantRoutes><MyDonations /></PrivateRestaurantRoutes> ,
      },
      {
        path:"update-donation/:id",
        element:<PrivateRestaurantRoutes><UpdateDonation/></PrivateRestaurantRoutes> ,
      },
      {
        path:"requested-donations",
        element:<PrivateRestaurantRoutes><RequestedDonations/></PrivateRestaurantRoutes> ,
      },


      // charity routes
      {
        path: "stripe-payment",
        element: (
          <PrivateCharityRoutes>
            <StripeForm />
          </PrivateCharityRoutes>
        ),
      },
      {
        path: "transactions",
        element: (
          <PrivateCharityRoutes>
            <Transaction />
          </PrivateCharityRoutes>
        ),
      },
      {
        path: "my-requests",
        element: (
          <PrivateCharityRoutes>
            <MyDonationRequest/>
          </PrivateCharityRoutes>
        ),
      },
      {
        path: "my-pickups",
        element: (
          <PrivateCharityRoutes>
            <MyPickups/>
          </PrivateCharityRoutes>
        ),
      },
      {
        path: "received-donations",
        element: (
          <PrivateCharityRoutes>
            <ReceivedDonations/>
          </PrivateCharityRoutes>
        ),
      },
    ],
  },
  {
    path:"*",
    element:<NotFound/>

  }
]);
