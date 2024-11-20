import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemsPage from './ItemsPage';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the useItems hook
jest.mock('../hooks/useItems', () => ({
  __esModule: true,
  default: () => ({
    allItems: [],
    addItem: jest.fn(),
    updateItem: jest.fn(),
    deleteItem: jest.fn(),
    fetchItems: jest.fn(),
    loading: false,
    error: null,
    showErrorModal: false,
    setShowErrorModal: jest.fn(),
  }),
}));

describe('ItemsPage', () => {
  test('renders ItemsPage component', () => {
    render(
      <Router>
        <ItemsPage />
      </Router>
    );
    const heading = screen.getByRole('heading', { name: /items/i });
    expect(heading).toBeInTheDocument();
  });
});