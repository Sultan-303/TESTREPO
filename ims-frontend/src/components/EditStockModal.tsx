import React, { useState } from 'react';
import { Stock } from '../types';

interface EditStockModalProps {
  stock: Stock;
  onClose: () => void;
  onSave: (stock: Stock) => void;
}

const EditStockModal: React.FC<EditStockModalProps> = ({ stock, onClose, onSave }) => {
  const [itemID, setItemID] = useState(stock.itemID);
  const [quantityInStock, setQuantityInStock] = useState(stock.quantityInStock);
  const [arrivalDate, setArrivalDate] = useState(stock.arrivalDate instanceof Date ? stock.arrivalDate.toISOString().substring(0, 10) : new Date(stock.arrivalDate).toISOString().substring(0, 10));
  const [expiryDate, setExpiryDate] = useState(stock.expiryDate ? (stock.expiryDate instanceof Date ? stock.expiryDate.toISOString().substring(0, 10) : new Date(stock.expiryDate).toISOString().substring(0, 10)) : '');

  const handleSave = () => {
    const updatedStock: Stock = {
      ...stock,
      itemID,
      quantityInStock,
      arrivalDate: new Date(arrivalDate),
      expiryDate: expiryDate ? new Date(expiryDate) : undefined,
    };
    onSave(updatedStock);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Stock</h2>
        <label>
          Item ID:
          <input type="number" value={itemID} onChange={(e) => setItemID(Number(e.target.value))} />
        </label>
        <label>
          Quantity:
          <input type="number" value={quantityInStock} onChange={(e) => setQuantityInStock(Number(e.target.value))} />
        </label>
        <label>
          Arrival Date:
          <input type="date" value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} />
        </label>
        <label>
          Expiry Date:
          <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
        </label>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditStockModal;