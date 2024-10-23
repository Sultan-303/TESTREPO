import React, { useState, useEffect } from 'react';
import { Item, Stock } from '../types';
import Modal from '../components/Modal';
import './Inventory.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Inventory: React.FC = () => {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [allStock, setAllStock] = useState<Stock[]>([]);
  const [view, setView] = useState<'all' | 'near-expiry'>('all');
  const [visibleFields, setVisibleFields] = useState({
    name: true,
    stock: true,
    price: true,
  });
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [showAddStockForm, setShowAddStockForm] = useState(false);
  const [newItem, setNewItem] = useState<Item>({ itemID: 0, itemName: '', unit: '', price: 0 });
  const [newStock, setNewStock] = useState<Stock>({
    stockID: 0,
    itemID: 0,
    quantityInStock: 0,
    arrivalDate: '',
    expiryDate: ''
  });

  useEffect(() => {
    fetchItems();
    fetchStock();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('https://localhost:7237/api/items');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Item[] = await response.json();
      setAllItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchStock = async () => {
    try {
      const response = await fetch('https://localhost:7237/api/stock');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Stock[] = await response.json();
      setAllStock(data);
    } catch (error) {
      console.error('Error fetching stock:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      const response = await fetch('https://localhost:7237/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
      if (response.ok) {
        fetchItems();
        setShowAddItemForm(false);
        setNewItem({ itemID: 0, itemName: '', unit: '', price: 0 });
      } else {
        console.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddStock = async () => {
    try {
      const selectedItem = allItems.find(item => item.itemID === newStock.itemID);
      if (!selectedItem) {
        console.error('Selected item not found');
        return;
      }

      const payload = {
        stockID: newStock.stockID,
        itemID: newStock.itemID,
        quantityInStock: newStock.quantityInStock,
        arrivalDate: newStock.arrivalDate,
        expiryDate: newStock.expiryDate,
        item: selectedItem
      };

      console.log('Adding stock:', payload); // Log the payload
      const response = await fetch('https://localhost:7237/api/stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let responseData;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      console.log('Response:', responseData); // Log the response
      if (response.ok) {
        fetchStock();
        setShowAddStockForm(false);
        setNewStock({
          stockID: 0,
          itemID: 0,
          quantityInStock: 0,
          arrivalDate: '',
          expiryDate: ''
        });
      } else {
        console.error('Failed to add stock:', response.status, responseData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteStock = async (stockId: number) => {
    try {
      const response = await fetch(`https://localhost:7237/api/stock/${stockId}`, { method: 'DELETE' });
      if (response.ok) {
        fetchStock();
      } else {
        console.error('Failed to delete stock');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const displayedStock = view === 'all' ? allStock : allStock.filter(stock => stock.expiryDate && new Date(stock.expiryDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

  return (
    <div>
      <h1>Inventory</h1>
      <button className="add-item-button" onClick={() => setShowAddItemForm(true)}>
        <i className="fas fa-plus"></i> Add Item
      </button>
      <button className="add-stock-button" onClick={() => setShowAddStockForm(true)}>
        <i className="fas fa-plus"></i> Add Stock
      </button>
      <Modal show={showAddItemForm} onClose={() => setShowAddItemForm(false)}>
        <h2>Add New Item</h2>
        <label>
          Name:
          <input
            type="text"
            value={newItem.itemName}
            onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
          />
        </label>
        <label>
          Unit:
          <input
            type="text"
            value={newItem.unit}
            onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            step="0.01"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
          />
        </label>
        <button className="add-button" onClick={handleAddItem}>Add Item</button>
        <button className="cancel-button" onClick={() => setShowAddItemForm(false)}>Cancel</button>
      </Modal>
      <Modal show={showAddStockForm} onClose={() => setShowAddStockForm(false)}>
        <h2>Add New Stock</h2>
        <label>
          Item:
          <select
            value={newStock.itemID}
            onChange={(e) => setNewStock({ ...newStock, itemID: parseInt(e.target.value) })}
          >
            <option value="">Select Item</option>
            {allItems.map(item => (
              <option key={item.itemID} value={item.itemID}>
                {item.itemName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={newStock.quantityInStock}
            onChange={(e) => setNewStock({ ...newStock, quantityInStock: parseInt(e.target.value) })}
          />
        </label>
        <label>
          Arrival Date:
          <input
            type="date"
            value={newStock.arrivalDate}
            onChange={(e) => setNewStock({ ...newStock, arrivalDate: e.target.value })}
          />
        </label>
        <label>
          Expiry Date:
          <input
            type="date"
            value={newStock.expiryDate}
            onChange={(e) => setNewStock({ ...newStock, expiryDate: e.target.value })}
          />
        </label>
        <button className="add-button" onClick={handleAddStock}>Add Stock</button>
        <button className="cancel-button" onClick={() => setShowAddStockForm(false)}>Cancel</button>
      </Modal>
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
      <div className="product-header-box">
        <div className="product-header">
          {visibleFields.name && <span>Product</span>}
          {visibleFields.stock && <span>Stock</span>}
          {visibleFields.price && <span>Price</span>}
        </div>
      </div>
      <div>
        {displayedStock.length === 0 ? (
          <p>There are no products to be viewed.</p>
        ) : (
          displayedStock.map((stock, index) => (
            <div key={stock.stockID || index} className="product-card">
              <div className="icons">
                <i className="fas fa-pencil-alt edit-icon"></i>
                <i className="fas fa-trash delete-icon" onClick={() => handleDeleteStock(stock.stockID)}></i>
              </div>
              <div className="product-details">
                {visibleFields.name && <span className="product-name">{allItems.find(item => item.itemID === stock.itemID)?.itemName || 'No Name'}</span>}
                {visibleFields.stock && <span className="product-stock">{stock.quantityInStock ?? 'No Stock'} {allItems.find(item => item.itemID === stock.itemID)?.unit}</span>}
                {visibleFields.price && <span className="product-price">${(allItems.find(item => item.itemID === stock.itemID)?.price ?? 0).toFixed(2)}</span>}
                {stock.arrivalDate && <span className="product-arrival-date">Arrived: {stock.arrivalDate}</span>}
                {stock.expiryDate && <span className="product-expiry-date">Expires: {stock.expiryDate}</span>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Inventory;