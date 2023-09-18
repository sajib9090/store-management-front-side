import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import { ProductProvider } from "./GlobalContext/ProductContext";
import { FilterContextProvider } from "./GlobalContext/FilterContext";
import { CartProvider } from "./GlobalContext/CartContext";
import { Toaster } from "react-hot-toast";
import { SellHistoryProvider } from "./GlobalContext/SellHistoryContext";
import AuthProvider from "./GlobalContext/AuthProvider";
import { UserContextProvider } from "./GlobalContext/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    <AuthProvider>
      <UserContextProvider>
        <ProductProvider>
          <FilterContextProvider>
            <CartProvider>
              <SellHistoryProvider>
                <RouterProvider router={router}></RouterProvider>
              </SellHistoryProvider>
            </CartProvider>
          </FilterContextProvider>
        </ProductProvider>
      </UserContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
