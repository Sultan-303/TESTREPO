import React from 'react';

interface ProductHeaderProps {
  visibleFields: {
    name: boolean;
    stock: boolean;
    price: boolean;
  };
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ visibleFields }) => {
  return (
    <div className="product-header-box">
      <div className="product-header">
        {visibleFields.name && <span>Product</span>}
        {visibleFields.stock && <span>Stock</span>}
        {visibleFields.price && <span>Price</span>}
      </div>
    </div>
  );
};

export default ProductHeader;