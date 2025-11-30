import React from "react";
import { useNavigate } from "react-router-dom";

const ShopCategory = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    console.log("Proceed to Checkout button clicked"); // Debugging log
    navigate("/checkout"); // Navigate to the checkout page
  };

  return (
    <div>
      {/* ...existing code... */}
      <button className="proceed-to-checkout" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
      {/* ...existing code... */}
    </div>
  );
};

export default ShopCategory;
