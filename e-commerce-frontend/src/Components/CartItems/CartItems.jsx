import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CartItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const CartItems = () => {
  const navigate = useNavigate();
  const { products } = useContext(ShopContext);
  const { cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

  return (
    <div className="cartitems">
      <h1 className="cartitems-header">Your Shopping Cart</h1>
      <div className="cartitems-container">
        <div className="cartitems-header-row">
          <p>Product</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Action</p>
        </div>
        <hr />
        {products.map((e) => {
          if (cartItems[e.id] > 0) {
            return (
              <div key={e.id} className="cartitems-row">
                <img className="cartitems-product-image" src={e.image} alt={e.name} />
                <p className="cartitems-product-title">{e.name}</p>
                <p className="cartitems-product-price">₹{e.new_price}</p>
                <div className="cartitems-quantity-box">
                  <button className="cartitems-quantity">{cartItems[e.id]}</button>
                </div>
                <p className="cartitems-product-total">₹{(e.new_price * cartItems[e.id]).toFixed(2)}</p>
                <img
                  onClick={() => removeFromCart(e.id)}
                  className="cartitems-remove-icon"
                  src={cross_icon}
                  alt="Remove"
                />
              </div>
            );
          }
          return null;
        })}
        <hr />
        <div className="cartitems-summary">
          <div className="cartitems-total-section">
            <h2>Cart Totals</h2>
            <div className="cartitems-summary-item">
              <p>Subtotal:</p>
              <p>₹{getTotalCartAmount().toFixed(2)}</p>
            </div>
            <div className="cartitems-summary-item">
              <p>Shipping Fee:</p>
              <p>Free</p>
            </div>
            <div className="cartitems-summary-item">
              <h3>Total:</h3>
              <h3>₹{getTotalCartAmount().toFixed(2)}</h3>
            </div>
            <button 
              className="cartitems-checkout-button" 
              onClick={() => {
                const token = localStorage.getItem("auth-token");
                const cartIsEmpty = Object.values(cartItems).every((quantity) => quantity === 0);
                if (cartIsEmpty) {
                  alert("Your cart is empty. Add items to proceed to checkout.");
                  return;
                }
                if (token) {
                  navigate("/checkout");
                } else {
                  navigate("/login");
                }
              }}
            >
              Proceed to Checkout
            </button>
          </div>
          <div className="cartitems-promo-section">
            <p>Have a promo code? Enter it below:</p>
            <div className="cartitems-promo-input">
              <input type="text" placeholder="Promo code" />
              <button className="cartitems-promo-submit">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
