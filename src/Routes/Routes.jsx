/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
const Sell = lazy(() => import("../Pages/Sell/Sell"));
const Store = lazy(() => import("../Pages/Store/Store"));
const SoldInvoice = lazy(() => import("../Pages/SoldInvoice/SoldInvoice"));
const PurchaseInvoice = lazy(() =>
  import("../Pages/PurchaseInvoice/PurchaseInvoice")
);
const EditProduct = lazy(() =>
  import("../Pages/Store/EditProduct/EditProduct")
);
const Account = lazy(() => import("../Pages/Account/Account"));
import PrivateRoute from "./PrivateRoute";
import Login from "../Pages/Login/Login";
const CheckAccountActivity = lazy(() =>
  import("../Pages/Account/CheckAccountActivity/CheckAccountActivity")
);
const CreateAccount = lazy(() =>
  import("../Pages/Account/CreateAccount/CreateAccount")
);
const AddTabsContent = lazy(() =>
  import("../Components/TabsContent/AddTabsContent/AddTabsContent")
);
const StockTabsContent = lazy(() =>
  import("../Components/TabsContent/StockTabsContent/StockTabsContent")
);
const SellTabsContent = lazy(() =>
  import("../Components/TabsContent/SellTabsContent/SellTabsContent")
);
const PurchaseTabsContent = lazy(() =>
  import("../Components/TabsContent/PurchaseTabsContent/PurchaseTabsContent")
);
const AddProductsContent = lazy(() =>
  import(
    "../Components/TabsContent/AddTabsContent/AddProductsContent/AddProductsContent"
  )
);
const AddGenericContent = lazy(() =>
  import(
    "../Components/TabsContent/AddTabsContent/AddGenericContent/AddGenericContent"
  )
);
const AddCompanyContent = lazy(() =>
  import(
    "../Components/TabsContent/AddTabsContent/AddCompanyContent/AddCompanyContent"
  )
);
const AddNewProduct = lazy(() =>
  import("../Components/TabsContent/AddTabsContent/AddNewProduct/AddNewProduct")
);
const AddCategoryContent = lazy(() =>
  import(
    "../Components/TabsContent/AddTabsContent/AddCategoryContent/AddCategoryContent"
  )
);
const FindProductsByCompany = lazy(() =>
  import("../Pages/Store/FindInvoiceByCompany/FindProductsByCompany")
);
const SellingHistory = lazy(() =>
  import("../Components/SellingHistory/SellingHistory")
);
const FindSoldInvoice = lazy(() =>
  import("../Components/FindSoldInvoice/FindSoldInvoice")
);
const PurchaseHistory = lazy(() =>
  import(
    "../Components/TabsContent/PurchaseTabsContent/PurchaseHistory/PurchaseHistory"
  )
);
const FindPurchaseInvoice = lazy(() =>
  import(
    "../Components/TabsContent/PurchaseTabsContent/FindPurchaseInvoice/FindPurchaseInvoice"
  )
);
import Loader from "../Pages/Shared/Loader/Loader";
const AllGeneric = lazy(() => import("../Pages/Store/AllGeneric/AllGeneric"));

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
        element: (
          <Suspense fallback={<Loader />}>
            <Sell />
          </Suspense>
        ),
      },
      {
        path: "/sell/invoice/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <SoldInvoice />
          </Suspense>
        ),
      },
      {
        path: "/store",
        element: (
          <Suspense fallback={<Loader />}>
            <Store />
          </Suspense>
        ),
        children: [
          // {
          //   index: true,

          //   element: (
          //     <Suspense fallback={<Loader />}>
          //       <AddTabsContent />
          //     </Suspense>
          //   ),
          // },
          {
            path: "add",
            element: (
              <Suspense fallback={<Loader />}>
                <AddTabsContent />
              </Suspense>
            ),
            children: [
              {
                path: "add_products",
                element: (
                  <Suspense fallback={<Loader />}>
                    <AddProductsContent />
                  </Suspense>
                ),
              },
              {
                path: "add_new_generic",
                element: (
                  <Suspense fallback={<Loader />}>
                    <AddGenericContent />
                  </Suspense>
                ),
              },
              {
                path: "add_new_company",
                element: (
                  <Suspense fallback={<Loader />}>
                    <AddCompanyContent />
                  </Suspense>
                ),
              },
              {
                path: "add_new_product",
                element: (
                  <Suspense fallback={<Loader />}>
                    <AddNewProduct />
                  </Suspense>
                ),
              },
              {
                path: "add_new_category",
                element: (
                  <Suspense fallback={<Loader />}>
                    <AddCategoryContent />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "stock",
            element: (
              <Suspense fallback={<Loader />}>
                <StockTabsContent />
              </Suspense>
            ),
            children: [
              {
                path: "find_stock_by_company",
                element: (
                  <Suspense fallback={<Loader />}>
                    <FindProductsByCompany />
                  </Suspense>
                ),
              },
              {
                path: "all_generic",
                element: (
                  <Suspense fallback={<Loader />}>
                    <AllGeneric />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "sell",
            element: (
              <Suspense fallback={<Loader />}>
                <SellTabsContent />
              </Suspense>
            ),
            children: [
              {
                path: "sell_history",
                element: (
                  <Suspense fallback={<Loader />}>
                    <SellingHistory />
                  </Suspense>
                ),
              },
              {
                path: "find_sold_invoice",
                element: (
                  <Suspense fallback={<Loader />}>
                    <FindSoldInvoice />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "purchase",
            element: (
              <Suspense fallback={<Loader />}>
                <PurchaseTabsContent />
              </Suspense>
            ),
            children: [
              {
                path: "purchase_history",
                element: (
                  <Suspense fallback={<Loader />}>
                    <PurchaseHistory />
                  </Suspense>
                ),
              },
              {
                path: "find_purchase_invoice",
                element: (
                  <Suspense fallback={<Loader />}>
                    <FindPurchaseInvoice />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "/account",
        element: (
          <Suspense fallback={<Loader />}>
            <Account />
          </Suspense>
        ),
        children: [
          {
            path: "check_accounts_activity",
            element: (
              <Suspense fallback={<Loader />}>
                <CheckAccountActivity />
              </Suspense>
            ),
          },
          {
            path: "create_new_account",
            element: (
              <Suspense fallback={<Loader />}>
                <CreateAccount />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: "/store/product/edit/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <EditProduct />
          </Suspense>
        ),
      },
      {
        path: "/store/addProducts/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <PurchaseInvoice />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
