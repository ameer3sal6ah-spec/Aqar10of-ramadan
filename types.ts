export enum UserRole {
  BUYER = 'buyer',
  OWNER = 'owner',
}

export enum TransactionType {
  SALE = 'For Sale',
  RENT = 'For Rent',
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
}

export interface Property {
  id: string;
  owner_id: string; // Changed from ownerId to match Supabase snake_case
  title: string;
  description: string;
  images: string[];
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  floor: number;
  neighborhood: string;
  city: string;
  transaction_type: TransactionType; // Changed from transactionType
  contact_phone: string; // Changed from contactPhone
}

export interface BannerItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  link: string;
}