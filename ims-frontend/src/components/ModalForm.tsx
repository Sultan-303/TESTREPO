import React from 'react';
import Modal from '../components/Modal';
import { Item, Stock } from '../types';

interface ModalFormProps {
  showAddItemForm: boolean;
  setShowAddItemForm: (show: boolean) => void;
  showAddStockForm: boolean;
  setShowAddStockForm: (show: boolean) => void;
  newItem: Item;
  setNewItem: (item: Item) => void;
  newStock: Stock;
  setNewStock: (stock: Stock) => void;
  allItems: Item[];
  handleAddItem: () => void;
  handleAddStock: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({
  showAddItemForm,
  setShowAddItemForm,
  showAddStockForm,
  setShowAddStockForm,
  newItem,
  setNewItem,
  newStock,
  setNewStock,
  allItems,
  handleAddItem,
  handleAddStock
}) => {
  return (
    <>
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
    </>
  );
};

export default ModalForm;