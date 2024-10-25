import React from 'react';
import { Item, Stock } from '../types';

interface ProductCardProps {
  stock: Stock;
  allItems: Item[];
  visibleFields: {
    name: boolean;
    stock: boolean;
    price: boolean;
  };
  handleDeleteStock: (stockId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ stock, allItems, visibleFields, handleDeleteStock }) => {
  const item = allItems.find(item => item.itemID === stock.itemID);

  return (
    <div className="product-card">
      <div className="icons">
        <i className="fas fa-pencil-alt edit-icon"></i>
        <i className="fas fa-trash delete-icon" onClick={() => handleDeleteStock(stock.stockID)}></i>
      </div>
      <div className="product-details">
        {visibleFields.name && <span className="product-name">{item?.itemName || 'No Name'}</span>}
        {visibleFields.stock && <span className="product-stock">{stock.quantityInStock ?? 'No Stock'} {item?.unit}</span>}
        {visibleFields.price && <span className="product-price">${(item?.price ?? 0).toFixed(2)}</span>}
        {stock.arrivalDate && <span className="product-arrival-date">Arrived: {stock.arrivalDate}</span>}
        {stock.expiryDate && <span className="product-expiry-date">Expires: {stock.expiryDate}</span>}
      </div>
    </div>
  );
};

export default ProductCard;