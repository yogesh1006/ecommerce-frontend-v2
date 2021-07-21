import axios from "axios";
import React, { useState, useEffect } from "react";
// import "./App.css";

const Checkout = () => {
    // const [message, setMessage] = useState("");
    const checkoutHandler= () => {
       axios.post("http://localhost:5000/create-checkout-session",{
        headers: {
            authorization: localStorage.getItem("jwt")
          },
       })
    }

    return (
        <section>
        <div className="product">
          <img
            src="https://i.imgur.com/EHyR2nP.png"
            alt="The cover of Stubborn Attachments"
          />
          <div className="description">
            <h3>Stubborn Attachments</h3>
            <h5>$20.00</h5>
          </div>
        </div>
        {/* <form action="/api/create-checkout-session" method="POST"> */}
          <button type="submit" onClick={checkoutHandler}>
            Checkout
          </button>
        {/* </form> */}
      </section>
    )
    }

export default Checkout
// export default function App() {

//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);

//     if (query.get("success")) {
//       setMessage("Order placed! You will receive an email confirmation.");
//     }

//     if (query.get("canceled")) {
//       setMessage(
//         "Order canceled -- continue to shop around and checkout when you're ready."
//       );
//     }
//   }, []);

//   return message ? (
//     <Message message={message} />
//   ) : (
//     <Checkout />
//   );
// }
