export type ProductCategory = 
  | 'all'
  | 't-shirts'
  | 'oversized-t-shirts'
  | 'shirts'
  | 'hoodies'
  | 'sweatshirts'
  | 'trousers'
  | 'jackets'
  | 'accessories';

export type ProductCollection = 
  | 'THE ESSENTIALS'
  | 'URBAN FORM'
  | 'AFTER HOURS'
  | 'EVERYDAY LUXURY'
  | 'COLLECTION 01';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  price: number; // In GBP (£)
  originalPrice?: number;
  discount?: number; // percentage
  category: ProductCategory;
  gender: 'men' | 'women' | 'unisex';
  collection: ProductCollection;
  description: string;
  fabricDetails: string[];
  careInstructions: string[];
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[];
  ukSizes?: string[]; // UK 6, 8, 10, 12, 14, 16 or 36R, 38R, 40R
  colors: ProductColor[];
  primaryImage: string;
  secondaryImage: string;
  galleryImages: string[];
  inStock: boolean;
  stockCount: number;
  isNew: boolean;
  isBestSeller: boolean;
  isPublished: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedSize: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  selectedColor: ProductColor;
  quantity: number;
}

export type OrderStatus = 
  | 'placed'
  | 'confirmed'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface UKShippingAddress {
  fullName: string;
  phone: string; // UK +44 format
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  county: string;
  postcode: string; // UK Postcode, e.g. SW1A 1AA, EC1A 1BB, M1 1AE
  country: 'United Kingdom';
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  items: CartItem[];
  shippingAddress: UKShippingAddress;
  shippingMethod: 'royal_mail_48' | 'royal_mail_24' | 'dpd_next_day';
  paymentMethod: 'stripe' | 'card' | 'apple_pay' | 'google_pay' | 'klarna';
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  subtotal: number; // GBP
  vatAmount: number; // 20% included UK VAT
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  couponCode?: string;
  trackingNumber: string;
  estimatedDeliveryDate: string;
  timeline: {
    status: OrderStatus;
    timestamp: string;
    description: string;
    location?: string;
  }[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  savedAddresses: UKShippingAddress[];
  wishlist: string[];
  marketingConsent: boolean;
}

export interface HomepageConfig {
  announcementText: string;
  heroSeasonLabel: string;
  heroHeadline: string;
  heroSecondaryHeadline: string;
  manifestoStatement: string;
  brandStoryQuote: string;
  editorialBannerText: string;
  freeShippingThresholdGBP: number;
}
