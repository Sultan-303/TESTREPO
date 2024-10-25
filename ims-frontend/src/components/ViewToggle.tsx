import React from 'react';
import './ViewToggle.css'; // Import the CSS file for styling

interface ViewToggleProps {
  view: 'all' | 'near-expiry';
  setView: (view: 'all' | 'near-expiry') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, setView }) => {
  return (
    <div className="view-toggle">
      <span
        className={`view-option ${view === 'all' ? 'selected' : ''}`}
        onClick={() => setView('all')}
      >
        All
      </span>
      <span
        className={`view-option ${view === 'near-expiry' ? 'selected' : ''}`}
        onClick={() => setView('near-expiry')}
      >
        Near Expiry
      </span>
    </div>
  );
};

export default ViewToggle;