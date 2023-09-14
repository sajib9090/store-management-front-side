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
      const sortBySearchValue = products?.filter((currentElement) =>
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

  //
  const [selectedOption, setSelectedOption] = useState("");
  const [filterProductsByCompany, setFilterProductsByCompany] = useState([]);

  const FilterProductByCompany = (
    products,
    setSelectedOption,
    selectedOption,
    setFilterProductsByCompany
  ) => {
    if (selectedOption) {
      const sortBySelectedValue = products?.filter((currentElement) =>
        currentElement?.company_name?.toLowerCase().includes(selectedOption)
      );
      setFilterProductsByCompany(sortBySelectedValue);
      return;
    }
    if (searchInput === "") {
      setFilterProductsByCompany([]);
    }
  };

  useEffect(() => {
    filteredState(products, searchInput, setFilteredProducts, searchInput);
    FilterProductByCompany(
      products,
      setSelectedOption,
      selectedOption,
      setFilterProductsByCompany
    );
  }, [searchInput, products, selectedOption]);

  //return value
  return (
    <FilterProductContext.Provider
      value={{
        handleInputChange,
        searchInput,
        setSearchInput,
        filteredProducts,
        handleEmptySearch,
        selectedOption,
        setSelectedOption,
        filterProductsByCompany,
        setFilterProductsByCompany,
      }}
    >
      {children}
    </FilterProductContext.Provider>
  );
};

export const useFilterProductContext = () => {
  return useContext(FilterProductContext);
};
