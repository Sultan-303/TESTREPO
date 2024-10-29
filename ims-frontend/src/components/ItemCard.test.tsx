import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemCard from './ItemCard';
import { Item } from '../types';

const mockItem: Item = {
  itemID: 1,
  itemName: 'Test Item',
  unit: 'pcs',
  price: 10.0,
};

const mockHandleDeleteItem = jest.fn();
const mockHandleUpdateItem = jest.fn();

test('renders ItemCard component', () => {
  render(<ItemCard item={mockItem} handleDeleteItem={mockHandleDeleteItem} handleUpdateItem={mockHandleUpdateItem} />);
  expect(screen.getByText('Test Item')).toBeInTheDocument();
  expect(screen.getByText('pcs')).toBeInTheDocument();
  expect(screen.getByText('$10.00')).toBeInTheDocument();
});

test('calls handleDeleteItem when delete button is clicked', () => {
  render(<ItemCard item={mockItem} handleDeleteItem={mockHandleDeleteItem} handleUpdateItem={mockHandleUpdateItem} />);
  fireEvent.click(screen.getByText('Delete'));
  expect(mockHandleDeleteItem).toHaveBeenCalledWith(1);
});

test('calls handleUpdateItem when save button is clicked', () => {
  render(<ItemCard item={mockItem} handleDeleteItem={mockHandleDeleteItem} handleUpdateItem={mockHandleUpdateItem} />);
  fireEvent.click(screen.getByText('Edit'));
  fireEvent.change(screen.getByDisplayValue('Test Item'), { target: { value: 'Updated Item' } });
  fireEvent.click(screen.getByText('Save'));
  expect(mockHandleUpdateItem).toHaveBeenCalledWith({ ...mockItem, itemName: 'Updated Item' });
});