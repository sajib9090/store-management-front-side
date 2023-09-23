import { useEffect, useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import SimpleLoader from "../../../Components/SimpleLoader/SimpleLoader";
import { Link } from "react-router-dom";

const AllGeneric = () => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  const fetchData = async () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/get/generics`
    );

    const fetchedData = response.data;

    const slicedData = fetchedData?.slice(startIndex, endIndex);

    if (slicedData.length === 0) {
      setHasMore(false);
    } else {
      setData([...data, ...slicedData]);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (page === 1) {
      fetchData();
    }
  }, [page]);

  return (
    <div className="mt-12">
      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={hasMore}
        loader={
          <div className="my-4">
            <SimpleLoader />
            <p>Please wait...</p>
          </div>
        }
      >
        <table className="overflow-x-scroll mx-auto sm:max-w-full md:max-w-full border-collapse w-full">
          <tr className="bg-blue-300 w-full">
            <th className="hidden md:block text-center p-[8px] border border-white">
              No.
            </th>
            <th className="text-start p-[8px] border border-white w-[45%]">
              Generic
            </th>
            <th className=" border border-white w-[20%]">Created Date</th>
            <th className=" border border-white w-[15%]">Last Edited</th>
            <th className=" border border-white w-[10%]"></th>
          </tr>
          {data?.map((item, index) => (
            <tr key={index} className="bg-blue-200 w-full">
              <>
                <td className="hidden md:block text-center">{index + 1}</td>
                <td className="text-start p-[8px] border border-white w-[45%]">
                  {item?.generic}
                </td>
                <td className=" border border-white w-[20%]">
                  {item?.createdDate}
                </td>
                <td className=" border border-white w-[15%]">
                  <p>{item?.lastEdited ? item?.lastEdited : "N/A"}</p>
                  <p>{item?.lastEditorEmail ? item?.lastEditorEmail : "N/A"}</p>
                </td>
                <td className=" border border-white w-[10%]">
                  <div className="flex items-center justify-center space-x-10">
                    <Link>
                      <BiEdit
                        title="Edit"
                        className="cursor-pointer w-6 h-6 text-green-700 hover:scale-125 duration-500"
                      />
                    </Link>
                    <BsFillTrash3Fill
                      title="Delete"
                      className="cursor-pointer w-6 h-6 text-red-600 hover:scale-125 duration-500"
                    />
                  </div>
                </td>
              </>
            </tr>
          ))}
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default AllGeneric;
