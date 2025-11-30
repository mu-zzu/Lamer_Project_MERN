import React, { useState, useContext } from "react";
import "./CSS/Checkout.css";
import { ShopContext } from "../Context/ShopContext"; // Import ShopContext

const Checkout = () => {
    const { cartItems, products, getTotalCartAmount } = useContext(ShopContext); // Use context to get cart data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
    });

    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const items = Object.keys(cartItems)
            .filter((itemId) => cartItems[itemId] > 0)
            .map((itemId) => {
                const product = products.find((p) => p.id === Number(itemId));
                return {
                    product: product.name,
                    price: product.new_price,
                    quantity: cartItems[itemId],
                };
            });

        const orderData = {
            ...formData,
            items,
            totalAmount: getTotalCartAmount(),
        };

        try {
            const response = await fetch("http://localhost:4000/api/orders/checkout", { // Ensure this URL matches your backend
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"), // Include auth token
                },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();
            if (response.ok) {
                setOrderPlaced(true);
                setOrderId(data.orderId);
            } else {
                console.error("Error placing order:", data.error);
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Failed to connect to server:", error);
            alert("Failed to connect to server.");
        }
    };

    return (
        <div className="checkout-container">
            {orderPlaced ? (
                <div className="confirmation-box">
                    <h3>Thank You!</h3>
                    <p>Your order has been placed successfully.</p>
                    <p><strong>Order ID:</strong> {orderId}</p>
                    <p>We will contact you when your order is out for delivery.</p>
                    <a href="/" className="btn">Back to Home</a>
                </div>
            ) : (
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <h2>Checkout</h2>

                    <label>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                    <label>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

                    <label>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required />

                    <label>City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required />

                    <label>State</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} required />

                    <label>ZIP Code</label>
                    <input type="text" name="zip" value={formData.zip} onChange={handleChange} required />

                    <button type="submit" className="btn">Place Order</button>
                </form>
            )}
        </div>
    );
};

export default Checkout;
