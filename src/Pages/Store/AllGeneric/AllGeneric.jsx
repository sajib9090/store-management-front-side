import { useEffect, useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import SimpleLoader from "../../../Components/SimpleLoader/SimpleLoader";
import toast from "react-hot-toast";

const AllGeneric = () => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const [searchTerm, setSearchTerm] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/get/generics`
    );

    const fetchedData = response.data;
    setAllData(fetchedData);

    const slicedData = fetchedData?.slice(startIndex, endIndex);

    if (slicedData.length === 0) {
      setHasMore(false);
    } else {
      setData([...data, ...slicedData]);
      setPage(page + 1);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (page === 1) {
      fetchData();
    }
  }, [page]);

  const filterData = () => {
    const filtered = allData?.filter((item) =>
      item?.generic?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    if (!searchTerm) {
      return;
    } else {
      filterData();
    }
  }, [searchTerm, allData]);

  const handleDelete = (generic) => {
    axios
      .delete(
        `${import.meta.env.VITE_API_URL}/api/delete/generic/${generic?._id}`
      )
      .then((res) => {
        if (res) {
          toast.success("Deleted");
          fetchData();
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("Something went wrong");
        }
        console.log(err);
      });
  };

  return (
    <div className="mt-12">
      <div className="mb-4">
        <input
          type="search"
          placeholder="Search Generics"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-2 py-1 border border-gray-300"
        />
      </div>
      <InfiniteScroll
        dataLength={searchTerm ? filteredData.length : data.length}
        next={fetchData}
        hasMore={hasMore}
        loader={
          isLoading ? (
            <div className="my-4">
              <SimpleLoader />
              <p>Loading...</p>
            </div>
          ) : null
        }
      >
        <table className="overflow-x-scroll mx-auto sm:max-w-full md:max-w-full border-collapse w-full">
          <tr className="bg-blue-300 w-full">
            <th className="hidden md:block text-center p-[8px] border border-white">
              No.
            </th>
            <th className="text-start p-[8px] border border-white w-[50%]">
              Generic
            </th>
            <th className=" border border-white w-[30%]">Created Date</th>
            <th className=" border border-white w-[10%]"></th>
          </tr>
          {(searchTerm ? filteredData : data)?.map((item, index) => (
            <tr key={index} className="bg-blue-200 w-full">
              <>
                <td className="hidden md:block text-center">{index + 1}</td>
                <td className="text-start p-[8px] border border-white w-[50%]">
                  {item?.generic}
                </td>
                <td className=" border border-white w-[30%]">
                  {item?.createdDate}
                </td>
                <td className=" border border-white w-[10%]">
                  <div className="flex items-center justify-center space-x-10">
                    <BsFillTrash3Fill
                      onClick={() => handleDelete(item)}
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
