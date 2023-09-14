import { useState } from "react";
import HeadlessTableContent from "../HeadlessTableContent/HeadlessTableContent";
import { useFilterProductContext } from "../../GlobalContext/FilterContext";
import { useCartContext } from "../../GlobalContext/CartContext";

const AddProductsSearchList = () => {
  const [inputValue, setInputValue] = useState(1);
  const { filteredProducts, setSearchInput } = useFilterProductContext();
  const { addPurchasedProducts } = useCartContext();
  const onInputChange = (e) => {
    setInputValue(e.target.value);
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
          {/* content */}
          {filteredProducts?.map((item) => (
            <HeadlessTableContent
              key={item._id}
              name={item?.title}
              available_quantity={item?.stock}
              price_per_unit={item?.price}
              onInputChange={onInputChange}
              inputValue={inputValue}
              handleButtonClick={() => {
                addPurchasedProducts(item, inputValue),
                  setSearchInput(""),
                  setInputValue(1);
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

export default AddProductsSearchList;
