/* eslint-disable react/prop-types */
import { useState } from "react";
import HeadlessTableContent from "../HeadlessTableContent/HeadlessTableContent";
import { useCartContext } from "../../GlobalContext/CartContext";
import { useFilterProductContext } from "../../GlobalContext/FilterContext";

const SearchProductList = ({ filteredProducts }) => {
  const { handleAddToBill } = useCartContext();
  const { handleEmptySearch } = useFilterProductContext();
  const [inputValue, setInputValue] = useState(1);

  // Step 2: Function to handle changes in the input field value
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      {filteredProducts?.length > 0 ? (
        <table className="overflow-x-scroll mx-auto sm:max-w-full md:max-w-full border-collapse w-full">
          <tr className="bg-blue-300 w-full">
            <th className="text-left p-[8px] border border-white w-[72%]">
              Name
            </th>
            <th className=" border border-white w-[7%]">Stock</th>
            <th className="text-center p-[8px] border border-white w-[8%]">
              Price
            </th>
            <th className="text-center p-[8px] border border-white w-[8%]">
              Quantity
            </th>
            <th className="text-center p-[8px] border border-white w-[5%]"></th>
          </tr>
          {filteredProducts?.map((currElem) => (
            <HeadlessTableContent
              key={currElem.id}
              name={currElem?.title}
              available_quantity={currElem?.stock}
              price_per_unit={currElem.price}
              inputValue={inputValue}
              onInputChange={handleInputChange}
              handleButtonClick={() => {
                handleAddToBill(currElem, inputValue);
                handleEmptySearch();
              }}
            />
          ))}
        </table>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchProductList;
