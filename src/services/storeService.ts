import { Product, CartItem, Order, UserProfile, HomepageConfig, OrderStatus, UKShippingAddress } from '../types';
import { INITIAL_PRODUCTS, INITIAL_HOMEPAGE_CONFIG } from '../data/mockData';

const PRODUCTS_KEY = 'novaire_uk_products_v2';
const CART_KEY = 'novaire_uk_cart_v2';
const WISHLIST_KEY = 'novaire_uk_wishlist_v2';
const ORDERS_KEY = 'novaire_uk_orders_v2';
const USER_KEY = 'novaire_uk_user_v2';
const CONFIG_KEY = 'novaire_uk_config_v2';

// Realistic initial UK orders
const INITIAL_UK_ORDERS: Order[] = [
  {
    id: 'ord-uk-7291',
    orderNumber: 'NOV-UK-7291',
    createdAt: '2026-03-01T11:20:00Z',
    status: 'shipped',
    items: [
      {
        id: 'nov-uk-001-L-Onyx Black',
        productId: 'nov-uk-001',
        product: INITIAL_PRODUCTS[0],
        selectedSize: 'L',
        selectedColor: { name: 'Onyx Black', hex: '#0B0B0B' },
        quantity: 1
      }
    ],
    shippingAddress: {
      fullName: 'Alexander Wright',
      phone: '+44 7911 234567',
      email: 'a.wright@mayfair-studio.co.uk',
      addressLine1: '18 Mount Street',
      addressLine2: 'Apartment 3B',
      city: 'London',
      county: 'Greater London',
      postcode: 'W1K 2RN',
      country: 'United Kingdom'
    },
    shippingMethod: 'royal_mail_24',
    paymentMethod: 'apple_pay',
    paymentStatus: 'paid',
    subtotal: 185.00,
    vatAmount: 30.83, // 20% inclusive VAT: 185 / 1.2 * 0.2
    discountAmount: 18.50,
    shippingFee: 0,
    totalAmount: 166.50,
    couponCode: 'NOVAIRE10',
    trackingNumber: 'GB-RM24-99201481',
    estimatedDeliveryDate: '03 March 2026',
    timeline: [
      { status: 'placed', timestamp: '2026-03-01T11:20:00Z', description: 'Order authorized with Apple Pay' },
      { status: 'confirmed', timestamp: '2026-03-01T11:21:00Z', description: 'Payment verified via Stripe UK Gateway' },
      { status: 'processing', timestamp: '2026-03-01T14:00:00Z', description: 'Garment inspected at London Shoreditch Atelier' },
      { status: 'packed', timestamp: '2026-03-02T09:30:00Z', description: 'Sealed in signature archival box with orange seal' },
      { status: 'shipped', timestamp: '2026-03-02T16:00:00Z', description: 'Handed over to Royal Mail Tracked 24 (Mount Pleasant Hub)', location: 'London' }
    ]
  },
  {
    id: 'ord-uk-7292',
    orderNumber: 'NOV-UK-7292',
    createdAt: '2026-03-02T14:45:00Z',
    status: 'processing',
    items: [
      {
        id: 'nov-uk-003-M-Washed Black',
        productId: 'nov-uk-003',
        product: INITIAL_PRODUCTS[2],
        selectedSize: 'M',
        selectedColor: { name: 'Washed Black', hex: '#161616' },
        quantity: 2
      },
      {
        id: 'nov-uk-005-M-Jet Black',
        productId: 'nov-uk-005',
        product: INITIAL_PRODUCTS[4],
        selectedSize: 'M',
        selectedColor: { name: 'Jet Black', hex: '#0D0D0D' },
        quantity: 1
      }
    ],
    shippingAddress: {
      fullName: 'Charlotte Campbell',
      phone: '+44 7822 987654',
      email: 'charlotte.c@edinburgh-arts.ac.uk',
      addressLine1: '42 Royal Circus',
      city: 'Edinburgh',
      county: 'City of Edinburgh',
      postcode: 'EH3 6SS',
      country: 'United Kingdom'
    },
    shippingMethod: 'royal_mail_24',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    subtotal: 175.00,
    vatAmount: 29.17,
    discountAmount: 15.00,
    shippingFee: 0,
    totalAmount: 160.00,
    couponCode: 'LONDONFIRST',
    trackingNumber: 'GB-RM24-77192044',
    estimatedDeliveryDate: '04 March 2026',
    timeline: [
      { status: 'placed', timestamp: '2026-03-02T14:45:00Z', description: 'Order placed via Visa Debit' },
      { status: 'confirmed', timestamp: '2026-03-02T14:46:00Z', description: 'Stripe 3D Secure 2.0 authentication confirmed' },
      { status: 'processing', timestamp: '2026-03-02T17:00:00Z', description: 'Garments allocated for dispatch quality inspection' }
    ]
  }
];

export const storeService = {
  // PRODUCTS
  getProducts(): Product[] {
    try {
      const stored = localStorage.getItem(PRODUCTS_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  },

  getProductById(id: string): Product | undefined {
    return this.getProducts().find(p => p.id === id || p.slug === id);
  },

  saveProducts(products: Product[]) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    window.dispatchEvent(new Event('novaire_products_updated'));
  },

  addProduct(newProduct: Omit<Product, 'id'>): Product {
    const products = this.getProducts();
    const product: Product = {
      ...newProduct,
      id: `nov-uk-${Date.now().toString().slice(-4)}`
    };
    products.unshift(product);
    this.saveProducts(products);
    return product;
  },

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updates };
    this.saveProducts(products);
    return products[index];
  },

  deleteProduct(id: string): boolean {
    const products = this.getProducts();
    const filtered = products.filter(p => p.id !== id);
    if (filtered.length === products.length) return false;
    this.saveProducts(filtered);
    return true;
  },

  // CART
  getCart(): CartItem[] {
    try {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [];
  },

  saveCart(cart: CartItem[]) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('novaire_cart_updated'));
  },

  addToCart(product: Product, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL', color: { name: string; hex: string }, quantity: number = 1): CartItem[] {
    const cart = this.getCart();
    const itemId = `${product.id}-${size}-${color.name}`;
    const existingIndex = cart.findIndex(item => item.id === itemId);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: itemId,
        productId: product.id,
        product,
        selectedSize: size,
        selectedColor: color,
        quantity
      });
    }

    this.saveCart(cart);
    return cart;
  },

  updateCartQuantity(itemId: string, delta: number): CartItem[] {
    const cart = this.getCart();
    const item = cart.find(i => i.id === itemId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        return this.removeFromCart(itemId);
      }
    }
    this.saveCart(cart);
    return cart;
  },

  removeFromCart(itemId: string): CartItem[] {
    const cart = this.getCart().filter(i => i.id !== itemId);
    this.saveCart(cart);
    return cart;
  },

  clearCart() {
    this.saveCart([]);
  },

  // WISHLIST
  getWishlist(): string[] {
    try {
      const stored = localStorage.getItem(WISHLIST_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return ['nov-uk-001'];
  },

  toggleWishlist(productId: string): string[] {
    const wishlist = this.getWishlist();
    const index = wishlist.indexOf(productId);
    if (index > -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(productId);
    }
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    window.dispatchEvent(new Event('novaire_wishlist_updated'));
    return wishlist;
  },

  // ORDERS
  getOrders(): Order[] {
    try {
      const stored = localStorage.getItem(ORDERS_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_UK_ORDERS));
    return INITIAL_UK_ORDERS;
  },

  saveOrders(orders: Order[]) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    window.dispatchEvent(new Event('novaire_orders_updated'));
  },

  getOrderById(idOrNumber: string): Order | undefined {
    return this.getOrders().find(
      o => o.id === idOrNumber || o.orderNumber.toLowerCase() === idOrNumber.toLowerCase()
    );
  },

  createOrder(
    cartItems: CartItem[],
    shippingAddress: UKShippingAddress,
    paymentMethod: any,
    shippingMethod: 'royal_mail_48' | 'royal_mail_24' | 'dpd_next_day' = 'royal_mail_24',
    couponCode?: string
  ): Order {
    const subtotal = cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
    
    let discountAmount = 0;
    if (couponCode === 'NOVAIRE10') {
      discountAmount = Number((subtotal * 0.1).toFixed(2));
    } else if (couponCode === 'LONDONFIRST' && subtotal >= 75) {
      discountAmount = 15.00;
    } else if (couponCode === 'STUDIO20' && subtotal >= 150) {
      discountAmount = Number((subtotal * 0.2).toFixed(2));
    }

    const freeShippingThreshold = 80.00;
    let shippingFee = 0;
    if (shippingMethod === 'royal_mail_48') {
      shippingFee = subtotal >= freeShippingThreshold ? 0 : 4.99;
    } else if (shippingMethod === 'royal_mail_24') {
      shippingFee = subtotal >= freeShippingThreshold ? 0 : 7.99;
    } else if (shippingMethod === 'dpd_next_day') {
      shippingFee = 9.99;
    }

    const totalAmount = Number(Math.max(0, subtotal - discountAmount + shippingFee).toFixed(2));
    // UK VAT calculation (20% included in consumer price)
    const vatAmount = Number(((totalAmount / 1.2) * 0.2).toFixed(2));

    const orderNumber = `NOV-UK-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackingNumber = `GB-RM24-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newOrder: Order = {
      id: `ord-uk-${Date.now().toString().slice(-4)}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      items: [...cartItems],
      shippingAddress,
      shippingMethod,
      paymentMethod,
      paymentStatus: 'paid',
      subtotal,
      vatAmount,
      discountAmount,
      shippingFee,
      totalAmount,
      couponCode,
      trackingNumber,
      estimatedDeliveryDate: shippingMethod === 'dpd_next_day' || shippingMethod === 'royal_mail_24' ? 'Next Business Day' : 'Within 2-3 Business Days',
      timeline: [
        {
          status: 'placed',
          timestamp: new Date().toISOString(),
          description: `Order successfully placed via ${paymentMethod.replace('_', ' ').toUpperCase()}`
        },
        {
          status: 'confirmed',
          timestamp: new Date().toISOString(),
          description: 'Stripe 3DS payment verification cleared & stock reserved'
        }
      ]
    };

    const orders = this.getOrders();
    orders.unshift(newOrder);
    this.saveOrders(orders);
    this.clearCart();
    return newOrder;
  },

  updateOrderStatus(orderId: string, newStatus: OrderStatus): Order | null {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return null;

    order.status = newStatus;
    const descriptions: Record<OrderStatus, string> = {
      placed: 'Order submitted by client',
      confirmed: 'Payment verified and inventory locked',
      processing: 'Garment preparation & QA at London Atelier',
      packed: 'Sealed in signature archival box with orange seal',
      shipped: 'Dispatched with Royal Mail Tracked service',
      out_for_delivery: 'With local delivery postal carrier for same-day delivery',
      delivered: 'Delivered and signed at UK destination',
      cancelled: 'Order cancelled and refund issued'
    };

    order.timeline.push({
      status: newStatus,
      timestamp: new Date().toISOString(),
      description: descriptions[newStatus] || `Status updated to ${newStatus}`
    });

    this.saveOrders(orders);
    return order;
  },

  // USER AUTH
  getUser(): UserProfile {
    try {
      const stored = localStorage.getItem(USER_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    const defaultUser: UserProfile = {
      id: 'usr-uk-client-01',
      name: 'Oliver Sterling',
      email: 'oliver.sterling@london-design.co.uk',
      phone: '+44 7911 884422',
      role: 'customer',
      savedAddresses: [
        {
          fullName: 'Oliver Sterling',
          phone: '+44 7911 884422',
          email: 'oliver.sterling@london-design.co.uk',
          addressLine1: '24 Redchurch Street',
          addressLine2: 'Studio 4',
          city: 'London',
          county: 'Greater London',
          postcode: 'E2 7DD',
          country: 'United Kingdom'
        }
      ],
      wishlist: ['nov-uk-001'],
      marketingConsent: true
    };
    localStorage.setItem(USER_KEY, JSON.stringify(defaultUser));
    return defaultUser;
  },

  saveUser(user: UserProfile) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event('novaire_user_updated'));
  },

  switchUserRole(role: 'customer' | 'admin') {
    const user = this.getUser();
    user.role = role;
    this.saveUser(user);
    return user;
  },

  // CONFIG / HOMEPAGE CMS
  getConfig(): HomepageConfig {
    try {
      const stored = localStorage.getItem(CONFIG_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_HOMEPAGE_CONFIG;
  },

  saveConfig(config: HomepageConfig) {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    window.dispatchEvent(new Event('novaire_config_updated'));
  },

  // UK POSTCODE DELIVERY CHECKER
  checkUKPostcode(postcode: string): { valid: boolean; message: string; estimatedDays: string; isExpress: boolean } {
    // Standard UK postcode regex validation
    const ukPostcodeRegex = /^([A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2})$/i;
    const cleanPostcode = postcode.trim().toUpperCase();

    if (!ukPostcodeRegex.test(cleanPostcode)) {
      return {
        valid: false,
        message: 'Please enter a valid UK postcode (e.g. SW1A 1AA, EC1A 1BB, M1 1AE)',
        estimatedDays: '',
        isExpress: false
      };
    }

    // Greater London postcodes start with E, EC, N, NW, SE, SW, W, WC
    const londonPrefixes = ['E', 'EC', 'N', 'NW', 'SE', 'SW', 'W', 'WC'];
    const isLondon = londonPrefixes.some(p => cleanPostcode.startsWith(p));

    if (isLondon) {
      return {
        valid: true,
        message: 'Eligible for Royal Mail Tracked 24 & London Same-Day Atelier Courier',
        estimatedDays: 'Next Business Day (Complimentary on orders over £80)',
        isExpress: true
      };
    }

    return {
      valid: true,
      message: 'Eligible for Royal Mail Tracked 24 / 48 UK Mainland Delivery',
      estimatedDays: '1-2 Business Days via Royal Mail Tracked',
      isExpress: true
    };
  }
};
