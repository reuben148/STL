import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-stl-dark">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -left-1/2 w-[100vw] h-[100vw] bg-stl-blue/20 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              rotate: [0, -90, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -right-1/2 w-[100vw] h-[100vw] bg-stl-orange/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-9xl font-black italic tracking-tighter mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-stl-blue to-white">STYLE</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-stl-orange">TRILLIONS</span>
          </motion.h1>

          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Curated combos for the bold. Style is the new black.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 bg-white text-stl-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-stl-blue hover:text-white transition-all transform hover:scale-105 shadow-lg shadow-stl-blue/25"
            >
              Shop the Drop <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
