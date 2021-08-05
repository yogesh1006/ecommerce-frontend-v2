import { Button } from "react-bootstrap";
import { useData } from "../../context/dataContext";

const PriceSummary = () => {
  const { state } = useData();
  const { cart } = state;

  const getAmount = (items) => {
    return items.reduce((acc, item) => {
      return acc + Number(item.price) * item.qty;
    }, 0);
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
        <Button variant="primary" block className="mt-3">Proceed To Checkout</Button>
      </div>
    </>
  );
};

export default PriceSummary;
