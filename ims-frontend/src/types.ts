// src/types.ts
export interface Product {
    ProductID: number;
    ProductName: string;
    Description: string;
    QuantityInStock: number;
    Price: number;
    ExpiryDate: string;
    Categories: string[];
  }