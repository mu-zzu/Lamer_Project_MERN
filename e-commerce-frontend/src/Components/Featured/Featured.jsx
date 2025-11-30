import React from 'react';
import './Featured.css';
import Item from '../Item/Item';

const Featured = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Featured Product 1",
      image: "https://via.placeholder.com/350",
      new_price: 100,
      old_price: 150,
    },
    {
      id: 2,
      name: "Featured Product 2",
      image: "https://via.placeholder.com/350",
      new_price: 200,
      old_price: 250,
    },
    {
      id: 3,
      name: "Featured Product 3",
      image: "https://via.placeholder.com/350",
      new_price: 300,
      old_price: 350,
    },
  ];

  return (
    <div className='featured'>
      <h1>FEATURED PRODUCTS</h1>
      <hr />
      <div className="collections">
        {featuredProducts.map((item) => (
          <Item
            id={item.id}
            key={item.id}
            name={item.name}
            image={item.image}
            new_price={`${item.new_price}`}
            old_price={`${item.old_price}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Featured;
