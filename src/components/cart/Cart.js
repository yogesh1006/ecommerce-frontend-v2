import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { API } from "../../backend";
import axios from "axios";
import PriceSummary from "./PriceSummary";
import CartItem from "./CartItem";
import "./cart.css";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/dataContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { authState } = useAuth();
  const { state, dispatch } = useData();
  console.log(state);
  
  const getCartData = () => {
    axios
      .get(`${API}/api/get_user_cart`, {
        headers: {
          authorization: authState.token,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: "SET_USER_CART", payload: res.data.data.products });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCartData();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <h3>My Cart ({state.cart.length})</h3>
      {state.cart.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <h3>Your Cart is Empty!</h3> <br />
          <div
            style={{
              border: "1px solid black",
              padding: "3px",
              borderRadius: "3px",
              marginLeft: "1rem",
            }}
          >
            <Link to="/ushopweship/home"> Continue Shopping</Link>
          </div>
        </div>
      ) : (
        <Row>
          <Col className="cart" md={12} lg={6}>
            {state.cart.map((product) => {
              return (
                <CartItem
                  product={product}
                  key={product._id}
                  getCartData={getCartData}
                />
              );
            })}
          </Col>
          <Col className="cart">
            <PriceSummary />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Cart;
