import React from 'react';

type Item = {
  itemID: number;
  itemName: string;
  unit: string;
  price: number;
};

type ItemsListProps = {
  items: Item[];
  onEditItem: (itemID: number, updatedItem: Item) => void;
  onDeleteItem: (itemID: number) => void;
};

const ItemsList: React.FC<ItemsListProps> = ({ items, onEditItem, onDeleteItem }) => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.itemID}>
          {item.itemName} - {item.unit} - ${item.price}
          <button onClick={() => onEditItem(item.itemID, { ...item, itemName: 'Updated Item' })}>Edit</button>
          <button onClick={() => onDeleteItem(item.itemID)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ItemsList;