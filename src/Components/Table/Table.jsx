import { CiSquareRemove } from "react-icons/ci";
/* eslint-disable react/prop-types */
const Table = ({
  serial,
  title,
  price_per_unit,
  quantity,
  total_price,
  buttonClick,
}) => {
  return (
    <tr className="w-full">
      <td className="hidden md:block p-[8px] border border-white text-center">
        {serial}
      </td>
      <td className=" p-[8px] border border-white w-[60%]">{title}</td>
      <td className="text-center p-[8px] border border-white w-[15%]">
        ({price_per_unit} X {quantity})
      </td>
      <td className="text-end p-[8px] border border-white w-[10%]">
        {total_price}
      </td>
      <td className="text-center p-[8px] border border-white w-[5%]">
        <CiSquareRemove
          onClick={buttonClick}
          className="mx-auto w-6 h-6 cursor-pointer hover:text-black text-red-600"
        />
      </td>
    </tr>
  );
};

export default Table;
