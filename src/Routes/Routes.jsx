import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Sell from "../Pages/Sell/Sell";
import Store from "../Pages/Store/Store";

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
        path: "/store",
        element: <Store />,
      },
    ],
  },
]);
