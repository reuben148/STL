import React from 'react';
import { useShop } from '../context/ShopContext';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

const Shop = () => {
  const { products, addToCart } = useShop();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12">
        <h1 className="text-4xl font-black italic mb-6 md:mb-0">SHOP <span className="text-stl-blue">ALL</span></h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length === 0 ? (
          <div className="col-span-full text-center py-24">
            <h2 className="text-2xl font-bold text-gray-500">No drops yet.</h2>
            <p className="text-gray-600">Check back soon for the latest heat.</p>
          </div>
        ) : (
          products.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-stl-card rounded-2xl overflow-hidden border border-white/5 hover:border-stl-blue/50 transition-colors"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-white text-stl-dark px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all hover:bg-stl-blue hover:text-white"
                  >
                    <ShoppingCart className="w-5 h-5" /> Add to Cart
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-lg font-mono text-stl-orange">₦{product.price.toLocaleString()}</p>
                </div>
                <p className="text-gray-400 text-sm mb-4">{product.description}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Shop;
