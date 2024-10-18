// src/pages/Inventory.tsx
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import './Inventory.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Inventory: React.FC = () => {
  const [allItems, setAllItems] = useState<Product[]>([]);
  const [nearExpiryItems, setNearExpiryItems] = useState<Product[]>([]);
  const [view, setView] = useState<'all' | 'near-expiry'>('all');
  const [visibleFields, setVisibleFields] = useState({
    name: true,
    stock: true,
    price: true,
  });

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = () => {
    fetch('/inventory.json')
      .then(response => response.json())
      .then(data => {
        setAllItems(data.allItems);
        setNearExpiryItems(data.nearExpiryItems);
      });
  };

  const handleDelete = (productId: number) => {
    fetch(`YOUR_API_ENDPOINT_HERE/${productId}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          fetchInventoryData();
        } else {
          console.error('Failed to delete item');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const displayedProducts = view === 'all' ? allItems : nearExpiryItems;

  return (
    <div>
      <h1>Inventory</h1>
      <div className="view-selector">
        <span
          className={`view-option ${view === 'all' ? 'selected' : ''}`}
          onClick={() => setView('all')}
        >
          All
        </span>
        <span
          className={`view-option ${view === 'near-expiry' ? 'selected' : ''}`}
          onClick={() => setView('near-expiry')}
        >
          Near Expiry
        </span>
        <div className="view-toggle">
          <span>View:</span>
          <label>
            <input
              type="checkbox"
              checked={visibleFields.name}
              onChange={() => setVisibleFields({ ...visibleFields, name: !visibleFields.name })}
            />
            Name
          </label>
          <label>
            <input
              type="checkbox"
              checked={visibleFields.stock}
              onChange={() => setVisibleFields({ ...visibleFields, stock: !visibleFields.stock })}
            />
            Stock
          </label>
          <label>
            <input
              type="checkbox"
              checked={visibleFields.price}
              onChange={() => setVisibleFields({ ...visibleFields, price: !visibleFields.price })}
            />
            Price
          </label>
        </div>
      </div>
      <div className="product-header">
        {visibleFields.name && <span>Product Name</span>}
        {visibleFields.stock && <span>Stock</span>}
        {visibleFields.price && <span>Price</span>}
      </div>
      <div>
        {displayedProducts.length === 0 ? (
          <p>There are no products to be viewed.</p>
        ) : (
          displayedProducts.map(product => (
            <div key={product.ProductID} className="product-card">
              <i className="fas fa-pencil-alt edit-icon"></i>
              <i className="fas fa-trash delete-icon" onClick={() => handleDelete(product.ProductID)}></i>
              {visibleFields.name && <span>{product.ProductName}</span>}
              {visibleFields.stock && <span>{product.QuantityInStock}</span>}
              {visibleFields.price && <span>${product.Price.toFixed(2)}</span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Inventory;