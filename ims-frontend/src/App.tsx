// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Transactions from './pages/Transactions';
import './Styles.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="app">
          <Sidebar />
          <div className="main-content">
            <div className="content">
              <Routes>
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;