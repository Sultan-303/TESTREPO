import { useState, useEffect } from 'react';
import { Stock } from '../types';

const useStock = () => {
  const [allStock, setAllStock] = useState<Stock[]>([]);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await fetch('https://localhost:7237/api/stock');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Stock[] = await response.json();
        setAllStock(data);
      } catch (error) {
        console.error('Error fetching stock:', error);
      }
    };

    fetchStock();
  }, []);

  const addStock = async (newStock: Stock) => {
    try {
      const response = await fetch('https://localhost:7237/api/stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStock),
      });

      if (response.ok) {
        const addedStock = await response.json();
        setAllStock([...allStock, addedStock]);
      } else {
        console.error('Failed to add stock');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteStock = async (stockId: number) => {
    try {
      const response = await fetch(`https://localhost:7237/api/stock/${stockId}`, { method: 'DELETE' });
      if (response.ok) {
        setAllStock(allStock.filter(stock => stock.stockID !== stockId));
      } else {
        console.error('Failed to delete stock');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateStock = async (updatedStock: Stock) => {
    try {
      const response = await fetch(`https://localhost:7237/api/stock/${updatedStock.stockID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStock),
      });

      if (response.ok) {
        setAllStock(allStock.map(stock => (stock.stockID === updatedStock.stockID ? updatedStock : stock)));
      } else {
        console.error('Failed to update stock');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return { allStock, addStock, deleteStock, updateStock };
};

export default useStock;