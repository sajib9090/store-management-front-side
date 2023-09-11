/* eslint-disable react/prop-types */
import { TbCurrencyTaka } from "react-icons/tb";
const InvoiceFooter = ({ price, discount, finalPrice }) => {
  return (
    <div className="max-w-[10rem] ml-auto pr-8 space-y-2 py-4">
      <div className="border-b border-gray flex items-center justify-between">
        <p>Price:</p>
        <p>{price}</p>
      </div>
      <div className="border-b border-gray flex items-center justify-between">
        <p>Discount:</p>
        <p>{discount}</p>
      </div>
      <div className="border-b border-gray flex items-center justify-between">
        <p className="flex items-center">
          Total:
          <TbCurrencyTaka className="w-4 h-4" />
        </p>
        <p className="font-bold">{finalPrice}</p>
      </div>
    </div>
  );
};

export default InvoiceFooter;
