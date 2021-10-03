import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "80vh",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <h1>Payment Successfull! 🎉</h1>
      <h3>Thank You For shopping! 🎉 </h3>
      <div
        style={{
          display: "block",
          justifyContent: "center",
          border: "1px solid black",
          padding: "3px",
          borderRadius: "3px",
          marginLeft: "1rem",
          textAlign:"center"
        }}
      >
        <Link to="/ushopweship/home"> Continue Shopping</Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
