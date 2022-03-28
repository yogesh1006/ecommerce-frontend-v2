import { createContext, useContext, useReducer } from "react";
import { dataReducer, initialState } from "../reducer/dataReducer";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const filterData = (data) => {
    if (data) {
      let filteredData = [...data];

      if (state.filters.sortByBrand.length !== 0) {
        filteredData = filteredData.filter((product) =>
          state.filters.sortByBrand.includes(product.brand)
        );
      }
      if (state.filters.sortBySize.length !== 0) {
        filteredData = filteredData.filter((product) =>
          state.filters.sortBySize.includes(product.size)
        );
      }
      return filteredData;
    }
    return [];
  };

  const sortData = (data) => {
    if (state.filters.priceSort === "high_to_low") {
      return [...data].sort((a, b) => b.price - a.price);
    }
    if (state.filters.priceSort === "low_to_high") {
      return [...data].sort((a, b) => a.price - b.price);
    }

    return data;
  };

  const sortedData = sortData(state.products);
  const filteredData = filterData(sortedData);

  return (
    <DataContext.Provider value={{ state, dispatch, filteredData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
