import { ChangeEvent } from "react";

export interface InputComponentProps {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface SelectComponentProps {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: { id: string; label: string }[] | undefined;
}

export interface FormData {
  [key: string]: string;
}

export interface ComponentLevelLoader {
  loading: boolean;
  id: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface Product {
  _id?: string;
  name: string;
  category: string;
  description: string;
  price: number;
  priceDrop: number;
  sizes: Size[];
  deliveryInfo: string;
  imageUrl: string;
  onSale: string;
}

export interface Size {
  id: string;
  label: string;
}

export interface Address {
  _id?: string;
  fullName: string;
  city: string;
  country: string;
  postalCode: string;
  address: string;
}
