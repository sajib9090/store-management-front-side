import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Sell from "../Pages/Sell/Sell";
import Store from "../Pages/Store/Store";
import SoldInvoice from "../Pages/SoldInvoice/SoldInvoice";
import PurchaseInvoice from "../Pages/PurchaseInvoice/PurchaseInvoice";
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
        children: [
          {
            path: "/store/add",
            element: <AddTabsContent />,
            children: [
              {
                path: "/store/add/add_products",
                element: <AddProductsContent />,
              },
              {
                path: "/store/add/add_new_generic",
                element: <AddGenericContent />,
              },
              {
                path: "/store/add/add_new_company",
                element: <AddCompanyContent />,
              },
              {
                path: "/store/add/add_new_product",
                element: <AddNewProduct />,
              },
              {
                path: "/store/add/add_new_category",
                element: <AddCategoryContent />,
              },
            ],
          },
          {
            path: "/store/stock",
            element: <StockTabsContent />,
            children: [
              {
                path: "/store/stock/find_product_by_company",
                element: <FindProductsByCompany />,
              },
            ],
          },
          {
            path: "/store/sell",
            element: <SellTabsContent />,
            children: [
              {
                path: "/store/sell/sell_history",
                element: <SellingHistory />,
              },
              {
                path: "/store/sell/find_sold_invoice",
                element: <FindSoldInvoice />,
              },
            ],
          },
        ],
      },
      {
        path: "/store/addProducts/:id",
        element: <PurchaseInvoice />,
      },
    ],
  },
]);
