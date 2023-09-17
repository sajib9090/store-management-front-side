import { useState } from "react";
import FindProductsByCompany from "../../../Pages/Store/FindInvoiceByCompany/FindProductsByCompany";
import { Link } from "react-router-dom";

const StockTabsContent = () => {
  const [toggleOption, setToggleOption] = useState(0);
  return (
    <div className="min-h-screen mt-6">
      <div className="text-center">
        <div className="flex items-center justify-center lg:h-12 space-x-4 py-4 bg-blue-400">
          <Link to="/store/stock/find_product_by_company">
            <p
              className={
                toggleOption == 1
                  ? "text-gray-100 font-bold cursor-pointer underline"
                  : "text-black cursor-pointer font-bold"
              }
              onClick={() => setToggleOption(1)}
            >
              Find Stock by Company
            </p>
          </Link>
        </div>
        {/* content */}

        <div className={toggleOption == 1 ? "block" : "hidden"}>
          <div className="">
            <FindProductsByCompany />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTabsContent;
