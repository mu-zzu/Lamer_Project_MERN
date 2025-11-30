import React from 'react';
import './FAQ.css';

const FAQ = () => {
  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>What is this store about?</h3>
        <p>This store offers a variety of women’s fashion products, featuring carefully selected items from different producers.</p>
      </div>
      <div className="faq-item">
        <h3>Do I need to create an account to shop?</h3>
        <p>No, you can browse and add products to cart as a guest. However, creating an account allows for faster checkout.</p>
      </div>
      <div className="faq-item">
        <h3>How can I contact customer support?</h3>
        <p>You can contact us via email at muzzumusthafa@gmail.com.</p>
      </div>
    </div>
  );
};

export default FAQ;
