import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Container,
  Dropdown,
  DropdownButton
} from "react-bootstrap";
import { API } from "../../backend";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

const Cart = () => {
  const [cart, setCart] = useState([]);
const history = useHistory();

  const checkout = (product) => {
     history.push("/ushopweship/checkout")
  }

  const getCartData = () => {
    axios
      .get(`${API}/api/get_user_cart`, {
        headers: {
          authorization: localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        console.log(res);
        setCart(res.data.data.products);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCartData();
  }, []);

  const removeFromCart = (id) => {
    axios
      .post(
        `${API}/api/remove_product`,
        {
          product_id: id,
        },
        {
          headers: {
            authorization: localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        getCartData();
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <Container>
      <Row>
        <h3>My Cart ({cart.length})</h3>

        {cart.map((product, index) => (
          <Col key={index} sm={12} md={4} lg={4} xl={3}>
            <Card>
              <Card.Img variant="bottom" src={product.image} thumbnail="true" style={{height:"250px"}}/>
              <Card.Body>
                <Card.Title>
                  <strong>{product.name}</strong>
                </Card.Title>
                <Card.Text as="h5">Rs.{product.price}</Card.Text>
                <Card.Text>{product.description}</Card.Text>
                <DropdownButton
                  id="dropdown-item-button"
                  title="Qty :"
                  variant="secondary"
                >
                  <Dropdown.Item as="button">1</Dropdown.Item>
                  <Dropdown.Item as="button">2</Dropdown.Item>
                  <Dropdown.Item as="button">3</Dropdown.Item>
                </DropdownButton>
                  <Button variant="primary" block onClick={() => checkout(product)}>BUY NOW</Button>
                  <Button
                    block
                    variant="secondary"
                    onClick={() => removeFromCart(product.product_id)}
                  >
                    REMOVE
                  </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Cart;
