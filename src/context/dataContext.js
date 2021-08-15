import { createContext, useContext, useReducer } from "react";
import { dataReducer, initialState } from "../reducer/dataReducer";

export const DataContext = createContext();


export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);


  const filterData = (data) => {
    console.log("", data);
    if (data) {
      let filteredData = [...data];

      if (state.filters.sortByBrand.length !== 0) {
        filteredData = filteredData.filter((product) =>
          state.filters.sortByBrand.includes(product.brand)
        );
      }
      if (state.filters.sortBySize.length !== 0) {
        filteredData = filteredData.filter((product) =>
          state.filters.sortBySize.includes(product.size.map((size) => {
            return size 
          
          }))
        );
      }
      return filteredData;
    }
    return [];
  };
  const filteredData = filterData(state.products);
  return (
    <DataContext.Provider value={{ state, dispatch, filteredData }}>
      {children}
    </DataContext.Provider>
  );
}


export function useData() {
  return useContext(DataContext);
}