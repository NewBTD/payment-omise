import { Product } from "./Product";

export interface Order {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  product: Product;
  net: number;
  date: string;
  time: string;
  notes?: string;
}
