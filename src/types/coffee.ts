export type CategoryId = 'all' | 'drinks' | 'beans' | 'bakery';

export type GrindOption = 'Whole Bean' | 'Pour-over (V60 / Kalita)' | 'Espresso' | 'French Press' | 'Cold Brew' | 'Aeropress';

export type MilkOption = 'Whole Organic Milk' | 'Oatly Oat Milk' | 'House Almond Milk' | 'None (Black)';

export type SizeOption = '8 oz (Cortado / Flat)' | '12 oz (Standard)' | '16 oz (Large)';

export type TemperatureOption = 'Hot' | 'Iced';

export interface Product {
  id: string;
  name: string;
  category: 'drinks' | 'beans' | 'bakery';
  subcategory: string;
  price: number;
  description: string;
  image: string;
  featured?: boolean;
  tastingNotes?: string[];
  // Bean-specific fields
  origin?: string;
  region?: string;
  farm?: string;
  altitude?: string;
  process?: string;
  roastLevel?: 'Light' | 'Medium-Light' | 'Medium' | 'Medium-Dark' | 'Dark';
  harvestYear?: string;
  // Drink-specific fields
  caffeineLevel?: 'Full' | 'Half-Caf' | 'Decaf';
  dairyFree?: boolean;
  allergens?: string[];
}

export interface CartCustomization {
  grind?: GrindOption;
  milk?: MilkOption;
  size?: SizeOption;
  temperature?: TemperatureOption;
  notes?: string;
}

export interface CartItem {
  id: string; // unique item uuid (product.id + hash of customization)
  product: Product;
  quantity: number;
  customization?: CartCustomization;
  unitPrice: number;
}

export interface BrewMethod {
  id: string;
  name: string;
  subtitle: string;
  ratio: number; // e.g. 15 for 1:15
  defaultDoseGrams: number;
  grindSize: string;
  waterTempC: number;
  waterTempF: number;
  totalTime: string;
  steps: {
    time: string;
    action: string;
    waterTargetGrams: number;
    description: string;
  }[];
}

export interface TableReservation {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}
