import { createContext, useContext, useReducer } from "react";
import {reducerFunction} from "./reducerFunction"

export const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

const initialState = {
  products: [],
  cart: [],
  wishlist:[],
};
export function DataProvider({ children }) {
  const [state, dispatch ] = useReducer(reducerFunction, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

