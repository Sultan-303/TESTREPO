import React from 'react';
import Modal from './Modal';
import { Item } from '../types';

interface ItemModalFormProps {
  showAddItemForm: boolean;
  setShowAddItemForm: (show: boolean) => void;
  newItem: Item;
  setNewItem: (item: Item) => void;
  handleAddItem: () => void;
}

const ItemModalForm: React.FC<ItemModalFormProps> = ({
  showAddItemForm,
  setShowAddItemForm,
  newItem,
  setNewItem,
  handleAddItem
}) => {
  return (
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
  );
};

export default ItemModalForm;