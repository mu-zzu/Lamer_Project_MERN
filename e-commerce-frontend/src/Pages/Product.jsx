import React, { useContext } from 'react';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const Product = () => {
  const { products } = useContext(ShopContext);
  const { productId } = useParams();
  const product = products.find((e) => e.id === Number(productId));

  if (!product) {
    return <div>Product not found</div>; // Handle case where product is not found
  }

  return (
    <div>
      <Breadcrums product={product} />
      <ProductDisplay product={{ ...product, new_price: `₹${product.new_price}`, old_price: `₹${product.old_price}` }} />
      <DescriptionBox category={product.category} />
    </div>
  );
};

export default Product;
