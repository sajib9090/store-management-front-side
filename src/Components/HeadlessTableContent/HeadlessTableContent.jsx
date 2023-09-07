/* eslint-disable react/prop-types */
const HeadlessTableContent = ({
  name,
  price_per_unit,
  available_quantity,
  handleButtonClick,
  inputValue,
  onInputChange,
}) => {
  return (
    <tr className="bg-gray-300">
      <td className=" p-[8px] border border-white">{name}</td>
      <td className="text-center p-[8px] border border-white">
        {available_quantity}
      </td>
      <td className="text-end p-[8px] border border-white">{price_per_unit}</td>

      <td className="text-center p-[8px] border border-white">
        <input
          className="w-14"
          type="number"
          placeholder="Type.."
          value={inputValue}
          onChange={onInputChange}
        />
      </td>

      <td className="text-end p-[8px] border border-white">
        <button
          disabled={false}
          onClick={handleButtonClick}
          className="bg-blue-400 px-2 py-1 rounded-sm text-white"
        >
          Add
        </button>
      </td>
    </tr>
  );
};

export default HeadlessTableContent;
