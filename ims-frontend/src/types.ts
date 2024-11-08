// Define the shape of an Item object
export interface Item {
  itemID: number; // Unique identifier for the item
  itemName: string; // Name of the item
  unit: string; // Unit of measurement for the item
  price: number; // Price of the item
}

// Define the shape of a Stock object
export interface Stock {
  stockID: number; // Unique identifier for the stock entry
  itemID: number; // Identifier for the item associated with this stock entry
  quantityInStock: number; // Quantity of the item in stock
  arrivalDate: Date; // Date when the stock arrived
  expiryDate?: Date; // Optional field for the expiry date of the stock
}