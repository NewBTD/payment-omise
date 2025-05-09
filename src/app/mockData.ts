import { Order } from "./types/Order";
import { Product } from "./types/Product";

export const orders: Order[] = [
  {
    id: "1",
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    address: "123 Main St, City, Country",
    product: {
      id: "1",
      name: "Product 1",
      price: 100,
      images: ["/shoes1.jpg"],
      description: "This is product 1",
      relatedProductsId: ["2", "3", "4"],
    },
    net: 2500,
    date: "2023-08-01",
    time: "10:00 AM",
    notes: "Some additional notes",
  },
  {
    id: "2",
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "9876543210",
    address: "456 Elm St, City, Country",
    product: {
      id: "1",
      name: "Product 1",
      price: 100,
      images: ["/shoes1.jpg"],
      description: "This is product 1",
      relatedProductsId: ["2", "3", "4"],
    },
    net: 200,
    date: "2023-08-02",
    time: "11:00 AM",
    notes: "Some additional notes",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Product 1",
    price: 100,
    images: ["/shoes1.jpg"],
    description: "This is product 1",
    relatedProductsId: ["2", "3", "4"],
  },
  {
    id: "2",
    name: "Product 2",
    price: 200,
    images: ["/shoes2.jpg"],
    description: "This is product 2",
    relatedProductsId: ["1", "3", "4"],
  },
  {
    id: "3",
    name: "Product 3",
    price: 300,
    images: ["/shoes3.jpg"],
    description: "This is product 3",
    relatedProductsId: ["1", "2", "4"],
  },
  {
    id: "4",
    name: "Product 4",
    price: 400,
    images: ["/shoes4.jpg"],
    description: "This is product 4",
    relatedProductsId: ["1", "2", "3"],
  },
  {
    id: "5",
    name: "Product 5",
    price: 400,
    images: ["/shoes5.jpg"],
    description: "This is product 5",
    relatedProductsId: ["1", "2", "3"],
  },
  {
    id: "6",
    name: "Product 6",
    price: 400,
    images: ["/shoes6.jpg"],
    description: "This is product 6",
    relatedProductsId: ["1", "2", "3"],
  },
];
