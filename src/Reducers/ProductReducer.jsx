const ProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCT_LOADING":
      return {
        ...state,
        isProductLoading: true,
      };

    case "SET_API_DATA":
      return {
        ...state,
        isProductLoading: false,
        products: action.payload,
      };
    case "API_ERROR":
      return {
        ...state,
        isProductLoading: false,
        isProductError: true,
      };

    default:
      return state;
  }
};

export default ProductReducer;
