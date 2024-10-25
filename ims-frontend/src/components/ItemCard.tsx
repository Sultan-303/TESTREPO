import React, { useState } from 'react';
import { Item } from '../types';
import './ItemCard.css';

interface ItemCardProps {
  item: Item;
  handleDeleteItem: (itemId: number) => void;
  handleUpdateItem: (updatedItem: Item) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, handleDeleteItem, handleUpdateItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState<Item>({ ...item });

  const handleSave = () => {
    handleUpdateItem(editedItem);
    setIsEditing(false);
  };

  return (
    <div className="item-card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedItem.itemName}
            onChange={(e) => setEditedItem({ ...editedItem, itemName: e.target.value })}
          />
          <input
            type="text"
            value={editedItem.unit}
            onChange={(e) => setEditedItem({ ...editedItem, unit: e.target.value })}
          />
          <input
            type="number"
            value={editedItem.price}
            onChange={(e) => setEditedItem({ ...editedItem, price: parseFloat(e.target.value) })}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <span>{item.itemName}</span>
          <span>{item.unit}</span>
          <span>${item.price.toFixed(2)}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => handleDeleteItem(item.itemID)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default ItemCard;