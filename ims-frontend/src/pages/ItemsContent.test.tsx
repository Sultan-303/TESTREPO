import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemsContent from './Items';
import { InventoryProvider } from '../context/InventoryContext';

// Renders the ItemsContent component
test('renders ItemsContent component', () => {
  render(
    <InventoryProvider>
      <ItemsContent />
    </InventoryProvider>
  );
  expect(screen.getByText('Items')).toBeInTheDocument();
  expect(screen.getByText('Add Item')).toBeInTheDocument();
});

test('adds a new item', () => {
  render(
    <InventoryProvider>
      <ItemsContent />
    </InventoryProvider>
  );
  fireEvent.click(screen.getByText('Add Item'));
  fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'NewItem' } });
  fireEvent.change(screen.getByLabelText('Unit:'), { target: { value: 'pcs' } });
  fireEvent.change(screen.getByLabelText('Price:'), { target: { value: '5.00' } });
  
  // Debug before clicking the "Add Item" button inside the modal
  console.log('Before clicking Add Item button inside modal:');
  screen.debug();
  
  const addItemButtons = screen.getAllByRole('button', { name: /Add Item/i });
  fireEvent.click(addItemButtons[1]); // Click the "Add Item" button inside the modal
  
  // Debug after clicking the "Add Item" button inside the modal
  console.log('After clicking Add Item button inside modal:');
  screen.debug();
  
  // Wait for the DOM to update
  setTimeout(() => {
    console.log('After waiting for DOM update:');
    screen.debug();
    expect(screen.getByText('NewItem')).toBeInTheDocument();
  }, 1000);
});