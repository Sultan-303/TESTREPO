import { useState, useEffect } from 'react'; // Importing useState and useEffect hooks from React
import { Stock } from '../types'; // Importing the Stock type from a types file

const useStock = () => {
  // Custom hook named useStock

  const [allStock, setAllStock] = useState<Stock[]>([]); // State to store all stock data, initialized as an empty array
  const [filteredStock, setFilteredStock] = useState<Stock[]>([]); // State to store filtered stock data, initialized as an empty array
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status, initialized as true
  const [error, setError] = useState<string | null>(null); // State to store error messages, initialized as null

  useEffect(() => {
    // useEffect hook to perform side effects (fetching data) when the component mounts

    const fetchStock = async () => {
      // Async function to fetch stock data from the API
      try {
        const response = await fetch('https://localhost:7237/api/stock'); // Fetching data from the API
        if (!response.ok) {
          // Checking if the response is not OK (status code is not in the range 200-299)
          throw new Error(`HTTP error! status: ${response.status}`); // Throwing an error with the status code
        }
        const data: Stock[] = await response.json(); // Parsing the response JSON into an array of Stock objects
        setAllStock(data); // Updating the allStock state with the fetched data
        setFilteredStock(data); // Initially setting filteredStock to the fetched data
      } catch (error) {
        setError('Error fetching stock'); // Setting an error message in case of an error
        console.error('Error fetching stock:', error); // Logging the error to the console
      } finally {
        setLoading(false); // Setting loading to false after the fetch is complete (whether it succeeded or failed)
      }
    };

    fetchStock(); // Calling the fetchStock function to fetch data when the component mounts
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  const addStock = async (newStock: Stock) => {
    // Async function to add new stock data to the API
    try {
      const response = await fetch('https://localhost:7237/api/stock', {
        method: 'POST', // HTTP method set to POST for adding new data
        headers: {
          'Content-Type': 'application/json', // Setting the Content-Type header to application/json
        },
        body: JSON.stringify(newStock), // Converting the newStock object to a JSON string for the request body
      });

      if (response.ok) {
        // Checking if the response is OK (status code is in the range 200-299)
        const addedStock = await response.json(); // Parsing the response JSON into a Stock object
        setAllStock((prevStock) => [...prevStock, addedStock]); // Adding the new stock to the allStock state
        setFilteredStock((prevStock) => [...prevStock, addedStock]); // Adding the new stock to the filteredStock state
      } else {
        throw new Error(`HTTP error! status: ${response.status}`); // Throwing an error if the response is not OK
      }
    } catch (error) {
      setError('Error adding stock'); // Setting an error message in case of an error
      console.error('Error adding stock:', error); // Logging the error to the console
    }
  };

  const updateStock = async (updatedStock: Stock) => {
    // Async function to update existing stock data in the API
    try {
      const response = await fetch(`https://localhost:7237/api/stock/${updatedStock.stockID}`, {
        method: 'PUT', // HTTP method set to PUT for updating data
        headers: {
          'Content-Type': 'application/json', // Setting the Content-Type header to application/json
        },
        body: JSON.stringify(updatedStock), // Converting the updatedStock object to a JSON string for the request body
      });

      if (response.ok) {
        // Checking if the response is OK (status code is in the range 200-299)
        const updatedStockData = await response.json(); // Parsing the response JSON into a Stock object
        setAllStock((prevStock) =>
          prevStock.map((stock) =>
            stock.stockID === updatedStockData.stockID ? updatedStockData : stock
          )
        ); // Updating the specific stock in the allStock state
        setFilteredStock((prevStock) =>
          prevStock.map((stock) =>
            stock.stockID === updatedStockData.stockID ? updatedStockData : stock
          )
        ); // Updating the specific stock in the filteredStock state
      } else {
        throw new Error(`HTTP error! status: ${response.status}`); // Throwing an error if the response is not OK
      }
    } catch (error) {
      setError('Error updating stock'); // Setting an error message in case of an error
      console.error('Error updating stock:', error); // Logging the error to the console
    }
  };

  const filterStock = (criteria: (stock: Stock) => boolean) => {
    // Function to filter stock based on a criteria
    setFilteredStock(allStock.filter(criteria)); // Filtering the allStock state based on the criteria and updating the filteredStock state
  };

  return { allStock, filteredStock, addStock, updateStock, filterStock, loading, error }; // Returning the state and functions from the custom hook
};

export default useStock; // Exporting the custom hook as the default export