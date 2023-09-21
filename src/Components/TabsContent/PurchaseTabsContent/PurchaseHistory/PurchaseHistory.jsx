import { useEffect, useState } from "react";
import SimpleLoader from "../../../SimpleLoader/SimpleLoader";
import { TbCurrencyTaka } from "react-icons/tb";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PurchaseHistory = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const realtimeDate = year + "-" + month + "-" + day;
  const [selectedD, setSelectedD] = useState(realtimeDate);
  const [filteredData, setFilteredData] = useState([]);

  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSelectDate = (e) => {
    e.preventDefault();
    const date = e.target.selectedDate.value;
    setSelectedD(date);
    setSearchParams({ filter: date });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/api/get/purchaseInvoices/byDate/${selectedD}`
      )
      .then((res) => {
        setFilteredData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [selectedD]);

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
            const totalPrice = parseFloat(item?.invoice[0].beforeDiscountPrice);
            return isNaN(totalPrice) ? sum : totalPrice + sum;
          }, 0)
          .toFixed(2)
      : 0;

  const afterDiscountPrice =
    filteredData?.length > 0
      ? filteredData
          .reduce((sum, item) => item?.invoice[0].afterDiscountPrice + sum, 0)
          .toFixed(2)
      : 0;

  return (
    <div>
      <h1 className="text-center text-xl font-semibold my-4">
        Purchase Record Find By Date
      </h1>

      <div className="text-center my-4 flex items-center justify-center">
        <form onSubmit={handleSelectDate} className="flex items-center">
          <input
            type="date"
            name="selectedDate"
            required
            className="bg-gray-300 rounded-l px-2 py-4 text-lg cursor-pointer"
          />
          <button
            type="submit"
            className="bg-blue-500 rounded-r text-lg text-white w-[100px] h-[60px]"
          >
            {loading ? <SimpleLoader /> : "Search"}
          </button>
        </form>
      </div>
      <div>
        <div className="pl-2 py-2">
          <p className="text-xl font-medium">
            Selected Date: <span className="text-blue-700">{selectedD}</span>
          </p>
          <p className="text-xl">
            Total Invoice Found:{" "}
            {filteredData?.length == 0 ? (
              <span className="text-red-600">No Invoice Found</span>
            ) : (
              <span className="text-green-500 font-bold">
                {filteredData?.length}
              </span>
            )}
          </p>
        </div>
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
                {data?.invoice[0]?.beforeDiscountPrice}
              </td>
              <td className="text-center p-[8px] border border-white w-[10%]">
                {data?.invoice[0] ? data?.invoice[0]?.totalDiscount : "0.00"}
              </td>
              <td className="text-center p-[8px] border border-white w-[15%]">
                {data?.invoice[0]
                  ? data?.invoice[0]?.afterDiscountPrice
                  : "0.00"}
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className="max-w-[25rem] ml-auto pr-8 space-y-2 py-4">
        <div className="border-b border-gray flex items-center justify-between">
          <p>Before Discount Price:</p>
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

export default PurchaseHistory;
