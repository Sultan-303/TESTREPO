import { useState, useEffect } from 'react';
import { Item } from '../types';

const useItems = () => {
  const [allItems, setAllItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    try {
      const response = await fetch('https://localhost:7237/api/items');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Item[] = await response.json();
      setAllItems(data);
      console.log('Items fetched:', data); // Log fetched items
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async (newItem: Item) => {
    try {
      const response = await fetch('https://localhost:7237/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        await fetchItems(); // Re-fetch items after adding
      } else {
        console.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteItem = async (itemId: number) => {
    try {
      const response = await fetch(`https://localhost:7237/api/items/${itemId}`, { method: 'DELETE' });
      if (response.ok) {
        await fetchItems(); // Re-fetch items after deleting
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateItem = async (updatedItem: Item) => {
    try {
      const response = await fetch(`https://localhost:7237/api/items/${updatedItem.itemID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        await fetchItems(); // Re-fetch items after updating
      } else {
        console.error('Failed to update item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return { allItems, addItem, deleteItem, updateItem, fetchItems };
};

export default useItems;