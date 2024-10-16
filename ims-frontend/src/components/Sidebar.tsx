// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><Link to="/">Home (Dashboard)</Link></li>
          <li><Link to="/inventory">Inventory</Link></li>
          <li><Link to="/transactions">Transactions</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;