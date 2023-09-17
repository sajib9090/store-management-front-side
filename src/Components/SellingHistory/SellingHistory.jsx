import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSellHistoryFilterContext } from "../../GlobalContext/FilterSellHistoryContext";
import { TbCurrencyTaka } from "react-icons/tb";

const SellingHistory = () => {
  const { selectedDate, setSelectedDate, filteredData, handleCaptureDate } =
    useSellHistoryFilterContext();

  const totalDiscount =
    filteredData?.length > 0
      ? filteredData
          .reduce((sum, item) => item?.invoice[0].totalDiscount + sum, 0)
          .toFixed(2)
      : 0;
  const beforeDiscountPrice =
    filteredData?.length > 0
      ? filteredData
          .reduce((sum, item) => {
            const totalPrice = parseFloat(item?.invoice[0].totalPrice);
            return isNaN(totalPrice) ? sum : totalPrice + sum;
          }, 0)
          .toFixed(2)
      : 0;
  const afterDiscountPrice =
    filteredData?.length > 0
      ? filteredData
          .reduce((sum, item) => item?.invoice[0].discountedPrice + sum, 0)
          .toFixed(2)
      : 0;

  return (
    <div>
      <h1 className="text-center text-xl font-semibold my-4">
        Sell Record Find By Date
      </h1>

      <div className="text-center my-4 flex items-center justify-center">
        <DatePicker
          className="text-xl text-center"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />
        <button
          onClick={() => handleCaptureDate(selectedDate)}
          className="bg-blue-400 px-4 text-white"
        >
          Search
        </button>
      </div>
      <div>
        <table className="overflow-x-scroll mx-auto sm:max-w-full md:max-w-full border-collapse w-full">
          <tr className="bg-blue-300 w-full">
            <th className="hidden md:block text-center p-[8px] border border-white">
              Invoice Id
            </th>
            <th className="text-center p-[8px] border border-white w-[40%]">
              Date
            </th>

            <th className="text-center p-[8px] border border-white w-[10%]">
              Price
            </th>
            <th className="text-center p-[8px] border border-white w-[10%]">
              Discount
            </th>
            <th className="text-center p-[8px] border border-white w-[10%]">
              Grand Amount
            </th>
          </tr>
          {filteredData?.map((data, index) => (
            <tr key={index} className="bg-blue-300 w-full">
              <td className="hidden md:block text-center p-[8px] border border-white">
                {data?._id}
              </td>
              <td className="text-start p-[8px] border border-white w-[40%]">
                {data?.createdTime}
              </td>
              <td className="text-center p-[8px] border border-white w-[15%]">
                {data?.invoice[0]?.totalPrice}
              </td>
              <td className="text-center p-[8px] border border-white w-[10%]">
                {data?.invoice[0]
                  ? data?.invoice[0]?.totalDiscount?.toFixed(2)
                  : "0.00"}
              </td>
              <td className="text-center p-[8px] border border-white w-[15%]">
                {data?.invoice[0]
                  ? data?.invoice[0]?.discountedPrice.toFixed(2)
                  : "0.00"}
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className="max-w-[25rem] ml-auto pr-8 space-y-2 py-4">
        <div className="border-b border-gray flex items-center justify-between">
          <p>Before Discount Sell:</p>
          <p>{beforeDiscountPrice}</p>
        </div>
        <div className="border-b border-gray flex items-center justify-between">
          <p>Discount:</p>
          <p>{totalDiscount}</p>
        </div>
        <div className="border-b border-gray flex items-center justify-between">
          <p className="flex items-center">
            Grand Total (after discount):
            <TbCurrencyTaka className="w-4 h-4" />
          </p>
          <p className="font-bold">{afterDiscountPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default SellingHistory;
