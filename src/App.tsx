import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search, User, ArrowRight, Instagram, Twitter, Facebook, Star, ChevronRight, ChevronLeft, Trash2, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem } from './types';

// --- Components ---

const Navbar = ({ cartCount, onOpenCart, onNavigate }: { cartCount: number; onOpenCart: () => void; onNavigate: (page: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden">
            <Menu size={24} />
          </button>
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium tracking-widest uppercase">
            <button onClick={() => onNavigate('shop')} className="hover:text-brand-accent transition-colors">Shop</button>
            <button onClick={() => onNavigate('lookbook')} className="hover:text-brand-accent transition-colors">Lookbook</button>
            <button onClick={() => onNavigate('about')} className="hover:text-brand-accent transition-colors">Story</button>
          </div>
        </div>

        <button onClick={() => onNavigate('home')} className="text-2xl font-bold tracking-tighter font-display">
          VANTAGE<span className="text-brand-accent">.</span>
        </button>

        <div className="flex items-center gap-5">
          <button className="hidden sm:block hover:text-brand-accent transition-colors"><Search size={20} /></button>
          <button className="hidden sm:block hover:text-brand-accent transition-colors"><User size={20} /></button>
          <button onClick={onOpenCart} className="relative group">
            <ShoppingBag size={20} className="group-hover:text-brand-accent transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[80%] max-w-sm bg-white z-50 p-8 lg:hidden"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-bold font-display tracking-tighter">VANTAGE.</span>
                <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
              </div>
              <div className="flex flex-col gap-8 text-2xl font-bold font-display">
                <button onClick={() => { onNavigate('shop'); setIsMenuOpen(false); }} className="text-left">SHOP</button>
                <button onClick={() => { onNavigate('lookbook'); setIsMenuOpen(false); }} className="text-left">LOOKBOOK</button>
                <button onClick={() => { onNavigate('about'); setIsMenuOpen(false); }} className="text-left">STORY</button>
                <button onClick={() => { onNavigate('contact'); setIsMenuOpen(false); }} className="text-left">CONTACT</button>
              </div>
              <div className="absolute bottom-12 left-8 right-8">
                <div className="flex gap-6 mb-8">
                  <Instagram size={20} />
                  <Twitter size={20} />
                  <Facebook size={20} />
                </div>
                <p className="text-xs text-gray-400">© 2026 VANTAGE APPAREL</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ProductCard = ({ product, onAddToCart, onClick }: { product: Product; onAddToCart: (p: Product) => void; onClick: (p: Product) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {product.isNewArrival && (
          <span className="absolute top-4 left-4 bg-white text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest">New Drop</span>
        )}
        {product.isBestSeller && (
          <span className="absolute top-4 left-4 bg-brand-accent text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">Best Seller</span>
        )}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Quick Add Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
          className="absolute bottom-4 left-4 right-4 bg-white text-black py-3 text-xs font-bold uppercase tracking-widest translate-y-12 group-hover:translate-y-0 transition-transform duration-300 hover:bg-brand-accent hover:text-white"
        >
          Quick Add
        </button>
        
        {/* Click to view detail */}
        <div 
          onClick={() => onClick(product)}
          className="absolute inset-0 cursor-pointer"
        />
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium uppercase tracking-wider mb-1 group-hover:text-brand-accent transition-colors cursor-pointer" onClick={() => onClick(product)}>
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 uppercase tracking-widest">{product.category}</p>
        </div>
        <p className="text-sm font-bold font-display">${product.price}</p>
      </div>
    </motion.div>
  );
};

const CartDrawer = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }: { isOpen: boolean; onClose: () => void; items: CartItem[]; onUpdateQuantity: (id: string, size: string, color: string, delta: number) => void; onRemove: (id: string, size: string, color: string) => void; onCheckout: () => void }) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] flex flex-col shadow-2xl"
          >
            <div className="p-6 flex items-center justify-between border-b">
              <h2 className="text-xl font-bold font-display uppercase tracking-widest">Your Bag ({items.length})</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag size={48} className="text-gray-200" />
                  <p className="text-gray-500 uppercase tracking-widest text-sm">Your bag is empty</p>
                  <button onClick={onClose} className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors">
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                    <div className="w-24 aspect-[3/4] bg-gray-100 overflow-hidden">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-xs font-bold uppercase tracking-wider">{item.name}</h3>
                          <button onClick={() => onRemove(item.id, item.selectedSize, item.selectedColor)} className="text-gray-400 hover:text-red-500">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                          {item.selectedSize} / {item.selectedColor}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border border-gray-200">
                          <button onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor, -1)} className="p-1 hover:bg-gray-100"><Minus size={12} /></button>
                          <span className="px-3 text-xs font-medium">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor, 1)} className="p-1 hover:bg-gray-100"><Plus size={12} /></button>
                        </div>
                        <p className="text-sm font-bold font-display">${item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t bg-gray-50 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 uppercase tracking-widest">Subtotal</span>
                  <span className="text-xl font-bold font-display">${subtotal}</span>
                </div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center">Shipping & taxes calculated at checkout</p>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center justify-center gap-2 group"
                >
                  Proceed to Checkout
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Pages ---

const HomePage = ({ onNavigate, onAddToCart, onProductClick }: { onNavigate: (p: string) => void; onAddToCart: (p: Product) => void; onProductClick: (p: Product) => void }) => {
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1920"
            alt="Hero"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="uppercase tracking-[0.5em] text-xs font-bold mb-6"
          >
            Spring / Summer '26 Drop
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter leading-none mb-8"
          >
            DEFINING <br /> <span className="text-brand-accent italic">VANTAGE.</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={() => onNavigate('shop')}
              className="bg-white text-black px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-all duration-300 flex items-center gap-3 mx-auto group"
            >
              Shop the Collection
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-px h-12 bg-white/20 relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white" />
          </div>
        </motion.div>
      </section>

      {/* Featured Collections */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-md">
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-tighter mb-4">Curated Drops</h2>
            <p className="text-gray-500 text-sm leading-relaxed">Explore our latest categories designed for the modern aesthetic. Minimal pieces with maximum impact.</p>
          </div>
          <button onClick={() => onNavigate('shop')} className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-brand-accent hover:border-brand-accent transition-all">View All Products</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Essentials', img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800', count: '12 Items' },
            { name: 'Streetwear', img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800', count: '08 Items' },
            { name: 'Accessories', img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800', count: '05 Items' }
          ].map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group cursor-pointer overflow-hidden aspect-[4/5]"
              onClick={() => onNavigate('shop')}
            >
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2 text-white/70">{cat.count}</p>
                <h3 className="text-2xl font-display font-bold uppercase tracking-widest">{cat.name}</h3>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                  Explore <ChevronRight size={12} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-brand-light py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-tighter mb-4">Best Sellers</h2>
            <p className="text-gray-500 text-sm uppercase tracking-widest">The pieces everyone is talking about</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onClick={onProductClick} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Identity / Story */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="aspect-[4/5] bg-gray-100 overflow-hidden relative z-10"
          >
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800" alt="Brand" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
          <div className="absolute -bottom-8 -right-8 w-2/3 aspect-square border-4 border-brand-accent -z-0 hidden md:block" />
        </div>
        <div className="space-y-8">
          <h2 className="text-5xl md:text-6xl font-display uppercase tracking-tighter leading-none">More than just <br /> <span className="text-brand-accent">clothing.</span></h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            VANTAGE was born from a desire to bridge the gap between high-fashion silhouettes and everyday streetwear comfort. We believe in quality over quantity, creating timeless pieces that define your personal aesthetic.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-4">
            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Premium Quality</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Sourced from the finest mills, our fabrics are chosen for durability and feel.</p>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Ethical Craft</h4>
              <p className="text-xs text-gray-500 leading-relaxed">We partner with ethical manufacturers who share our vision for a better future.</p>
            </div>
          </div>
          <button onClick={() => onNavigate('about')} className="bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-all">Our Story</button>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-black text-white py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <h2 className="text-4xl font-display uppercase tracking-widest">Community Love</h2>
            <div className="flex items-center gap-2">
              <div className="flex text-brand-accent">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <span className="text-sm font-bold tracking-widest">4.9/5 RATING</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Alex M.', text: 'The quality of the oversized tee is insane. Best fit I\'ve found in years.', role: 'Verified Buyer' },
              { name: 'Sarah K.', text: 'Shipping was super fast and the packaging felt so premium. 10/10.', role: 'Verified Buyer' },
              { name: 'Jordan T.', text: 'Vantage cargo pants are literally my daily driver now. So functional.', role: 'Verified Buyer' }
            ].map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 p-8 border border-white/10 hover:border-brand-accent transition-colors"
              >
                <p className="text-lg italic mb-6 text-white/80">"{review.text}"</p>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm">{review.name}</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency / Limited Drop */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-brand-accent p-12 md:p-24 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <h1 className="text-[20rem] font-display font-bold leading-none -mr-24 -mt-24">DROP</h1>
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter mb-6">Limited Drop: <br /> Summer '26</h2>
            <p className="text-white/80 text-lg mb-10 leading-relaxed">Our most anticipated collection is almost here. Once it's gone, it's gone for good. Don't miss out on the exclusive pieces.</p>
            <div className="flex flex-wrap gap-8 mb-12">
              {[
                { label: 'Days', val: '02' },
                { label: 'Hours', val: '14' },
                { label: 'Mins', val: '38' },
                { label: 'Secs', val: '55' }
              ].map(item => (
                <div key={item.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-display font-bold mb-1">{item.val}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">{item.label}</div>
                </div>
              ))}
            </div>
            <button onClick={() => onNavigate('shop')} className="bg-white text-brand-accent px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">Get Early Access</button>
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-display uppercase tracking-widest mb-4">Join the Inner Circle</h2>
        <p className="text-gray-500 text-sm mb-8 uppercase tracking-widest">Get 10% off your first order & early access to new drops.</p>
        <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            className="flex-1 bg-gray-100 border-none px-6 py-4 text-xs font-bold tracking-widest focus:ring-2 focus:ring-brand-accent outline-none"
          />
          <button className="bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-all">Subscribe</button>
        </form>
        <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-widest">By subscribing, you agree to our Privacy Policy.</p>
      </section>
    </div>
  );
};

const ShopPage = ({ onAddToCart, onProductClick }: { onAddToCart: (p: Product) => void; onProductClick: (p: Product) => void }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  const filteredProducts = PRODUCTS.filter(p => activeCategory === 'All' || p.category === activeCategory);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
        <div>
          <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tighter mb-4">The Shop</h1>
          <p className="text-gray-500 uppercase tracking-[0.2em] text-xs font-bold">Showing {filteredProducts.length} results</p>
        </div>
        
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex bg-gray-100 p-1 rounded-sm">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-black'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-gray-200 px-4 py-2 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-brand-accent"
          >
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onClick={onProductClick} />
        ))}
      </div>
    </div>
  );
};

const ProductDetailPage = ({ product, onAddToCart, onNavigate }: { product: Product; onAddToCart: (p: Product, size: string, color: string) => void; onNavigate: (p: string) => void }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-gray-100 overflow-hidden relative group">
            <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`aspect-square bg-gray-100 overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-brand-accent' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-10">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">{product.category}</span>
              {product.isBestSeller && <span className="text-[10px] font-bold uppercase tracking-widest bg-black text-white px-2 py-1">Best Seller</span>}
            </div>
            <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tighter mb-4">{product.name}</h1>
            <p className="text-2xl font-display font-bold">${product.price}</p>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="space-y-6">
            {/* Color Selection */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4">Color: <span className="text-gray-400">{selectedColor}</span></h4>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color.name ? 'border-brand-accent scale-110' : 'border-transparent hover:scale-105'}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest">Size: <span className="text-gray-400">{selectedSize}</span></h4>
                <button className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-0.5 hover:text-brand-accent hover:border-brand-accent transition-colors">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[50px] h-12 flex items-center justify-center border text-xs font-bold transition-all ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => onAddToCart(product, selectedSize, selectedColor)}
              className="w-full bg-black text-white py-5 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center justify-center gap-3 group"
            >
              Add to Bag
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-sm">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm"><Star size={14} className="text-brand-accent" /></div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Secure Checkout</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-sm">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm"><ArrowRight size={14} className="text-brand-accent" /></div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Easy Returns</span>
              </div>
            </div>
          </div>

          {/* Expandable Sections */}
          <div className="border-t border-gray-100 pt-6 space-y-4">
            {['Materials & Care', 'Shipping & Delivery', 'Sustainability'].map(section => (
              <details key={section} className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none py-2">
                  <span className="text-xs font-bold uppercase tracking-widest">{section}</span>
                  <Plus size={16} className="group-open:rotate-45 transition-transform" />
                </summary>
                <p className="text-xs text-gray-500 leading-relaxed py-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-32">
        <h2 className="text-3xl font-display uppercase tracking-widest mb-12">You May Also Like</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map(p => (
            <ProductCard key={p.id} product={p} onAddToCart={(prod) => onAddToCart(prod, prod.sizes[0], prod.colors[0].name)} onClick={(prod) => onNavigate(`product-${prod.id}`)} />
          ))}
        </div>
      </section>
    </div>
  );
};

const Footer = ({ onNavigate }: { onNavigate: (p: string) => void }) => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-display tracking-tighter">VANTAGE<span className="text-brand-accent">.</span></h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">Defining the modern aesthetic through premium apparel and timeless silhouettes. Quality over everything.</p>
            <div className="flex gap-4">
              <Instagram size={20} className="hover:text-brand-accent cursor-pointer transition-colors" />
              <Twitter size={20} className="hover:text-brand-accent cursor-pointer transition-colors" />
              <Facebook size={20} className="hover:text-brand-accent cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-gray-400">Shop</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
              <li><button onClick={() => onNavigate('shop')} className="hover:text-brand-accent transition-colors">All Products</button></li>
              <li><button onClick={() => onNavigate('shop')} className="hover:text-brand-accent transition-colors">Best Sellers</button></li>
              <li><button onClick={() => onNavigate('shop')} className="hover:text-brand-accent transition-colors">New Arrivals</button></li>
              <li><button onClick={() => onNavigate('shop')} className="hover:text-brand-accent transition-colors">Essentials</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-gray-400">Support</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
              <li><button className="hover:text-brand-accent transition-colors">Shipping Policy</button></li>
              <li><button className="hover:text-brand-accent transition-colors">Returns & Exchanges</button></li>
              <li><button className="hover:text-brand-accent transition-colors">Size Guide</button></li>
              <li><button className="hover:text-brand-accent transition-colors">Contact Us</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-gray-400">Newsletter</h4>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">Join our list for early drop access and exclusive offers.</p>
            <div className="flex border-b border-black pb-2">
              <input type="email" placeholder="EMAIL ADDRESS" className="flex-1 bg-transparent text-[10px] font-bold tracking-widest outline-none" />
              <button className="hover:text-brand-accent transition-colors"><ArrowRight size={16} /></button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-gray-100 gap-6">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">© 2026 VANTAGE APPAREL. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            <button className="hover:text-black transition-colors">Privacy Policy</button>
            <button className="hover:text-black transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const addToCart = (product: Product, size?: string, color?: string) => {
    const selectedSize = size || product.sizes[0];
    const selectedColor = color || product.colors[0].name;

    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, selectedSize, selectedColor, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, size: string, color: string, delta: number) => {
    setCartItems(prev => prev.map(item => 
      (item.id === id && item.selectedSize === size && item.selectedColor === color)
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeFromCart = (id: string, size: string, color: string) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === size && item.selectedColor === color)));
  };

  const handleNavigate = (page: string) => {
    if (page.startsWith('product-')) {
      const id = page.split('-')[1];
      const product = PRODUCTS.find(p => p.id === id);
      if (product) {
        setSelectedProduct(product);
        setCurrentPage('product-detail');
      }
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar cartCount={cartItems.length} onOpenCart={() => setIsCartOpen(true)} onNavigate={handleNavigate} />
      
      <main>
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} onAddToCart={(p) => addToCart(p)} onProductClick={(p) => handleNavigate(`product-${p.id}`)} />}
        {currentPage === 'shop' && <ShopPage onAddToCart={(p) => addToCart(p)} onProductClick={(p) => handleNavigate(`product-${p.id}`)} />}
        {currentPage === 'product-detail' && selectedProduct && (
          <ProductDetailPage product={selectedProduct} onAddToCart={addToCart} onNavigate={handleNavigate} />
        )}
        {(currentPage === 'about' || currentPage === 'lookbook' || currentPage === 'contact') && (
          <div className="pt-48 pb-48 text-center max-w-2xl mx-auto px-6">
            <h1 className="text-6xl font-display uppercase tracking-tighter mb-8">{currentPage}</h1>
            <p className="text-gray-500 leading-relaxed uppercase tracking-widest text-sm">This section is currently being curated for the next drop. Stay tuned for the full experience.</p>
            <button onClick={() => handleNavigate('shop')} className="mt-12 bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-all">Back to Shop</button>
          </div>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => alert('Checkout flow would start here!')}
      />

      {/* Exit Intent / Newsletter Popup (Simulated) */}
      <AnimatePresence>
        {/* You could add a state to trigger this after some time or on exit intent */}
      </AnimatePresence>
    </div>
  );
}
