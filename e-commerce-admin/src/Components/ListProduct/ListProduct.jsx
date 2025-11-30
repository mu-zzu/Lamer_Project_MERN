import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../Assets/cross_icon.png";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = () => {
    fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    fetchInfo(); // Refresh product list after removal
  };

  return (
    <div className="listproduct">
      <h1 className="stylish-purple-text">All Products List</h1>
      <div className="listproduct-format-main">
        <p className="stylish-purple-text">Products</p>
        <p className="stylish-purple-text">Title</p>
        <p className="stylish-purple-text">Old Price</p>
        <p className="stylish-purple-text">New Price</p>
        <p className="stylish-purple-text">Category</p>
        <p className="stylish-purple-text">Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((e) => (
          <div key={e.id}>
            <div className="listproduct-format-main listproduct-format">
              <img
                className="listproduct-product-icon"
                src={e.images?.[0]?.startsWith("http") ? e.images[0] : `http://localhost:4000/images/${e.images?.[0]}`}
                alt={e.name}
                onError={(e) => (e.target.src = "/fallback.jpg")} // Fallback image for broken links
              />
              <p className="stylish-purple-text cartitems-product-title">{e.name}</p>
              <p className="stylish-purple-text">₹{e.old_price}</p>
              <p className="stylish-purple-text">₹{e.new_price}</p>
              <p className="stylish-purple-text">
                {e.category === "our-products"
                  ? "Our Products"
                  : e.category === "featured"
                  ? "Featured"
                  : "Producers Corners"}
              </p>
              <img
                className="listproduct-remove-icon"
                onClick={() => removeProduct(e.id)}
                src={cross_icon}
                alt="Remove"
              />
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
