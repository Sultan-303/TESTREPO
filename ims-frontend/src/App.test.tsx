import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Home (Dashboard) link', () => {
  render(<App />);
  const linkElements = screen.getAllByText(/Home \(Dashboard\)/i);
  expect(linkElements[0]).toBeInTheDocument(); // Assert on the first matching element
});