import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { API } from "../../backend";
import { useAuth } from "../../context/AuthContext";

function ProductPage() {
  const { product_id } = useParams();
  const [product, setproduct] = useState({});
  const { authState } = useAuth();
  console.log(authState);
  const history = useHistory();

  useEffect(() => {
    axios
      .post(`${API}/auth/get_product`, {
        product_id: product_id,
      })
      .then((res) => setproduct(res.data.data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  const addToCart = (product_id) => {
    if (authState.token) {
      axios
        .post(
          `${API}/api/add_to_cart`,
          {
            product_id: product_id,
          },
          {
            headers: {
              authorization: authState.token,
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } else {
      history.push("/ushopweship/login");
    }
  };

  const addToWishlist = (product_id) => {
    if (authState.token) {

      axios
        .post(
          `${API}/api/add_to_wishlist`,
          {
            product_id: product_id,
          },
          {
            headers: {
              authorization: authState.token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } else {
      history.push("/ushopweship/login")
    }
  };


  return (
    <div>
      <Link className="btn btn-dark my-3" to="/ushopweship/home">
        Go Back
      </Link>
      <Row>
        <Col sm={12} md={10} lg={12} xl={12}>
          <Container fluid>
            <Row md={4} lg={6} xl={12}>
              <Col sm={12} md={6} lg={4}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col>
                <ListGroup variant="flush">
                  <ListGroup.Item key={product._id}>
                    <h5>{product.name}</h5>
                  </ListGroup.Item>

                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col>
                <ListGroup>
                  <ListGroup.Item>
                    {product.available_stock >= 1 ? (
                      <Button
                        variant="primary"
                        block
                        onClick={() => {
                          addToCart(product._id);
                        }}
                      >
                        ADD TO CART
                      </Button>
                    ) : (
                      <Button disabled block>
                        OUT OF STOCK
                      </Button>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button block onClick={() => addToWishlist(product._id)}>Add To Wishlist</Button>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default ProductPage;
