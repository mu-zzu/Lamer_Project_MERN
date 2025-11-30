import React, { useState, useEffect } from "react";
import "./ProductList.css";

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = () => {
    fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        const filteredProducts = data.filter((product) => product.category === category);
        setProducts(filteredProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <img
            src={product.images?.[0]?.startsWith("http") ? product.images[0] : `http://localhost:4000${product.images?.[0]}`}
            alt={product.name}
            onError={(e) => (e.target.src = "/fallback.jpg")} // Add fallback image
          />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.new_price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
