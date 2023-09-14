import { useState } from "react";
import SellingHistory from "../../SellingHistory/SellingHistory";
import FindSoldInvoice from "../../FindSoldInvoice/FindSoldInvoice";

const SellTabsContent = () => {
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
          Selling History
        </p>

        <p
          className={
            toggleOption == 2
              ? "text-gray-100 font-bold cursor-pointer underline"
              : "text-black cursor-pointer font-bold"
          }
          onClick={() => setToggleOption(2)}
        >
          Find Invoice
        </p>
      </div>
      {/* content */}

      <div className={toggleOption == 1 ? "block" : "hidden"}>
        <div className="mt-2">
          <SellingHistory />
        </div>
      </div>
      <div className={toggleOption == 2 ? "block" : "hidden"}>
        <div className="">
          <FindSoldInvoice />
        </div>
      </div>
    </div>
  );
};

export default SellTabsContent;
