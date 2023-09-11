import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Sell from "../Pages/Sell/Sell";
import Store from "../Pages/Store/Store";
import SoldInvoice from "../Pages/SoldInvoice/SoldInvoice";
import PurchaseInvoice from "../Pages/PurchaseInvoice/PurchaseInvoice";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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
        path: "/store/addProducts/:id",
        element: <PurchaseInvoice />,
      },
    ],
  },
]);
