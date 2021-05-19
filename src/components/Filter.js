import axios from "axios";
import React from "react";
import { API } from "../backend";
import { useData } from "../context/dataContext";

const Filter = () => {
  const { dispatch } = useData();

  const filteredDataHighToLow = () => {
    axios
      .post(`${API}/auth/get_all_products`, {
        order: "-1",
        column: "price",
      })
      .then((res) => {
        dispatch({ type: "SET_PRODUCTLIST", payload: res.data.data });
      });
  };

  const filteredDataLowToHigh = () => {
    axios
      .post(`${API}/auth/get_all_products`, {
        order: "1",
        column: "price",
      })
      .then((res) => {
        dispatch({ type: "SET_PRODUCTLIST", payload: res.data.data });
      });
  };

  const filterClear = () =>{
    axios
    .post(`${API}/auth/get_all_products`)
    .then((res) => {
      dispatch({ type: "SET_PRODUCTLIST", payload: res.data.data });
    });  }
    
  return (
    <div>
      <fieldset>
        <legend>Sort By</legend>
        <input type="radio" name="sort" onChange={filterClear} />
        <label>Newest</label>
        <input type="radio" name="sort" onChange={filteredDataHighToLow} />

        <label>Price: High To Low</label>
        {"   "}
        <input type="radio" name="sort" onChange={filteredDataLowToHigh} />
        <label>Price: Low To High</label>
      </fieldset>
    </div>
  );
};

export default Filter;
