const SellHistory = (action, state) => {
  switch (action.type) {
    case "SET_SELL_HISTORY_LOADING":
      return {
        ...state,
        isAllSellHistoryLoading: true,
      };

    case "SET_ALL_SELL_API_DATA":
      return {
        ...state,
        isAllSellHistoryLoading: false,
        allSellHistory: action.payload,
      };
    case "SET_ALL_SELL_API_ERROR":
      return {
        ...state,
        isAllSellHistoryLoading: false,
        isAllSellHistoryError: true,
      };

    default:
      return state;
  }
};

export default SellHistory;
