import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Home (Dashboard) link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Home \(Dashboard\)/i);
  expect(linkElement).toBeInTheDocument();
});