import React, { useEffect, useState, useRef, useCallback } from "react";
import "./CSS/ShopCategory.css";
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from "../Components/Item/Item";
import { Link } from "react-router-dom";

const ShopCategory = (props) => {
  const [allproducts, setAllProducts] = useState([]);
  const productsRef = useRef(null); // Reference to the products section

  // Fetch products based on category
  const fetchInfo = useCallback(() => {
    fetch(`http://localhost:4000/allproducts?category=${props.category}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched products for category:", props.category, data);
        setAllProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [props.category]); // Dependency on props.category

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]); // Dependency on fetchInfo

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="shopcategory">
      <img
        src={props.banner}
        className="shopcategory-banner"
        alt="Category Banner"
        onClick={scrollToProducts} // Scroll to products on banner click
        style={{ cursor: "pointer" }} // Indicate clickability
      />

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1 - {allproducts.length}</span> out of {allproducts.length} Products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="Sort Icon" />
        </div>
      </div>

      <div ref={productsRef} className="shopcategory-products">
        {allproducts.map((item, i) => (
          <Item
            id={item.id}
            key={item.id || i} // Use item.id if available, fallback to index
            name={item.name}
            image={item.images?.[0]?.startsWith("http") ? item.images[0] : `http://localhost:4000/images/${item.images?.[0] || "default.jpg"}`} // Handle missing image
            new_price={`${item.new_price}`}
            old_price={`${item.old_price}`}
          />
        ))}
      </div>

      <div className="shopcategory-loadmore">
        <Link to="/" style={{ textDecoration: "none" }}>Explore More</Link>
      </div>

      {props.category === "producers-corners" && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf1O2WqMfsSlPUEnKttuXJwOFxDLLMumi87apRoNSVlyJLvfw/viewform?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              padding: "10px 20px",
              backgroundColor: "#ffffff",
              color: "#000000",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
              border: "1px solid #000000",
            }}
          >
            Add Your Product
          </a>
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
