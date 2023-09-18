import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Sell from "../Pages/Sell/Sell";
import Store from "../Pages/Store/Store";
import SoldInvoice from "../Pages/SoldInvoice/SoldInvoice";
import PurchaseInvoice from "../Pages/PurchaseInvoice/PurchaseInvoice";
import EditProduct from "../Pages/Store/EditProduct/EditProduct";
import Account from "../Pages/Account/Account";
import PrivateRoute from "./PrivateRoute";
import Login from "../Pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sell",
        element: <Sell />,
      },
      {
        path: "/sell/invoice/:id",
        element: <SoldInvoice />,
      },
      {
        path: "/store",
        element: <Store />,
      },
      {
        path: "/account",
        element: <Account />,
      },

      {
        path: "/store/product/edit/:id",
        element: <EditProduct />,
      },
      {
        path: "/store/addProducts/:id",
        element: <PurchaseInvoice />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
