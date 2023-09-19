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
import CheckAccountActivity from "../Pages/Account/CheckAccountActivity/CheckAccountActivity";
import CreateAccount from "../Pages/Account/CreateAccount/CreateAccount";
import AddTabsContent from "../Components/TabsContent/AddTabsContent/AddTabsContent";
import StockTabsContent from "../Components/TabsContent/StockTabsContent/StockTabsContent";
import SellTabsContent from "../Components/TabsContent/SellTabsContent/SellTabsContent";
import AddProductsContent from "../Components/TabsContent/AddTabsContent/AddProductsContent/AddProductsContent";
import AddGenericContent from "../Components/TabsContent/AddTabsContent/AddGenericContent/AddGenericContent";
import AddCompanyContent from "../Components/TabsContent/AddTabsContent/AddCompanyContent/AddCompanyContent";
import AddNewProduct from "../Components/TabsContent/AddTabsContent/AddNewProduct/AddNewProduct";
import AddCategoryContent from "../Components/TabsContent/AddTabsContent/AddCategoryContent/AddCategoryContent";
import FindProductsByCompany from "../Pages/Store/FindInvoiceByCompany/FindProductsByCompany";
import SellingHistory from "../Components/SellingHistory/SellingHistory";
import FindSoldInvoice from "../Components/FindSoldInvoice/FindSoldInvoice";

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
        children: [
          {
            path: "add",
            element: <AddTabsContent />,
            children: [
              {
                path: "add_products",
                element: <AddProductsContent />,
              },
              {
                path: "add_new_generic",
                element: <AddGenericContent />,
              },
              {
                path: "add_new_company",
                element: <AddCompanyContent />,
              },
              {
                path: "add_new_product",
                element: <AddNewProduct />,
              },
              {
                path: "add_new_category",
                element: <AddCategoryContent />,
              },
            ],
          },
          {
            path: "stock",
            element: <StockTabsContent />,
            children: [
              {
                path: "find_stock_by_company",
                element: <FindProductsByCompany />,
              },
            ],
          },
          {
            path: "sell",
            element: <SellTabsContent />,
            children: [
              {
                path: "sell_history",
                element: <SellingHistory />,
              },
              {
                path: "find_sold_invoice",
                element: <FindSoldInvoice />,
              },
            ],
          },
        ],
      },
      {
        path: "/account",
        element: <Account />,
        children: [
          {
            path: "check_accounts_activity",
            element: <CheckAccountActivity />,
          },
          {
            path: "create_new_account",
            element: <CreateAccount />,
          },
        ],
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
