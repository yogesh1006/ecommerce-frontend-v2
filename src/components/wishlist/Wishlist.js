import React, { useState, useEffect } from "react";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../backend";
import { toast } from "react-toastify";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const getWishlistData = () => {
    axios
      .get(`${API}/api/get_user_wishlist`, {
        headers: {
          authorization: localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setWishlist(res.data.data.products);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getWishlistData();
  }, []);

  const removeFromWishlist = (id) => {
    axios
      .post(
        `${API}/api/remove_product_wishlist`,
        { product_id: id },
        {
          headers: {
            authorization: localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        getWishlistData();
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => console.log(err));
  };

  const addToCartFromWishlist = (id) => {
    axios
      .post(
        `${API}/api/add_cart`,
        { product_id: id },
        {
          headers: {
            authorization: localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        removeFromWishlist(id);
        setWishlist(res.data.data.products);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Row>
        <h4>My Wishlist ({wishlist.length})</h4>

        {wishlist.map((product, index) => (
          <Col key={index} sm={12} md={4} lg={4} xl={3}>
            <Card style={{ minWidth: "15rem", margin: "0.5rem" }}>
              <Card.Img variant="bottom" src={product.image} />

              <Card.Body>
                <Card.Title>
                  <strong>{product.name}</strong>
                </Card.Title>
                <Card.Text as="h5">Rs.{product.price}</Card.Text>
              </Card.Body>
              <Button
                className="mb-2"
                onClick={() => addToCartFromWishlist(product.product_id)}
              >
                Add to Cart
              </Button>
              <Button
                variant="secondary"
                onClick={() => removeFromWishlist(product.product_id)}
              >
                Remove
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Wishlist;
