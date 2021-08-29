import React, { useEffect } from "react";
import axios from "axios";
import { Col, Row, Card, Button } from "react-bootstrap";
import { API } from "../../backend";
import { useData } from "../../context/dataContext";
import Filter from "../Filter/Filter";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import "./products.css";

const Products = () => {
  const { filteredData, dispatch } = useData();
  const { authState } = useAuth();
  const history = useHistory();
  useEffect(() => {
    axios
      .post(`${API}/auth/get_all_products`)
      .then((res) => {
        dispatch({ type: "SET_PRODUCTLIST", payload: res.data.data });
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() =>{
    dispatch({type:"CLEAR_FILTERS"})
    // eslint-disable-next-line
  },[])

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
      history.push("/ushopweship/login");
    }
  };

  return (
    <div className="product-page">
      <Filter />
      <div style={{ width: "80%" }}>
        <Row>
          {filteredData.map((product) => (
            <Col key={product._id} sm={12} md={4} lg={3} xl={4}>
              <Card
                style={{ margin: "0.5rem", width: "100%", height: "470px" }}
              >
                <Link to={`/ushopweship/product/${product._id}`}>
                  <Card.Img
                    variant="bottom"
                    src={product.image}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                </Link>
                <Card.Body
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: "1",
                    alignItems: "stretch",
                  }}
                >
                  <Card.Title>
                    {product.name}
                    <span>
                      {" "}
                      <h6>{product.brand}</h6>
                    </span>
                  </Card.Title>
                  <Card.Text>Size : {product.size}</Card.Text>
                  <Card.Text as="h5">Rs.{product.price}</Card.Text>
                  <Button
                    style={{ position: "relative", bottom: 0 }}
                    onClick={() => addToWishlist(product._id)}
                    block
                  >
                    ADD TO WISHLIST
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Products;
