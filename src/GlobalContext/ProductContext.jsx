import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import reducer from "../Reducers/ProductReducer";

const ProductContext = createContext();

const initialState = {
  isProductLoading: false,
  isProductError: false,
  products: [],
  //generic
  isGenericLoading: false,
  isGenericError: false,
  generics: [],
  //company
  isCompanyLoading: false,
  isCompanyError: false,
  companies: [],
  //category
  isCategoryLoading: false,
  isCategoryError: false,
  categories: [],
};

// eslint-disable-next-line react/prop-types
const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [productsKey, setProductsKey] = useState(0); // Initialize with 0

  // ... other functions ...

  // Function to refetch products data
  const refetchProducts = () => {
    setProductsKey((prevKey) => prevKey + 1);
  };

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
  // all generic function
  const getGenerics = async (url) => {
    dispatch({ type: "SET_GENERIC_LOADING" });
    try {
      const res = await axios.get(url);
      const generics = await res.data;
      dispatch({ type: "SET_GENERIC_API_DATA", payload: generics });
    } catch (error) {
      dispatch({ type: "SET_GENERIC_API_ERROR" });
    }
  };
  //all company's function
  const getCompanies = async (url) => {
    dispatch({ type: "SET_COMPANIES_LOADING" });
    try {
      const res = await axios.get(url);
      const companies = await res.data;
      dispatch({ type: "SET_COMPANIES_API_DATA", payload: companies });
    } catch (error) {
      dispatch({ type: "SET_COMPANIES_API_ERROR" });
    }
  };
  //all company's function
  const getCategories = async (url) => {
    dispatch({ type: "SET_CATEGORIES_LOADING" });
    try {
      const res = await axios.get(url);
      const categories = await res.data;
      dispatch({ type: "SET_CATEGORIES_API_DATA", payload: categories });
    } catch (error) {
      dispatch({ type: "SET_CATEGORIES_API_ERROR" });
    }
  };

  //all products
  useEffect(() => {
    getProducts(`${import.meta.env.VITE_API_URL}/api/get/products`);
    getCompanies(`${import.meta.env.VITE_API_URL}/api/get/companies`);
    getGenerics(`${import.meta.env.VITE_API_URL}/api/get/generics`);
    getCategories(`${import.meta.env.VITE_API_URL}/api/get/categories`);
  }, [productsKey]);

  return (
    <ProductContext.Provider value={{ ...state, refetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(ProductContext);
};

export { ProductProvider, ProductContext, useProductContext };
