import React from 'react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useShop();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-stl-card border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-2xl font-black italic">YOUR <span className="text-stl-blue">STASH</span></h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <p className="text-xl font-bold mb-2">Your stash is empty.</p>
                  <p>Go add some heat.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-black/20 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-stl-orange font-mono text-sm mb-3">₦{item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-3 bg-black/30 inline-flex rounded-lg p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-mono text-sm w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-white/10 bg-stl-dark">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400 font-bold uppercase tracking-wider">Total</span>
                <span className="text-2xl font-mono text-white">₦{cartTotal.toLocaleString()}</span>
              </div>
              <button 
                disabled={cart.length === 0}
                className="w-full bg-white text-stl-dark font-black uppercase tracking-widest py-4 rounded-xl hover:bg-stl-blue hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
