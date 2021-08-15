import React, { useEffect } from "react";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import axios from "axios";
import { API } from "../../backend";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/dataContext";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { authState } = useAuth();
  const { state, dispatch } = useData();

  const getWishlistData = () => {
    axios
      .get(`${API}/api/get_user_wishlist`, {
        headers: {
          authorization: authState.token,
        },
      })
      .then((res) => {
        dispatch({
          type: "SET_USER_WISHLIST",
          payload: res.data.data.products,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getWishlistData();
    // eslint-disable-next-line
  }, []);

  const removeFromWishlist = (id) => {
    axios
      .post(
        `${API}/api/remove_product_wishlist`,
        { product_id: id },
        {
          headers: {
            authorization: authState.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
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
            authorization: authState.token,
          },
        }
      )
      .then((res) => {
        removeFromWishlist(id);
        getWishlistData();
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
    <Container>
      <h4>My Wishlist ({state.wishlist.length})</h4>
      {state.wishlist.length === 0 ? (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"300px"}}>
          <h3>Your Wishlist is Empty!</h3> <br/>
          <div style={{border:"1px solid black",padding:"3px",borderRadius:"3px",marginLeft:"1rem"}}>
            <Link to="/ushopweship/home"> Continue Shopping</Link>
         </div>
        </div>
      ) : (
        <Row>
          {state.wishlist.map((product, index) => (
            <Col key={index} sm={12} md={4} lg={4} xl={3}>
              <Card style={{ minWidth: "15rem", margin: "0.5rem" }}>
                <Card.Img
                  variant="bottom"
                  src={product.image}
                  style={{ height: "250px" }}
                />

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
                  Remove From Wishlist
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Wishlist;
