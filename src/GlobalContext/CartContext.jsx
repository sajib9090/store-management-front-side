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

const initialState = {
  // carts: [],
  // making a new function and set carts value
  carts: getLocalStorageCartData(),
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

  const itemRemove = (item) => {
    dispatch({ type: "REMOVE_SINGLE_ITEM", payload: item });
  };

  //add cart data inside local storage
  useEffect(() => {
    localStorage.setItem("bill-cart", JSON.stringify(state.carts));
    // set every data when add new one. make it with dependency
  }, [state.carts]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        handleAddToBill,
        itemRemove,
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
