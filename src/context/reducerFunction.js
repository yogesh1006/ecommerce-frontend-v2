export function reducerFunction(state, action) {
  switch (action.type) {
    case "SET_PRODUCTLIST":
      return {
        products: action.payload,
        cart: state.cart,
        wishlist: state.wishlist,
      };

    case "ADD_TO_CART":
      return {
        products: state.products,
        cart: [...state.cart, action.payload],
        wishlist: state.wishlist,
      };

      case "REMOVE_FROM_CART":
        return {
          ...state,
          cart: state.cart.filter(
            (prevItem) => prevItem.id !== action.payload
          ),
        };
    default:
      return { state };
  }
}
