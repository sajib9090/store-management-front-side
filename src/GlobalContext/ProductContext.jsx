import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducers/ProductReducer";

const ProductContext = createContext();

const API = `https://dummyjson.com/products`;

const initialState = {
  isProductLoading: false,
  isProductError: false,
  products: [],
};

// eslint-disable-next-line react/prop-types
const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // all and categorize product function
  const getProducts = async (url) => {
    dispatch({ type: "SET_PRODUCT_LOADING" });
    try {
      const res = await axios.get(url);
      const products = await res.data;
      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  //all products
  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <ProductContext.Provider value={{ ...state }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(ProductContext);
};

export { ProductProvider, ProductContext, useProductContext };
