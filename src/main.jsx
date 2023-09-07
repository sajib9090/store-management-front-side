import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import { ProductProvider } from "./GlobalContext/ProductContext";
import { FilterContextProvider } from "./GlobalContext/FilterContext";
import { CartProvider } from "./GlobalContext/CartContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    <ProductProvider>
      <FilterContextProvider>
        <CartProvider>
          <RouterProvider router={router}></RouterProvider>
        </CartProvider>
      </FilterContextProvider>
    </ProductProvider>
  </React.StrictMode>
);
