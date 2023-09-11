/* eslint-disable react/prop-types */
const InvoiceTableContent = ({
  serial,
  productName,
  price,
  quantity,
  pricePerUnit,
}) => {
  return (
    <tr className="bg-blue-100 w-full">
      <td className="hidden text-sm font-extralight md:block text-center p-[8px] border border-white">
        {serial}
      </td>
      <td className="text-start text-sm font-extralight p-[8px] border border-white w-[60%]">
        {productName}
      </td>
      <td className="text-center border text-sm font-extralight border-white w-[15%]">
        ({pricePerUnit} X {quantity})
      </td>
      <td className="text-center text-sm font-extralight p-[8px] border border-white w-[15%]">
        {price}
      </td>
    </tr>
  );
};

export default InvoiceTableContent;
