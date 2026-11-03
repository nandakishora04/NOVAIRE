import React, { useState } from 'react';
import { X, DollarSign, ShoppingCart, Users, Package, TrendingUp, Plus, Edit2, Trash2, Eye, EyeOff, Save, CheckCircle } from 'lucide-react';
import { Product, Order, HomepageConfig, OrderStatus, ProductCategory } from '../types';
import { storeService } from '../services/storeService';
import { createFashionGraphic } from '../data/mockData';
import { BrandLogo } from './BrandLogo';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  orders: Order[];
  config: HomepageConfig;
  onProductsUpdate: (products: Product[]) => void;
  onOrdersUpdate: (orders: Order[]) => void;
  onConfigUpdate: (config: HomepageConfig) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  products,
  orders,
  config,
  onProductsUpdate,
  onOrdersUpdate,
  onConfigUpdate
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'cms'>('overview');
  
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newPrice, setNewPrice] = useState(85.00);
  const [newCategory, setNewCategory] = useState<ProductCategory>('jackets');
  const [newGender, setNewGender] = useState<'men' | 'women' | 'unisex'>('unisex');
  const [newStock, setNewStock] = useState(20);
  const [newIsNew, setNewIsNew] = useState(true);
  const [newIsBestSeller, setNewIsBestSeller] = useState(false);

  const [cmsConfig, setCmsConfig] = useState<HomepageConfig>(config);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const totalSales = orders
    .filter(o => o.paymentStatus === 'paid')
    .reduce((acc, o) => acc + o.totalAmount, 0);

  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length;
  const totalProductsCount = products.length;

  const formatGBP = (val: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      storeService.updateProduct(editingProduct.id, {
        title: newTitle,
        subtitle: newSubtitle,
        price: Number(newPrice),
        category: newCategory,
        gender: newGender,
        stockCount: Number(newStock),
        isNew: newIsNew,
        isBestSeller: newIsBestSeller
      });
    } else {
      storeService.addProduct({
        title: newTitle,
        subtitle: newSubtitle,
        slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        price: Number(newPrice),
        category: newCategory,
        gender: newGender,
        collection: 'URBAN FORM',
        description: 'Exclusive British contemporary piece designed for architectural form and timeless presence.',
        fabricDetails: ['100% Premium Technical Cotton / Wool blend', 'Custom gunmetal hardware', 'Signature NOVAIRE Orange accent'],
        careInstructions: ['Dry clean only'],
        sizes: ['S', 'M', 'L', 'XL'],
        ukSizes: ['UK S', 'UK M', 'UK L', 'UK XL'],
        colors: [
          { name: 'Onyx Black', hex: '#0B0B0B' },
          { name: 'Raw Cream', hex: '#FFFDF2' }
        ],
        primaryImage: createFashionGraphic(newTitle.toUpperCase(), '#181818', true),
        secondaryImage: createFashionGraphic(newTitle.toUpperCase() + ' REVERSE', '#0D0D0D', true),
        galleryImages: [],
        inStock: true,
        stockCount: Number(newStock),
        isNew: newIsNew,
        isBestSeller: newIsBestSeller,
        isPublished: true,
        rating: 5.0,
        reviewsCount: 1
      });
    }

    onProductsUpdate(storeService.getProducts());
    setIsAddingProduct(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this garment from the UK live catalog?')) {
      storeService.deleteProduct(id);
      onProductsUpdate(storeService.getProducts());
    }
  };

  const handleTogglePublish = (p: Product) => {
    storeService.updateProduct(p.id, { isPublished: !p.isPublished });
    onProductsUpdate(storeService.getProducts());
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    storeService.updateOrderStatus(orderId, status);
    onOrdersUpdate(storeService.getOrders());
  };

  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    storeService.saveConfig(cmsConfig);
    onConfigUpdate(cmsConfig);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-55 overflow-y-auto bg-black/90 backdrop-blur-md select-none flex items-center justify-center p-3 sm:p-6">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        className="relative w-full max-w-6xl bg-[#111111] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl text-white my-auto z-10 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/80 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F15A0A] animate-pulse" />
            <span className="font-editorial text-sm sm:text-base font-bold tracking-tight uppercase">
              NOVAIRE UK · ATELIER COMMERCE CONTROL
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-3 border-b border-neutral-800 bg-neutral-950 flex items-center gap-6 overflow-x-auto text-xs font-bold uppercase tracking-wider">
          {[
            { id: 'overview', label: 'UK Analytics', icon: <TrendingUp size={14} /> },
            { id: 'products', label: `Garments (${totalProductsCount})`, icon: <Package size={14} /> },
            { id: 'orders', label: `Orders (${totalOrdersCount})`, icon: <ShoppingCart size={14} /> },
            { id: 'cms', label: 'Storefront CMS & Banners', icon: <Edit2 size={14} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setIsAddingProduct(false);
                setEditingProduct(null);
              }}
              className={`flex items-center gap-2 py-1 transition-colors cursor-pointer ${
                activeTab === tab.id ? 'text-[#F15A0A] border-b-2 border-[#F15A0A] pb-1' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 flex-1">
          
          {/* TAB 1: OVERVIEW ANALYTICS */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
                  <div className="flex items-center justify-between text-neutral-400 text-xs uppercase font-semibold">
                    <span>UK REVENUE (GBP)</span>
                    <span className="text-[#F15A0A] font-bold text-sm">£</span>
                  </div>
                  <div className="font-editorial text-2xl sm:text-3xl font-extrabold text-white mt-2 tabular-nums">
                    {formatGBP(totalSales)}
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-1">Stripe 3DS verified checkout volume</div>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
                  <div className="flex items-center justify-between text-neutral-400 text-xs uppercase font-semibold">
                    <span>UK ORDERS</span>
                    <ShoppingCart size={16} className="text-[#F15A0A]" />
                  </div>
                  <div className="font-editorial text-2xl sm:text-3xl font-extrabold text-white mt-2 tabular-nums">
                    {totalOrdersCount}
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-1">{pendingOrdersCount} active in Royal Mail fulfillment</div>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
                  <div className="flex items-center justify-between text-neutral-400 text-xs uppercase font-semibold">
                    <span>CATALOGUE PIECES</span>
                    <Package size={16} className="text-neutral-300" />
                  </div>
                  <div className="font-editorial text-2xl sm:text-3xl font-extrabold text-white mt-2 tabular-nums">
                    {totalProductsCount}
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-1">Active published SKUs</div>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
                  <div className="flex items-center justify-between text-neutral-400 text-xs uppercase font-semibold">
                    <span>ATELIER MEMBERS</span>
                    <Users size={16} className="text-neutral-300" />
                  </div>
                  <div className="font-editorial text-2xl sm:text-3xl font-extrabold text-white mt-2 tabular-nums">
                    1,420
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-1">UK registered clients</div>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="space-y-4">
                <h3 className="font-editorial text-sm font-bold uppercase tracking-wider text-neutral-300">
                  ROYAL MAIL & STRIPE ACTIVITY
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/60">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-neutral-800 text-neutral-500 uppercase tracking-wider">
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Client</th>
                        <th className="p-3">Destination</th>
                        <th className="p-3">Total (GBP)</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Carrier / Tracking</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                      {orders.slice(0, 5).map((o) => (
                        <tr key={o.id} className="hover:bg-neutral-800/40">
                          <td className="p-3 font-bold text-white">{o.orderNumber}</td>
                          <td className="p-3 text-neutral-300">{o.shippingAddress.fullName}</td>
                          <td className="p-3 text-neutral-400">{o.shippingAddress.city}, {o.shippingAddress.postcode}</td>
                          <td className="p-3 font-bold text-white tabular-nums">{formatGBP(o.totalAmount)}</td>
                          <td className="p-3">
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                              {o.status}
                            </span>
                          </td>
                          <td className="p-3 font-mono text-[11px] text-[#F15A0A]">{o.trackingNumber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-editorial text-base font-bold uppercase tracking-tight text-white">
                    UK GARMENT INVENTORY & PRICING
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Syncs in real-time with customer-facing storefront in GBP (£)
                  </p>
                </div>
                {!isAddingProduct && (
                  <button
                    onClick={() => {
                      setIsAddingProduct(true);
                      setEditingProduct(null);
                      setNewTitle('');
                      setNewSubtitle('');
                      setNewPrice(75.00);
                      setNewCategory('jackets');
                      setNewGender('unisex');
                    }}
                    className="px-4 py-2 bg-[#F15A0A] text-white hover:bg-[#d94e05] text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Plus size={14} />
                    ADD NEW GARMENT
                  </button>
                )}
              </div>

              {(isAddingProduct || editingProduct) && (
                <form onSubmit={handleSaveProduct} className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
                  <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                    <h4 className="font-editorial text-sm font-bold uppercase text-white">
                      {editingProduct ? `EDIT: ${editingProduct.title}` : 'CREATE NEW BRITISH ATELIER PIECE'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingProduct(false);
                        setEditingProduct(null);
                      }}
                      className="text-xs text-neutral-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="text-[10px] uppercase font-semibold text-neutral-400">Garment Title</label>
                      <input
                        type="text"
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. Sculptural Wool Trench"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-semibold text-neutral-400">Subtitle / Cut Note</label>
                      <input
                        type="text"
                        value={newSubtitle}
                        onChange={(e) => setNewSubtitle(e.target.value)}
                        placeholder="e.g. Architectural drape with dropped shoulder"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-semibold text-neutral-400">Price in GBP (£)</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={newPrice}
                        onChange={(e) => setNewPrice(Number(e.target.value))}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-semibold text-neutral-400">Stock Units at London Atelier</label>
                      <input
                        type="number"
                        required
                        value={newStock}
                        onChange={(e) => setNewStock(Number(e.target.value))}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-semibold text-neutral-400">Category</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as any)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white mt-1"
                      >
                        <option value="jackets">Jackets & Outerwear</option>
                        <option value="trousers">Tailored Trousers</option>
                        <option value="oversized-t-shirts">Oversized T-Shirts</option>
                        <option value="t-shirts">T-Shirts</option>
                        <option value="hoodies">Hoodies</option>
                        <option value="sweatshirts">Sweatshirts</option>
                        <option value="shirts">Shirts</option>
                        <option value="accessories">Accessories</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-semibold text-neutral-400">Gender</label>
                      <select
                        value={newGender}
                        onChange={(e) => setNewGender(e.target.value as any)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white mt-1"
                      >
                        <option value="unisex">Unisex</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <label className="flex items-center gap-2 text-xs text-neutral-300">
                      <input
                        type="checkbox"
                        checked={newIsNew}
                        onChange={(e) => setNewIsNew(e.target.checked)}
                      />
                      Mark as New Arrival
                    </label>
                    <label className="flex items-center gap-2 text-xs text-neutral-300">
                      <input
                        type="checkbox"
                        checked={newIsBestSeller}
                        onChange={(e) => setNewIsBestSeller(e.target.checked)}
                      />
                      Mark as Best Seller
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#F15A0A] text-white hover:bg-[#d94e05] text-xs font-bold uppercase rounded-xl transition-all cursor-pointer"
                  >
                    SAVE TO LIVE UK STORE ↗
                  </button>
                </form>
              )}

              {/* Table */}
              <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/60">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-500 uppercase tracking-wider">
                      <th className="p-3">Garment</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price (£)</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3">Tags</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-neutral-800/40">
                        <td className="p-3 flex items-center gap-3">
                          <img 
                            src={p.primaryImage} 
                            alt={p.title} 
                            className="w-10 h-12 object-cover rounded-lg bg-neutral-950 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-white uppercase">{p.title}</div>
                            <div className="text-[10px] text-neutral-500">{p.id} · {p.collection}</div>
                          </div>
                        </td>
                        <td className="p-3 text-neutral-300 uppercase">{p.category}</td>
                        <td className="p-3 font-bold text-white tabular-nums">{formatGBP(p.price)}</td>
                        <td className="p-3">
                          <span className={`tabular-nums ${p.stockCount < 10 ? 'text-[#F15A0A] font-bold' : 'text-neutral-300'}`}>
                            {p.stockCount} left
                          </span>
                        </td>
                        <td className="p-3 space-x-1">
                          {p.isNew && <span className="text-[9px] bg-[#F15A0A] text-white px-1.5 py-0.5 rounded font-bold uppercase">NEW</span>}
                          {p.isBestSeller && <span className="text-[9px] bg-neutral-800 text-white px-1.5 py-0.5 rounded border border-neutral-700 uppercase">BEST</span>}
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => handleTogglePublish(p)}
                            className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white"
                            title={p.isPublished ? 'Unpublish' : 'Publish'}
                          >
                            {p.isPublished ? <Eye size={14} className="text-emerald-400" /> : <EyeOff size={14} />}
                          </button>
                          <button
                            onClick={() => {
                              setEditingProduct(p);
                              setIsAddingProduct(false);
                              setNewTitle(p.title);
                              setNewSubtitle(p.subtitle);
                              setNewPrice(p.price);
                              setNewCategory(p.category);
                              setNewGender(p.gender);
                              setNewStock(p.stockCount);
                              setNewIsNew(p.isNew);
                              setNewIsBestSeller(p.isBestSeller);
                            }}
                            className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-500 hover:text-red-400"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-editorial text-base font-bold uppercase tracking-tight text-white">
                  UK ORDERS & ROYAL MAIL FULFILLMENT
                </h3>
                <p className="text-xs text-neutral-400">
                  Update dispatch milestones to notify clients and reflect on tracking pages
                </p>
              </div>

              <div className="space-y-4">
                {orders.map((o) => (
                  <div key={o.id} className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                      <div>
                        <span className="font-editorial font-bold text-sm text-white">{o.orderNumber}</span>
                        <span className="text-xs text-neutral-500 ml-2">({o.id}) · {new Date(o.createdAt).toLocaleDateString('en-GB')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-neutral-400">Update Status:</span>
                        <select
                          value={o.status}
                          onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as any)}
                          className="bg-neutral-950 border border-neutral-700 text-white rounded-lg px-2.5 py-1 text-xs uppercase font-bold focus:outline-none focus:border-[#F15A0A] cursor-pointer"
                        >
                          <option value="placed">Placed</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="packed">Packed</option>
                          <option value="shipped">Shipped</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-neutral-500 uppercase tracking-wider text-[10px]">Client & Shipping</span>
                        <p className="font-bold text-white">{o.shippingAddress.fullName}</p>
                        <p className="text-neutral-400">{o.shippingAddress.addressLine1}, {o.shippingAddress.city} - {o.shippingAddress.postcode}</p>
                        <p className="text-neutral-500">{o.shippingAddress.phone}</p>
                      </div>

                      <div>
                        <span className="text-neutral-500 uppercase tracking-wider text-[10px]">Garments</span>
                        {o.items.map((it, idx) => (
                          <div key={idx} className="text-neutral-300">
                            {it.quantity}x {it.product.title} (UK {it.selectedSize})
                          </div>
                        ))}
                      </div>

                      <div>
                        <span className="text-neutral-500 uppercase tracking-wider text-[10px]">Billing & Royal Mail</span>
                        <p className="text-white font-bold">{formatGBP(o.totalAmount)} (Stripe Paid)</p>
                        <p className="text-[#F15A0A] font-mono text-[11px]">{o.trackingNumber}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CMS STOREFRONT BANNERS */}
          {activeTab === 'cms' && (
            <form onSubmit={handleSaveCMS} className="space-y-6 max-w-2xl">
              <div>
                <h3 className="font-editorial text-base font-bold uppercase tracking-tight text-white">
                  STOREFRONT BRAND CONTENT MANAGEMENT
                </h3>
                <p className="text-xs text-neutral-400">
                  Update editorial copy, hero headlines, and campaign banners in real time
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-[10px] font-semibold uppercase text-neutral-400">Top Announcement Banner</label>
                  <textarea
                    rows={2}
                    value={cmsConfig.announcementText}
                    onChange={(e) => setCmsConfig({ ...cmsConfig, announcementText: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-white mt-1"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold uppercase text-neutral-400">Hero Season Tagline</label>
                  <input
                    type="text"
                    value={cmsConfig.heroSeasonLabel}
                    onChange={(e) => setCmsConfig({ ...cmsConfig, heroSeasonLabel: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-white mt-1"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold uppercase text-neutral-400">Hero Secondary Headline</label>
                  <input
                    type="text"
                    value={cmsConfig.heroSecondaryHeadline}
                    onChange={(e) => setCmsConfig({ ...cmsConfig, heroSecondaryHeadline: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-white mt-1"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold uppercase text-neutral-400">Hero Editorial Banner Subtext</label>
                  <input
                    type="text"
                    value={cmsConfig.editorialBannerText}
                    onChange={(e) => setCmsConfig({ ...cmsConfig, editorialBannerText: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-white mt-1"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#F15A0A] text-white hover:bg-[#d94e05] text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Save size={14} />
                    PUBLISH CHANGES TO STOREFRONT
                  </button>
                  {savedNotice && (
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle size={14} /> Saved & published to live site!
                    </span>
                  )}
                </div>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};

export default AdminDashboardModal;
