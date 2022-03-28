import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { API } from "../../backend";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/dataContext";
import "./cart.css";

const CartItem = ({ product, getCartData }) => {
  const { authState } = useAuth();
  const { dispatch } = useData();

  const removeFromCart = (id) => {
    axios
      .post(
        `${API}/api/remove_product`,
        {
          product_id: id,
        },
        {
          headers: {
            'authorization': authState.token,
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

  const addToWishlistFromCart = (product_id) => {
    axios
      .post(
        `${API}/api/add_wishlist`,
        {
          product_id: product_id,
        },
        {
          headers: {
            'authorization': authState.token,
          },
        }
      )
      .then((res) => {
        removeFromCart(product_id);
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
  const increaseQty = (product) => {
    return dispatch({ type: "INCREASE_QUANTITY", payload: product });
  };

  const decreaseQty = (product) => {
    return dispatch({ type: "DECREASE_QUANTITY", payload: product });
  };

  return (
    <>
      <Card className="cart-item">
        <Card.Body className="cart-item-body">
          <Card.Img
            variant="bottom"
            src={product.image}
            thumbnail="true"
            className="cart-image"
          />
          <div className="cart-item-section">
            <Card.Title>
              <strong>{product.name}</strong>
            </Card.Title>
            <Card.Text as="h5">Rs.{product.price * product.qty}</Card.Text>
            <Card.Text>{product.description}</Card.Text>
            <div className="quantity-btns">
              Quantity :
              <Button
                variant="secondary"
                disabled={product.qty < 2}
                onClick={() => {
                  decreaseQty(product);
                }}
              >
                -
              </Button>
              {product.qty === 0
                ? () => {
                    removeFromCart(product.product_id);
                    dispatch({ type: "REMOVE_FROM_CART", payload: product });
                  }
                : product.qty}
              <Button
                variant="secondary"
                onClick={() => {
                  increaseQty(product);
                }}
              >
                +
              </Button>
            </div>
            <div className="extra-btns">
              <Button
                variant="primary"
                onClick={() => {
                  addToWishlistFromCart(product.product_id);
                  dispatch({ type: "REMOVE_FROM_CART", payload: product });
                }}
              >
                Move To Wishlist
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  removeFromCart(product.product_id);
                  dispatch({ type: "REMOVE_FROM_CART", payload: product });
                }}
              >
                REMOVE 
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default CartItem;
