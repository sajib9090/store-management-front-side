const CartReducer = (state, action) => {
  if (action.type === "ADD_TO_BILL") {
    let { product, quantity } = action.payload;

    const existingItemIndex = state.carts.findIndex(
      (item) => item.product_id === product.id
    );

    if (existingItemIndex !== -1) {
      const updatedCarts = [...state.carts];
      updatedCarts[existingItemIndex].product_quantity += parseInt(quantity);

      return {
        ...state,
        carts: updatedCarts,
      };
    } else {
      let cartProduct = {
        _id: product.id,
        product_id: product.id,
        product_name: product.title,
        product_price_per_unit: parseFloat(product.price),
        product_quantity: parseInt(quantity),
        product_available_quantity: parseInt(product.stock),
      };

      return {
        ...state,
        carts: [...state.carts, cartProduct],
      };
    }
  }

  //remove single item from cart
  if (action.type === "REMOVE_SINGLE_ITEM") {
    let updatedCart = state?.carts?.filter(
      (currentItem) => currentItem?._id !== action?.payload?._id
    );
    return {
      ...state,
      carts: updatedCart,
    };
  }
  // remove all data from cart
  if (action.type === "REMOVE_CART_DATA") {
    return {
      carts: [],
    };
  }

  return state;
};

export default CartReducer;
