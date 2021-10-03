import { Button } from "react-bootstrap";
import { useData } from "../../context/dataContext";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { API } from "../../backend";

const PriceSummary = () => {
  const { authState } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const { state } = useData();
  const { cart } = state;
  const getAmount = (items) => {
    return items.reduce((acc, item) => {
      return acc + Number(item.price) * item.qty;
    }, 0);
  };

  const checkout = async (token) => {
    console.log(token);

    try {
      const data = await axios.post(
        `http://${API}/api/payment`,
        {
          token: token,
          amount: getAmount(cart),
        },
        {
          headers: {
            authorization: authState.token,
          },
        }
      );
      if (data.data.message === "success") {
        history.push("/paymentsuccess");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="price-summary">
        <div className="title">PRICE SUMMARY</div>
        <hr style={{ borderTop: "1px solid grey" }} />
        <div className="subtotal">
          Total MRP (Incl. of taxes)<span> ₹{getAmount(cart).toFixed(2)}</span>
        </div>
        <div className="delivery">
          Delivery Fee <span style={{ color: "green" }}>FREE</span>
        </div>
        <hr style={{ borderTop: "1px solid grey" }} />
        <div className="final-amount">
          Total <span>₹{getAmount(cart).toFixed(2)}</span>
        </div>
        <StripeCheckout
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          token={checkout}
          name="Checkout"
          amount={getAmount(cart) * 100}
          currency="INR"
          email={user}
          ComponentClass="div"
        >
          <div style={{ textAlign: "center" }}>
            <Button variant="primary" block className="mt-3">
              Proceed To Checkout
            </Button>{" "}
          </div>
        </StripeCheckout>
      </div>
    </>
  );
};

export default PriceSummary;
