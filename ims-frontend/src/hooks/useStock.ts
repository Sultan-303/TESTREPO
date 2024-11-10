import { useState, useEffect } from 'react';
import { Stock } from '../types';

const useStock = () => {
  const [allStock, setAllStock] = useState<Stock[]>([]);
  const [filteredStock, setFilteredStock] = useState<Stock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const fetchStock = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7237/api/stock');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Stock[] = await response.json();
      setAllStock(data);
      setFilteredStock(data);
    } catch (error) {
      setError('Error fetching stock');
      console.error('Error fetching stock:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
        setAllStock((prevStock) => [...prevStock, addedStock]);
        setFilteredStock((prevStock) => [...prevStock, addedStock]);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      setError('Error adding stock');
      setShowErrorModal(true);
      console.error('Error adding stock:', error);
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
        if (response.status === 204) {
          setAllStock((prevStock) =>
            prevStock.map((stock) => (stock.stockID === updatedStock.stockID ? updatedStock : stock))
          );
          setFilteredStock((prevStock) =>
            prevStock.map((stock) => (stock.stockID === updatedStock.stockID ? updatedStock : stock))
          );
        } else {
          const updatedStockData = await response.json();
          setAllStock((prevStock) =>
            prevStock.map((stock) => (stock.stockID === updatedStockData.stockID ? updatedStockData : stock))
          );
          setFilteredStock((prevStock) =>
            prevStock.map((stock) => (stock.stockID === updatedStockData.stockID ? updatedStockData : stock))
          );
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      setError('Error updating stock');
      setShowErrorModal(true);
      console.error('Error updating stock:', error);
    }
  };

  const deleteStock = async (stockId: number) => {
    try {
      const response = await fetch(`https://localhost:7237/api/stock/${stockId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAllStock((prevStock) => prevStock.filter((stock) => stock.stockID !== stockId));
        setFilteredStock((prevStock) => prevStock.filter((stock) => stock.stockID !== stockId));
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      setError('Error deleting stock');
      setShowErrorModal(true);
      console.error('Error deleting stock:', error);
    }
  };

  const filterStock = (criteria: (stock: Stock) => boolean) => {
    setFilteredStock(allStock.filter(criteria));
  };

  return { allStock, filteredStock, addStock, updateStock, deleteStock, filterStock, fetchStock, loading, error, showErrorModal, setShowErrorModal };
};

export default useStock;