import { createContext, useContext, useReducer } from "react";
import { dataReducer } from "../reducer/dataReducer";

export const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

const initialState = {
  products: [],
  cart: [],
  wishlist: [],
};

console.log(initialState);
export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}
