import { createContext, useContext, useEffect, useState } from "react";
import { useSellHistoryContext } from "./SellHistoryContext";

const SellHistoryFilterContext = createContext();

// eslint-disable-next-line react/prop-types
const FilterSellHistoryProvider = ({ children }) => {
  const { allSellHistory } = useSellHistoryContext();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);

  function filterDataByDate(data, selectedDate) {
    return data?.filter((item) => {
      const createdTime = new Date(item.createdTime);
      // Extract the year, month, and day components from createdTime
      const createdYear = createdTime.getFullYear();
      const createdMonth = createdTime.getMonth();
      const createdDay = createdTime.getDate();
      // Extract the year, month, and day components from selectedDate
      const selectedYear = selectedDate.getFullYear();
      const selectedMonth = selectedDate.getMonth();
      const selectedDay = selectedDate.getDate();
      // Compare the year, month, and day components
      return (
        createdYear === selectedYear &&
        createdMonth === selectedMonth &&
        createdDay === selectedDay
      );
    });
  }

  //   console.log(filterDataByDate(allSellHistory, selectedDate));

  useEffect(() => {
    // Call the filterDataByDate function and set the result in the state
    const filteredResult = filterDataByDate(allSellHistory, selectedDate);
    setFilteredData(filteredResult);
  }, [selectedDate, allSellHistory]);

  return (
    <SellHistoryFilterContext.Provider
      value={{ setSelectedDate, filteredData, selectedDate }}
    >
      {children}
    </SellHistoryFilterContext.Provider>
  );
};

const useSellHistoryFilterContext = () => {
  return useContext(SellHistoryFilterContext);
};

export {
  FilterSellHistoryProvider,
  SellHistoryFilterContext,
  useSellHistoryFilterContext,
};
