import React, { useEffect, useState } from 'react';
import './NewCollections.css';
import Item from '../Item/Item';

const NewCollections = ({ data }) => {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    // Sort products by ID in descending order
    const sorted = [...data].sort((a, b) => b.id - a.id);
    setSortedData(sorted);
  }, [data]);

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {sortedData.map((item, i) => (
          <Item
            id={item.id}
            key={i}
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

export default NewCollections;
