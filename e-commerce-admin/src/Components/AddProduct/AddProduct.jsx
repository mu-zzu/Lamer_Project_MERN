import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../Assets/upload_area.svg";

const AddProduct = () => {
  const [images, setImages] = useState([]); // Stores File objects
  const [previewImages, setPreviewImages] = useState([]); // Stores preview URLs

  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    images: [],
    category: "our-products",
    size: "S",
    new_price: "",
    old_price: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!productDetails.name.trim() || !productDetails.description.trim() || images.length === 0) {
      alert("Please fill in all fields and upload at least one image.");
      return;
    }

    try {
      let formData = new FormData();
      images.forEach((image) => formData.append("product", image)); // Ensure backend expects "product"

      console.log("Uploading images...");

      const uploadResponse = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload images");
      }

      const uploadData = await uploadResponse.json();
      if (!uploadData.success || !uploadData.image_urls?.length) {
        alert("Failed to upload images");
        return;
      }

      console.log("Images uploaded:", uploadData.image_urls);

      let product = {
        ...productDetails,
        size: [productDetails.size], // Ensure size is an array
        images: uploadData.image_urls, // Store uploaded image URLs
        category: productDetails.category, // Ensure category is correctly set
      };

      console.log("Product to be sent:", product);

      const addProductResponse = await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!addProductResponse.ok) {
        throw new Error("Failed to add product");
      }

      const addProductData = await addProductResponse.json();
      if (addProductData.success) {
        alert("Product Added Successfully");
        resetForm();
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const resetForm = () => {
    setProductDetails({
      name: "",
      description: "",
      images: [],
      category: "our-products",
      size: "S",
      new_price: "",
      old_price: "",
    });
    setImages([]);
    previewImages.forEach((url) => URL.revokeObjectURL(url)); // Cleanup object URLs
    setPreviewImages([]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    let validFiles = selectedFiles.filter((file) => !images.some((img) => img.name === file.name));

    if (validFiles.length + images.length > 3) {
      alert("You can upload a maximum of 3 images.");
      validFiles = validFiles.slice(0, 3 - images.length);
    }

    const previewUrls = validFiles.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...validFiles]);
    setPreviewImages((prev) => [...prev, ...previewUrls]);
  };

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p className="stylish-purple-text">Product Title</p>
        <input type="text" name="name" value={productDetails.name} onChange={changeHandler} placeholder="Type here" />
      </div>
      <div className="addproduct-itemfield">
        <p className="stylish-purple-text">Description</p>
        <textarea name="description" value={productDetails.description} onChange={changeHandler} placeholder="Type here" />
      </div>
      <div className="addproduct-itemfield">
        <p className="stylish-purple-text">Size</p>
        <select name="size" value={productDetails.size} onChange={changeHandler} style={{ width: "100%", height: "50px", fontSize: "16px" }}>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          <option value="XL">Extra Large</option>
        </select>
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p className="stylish-purple-text">Price</p>
          <input type="text" name="old_price" value={productDetails.old_price} onChange={changeHandler} placeholder="Type here" />
        </div>
        <div className="addproduct-itemfield">
          <p className="stylish-purple-text">Offer Price</p>
          <input type="text" name="new_price" value={productDetails.new_price} onChange={changeHandler} placeholder="Type here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p className="stylish-purple-text">Product Category</p>
        <select name="category" value={productDetails.category} onChange={changeHandler} style={{ width: "100%", height: "50px", fontSize: "16px" }}>
          <option value="our-products">Our Products</option>
          <option value="featured">Featured</option>
          <option value="producers-corners">Producers Corners</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p className="stylish-purple-text">Product Images</p>
        <label htmlFor="file-input">
          {previewImages.length === 0 ? (
            <img className="addproduct-thumbnail-img" src={upload_area} alt="Upload" />
          ) : (
            previewImages.map((preview, index) => (
              <img key={index} className="addproduct-thumbnail-img" src={preview} alt={`Preview ${index + 1}`} />
            ))
          )}
        </label>
        <input onChange={imageHandler} type="file" name="images" id="file-input" multiple accept="image/*" hidden />
      </div>
      <button className="addproduct-btn" onClick={handleSubmit}>
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
