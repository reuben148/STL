import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useShop();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/admin');
    } else {
      setError('Invalid credentials. Try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 flex justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-stl-card p-8 rounded-3xl border border-white/10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-stl-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 text-stl-blue">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black italic">ADMIN <span className="text-stl-blue">ACCESS</span></h1>
          <p className="text-gray-400 mt-2">Enter your credentials to manage the drop.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm font-bold text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-stl-blue transition-colors"
              placeholder="stl123@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-stl-blue transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-white text-stl-dark font-black uppercase tracking-widest py-4 rounded-xl hover:bg-stl-blue hover:text-white transition-all flex items-center justify-center gap-2"
          >
            Enter <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
