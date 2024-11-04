import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemsList from './ItemsList';

type Item = {
  itemID: number;
  itemName: string;
  unit: string;
  price: number;
};

const ItemsContent: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({ itemID: 0, itemName: '', unit: '', price: 0 });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/items');
      setItems(response.data);
      console.log('Items fetched:', response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      const response = await axios.post('/api/items', newItem);
      console.log('Item added:', response.data);
      
      // Update local state immediately
      setItems(prevItems => [...prevItems, response.data]);
      
      // Fetch updated list from server
      await fetchItems();
    } catch (error) {
      console.error('Error adding item:', error);
    }
    setNewItem({ itemID: 0, itemName: '', unit: '', price: 0 });
    setShowModal(false);
  };

  const handleEditItem = async (itemID: number, updatedItem: Item) => {
    try {
      const response = await axios.put(`/api/items/${itemID}`, updatedItem);
      console.log('Item edited:', response.data);
      
      // Update local state immediately
      setItems(items.map(item => item.itemID === itemID ? updatedItem : item));
      
      // Fetch updated list from server
      await fetchItems();
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };

  const handleDeleteItem = async (itemID: number) => {
    try {
      await axios.delete(`/api/items/${itemID}`);
      console.log('Item deleted:', itemID);
      
      // Update local state immediately
      setItems(items.filter(item => item.itemID !== itemID));
      
      // Fetch updated list from server
      await fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="items-container">
      <h1>Items</h1>
      <button onClick={() => setShowModal(true)}>Add Item</button>
      {showModal && (
        <div className="modal">
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
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
            />
          </label>
          <button onClick={handleAddItem}>Add Item</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
      )}
      <ItemsList items={items} onEditItem={handleEditItem} onDeleteItem={handleDeleteItem} />
    </div>
  );
};

export default ItemsContent;