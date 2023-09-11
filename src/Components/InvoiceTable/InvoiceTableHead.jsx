/* eslint-disable react/prop-types */
const InvoiceTableHead = () => {
  return (
    <tr className="bg-blue-100 w-full">
      <th className="hidden md:block text-center p-[8px] border border-white">
        SL.
      </th>
      <th className="text-start p-[8px] border border-white w-[60%]">Items</th>
      <th className=" border border-white w-[15%]"></th>
      <th className="text-center p-[8px] border border-white w-[15%]">Price</th>
    </tr>
  );
};

export default InvoiceTableHead;
