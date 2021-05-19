import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";

import axios from "axios";
import { API } from "../../backend";

function ProductPage() {
  const { product_id } = useParams();
  const [product, setproduct] = useState({});

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
    axios
      .post(
        `${API}/api/add_to_cart`,
        {
          product_id: product_id,
        },
        {
          headers: {
            authorization: localStorage.getItem("jwt"),
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
  };

  // async function addToCart(product, id) {
  //   try {
  //     const response = await fetch(`${API}/api/add_to_cart`, {
  //       method: "POST",
  //       product_id: id,
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //         'Authorization': `Bearer ${token}`
  //       },
  //     });
  //     let data = await response.json();
  //     dispatch({ type: "ADD_TO_CART", payload: product });
  //     toast.success("Item Added To Cart", {
  //       position: toast.POSITION.TOP_RIGHT
  //     });
  //     // alert("Item Added To Cart");
  //     console.log(data);
  //   } catch (err) {
  //     alert("Something Went Wrong");
  //     console.log(err);
  //   }
  // }

  return (
    <div>
      <Link className="btn btn-dark my-3" to="/ushopweship/home">
        Go Back
      </Link>
      <Row>
        <Col sm={12} md={10} lg={12} xl={12}>
          <Container fluid>
            <Row xl={6}>
              <Col>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col>
                <ListGroup variant="flush">
                  <ListGroup.Item key={product._id}>
                    <h3>{product.name}</h3>
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
