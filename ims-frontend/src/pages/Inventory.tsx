// src/pages/Inventory.tsx
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import './Inventory.css';

const Inventory: React.FC = () => {
  const [allItems, setAllItems] = useState<Product[]>([]);
  const [nearExpiryItems, setNearExpiryItems] = useState<Product[]>([]);
  const [view, setView] = useState<'all' | 'near-expiry'>('all');

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('/inventory.json')
      .then(response => response.json())
      .then(data => {
        setAllItems(data.allItems);
        setNearExpiryItems(data.nearExpiryItems);
      });
  }, []);

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
      </div>
      <div>
        {displayedProducts.map(product => (
          <div key={product.ProductID} className="product-card">
            <h2>{product.ProductName}</h2>
            <p>{product.Description}</p>
            <p>Quantity: {product.QuantityInStock}</p>
            <p>Price: ${product.Price.toFixed(2)}</p>
            <p>Expiry Date: {product.ExpiryDate}</p>
            <p>Categories: {product.Categories.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;