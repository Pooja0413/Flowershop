import { FlowerProduct, CustomStem } from '../data/flowers';

export type BouquetSize = 'classic' | 'deluxe' | 'grandeur';

export interface CartBouquetItem {
  id: string; // unique item id
  type: 'catalog';
  product: FlowerProduct;
  size: BouquetSize;
  sizePriceMultiplier: number;
  vaseId: string;
  vaseName: string;
  vasePrice: number;
  quantity: number;
  giftNote?: {
    recipient: string;
    sender: string;
    message: string;
  };
  totalUnitPrice: number;
}

export interface CartCustomBouquetItem {
  id: string;
  type: 'custom';
  name: string;
  stems: { stem: CustomStem; count: number }[];
  vesselId: string;
  vesselName: string;
  vesselPrice: number;
  quantity: number;
  giftNote?: {
    recipient: string;
    sender: string;
    message: string;
  };
  totalUnitPrice: number;
}

export type CartItem = CartBouquetItem | CartCustomBouquetItem;

export interface DeliveryDetails {
  recipientName: string;
  recipientPhone: string;
  streetAddress: string;
  apartment: string;
  city: string;
  postalCode: string;
  deliveryDate: string;
  deliveryWindow: 'morning' | 'afternoon' | 'evening';
  deliveryInstructions: string;
  isGift: boolean;
  senderName: string;
  senderPhone: string;
  senderEmail: string;
}

export interface PlacedOrder {
  orderNumber: string;
  datePlaced: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  tax: number;
  total: number;
  deliveryDetails: DeliveryDetails;
  paymentMethod: 'card' | 'cod' | 'apple-pay';
}
