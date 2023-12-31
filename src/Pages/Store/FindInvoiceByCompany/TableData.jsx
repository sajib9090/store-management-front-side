/* eslint-disable react/prop-types */
import { BsFillTrash3Fill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useFilterProductContext } from "../../../GlobalContext/FilterContext";
import { Link } from "react-router-dom";

const TableData = ({ index, item }) => {
  const { handleDelete } = useFilterProductContext();

  return (
    <>
      <td className="hidden md:block text-center p-[8px] border border-white">
        {index + 1}
      </td>
      <td className="text-start p-[8px] border border-white w-[50%]">
        {item?.title}
      </td>
      <td className=" border border-white w-[20%]">{item?.stock}</td>
      <td className=" border border-white w-[20%]">
        <div className="flex items-center justify-center space-x-10">
          <Link to={`/store/product/edit/${item?._id}`}>
            <BiEdit
              title="Edit"
              className="cursor-pointer w-6 h-6 text-green-700 hover:scale-125 duration-500"
            />
          </Link>
          <BsFillTrash3Fill
            onClick={() => handleDelete(item)}
            title="Delete"
            className="cursor-pointer w-6 h-6 text-red-600 hover:scale-125 duration-500"
          />
        </div>
      </td>
    </>
  );
};

export default TableData;
