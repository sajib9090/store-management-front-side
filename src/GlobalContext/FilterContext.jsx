import { createContext, useContext, useEffect, useState } from "react";
import { useProductContext } from "./ProductContext";
import Swal from "sweetalert2";
import axios from "axios";

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

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${item.title}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const remainingData = filterProductsByCompany?.filter(
          (currElem) => currElem._id != item._id
        );
        setFilterProductsByCompany(remainingData);
        axios
          .delete(
            `${import.meta.env.VITE_API_URL}/api/delete/product/${item?._id}`
          )
          .then((res) => {
            console.log(res);
            Swal.fire("Deleted!", `${item?.title}`, "success");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
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
        handleDelete,
      }}
    >
      {children}
    </FilterProductContext.Provider>
  );
};

export const useFilterProductContext = () => {
  return useContext(FilterProductContext);
};
