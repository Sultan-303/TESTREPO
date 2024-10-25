import React, { useState, useEffect } from 'react';
import { Item } from '../types';
import ItemCard from '../components/ItemCard';
import ItemModalForm from '../components/ItemModalForm';
import { InventoryProvider, useInventory } from '../context/InventoryContext';
import useItems from '../hooks/useItems';
import './Items.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Component to handle the main content of the Items page
const ItemsContent: React.FC = () => {
  // Access inventory context
  const { allItems, setAllItems } = useInventory();
  const { addItem, deleteItem, updateItem, fetchItems } = useItems(); // Include fetchItems

  // Local state for modal forms
  const [showAddItemForm, setShowAddItemForm] = useState(false);

  // Local state for new item
  const [newItem, setNewItem] = useState<Item>({ itemID: 0, itemName: '', unit: '', price: 0 });

  // Use custom hooks to fetch items data
  const items = useItems();

  // Update context state with fetched items
  useEffect(() => {
    setAllItems(items.allItems);
  }, [items.allItems, setAllItems]);

  // Handler to add a new item
  const handleAddItem = async () => {
    await addItem(newItem);
    setShowAddItemForm(false);
    setNewItem({ itemID: 0, itemName: '', unit: '', price: 0 });
    await fetchItems(); // Re-fetch items after adding
  };

  // Handler to delete an item
  const handleDeleteItem = async (itemId: number) => {
    await deleteItem(itemId);
    await fetchItems(); // Re-fetch items after deleting
  };

  // Handler to update an item
  const handleUpdateItem = async (updatedItem: Item) => {
    await updateItem(updatedItem);
    // Update the state immediately after saving the changes
    setAllItems(prevItems => prevItems.map(item => (item.itemID === updatedItem.itemID ? updatedItem : item)));
  };

  return (
    <div className="items-container">
      <h1>Items</h1>
      <div className="button-container">
        <button className="add-item-button" onClick={() => setShowAddItemForm(true)}>
          <i className="fas fa-plus"></i> Add Item
        </button>
      </div>
      <ItemModalForm
        showAddItemForm={showAddItemForm}
        setShowAddItemForm={setShowAddItemForm}
        newItem={newItem}
        setNewItem={setNewItem}
        handleAddItem={handleAddItem}
      />
      <div className="items-list">
        {allItems.length === 0 ? (
          <p>There are no items to be viewed.</p>
        ) : (
          allItems.map((item, index) => (
            <ItemCard
              key={item.itemID || index}
              item={item}
              handleDeleteItem={handleDeleteItem}
              handleUpdateItem={handleUpdateItem}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Main Items component wrapped with InventoryProvider
const Items: React.FC = () => (
  <InventoryProvider>
    <ItemsContent />
  </InventoryProvider>
);

export default Items;