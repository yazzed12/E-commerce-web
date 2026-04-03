export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  images: string[];
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  ratingsQuantity: number;
  id: string;
}

export interface CartItem {
  _id: string;
  product: Product;
  price: number;
  count: number;
}

export interface Cart {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  totalCartPrice: number;
}

export interface OrderItem {
  _id: string;
  product: Product;
  price: number;
  count: number;
}

export interface Order {
  _id: string;
  user: User;
  cartItems: OrderItem[];
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
}

export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}
