import React, { useState, useEffect } from 'react';
import { Item, Stock } from '../types';
import ProductCard from '../components/ProductCard';
import ProductHeader from '../components/ProductHeader';
import ViewToggle from '../components/ViewToggle';
import ModalForm from '../components/ModalForm';
import { InventoryProvider, useInventory } from '../context/InventoryContext';
import useItems from '../hooks/useItems';
import useStock from '../hooks/useStock';
import './Inventory.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Component to handle the main content of the Inventory page
const InventoryContent: React.FC = () => {
  // Access inventory context
  const { allItems, setAllItems } = useInventory();
  const { allStock, addStock, deleteStock, updateStock } = useStock();
  const { addItem, deleteItem, updateItem } = useItems();

  // Local state for view, visible fields, and modal forms
  const [view, setView] = useState<'all' | 'near-expiry'>('all');
  const [visibleFields, setVisibleFields] = useState({
    name: true,
    stock: true,
    price: true,
  });
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [showAddStockForm, setShowAddStockForm] = useState(false);

  // Local state for new item and new stock
  const [newItem, setNewItem] = useState<Item>({ itemID: 0, itemName: '', unit: '', price: 0 });
  const [newStock, setNewStock] = useState<Stock>({
    stockID: 0,
    itemID: 0,
    quantityInStock: 0,
    arrivalDate: '',
    expiryDate: ''
  });

  // Use custom hooks to fetch items and stock data
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
  };

  // Handler to add new stock
  const handleAddStock = async () => {
    const selectedItem = allItems.find(item => item.itemID === newStock.itemID);
    if (!selectedItem) {
      console.error('Selected item not found');
      return;
    }

    const payload = {
      ...newStock,
      item: selectedItem
    };

    console.log('Adding stock:', payload); // Log the payload
    await addStock(payload);
    setShowAddStockForm(false);
    setNewStock({
      stockID: 0,
      itemID: 0,
      quantityInStock: 0,
      arrivalDate: '',
      expiryDate: ''
    });
  };

  // Handler to delete stock
  const handleDeleteStock = async (stockId: number) => {
    await deleteStock(stockId);
  };

  // Filter stock based on the selected view
  const displayedStock = view === 'all' ? allStock : allStock.filter(stock => stock.expiryDate && new Date(stock.expiryDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

  return (
    <div className="inventory-container">
      <h1>Inventory</h1>
      <div className="button-container">
        <button className="add-item-button" onClick={() => setShowAddItemForm(true)}>
          <i className="fas fa-plus"></i> Add Item
        </button>
        <button className="add-stock-button" onClick={() => setShowAddStockForm(true)}>
          <i className="fas fa-plus"></i> Add Stock
        </button>
      </div>
      <ModalForm
        showAddItemForm={showAddItemForm}
        setShowAddItemForm={setShowAddItemForm}
        showAddStockForm={showAddStockForm}
        setShowAddStockForm={setShowAddStockForm}
        newItem={newItem}
        setNewItem={setNewItem}
        newStock={newStock}
        setNewStock={setNewStock}
        allItems={allItems}
        handleAddItem={handleAddItem}
        handleAddStock={handleAddStock}
      />
      <ViewToggle view={view} setView={setView} />
      <ProductHeader visibleFields={visibleFields} />
      <div>
        {displayedStock.length === 0 ? (
          <p>There are no products to be viewed.</p>
        ) : (
          displayedStock.map((stock, index) => (
            <ProductCard
              key={stock.stockID || index}
              stock={stock}
              allItems={allItems}
              visibleFields={visibleFields}
              handleDeleteStock={handleDeleteStock}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Main Inventory component wrapped with InventoryProvider
const Inventory: React.FC = () => (
  <InventoryProvider>
    <InventoryContent />
  </InventoryProvider>
);

export default Inventory;