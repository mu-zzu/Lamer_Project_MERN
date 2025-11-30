import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  // Ensure the first image is used
  const initialImage = product.images?.length > 0 
    ? (product.images[0].startsWith("http") ? product.images[0] : `http://localhost:4000${product.images[0]}`) 
    : "/fallback.jpg";
  const [mainImage, setMainImage] = useState(initialImage);

  // State for selected sizes
  const [selectedSizes, setSelectedSizes] = useState([]);

  const toggleSizeSelection = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {product.images.map((img, index) => (
            <img 
              key={index} 
              src={img.startsWith("http") ? img : `http://localhost:4000${img}`} 
              alt="Product" 
              onClick={() => setMainImage(img.startsWith("http") ? img : `http://localhost:4000${img}`)} 
              onError={(e) => e.target.src = "/fallback.jpg"} 
            />
          ))}
        </div>
        <div className="productdisplay-img">
          <img 
            className="productdisplay-main-img" 
            src={mainImage} 
            alt="Main Product" 
            onError={(e) => e.target.src = "/fallback.jpg"} 
            style={{ marginTop: "20px" }} // Added margin to move the image downwards
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-description" style={{ fontSize: "18px" }}>
          {product.description}
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">{product.old_price}</div>
          <div className="productdisplay-right-price-new">{product.new_price}</div>
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            {product.size.map((s, index) => (
              <div
                key={index}
                className={selectedSizes.includes(s) ? "selected-size" : ""}
                onClick={() => toggleSizeSelection(s)}
                style={{
                  padding: "10px 20px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  cursor: "pointer",
                  backgroundColor: selectedSizes.includes(s) ? "#4b0082" : "#fbfbfb",
                  color: selectedSizes.includes(s) ? "#fff" : "#000",
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
        <p className="productdisplay-right-category"><span>Category :</span> {product.category}</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
