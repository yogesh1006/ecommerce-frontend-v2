import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { API } from "../backend";
import { useData } from "../context/dataContext";
import "./filter.css";

const Filter = () => {
  const { state,dispatch } = useData();
  const brands = [
    "Reebok",
    "Jack & Jones",
    "Adidas",
    "Levi's",
    "Nike",
    "Puma",
    "Campus",
    "Layasa"
  ]
  const sizes = ["8","9","10"];

  const filteredDataHighToLow = () => {
    axios
      .post(`${API}/auth/get_all_products`, {
        order: "-1",
        column: "price",
        // brand:["reebok","puma"],
        // size:["8"],
        // filter:true
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




  return (
    <div  className="filters">
        <Button onClick={() => dispatch({ type: "CLEAR_FILTERS" })}>Clear All</Button>
        <legend>Sort By Price</legend>
        <div>
          <input type="radio" name="sort" onChange={filteredDataHighToLow} />
          <label> Price: High To Low</label>
          <br />
          <input type="radio" name="sort" onChange={filteredDataLowToHigh} />
          <label> Price: Low To High</label>
        </div>
        <legend>Filter By Brand</legend>
        <div>
        {brands.map((brand) => {
          return (
            <div key={brand}>
              <input
                type="checkbox"
                id="brand"
                checked={state.filters.sortByBrand.includes(brand)}
                onChange={() =>
                  dispatch({ type: "SORT_BY_BRAND", payload: brand })
                }
              ></input>
              <label htmlFor="brand">{brand}</label>
            </div>
          );
        })}
        </div>
        <div>
        <legend>Filter By Size</legend>

        {sizes.map((size) => {
          return (
            <div key={size}>
              <input
                type="checkbox"
                id="sizes"
                checked={state.filters.sortBySize.includes(size)}
                onChange={() =>
                  dispatch({ type: "SORT_BY_SIZES", payload: size })
                }
              ></input>
              <label htmlFor="sizes">{size}</label>
            </div>
          );
        })}
        </div>
    </div>
  );
};

export default Filter;
