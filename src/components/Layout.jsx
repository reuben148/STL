import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, PlusCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
  const { cartCount, setIsCartOpen } = useShop();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-stl-dark text-white font-sans selection:bg-stl-orange selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-stl-dark/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-black tracking-tighter italic">
            <span className="text-stl-blue">STL</span>
            <span className="text-white">.</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-bold uppercase tracking-widest hover:text-stl-blue transition-colors ${location.pathname === '/' ? 'text-stl-blue' : 'text-gray-400'}`}>
              Shop
            </Link>
            <Link to="/admin" className={`text-sm font-bold uppercase tracking-widest hover:text-stl-orange transition-colors ${location.pathname === '/admin' || location.pathname === '/login' ? 'text-stl-orange' : 'text-gray-400'}`}>
              Admin
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-white/5 rounded-full transition-colors group"
            >
              <ShoppingBag className="w-6 h-6 text-white group-hover:text-stl-blue transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-stl-orange text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 left-0 w-full bg-stl-dark border-b border-white/10 z-40"
          >
            <nav className="flex flex-col p-4 gap-4">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Shop</Link>
              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Admin</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black italic mb-4 text-white/20">STYLE WITH TRILLIONS</h2>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} STL. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
