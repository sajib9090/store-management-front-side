import { useState } from "react";
import AddGenericContent from "./AddGenericContent/AddGenericContent";
import AddCompanyContent from "./AddCompanyContent/AddCompanyContent";
import AddNewProduct from "./AddNewProduct/AddNewProduct";
import AddCategoryContent from "./AddCategoryContent/AddCategoryContent";
import AddProductsContent from "./AddProductsContent/AddProductsContent";

const AddTabsContent = () => {
  const [toggleOption, setToggleOption] = useState(1);
  return (
    <div className="bg-gray-100 mt-6 min-h-screen">
      <div className="flex items-center justify-center lg:h-12 space-x-4 py-4 bg-blue-400">
        <p
          className={
            toggleOption == 1
              ? "text-gray-100 font-bold cursor-pointer underline"
              : "text-black cursor-pointer font-bold"
          }
          onClick={() => setToggleOption(1)}
        >
          Add Products
        </p>

        <p
          className={
            toggleOption == 2
              ? "text-gray-100 font-bold cursor-pointer underline"
              : "text-black cursor-pointer font-bold"
          }
          onClick={() => setToggleOption(2)}
        >
          Add New Generic
        </p>

        <p
          className={
            toggleOption == 3
              ? "text-gray-100 font-bold cursor-pointer underline"
              : "text-black cursor-pointer font-bold"
          }
          onClick={() => setToggleOption(3)}
        >
          Add New Company
        </p>

        <p
          className={
            toggleOption == 4
              ? "text-gray-100 font-bold cursor-pointer underline"
              : "text-black cursor-pointer font-bold"
          }
          onClick={() => setToggleOption(4)}
        >
          Add New Product
        </p>

        <p
          className={
            toggleOption == 5
              ? "text-gray-100 font-bold cursor-pointer underline"
              : "text-black cursor-pointer font-bold"
          }
          onClick={() => setToggleOption(5)}
        >
          Add New Category
        </p>
      </div>
      {/* content */}

      <div className={toggleOption == 1 ? "block" : "hidden"}>
        <div className="mt-2">
          <AddProductsContent />
        </div>
      </div>
      <div className={toggleOption == 2 ? "block" : "hidden"}>
        <div className="mt-12 lg:mt-24">
          <AddGenericContent />
        </div>
      </div>
      <div className={toggleOption == 3 ? "block" : "hidden"}>
        <div className="mt-12 lg:mt-24">
          <AddCompanyContent />
        </div>
      </div>
      <div className={toggleOption == 4 ? "block" : "hidden"}>
        <div className="mt-12 lg:mt-24">
          <AddNewProduct />
        </div>
      </div>
      <div className={toggleOption == 5 ? "block" : "hidden"}>
        <div className="mt-12 lg:mt-24">
          <AddCategoryContent />
        </div>
      </div>
    </div>
  );
};

export default AddTabsContent;
