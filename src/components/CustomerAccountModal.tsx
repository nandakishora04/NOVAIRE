import React, { useState } from 'react';
import { X, Package, Heart, MapPin, Settings, LogOut, ShieldCheck, ArrowRight, Download, Trash } from 'lucide-react';
import { UserProfile, Order, Product } from '../types';
import { storeService } from '../services/storeService';
import { BrandLogo } from './BrandLogo';

interface CustomerAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  orders: Order[];
  wishlistProducts: Product[];
  onTrackOrder: (order: Order) => void;
  onSelectProduct: (product: Product) => void;
  onUserUpdate: (user: UserProfile) => void;
  onOpenAdmin: () => void;
}

export const CustomerAccountModal: React.FC<CustomerAccountModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  orders,
  wishlistProducts,
  onTrackOrder,
  onSelectProduct,
  onUserUpdate,
  onOpenAdmin
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'profile' | 'gdpr'>('orders');
  const [isAuthMode, setIsAuthMode] = useState(!currentUser.name);
  const [authView, setAuthView] = useState<'login' | 'register' | 'forgot'>('login');
  
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authMessage, setAuthMessage] = useState<string | null>(null);

  // Address edit state
  const [newLine1, setNewLine1] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newCounty, setNewCounty] = useState('');
  const [newPostcode, setNewPostcode] = useState('');
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [gdprMessage, setGdprMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = storeService.getUser();
    updated.email = authEmail || 'client@novaire.studio';
    updated.name = authEmail.split('@')[0].toUpperCase() || 'CLIENT';
    storeService.saveUser(updated);
    onUserUpdate(updated);
    setIsAuthMode(false);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = storeService.getUser();
    updated.name = authName;
    updated.email = authEmail;
    updated.phone = authPhone;
    storeService.saveUser(updated);
    onUserUpdate(updated);
    setIsAuthMode(false);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMessage(`Password recovery link dispatched to ${authEmail}`);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLine1 || !newCity || !newPostcode) return;
    const user = { ...currentUser };
    user.savedAddresses.push({
      fullName: user.name,
      phone: user.phone,
      email: user.email,
      addressLine1: newLine1,
      city: newCity,
      county: newCounty || 'Greater London',
      postcode: newPostcode.toUpperCase(),
      country: 'United Kingdom'
    });
    storeService.saveUser(user);
    onUserUpdate(user);
    setShowAddAddress(false);
    setNewLine1('');
    setNewCity('');
    setNewPostcode('');
  };

  const handleToggleAdminRole = () => {
    const newRole = currentUser.role === 'admin' ? 'customer' : 'admin';
    const updated = storeService.switchUserRole(newRole);
    onUserUpdate(updated);
  };

  const formatGBP = (val: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-55 overflow-y-auto bg-black/90 backdrop-blur-md select-none flex items-center justify-center p-3 sm:p-6">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        className="relative w-full max-w-4xl bg-[#111111] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl text-white my-auto z-10 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#F15A0A]" />
            <span className="font-editorial text-sm sm:text-base font-bold tracking-tight uppercase">
              CLIENT PORTAL · NOVAIRE PRIVÉ UK
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* AUTHENTICATION VIEW */}
        {isAuthMode ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full space-y-6">
            <div className="text-center space-y-2">
              <BrandLogo size="md" variant="light" className="mx-auto" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#F15A0A] block pt-2">
                LONDON ATELIER ACCESS
              </span>
              <h2 className="font-editorial text-2xl font-bold uppercase text-white">
                {authView === 'login' ? 'SIGN IN TO NOVAIRE' : authView === 'register' ? 'JOIN NOVAIRE PRIVÉ' : 'RECOVER ACCESS'}
              </h2>
            </div>

            {authView === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Email Address</label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="client@london-atelier.co.uk"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F15A0A] mt-1"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Password</label>
                  <input
                    type="password"
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F15A0A] mt-1"
                  />
                </div>

                <div className="flex justify-between items-center text-xs">
                  <button
                    type="button"
                    onClick={() => setAuthView('forgot')}
                    className="text-neutral-400 hover:text-[#F15A0A] underline text-[11px]"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#F15A0A] text-white hover:bg-[#d94e05] font-editorial text-xs font-bold tracking-[0.2em] uppercase rounded-xl transition-all cursor-pointer shadow-lg"
                >
                  SIGN IN TO ACCOUNT ↗
                </button>

                <div className="pt-4 text-center border-t border-neutral-900">
                  <span className="text-xs text-neutral-500">Don't have an account? </span>
                  <button
                    type="button"
                    onClick={() => setAuthView('register')}
                    className="text-xs font-bold text-white hover:underline uppercase"
                  >
                    Register
                  </button>
                </div>
              </form>
            )}

            {authView === 'register' && (
              <form onSubmit={handleRegister} className="space-y-3.5">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Full Name</label>
                  <input
                    type="text"
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="e.g. Oliver Sterling"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F15A0A] mt-1"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Email Address</label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="name@domain.co.uk"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F15A0A] mt-1"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">UK Mobile Number (+44)</label>
                  <input
                    type="tel"
                    required
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    placeholder="+44 7911 123456"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F15A0A] mt-1"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#F15A0A] text-white hover:bg-[#d94e05] font-editorial text-xs font-bold tracking-[0.2em] uppercase rounded-xl transition-all cursor-pointer shadow-lg mt-2"
                >
                  CREATE UK ATELIER PROFILE ↗
                </button>
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setAuthView('login')}
                    className="text-xs text-neutral-400 hover:text-white underline"
                  >
                    Back to login
                  </button>
                </div>
              </form>
            )}

            {authView === 'forgot' && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Enter your registered UK email</label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="client@london-atelier.co.uk"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F15A0A] mt-1"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#F15A0A] text-white font-editorial text-xs font-bold tracking-wider uppercase rounded-xl"
                >
                  SEND RESET INSTRUCTIONS
                </button>
                {authMessage && (
                  <p className="text-xs text-emerald-400">{authMessage}</p>
                )}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setAuthView('login')}
                    className="text-xs text-neutral-400 hover:text-white underline"
                  >
                    Return to sign in
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* LOGGED IN CUSTOMER DASHBOARD */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Tabs */}
            <div className="w-full md:w-64 bg-neutral-900/50 border-r border-neutral-800 p-6 flex flex-col justify-between shrink-0">
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] tracking-widest text-[#F15A0A] uppercase font-bold">CLIENT</span>
                  <h3 className="font-editorial text-base font-bold uppercase text-white truncate">
                    {currentUser.name}
                  </h3>
                  <p className="text-xs text-neutral-400 truncate">{currentUser.email}</p>
                </div>

                <div className="space-y-1 text-xs font-bold tracking-wider uppercase">
                  {[
                    { id: 'orders', label: 'MY ORDERS', icon: <Package size={15} />, badge: orders.length },
                    { id: 'wishlist', label: 'WISHLIST', icon: <Heart size={15} />, badge: wishlistProducts.length },
                    { id: 'addresses', label: 'UK ADDRESSES', icon: <MapPin size={15} /> },
                    { id: 'profile', label: 'ACCOUNT PROFILE', icon: <Settings size={15} /> },
                    { id: 'gdpr', label: 'UK GDPR & PRIVACY', icon: <ShieldCheck size={15} /> },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                        activeTab === tab.id
                          ? 'bg-[#F15A0A] text-white shadow-md'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        {tab.icon}
                        {tab.label}
                      </span>
                      {tab.badge !== undefined && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-black text-white' : 'bg-neutral-800 text-neutral-400'}`}>
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom controls */}
              <div className="pt-6 border-t border-neutral-800 space-y-2">
                <button
                  onClick={handleToggleAdminRole}
                  className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck size={13} />
                  Role: {currentUser.role.toUpperCase()} (Toggle)
                </button>

                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAdmin();
                    }}
                    className="w-full py-2 bg-[#F15A0A] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#d94e05] transition-colors"
                  >
                    Open Admin Control →
                  </button>
                )}

                <button
                  onClick={() => setIsAuthMode(true)}
                  className="w-full py-2 text-neutral-500 hover:text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  <LogOut size={13} />
                  Sign Out
                </button>
              </div>

            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
              
              {/* ORDERS TAB */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-editorial text-base font-bold uppercase tracking-tight text-white">
                      PURCHASE HISTORY ({orders.length})
                    </h3>
                  </div>

                  {orders.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500 text-xs">
                      No UK orders placed yet.
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                          <div>
                            <span className="font-editorial font-bold text-sm text-white">
                              {order.orderNumber}
                            </span>
                            <span className="text-neutral-500 text-xs ml-3">
                              {new Date(order.createdAt).toLocaleDateString('en-GB')}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F15A0A]/20 text-[#F15A0A] border border-[#F15A0A]/40">
                              {order.status.replace('_', ' ').toUpperCase()}
                            </span>
                            <button
                              onClick={() => {
                                onClose();
                                onTrackOrder(order);
                              }}
                              className="text-xs font-bold uppercase text-white hover:text-[#F15A0A] flex items-center gap-1 cursor-pointer"
                            >
                              Track Royal Mail <ArrowRight size={12} />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="flex justify-between items-center text-xs">
                              <span className="text-neutral-300">
                                {it.quantity}x {it.product.title} (UK {it.selectedSize})
                              </span>
                              <span className="font-bold text-white tabular-nums">
                                {formatGBP(it.product.price * it.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-neutral-800/80 text-xs">
                          <span className="text-neutral-400">Total Billed (Inc. 20% VAT):</span>
                          <span className="font-editorial font-bold text-sm text-white tabular-nums">
                            {formatGBP(order.totalAmount)}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* WISHLIST TAB */}
              {activeTab === 'wishlist' && (
                <div className="space-y-4">
                  <h3 className="font-editorial text-base font-bold uppercase tracking-tight text-white">
                    SAVED GARMENTS ({wishlistProducts.length})
                  </h3>

                  {wishlistProducts.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500 text-xs">
                      No saved pieces in your wishlist yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {wishlistProducts.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            onClose();
                            onSelectProduct(p);
                          }}
                          className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-[#F15A0A] transition-all cursor-pointer flex gap-3 items-center group"
                        >
                          <img 
                            src={p.primaryImage} 
                            alt={p.title} 
                            className="w-16 h-20 object-cover rounded-xl bg-neutral-950 shrink-0"
                          />
                          <div className="overflow-hidden space-y-1">
                            <span className="text-[10px] text-[#F15A0A] uppercase tracking-widest">{p.collection}</span>
                            <h4 className="text-xs font-bold uppercase text-white truncate group-hover:text-[#F15A0A]">
                              {p.title}
                            </h4>
                            <p className="font-editorial font-bold text-xs text-white tabular-nums">
                              {formatGBP(p.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SAVED ADDRESSES TAB */}
              {activeTab === 'addresses' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-editorial text-base font-bold uppercase tracking-tight text-white">
                      UK DELIVERY DESTINATIONS
                    </h3>
                    <button
                      onClick={() => setShowAddAddress(!showAddAddress)}
                      className="text-xs font-bold uppercase text-[#F15A0A] hover:underline cursor-pointer"
                    >
                      {showAddAddress ? 'Cancel' : '+ Add UK Address'}
                    </button>
                  </div>

                  {showAddAddress && (
                    <form onSubmit={handleAddAddress} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
                      <input
                        type="text"
                        placeholder="Address Line 1"
                        required
                        value={newLine1}
                        onChange={(e) => setNewLine1(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder="City / Town"
                          required
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="County"
                          value={newCounty}
                          onChange={(e) => setNewCounty(e.target.value)}
                          className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="UK Postcode (e.g. EC1A 1BB)"
                          required
                          value={newPostcode}
                          onChange={(e) => setNewPostcode(e.target.value.toUpperCase())}
                          className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white uppercase"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#F15A0A] text-white text-xs font-bold uppercase rounded-lg"
                      >
                        SAVE ADDRESS
                      </button>
                    </form>
                  )}

                  <div className="space-y-3">
                    {currentUser.savedAddresses.map((addr, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs space-y-1">
                        <div className="flex justify-between items-center font-bold text-white">
                          <span>{addr.fullName}</span>
                          <span className="text-[10px] text-[#F15A0A] uppercase">DEFAULT UK</span>
                        </div>
                        <p className="text-neutral-400">{addr.addressLine1}</p>
                        <p className="text-neutral-400">{addr.city}, {addr.county} - {addr.postcode}</p>
                        <p className="text-neutral-500">{addr.phone}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PROFILE TAB */}
              {activeTab === 'profile' && (
                <div className="space-y-4 max-w-md">
                  <h3 className="font-editorial text-base font-bold uppercase tracking-tight text-white">
                    CLIENT PROFILE
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-neutral-500 uppercase tracking-wider text-[10px]">Client Name</label>
                      <input
                        type="text"
                        defaultValue={currentUser.name}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white mt-1"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-neutral-500 uppercase tracking-wider text-[10px]">Email Address</label>
                      <input
                        type="text"
                        defaultValue={currentUser.email}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white mt-1"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-neutral-500 uppercase tracking-wider text-[10px]">UK Phone (+44)</label>
                      <input
                        type="text"
                        defaultValue={currentUser.phone}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white mt-1"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UK GDPR & PRIVACY TAB */}
              {activeTab === 'gdpr' && (
                <div className="space-y-4 max-w-lg">
                  <h3 className="font-editorial text-base font-bold uppercase tracking-tight text-white">
                    UK GDPR DATA RIGHTS CONCIERGE
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Under the Data Protection Act 2018 and UK GDPR, you have the right to export your purchase and identity records or request account erasure.
                  </p>

                  <div className="pt-2 space-y-3">
                    <button
                      onClick={() => {
                        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentUser, null, 2));
                        const downloadAnchor = document.createElement('a');
                        downloadAnchor.setAttribute("href", dataStr);
                        downloadAnchor.setAttribute("download", `novaire_gdpr_export_${currentUser.name}.json`);
                        document.body.appendChild(downloadAnchor);
                        downloadAnchor.click();
                        downloadAnchor.remove();
                        setGdprMessage('Your complete UK GDPR data archive has been generated and downloaded.');
                      }}
                      className="w-full p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#F15A0A] flex items-center justify-between text-xs text-white font-bold uppercase transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Download size={14} className="text-[#F15A0A]" />
                        EXPORT MY PERSONAL DATA ARCHIVE (.JSON)
                      </span>
                      <span>⬇</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm('Are you sure you wish to submit an erasure request under UK GDPR Article 17 (Right to be Forgotten)?')) {
                          setGdprMessage('Erasure request registered. Our Data Protection Officer will process your file within 30 days.');
                        }
                      }}
                      className="w-full p-3.5 rounded-xl bg-neutral-900 border border-red-900/60 hover:border-red-500 flex items-center justify-between text-xs text-red-400 font-bold uppercase transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Trash size={14} />
                        REQUEST ACCOUNT DELETION (RIGHT TO BE FORGOTTEN)
                      </span>
                      <span>→</span>
                    </button>

                    {gdprMessage && (
                      <p className="text-xs text-emerald-400 font-semibold p-3 bg-neutral-900 rounded-xl border border-neutral-800">
                        ✓ {gdprMessage}
                      </p>
                    )}
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default CustomerAccountModal;
