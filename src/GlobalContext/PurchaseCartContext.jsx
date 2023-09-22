import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducers/PurchaseCartReducer";
import { toast } from "react-hot-toast";

const PurchaseCartContext = createContext();

const getLocalStoragePurchaseCartData = () => {
  let localStorageCartData = localStorage.getItem("purchase-cart");
  // if our first carts value empty then set empty array
  if (localStorageCartData == "undefined" || localStorageCartData === null) {
    return [];
  } else {
    return JSON.parse(localStorageCartData);
  }
};

const initialState = {
  purchaseCarts: getLocalStoragePurchaseCartData(),
};

// eslint-disable-next-line react/prop-types
const PurchaseCartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //add item data inside cart

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

  const handleRemoveFromPurchase = (item) => {
    dispatch({ type: "REMOVE_ITEM_FROM_PURCHASE_CART", payload: item });
  };

  const handleRemoveAllPurchaseCart = (items) => {
    dispatch({ type: "REMOVE_PURCHASE_CART", payload: items });
  };

  //add cart data inside local storage
  useEffect(() => {
    localStorage.setItem("purchase-cart", JSON.stringify(state.purchaseCarts));
    // set every data when add new one. make it with dependency
  }, [state.purchaseCarts]);

  return (
    <PurchaseCartContext.Provider
      value={{
        ...state,
        addPurchasedProducts,
        handleRemoveFromPurchase,
        handleRemoveAllPurchaseCart,
      }}
    >
      {children}
    </PurchaseCartContext.Provider>
  );
};

const usePurchaseCartContext = () => {
  return useContext(PurchaseCartContext);
};

export { PurchaseCartProvider, PurchaseCartContext, usePurchaseCartContext };
