import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducers/SellHistoryReducer";

const SellHistoryContext = createContext();

const initialState = {
  isAllSellHistoryLoading: false,
  isAllSellHistoryError: false,
  allSellHistory: [],
};

// eslint-disable-next-line react/prop-types
const SellHistoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAllSellHistory = async (url) => {
    dispatch({ type: "SET_SELL_HISTORY_LOADING" });
    try {
      const res = await axios.get(url);
      const allSellHistory = await res.data;
      dispatch({ type: "SET_ALL_SELL_API_DATA", payload: allSellHistory });
    } catch (error) {
      dispatch({ type: "SET_ALL_SELL_API_ERROR" });
    }
  };

  //all history
  useEffect(() => {
    getAllSellHistory(`${import.meta.env.VITE_API_URL}/api/get/soldInvoices`);
  }, []);

  return (
    <SellHistoryContext.Provider value={{ ...state }}>
      {children}
    </SellHistoryContext.Provider>
  );
};

const useSellHistoryContext = () => {
  return useContext(SellHistoryContext);
};

export { SellHistoryProvider, SellHistoryContext, useSellHistoryContext };
