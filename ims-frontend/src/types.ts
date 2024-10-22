export interface Item {
  itemID: number;
  itemName: string;
  unit: string;
  price: number;
}

export interface Stock {
  stockID: number;
  itemID: number;
  quantityInStock: number;
  arrivalDate: string;
  expiryDate?: string;
}