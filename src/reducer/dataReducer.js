export const initialState = {
  products: [],
  cart: [],
  wishlist: [],
  filters: {
    sortByBrand: [
      "Reebok",
    "Jack & Jones",
    "Adidas",
    "Levi's",
    "Nike",
    "Puma",
    "Campus",
    "Layasa"
    ],
    sortBySize: ["8", "9", "10"],
  },
};

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

    case "SORT_BY_BRAND":
      return state.filters.sortByBrand.includes(action.payload)
        ? {
            ...state,
            filters: {
              ...state.filters,
              sortByBrand: state.filters.sortByBrand.filter(
                (brand) => brand !== action.payload
              ),
            },
          }
        : {
            ...state,
            filters: {
              ...state.filters,
              sortByBrand: state.filters.sortByBrand.concat(action.payload),
            },
          };

          case "SORT_BY_SIZES":
            return state.filters.sortBySize.includes(action.payload)
              ? {
                  ...state,
                  filters: {
                    ...state.filters,
                    sortBySize: state.filters.sortBySize.filter(
                      (size) => size !== action.payload
                    )
                  }
                }
              : {
                  ...state,
                  filters: {
                    ...state.filters,
                    sortBySize: state.filters.sortBySize.concat(action.payload)
                  }
                };      

    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          sortByBrand: [],
          sortBySize: [],
        },
      };
    default:
      return { state };
  }
}
