import React, { useEffect } from "react";
import axios from "axios";
import { Col, Row, Card ,Button} from "react-bootstrap";
import { API } from "../../backend";
import { useData } from "../../context/dataContext";
import Filter from "../Filter";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Products = () => {
  const { state, dispatch } = useData();

  useEffect(() => {
    axios.post(`${API}/auth/get_all_products`)
    .then(res =>{
      dispatch({ type: "SET_PRODUCTLIST", payload: res.data.data });
    }).catch ((error)=> {
      console.error(error);
    })
    // eslint-disable-next-line
  }, []);

  const addToWishlist = (product_id) => {
    axios
      .post(
        `${API}/api/add_to_wishlist`,
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

  return (
    <>
      <Row>
        <Col>
          <Filter />
        </Col>
      </Row>
      <Row>
        {state.products.map((product) => (
          <Col key={product._id} sm={12} md={4} lg={4} xl={3}>
            <Card style={{margin: "0.5rem"}}>
              <Link to={`/ushopweship/product/${product._id}`}>
                <Card.Img variant="bottom" src={product.image} style={{height:"250px",backgroundSize:"cover"}}/>
              </Link>
              <Card.Body>

                <Card.Title>
                  <strong>{product.name}</strong>
                </Card.Title>
                <Card.Text as="h5">Rs.{product.price}</Card.Text>
                <Button onClick={() => addToWishlist(product._id)} block>
                  ADD TO WISHLIST
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Products;
