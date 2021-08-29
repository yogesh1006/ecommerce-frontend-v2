import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useData } from "../../context/dataContext";
import "./filter.css";

const Filter = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { state, dispatch } = useData();
  const brands = [
    "Reebok",
    "Jack & Jones",
    "Adidas",
    "Levi's",
    "Nike",
    "Puma",
    "Campus",
    "Layasa",
  ];
  const sizes = ["8", "9", "10"];

  const sortHandler = (e) => {
    if (e.target.value === "low_to_high") {
      dispatch({ type: "PRICE_LOW_TO_HIGH", payload: e.target.value });
    } else {
      dispatch({ type: "PRICE_HIGH_TO_LOW", payload: e.target.value });
    }
  };

  return (
    <>
      <div className="filters">
        <Button onClick={() => dispatch({ type: "CLEAR_FILTERS" })}>
          Clear All
        </Button>
        <legend>Sort By Price</legend>
        <div className="sort">
          <br />
          <select
            className="sortSelect"
            value={state.filters.priceSort}
            onChange={(e) => sortHandler(e)}
          >
            <option value="high_to_low">Price: High to Low</option>
            <option value="low_to_high">Price: Low to High</option>
          </select>
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

      <div className="mobile-view">
        <Button variant="primary" onClick={handleShow} className="float-btn">
          <i className="fas fa-filter fa-lg"></i>
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Filters</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <legend>Sort By Price</legend>
            <div className="sort">
              <select
                className="sortSelect"
                value={state.filters.priceSort}
                onChange={(e) => sortHandler(e)}
              >
                <option value="high_to_low">Price: High to Low</option>
                <option value="low_to_high">Price: Low to High</option>
              </select>
            </div>
            <legend>Filter By Brand</legend>
            <div className="brands">
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
            <legend>Filter By Size</legend>
            <div className="diff-sizes">
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button> */}
            <Button onClick={() => dispatch({ type: "CLEAR_FILTERS" })}>
              Clear All
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Filter;
