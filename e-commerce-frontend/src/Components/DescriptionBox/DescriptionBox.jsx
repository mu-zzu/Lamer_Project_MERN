import React, { useState } from "react";
import "./DescriptionBox.css";

const DescriptionBox = ({ category }) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div
          className={`descriptionbox-nav-box ${activeTab === "description" ? "active" : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </div>
        {category === "producers-corners" && (
          <div
            className={`descriptionbox-nav-box ${activeTab === "author" ? "active" : ""}`}
            onClick={() => setActiveTab("author")}
          >
            Author's Description
          </div>
        )}
      </div>
      <div className="descriptionbox-content">
        {activeTab === "description" && (
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
        )}
        {activeTab === "author" && category === "producers-corners" && (
          <p>
            This product is brought to you by a passionate producer who takes
            pride in delivering high-quality and unique items. Each product
            tells a story, crafted with care and dedication to meet your
            expectations.
          </p>
        )}
      </div>
    </div>
  );
};

export default DescriptionBox;
