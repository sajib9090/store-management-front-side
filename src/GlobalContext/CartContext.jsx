import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducers/CartReducer";
import { toast } from "react-hot-toast";

const CartContext = createContext();

//getting carts data from local storage
const getLocalStorageCartData = () => {
  let localStorageCartData = localStorage.getItem("bill-cart");
  // if our first carts value empty then set empy array
  if (localStorageCartData === null) {
    return [];
  } else {
    return JSON.parse(localStorageCartData);
  }
};
const getLocalStoragePurchaseCartData = () => {
  let localStorageCartData = localStorage.getItem("purchase-cart");
  // if our first carts value empty then set empy array
  if (localStorageCartData === null) {
    return [];
  } else {
    return JSON.parse(localStorageCartData);
  }
};

const initialState = {
  // carts: [],
  // making a new function and set carts value
  carts: getLocalStorageCartData(),
  purchaseCarts: getLocalStoragePurchaseCartData(),
};

// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //add item data inside cart

  const handleAddToBill = (product, quantity) => {
    if (quantity <= "0") {
      toast.error("Bill quantity must be positive");
      return;
    } else if (quantity > product.stock) {
      toast.error("Insufficient Stock");
      return;
    } else {
      dispatch({ type: "ADD_TO_BILL", payload: { product, quantity } });
    }
  };

  // purchase product added function
  const addPurchasedProducts = (product, quantity) => {
    if (quantity <= "0") {
      toast.error("Quantity must be positive");
      return;
    } else {
      dispatch({
        type: "ADD_PURCHASED_PRODUCT",
        payload: { product, quantity },
      });
    }
  };

  const itemRemove = (item) => {
    dispatch({ type: "REMOVE_SINGLE_ITEM", payload: item });
  };

  const handleRemoveFromPurchase = (item) => {
    dispatch({ type: "REMOVE_ITEM_FROM_PURCHASE_CART", payload: item });
  };
  const purchasedCartRemove = (item) => {
    dispatch({ type: "REMOVE_PURCHASE_CART", payload: item });
  };

  const handleRemoveAllPurchaseCart = () => {
    dispatch({ type: "REMOVE_PURCHASE_CART" });
  };

  //add cart data inside local storage
  useEffect(() => {
    localStorage.setItem("bill-cart", JSON.stringify(state.carts));
    localStorage.setItem("purchase-cart", JSON.stringify(state.purchaseCarts));
    // set every data when add new one. make it with dependency
  }, [state.carts, state.purchaseCarts]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        handleAddToBill,
        itemRemove,
        addPurchasedProducts,
        handleRemoveFromPurchase,
        purchasedCartRemove,
        handleRemoveAllPurchaseCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, CartContext, useCartContext };
