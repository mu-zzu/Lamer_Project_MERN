import React, { useEffect, useState } from 'react';
import Hero from '../Components/Hero/Hero';
import Popular from '../Components/Popular/Popular';
import aboutUsImage from '../Components/Assets/about_us.png'; // Import the About Us image

const Shop = () => {
  const [popular, setPopular] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const fetchInfo = () => { 
    fetch('http://localhost:4000/popularinwomen') 
      .then((res) => res.json()) 
      .then((data) => setPopular(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const scrollToAboutUs = () => {
    document.getElementById('about-us-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Hero onClick={scrollToAboutUs} />
      <div style={{ marginTop: '50px' }}>
        <Popular data={popular.map(item => ({
          ...item,
          new_price: `${item.new_price}`,
          old_price: `${item.old_price}`
        }))} />
      </div>
      {/* About Us Section */}
      <div
        id="about-us-section"
        style={{
          marginTop: '50px',
          textAlign: 'center',
          padding: '40px',
          backgroundColor: '#f9f9f9',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'black', marginBottom: '20px' }}>About Us</h2>
        <img src={aboutUsImage} alt="About Us" style={{ width: '100%', maxWidth: '600px', borderRadius: '10px', margin: '20px 0' }} />
        <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
          Welcome to Lamer.ind, your ultimate destination for elegant women's fashion. Our mission is to provide high-quality, stylish, and affordable clothing that empowers women to express their individuality. With a focus on craftsmanship and attention to detail, we bring you a curated collection of timeless designs and modern trends.
        </p>
      </div>
      {/* FAQ Section */}
      <div style={{ marginTop: '50px', textAlign: 'center', padding: '40px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'black', marginBottom: '20px' }}>Frequently Asked Questions</h2>
        <div style={{ textAlign: 'left', fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 
              onClick={() => toggleCategory('general')} 
              style={{
                cursor: 'pointer',
                padding: '10px',
                backgroundColor: activeCategory === 'general' ? '#4b0082' : '#e9e9e9',
                color: activeCategory === 'general' ? '#fff' : '#000',
                borderRadius: '5px',
                transition: 'background-color 0.3s ease',
              }}
            >
              🔹 General Questions
            </h3>
            {activeCategory === 'general' && (
              <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f4f4f4', borderRadius: '5px' }}>
                <p><strong>1️⃣ What is this store about?</strong><br />💬 This store offers a variety of women’s fashion products, featuring carefully selected items from different producers.</p>
                <p><strong>2️⃣ Do I need to create an account to shop?</strong><br />💬 No, you can browse and purchase products as a guest. However, creating an account allows for faster checkout and order tracking.</p>
                <p><strong>3️⃣ How can I contact customer support?</strong><br />💬 You can contact us via email at muzzumustha@gmail.com .</p>
              </div>
            )}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <h3 
              onClick={() => toggleCategory('orders')} 
              style={{
                cursor: 'pointer',
                padding: '10px',
                backgroundColor: activeCategory === 'orders' ? '#4b0082' : '#e9e9e9',
                color: activeCategory === 'orders' ? '#fff' : '#000',
                borderRadius: '5px',
                transition: 'background-color 0.3s ease',
              }}
            >
              🔹 Orders & Payments
            </h3>
            {activeCategory === 'orders' && (
              <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f4f4f4', borderRadius: '5px' }}>
                <p><strong>4️⃣ What payment methods do you accept?</strong><br />💬 At the moment we accept only cash on delivery.</p>
                <p><strong>5️⃣ Can I cancel or modify my order after placing it?</strong><br />💬 Orders can only be canceled or modified within 24 hours of placing them. Contact our support team via gmail for such cases.</p>
                <p><strong>6️⃣ Is my payment information secure?</strong><br />💬 Yes, we use secure encryption and comply with industry standards to protect your personal data.</p>
              </div>
            )}
          </div>
          <div>
            <h3 
              onClick={() => toggleCategory('shipping')} 
              style={{
                cursor: 'pointer',
                padding: '10px',
                backgroundColor: activeCategory === 'shipping' ? '#4b0082' : '#e9e9e9',
                color: activeCategory === 'shipping' ? '#fff' : '#000',
                borderRadius: '5px',
                transition: 'background-color 0.3s ease',
              }}
            >
              🔹 Shipping & Delivery
            </h3>
            {activeCategory === 'shipping' && (
              <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f4f4f4', borderRadius: '5px' }}>
                <p><strong>7️⃣ How long does shipping take?</strong><br />💬 Standard delivery takes 3-7 business days, while express shipping is available for 1-3 business days (depending on location).</p>
                <p><strong>8️⃣ Do you offer international shipping?</strong><br />💬 Nope, as of now we ship only within the country. Shipping costs and times vary depending on your location.</p>
                <p><strong>9️⃣ How can I track my order?</strong><br />💬 Once your order is shipped, you’ll receive a tracking number via email.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ marginTop: '50px', textAlign: 'center', padding: '40px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'black', marginBottom: '20px' }}>Lamer.ind – Digitizing Elegance in Women's Fashion</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
          Lamer.ind, a distinguished textile shop specializing in women's dresses, is stepping into the digital marketplace with a sophisticated and user-friendly e-commerce platform. This project is designed to modernize the shopping experience by providing an intuitive and visually appealing online store where customers can effortlessly explore Lamer’s diverse collection of elegant dresses.
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
          The website will feature detailed product descriptions, high-quality images, and advanced filtering options, allowing shoppers to find their desired styles with ease. A secure and seamless payment system will be integrated, ensuring safe transactions and a hassle-free checkout process. Additionally, the platform will streamline business operations, improving inventory management and customer engagement.
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
          By embracing digital transformation, Lamer.ind enhances accessibility, making its premium textiles available to a broader audience while maintaining the quality and craftsmanship that define the brand. This initiative not only expands Lamer’s reach but also provides customers with a convenient, stylish, and enjoyable shopping experience from anywhere.
        </p>
      </div>
    </div>
  );
};

export default Shop;
