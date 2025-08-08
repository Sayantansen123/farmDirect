export interface User {
  id: string;
  name: string;
  email: string;
  type: 'farmer' | 'user';
  phone?: string;
  address?: string;
  farmName?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  farmerId: string;
  farmerName: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}