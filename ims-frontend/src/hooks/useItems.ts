import { useState, useEffect } from 'react';
import { Item } from '../types';

const useItems = () => {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7237/api/items');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Item[] = await response.json();
      setAllItems(data);
      console.log('Items fetched:', data);
    } catch (error) {
      setError('Error fetching items');
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
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
        await fetchItems();
      } else {
        console.error('Failed to add item');
      }
    } catch (error) {
      setError('Error adding item');
      console.error('Error adding item:', error);
    }
  };

  const deleteItem = async (itemId: number) => {
    try {
      const response = await fetch(`https://localhost:7237/api/items/${itemId}`, { method: 'DELETE' });
      if (response.ok) {
        await fetchItems();
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      setError('Error deleting item');
      console.error('Error deleting item:', error);
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
        await fetchItems();
      } else {
        console.error('Failed to update item');
      }
    } catch (error) {
      setError('Error updating item');
      console.error('Error updating item:', error);
    }
  };

  return { allItems, addItem, deleteItem, updateItem, fetchItems, loading, error };
};

export default useItems;