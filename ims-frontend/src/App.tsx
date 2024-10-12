import React from 'react';
import './App.css';
import Products from './Products'; // Import the Products component

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Product Store</h1>
        <Products /> {/* Display the products here */}
      </header>
    </div>
  );
};

export default App;
