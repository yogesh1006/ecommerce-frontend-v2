export function dataReducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCTLIST":
      return {
        ...state,
        products: action.payload,
      };

    case "SET_USER_CART":
      return {
        ...state,
        cart: action.payload,
      };

    case "SET_USER_WISHLIST":
      return {
        ...state,
        wishlist: action.payload,
      };

    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((prevItem) => prevItem.id !== action.payload),
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) => {
          return item.product_id === action.payload.product_id
            ? { ...item, qty: item.qty + 1 }
            : item;
        }),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) => {
          return item.product_id === action.payload.product_id
            ? { ...item, qty: item.qty - 1 }
            : item;
        }),
      };
    default:
      return { state };
  }
}
