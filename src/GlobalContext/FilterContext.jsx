import { createContext, useContext, useEffect, useState } from "react";
import { useProductContext } from "./ProductContext";

const FilterProductContext = createContext();

// eslint-disable-next-line react/prop-types
export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();

  //sorting/filter by search value
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
  };

  const filteredState = (
    products,
    setSearchInput,
    setFilteredProducts,
    searchInput
  ) => {
    if (searchInput) {
      const sortBySearchValue = products?.products?.filter((currentElement) =>
        currentElement?.title?.toLowerCase().includes(searchInput)
      );
      setFilteredProducts(sortBySearchValue);
      return;
    }
    if (searchInput === "") {
      setFilteredProducts([]);
    }
  };

  const handleEmptySearch = () => {
    setSearchInput("");
  };
  const [filteredProducts, setFilteredProducts] = useState();

  useEffect(() => {
    filteredState(products, searchInput, setFilteredProducts, searchInput);
  }, [searchInput, products]);

  //return value
  return (
    <FilterProductContext.Provider
      value={{
        handleInputChange,
        searchInput,
        filteredProducts,
        handleEmptySearch,
      }}
    >
      {children}
    </FilterProductContext.Provider>
  );
};

export const useFilterProductContext = () => {
  return useContext(FilterProductContext);
};
