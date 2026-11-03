import React, { useState, useEffect } from 'react';
import { storeService } from './services/storeService';
import { Product, CartItem, Order, UserProfile, HomepageConfig } from './types';
import { EditorialHero } from './components/EditorialHero';
import { BrandManifesto } from './components/BrandManifesto';
import { TrustCollectionPanel } from './components/TrustCollectionPanel';
import { StoreHeader } from './components/StoreHeader';
import { ShoppingView } from './components/ShoppingView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { CustomerAccountModal } from './components/CustomerAccountModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { SearchModal } from './components/SearchModal';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';

export function App() {
  // Store Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProfile>(storeService.getUser());
  const [config, setConfig] = useState<HomepageConfig>(storeService.getConfig());

  // UI & Modal States
  const [activeNav, setActiveNav] = useState('HOME');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutCoupon, setCheckoutCoupon] = useState<string | undefined>(undefined);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(true);

  // Initialize and listen to storage events
  useEffect(() => {
    setProducts(storeService.getProducts());
    setCart(storeService.getCart());
    setWishlist(storeService.getWishlist());
    setOrders(storeService.getOrders());
    setCurrentUser(storeService.getUser());
    setConfig(storeService.getConfig());

    // Check if user previously dismissed cookie consent
    const cookieConsent = localStorage.getItem('novaire_cookie_consent_uk');
    if (cookieConsent) {
      setShowCookieBanner(false);
    }

    const handleProductsUpdate = () => setProducts(storeService.getProducts());
    const handleCartUpdate = () => setCart(storeService.getCart());
    const handleWishlistUpdate = () => setWishlist(storeService.getWishlist());
    const handleOrdersUpdate = () => setOrders(storeService.getOrders());
    const handleUserUpdate = () => setCurrentUser(storeService.getUser());
    const handleConfigUpdate = () => setConfig(storeService.getConfig());

    window.addEventListener('novaire_products_updated', handleProductsUpdate);
    window.addEventListener('novaire_cart_updated', handleCartUpdate);
    window.addEventListener('novaire_wishlist_updated', handleWishlistUpdate);
    window.addEventListener('novaire_orders_updated', handleOrdersUpdate);
    window.addEventListener('novaire_user_updated', handleUserUpdate);
    window.addEventListener('novaire_config_updated', handleConfigUpdate);

    return () => {
      window.removeEventListener('novaire_products_updated', handleProductsUpdate);
      window.removeEventListener('novaire_cart_updated', handleCartUpdate);
      window.removeEventListener('novaire_wishlist_updated', handleWishlistUpdate);
      window.removeEventListener('novaire_orders_updated', handleOrdersUpdate);
      window.removeEventListener('novaire_user_updated', handleUserUpdate);
      window.removeEventListener('novaire_config_updated', handleConfigUpdate);
    };
  }, []);

  const handleNavClick = (item: string) => {
    setActiveNav(item);
    if (item === 'HOME') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item === 'MEN') {
      setActiveCategory('men');
      scrollToShopping();
    } else if (item === 'WOMEN') {
      setActiveCategory('women');
      scrollToShopping();
    } else if (item === 'NEW ARRIVALS') {
      setActiveCategory('new');
      scrollToShopping();
    } else if (item === 'COLLECTIONS') {
      setActiveCategory('collections');
      scrollToShopping();
    } else if (item === 'ABOUT') {
      const el = document.getElementById('manifesto-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToShopping = () => {
    const el = document.getElementById('storefront-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreMen = () => {
    setActiveNav('MEN');
    setActiveCategory('men');
    scrollToShopping();
  };

  const handleExploreWomen = () => {
    setActiveNav('WOMEN');
    setActiveCategory('women');
    scrollToShopping();
  };

  const handleToggleWishlist = (productId: string) => {
    storeService.toggleWishlist(productId);
  };

  const handleQuickAdd = (product: Product, size: any, color: any) => {
    storeService.addToCart(product, size, color, 1);
  };

  const handleAddToCartFromModal = (product: Product, size: any, color: any, qty: number) => {
    storeService.addToCart(product, size, color, qty);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const handleBuyNowFromModal = (product: Product, size: any, color: any, qty: number) => {
    storeService.addToCart(product, size, color, qty);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: Order) => {
    setLastPlacedOrder(order);
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);
    setOrders(storeService.getOrders());
  };

  const handleTrackOrder = (order: Order) => {
    setActiveTrackingOrder(order);
    setIsTrackerOpen(true);
  };

  const handleAcceptCookies = () => {
    localStorage.setItem('novaire_cookie_consent_uk', 'accepted');
    setShowCookieBanner(false);
  };

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#111111] text-[#FFFDF2] flex flex-col font-sans">
      
      {/* Top Announcement Bar */}
      <aside 
        aria-label="UK Dispatch Announcement"
        className="w-full bg-[#111111] text-[#FFFDF2] text-[10px] md:text-[11px] font-bold tracking-[0.25em] py-2 px-4 text-center border-b border-neutral-800 uppercase flex items-center justify-center select-none"
      >
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F15A0A]" />
          {config.announcementText}
        </span>
      </aside>

      {/* ================= 1. CINEMATIC HERO (SECTION 1) ================= */}
      <EditorialHero
        config={config}
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        wishlistCount={wishlist.length}
        activeNav={activeNav}
        onNavClick={handleNavClick}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenWishlist={() => setIsAccountOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onExploreMen={handleExploreMen}
        onExploreWomen={handleExploreWomen}
        onContactClick={() => setIsContactOpen(true)}
      />

      {/* ================= 2. BRAND MANIFESTO (SECTION 2) ================= */}
      <div id="manifesto-section">
        <BrandManifesto />
      </div>

      {/* ================= 3. EDITORIAL BRAND PANEL (SECTION 3) ================= */}
      <TrustCollectionPanel
        onExploreCampaign={scrollToShopping}
        onExploreEssentials={() => {
          setActiveCategory('oversized-t-shirts');
          scrollToShopping();
        }}
        onExploreCollection={scrollToShopping}
      />

      {/* ================= 4. STOREFRONT TRANSITION & HEADER ================= */}
      <div id="storefront-section" className="relative z-30">
        <StoreHeader
          cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
          wishlistCount={wishlist.length}
          currentUser={currentUser}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            scrollToShopping();
          }}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAccount={() => setIsAccountOpen(true)}
          onOpenWishlist={() => setIsAccountOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* ================= 5. SHOPPING HOMEPAGE & CATALOG ================= */}
        <ShoppingView
          products={products}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onQuickAdd={handleQuickAdd}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />
      </div>

      {/* ================= FOOTER ================= */}
      <Footer
        onNavClick={handleNavClick}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* ================= UK GDPR COOKIE BANNER ================= */}
      {showCookieBanner && (
        <div className="fixed bottom-4 left-4 right-4 md:left-8 md:max-w-md z-50 bg-[#161616] border border-neutral-700 p-4 rounded-2xl shadow-2xl text-xs space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="font-editorial text-[11px] font-bold uppercase tracking-wider text-[#F15A0A]">
                UK PRIVACY & COOKIE CONSENT
              </span>
              <p className="text-neutral-300 text-[11px] leading-relaxed">
                We use cookies for shopping bag persistence and Stripe 3DS payment verification in compliance with UK PECR and UK GDPR.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAcceptCookies}
              className="px-4 py-2 bg-[#F15A0A] hover:bg-[#d94e05] text-white font-bold uppercase tracking-wider text-[10px] rounded-xl transition-all cursor-pointer"
            >
              ACCEPT ALL COOKIES
            </button>
            <button
              onClick={handleAcceptCookies}
              className="px-3 py-2 bg-neutral-800 text-neutral-300 hover:text-white text-[10px] uppercase rounded-xl transition-all cursor-pointer"
            >
              ESSENTIAL ONLY
            </button>
          </div>
        </div>
      )}

      {/* ================= MODALS & DRAWERS ================= */}

      {/* Product Details Page Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isWishlisted={wishlist.includes(selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCartFromModal}
          onBuyNow={handleBuyNowFromModal}
          onSelectRelated={(p) => setSelectedProduct(p)}
          allProducts={products}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={(id, delta) => storeService.updateCartQuantity(id, delta)}
        onRemoveItem={(id) => storeService.removeFromCart(id)}
        onProceedToCheckout={(coupon) => {
          setCheckoutCoupon(coupon);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        appliedCoupon={checkoutCoupon}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Success Modal */}
      <OrderSuccessModal
        order={lastPlacedOrder}
        onClose={() => setIsOrderSuccessOpen(false)}
        onTrackOrder={handleTrackOrder}
      />

      {/* Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => {
          setIsTrackerOpen(false);
          setActiveTrackingOrder(null);
        }}
        activeOrder={activeTrackingOrder}
      />

      {/* Customer Account & Dashboard Modal */}
      <CustomerAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        currentUser={currentUser}
        orders={orders}
        wishlistProducts={wishlistProducts}
        onTrackOrder={handleTrackOrder}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onUserUpdate={setCurrentUser}
        onOpenAdmin={() => {
          setIsAccountOpen(false);
          setIsAdminOpen(true);
        }}
      />

      {/* Admin Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        orders={orders}
        config={config}
        onProductsUpdate={setProducts}
        onOrdersUpdate={setOrders}
        onConfigUpdate={setConfig}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Contact Concierge Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}

export default App;
