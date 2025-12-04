import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { motion } from 'framer-motion';
import { Upload, Check } from 'lucide-react';

const Admin = () => {
  const { addProduct } = useShop();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: ''
  });
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({
      ...formData,
      price: Number(formData.price),
      colors: [] // Deprecated but keeping structure for now
    });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setFormData({ name: '', price: '', image: '', description: '' });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-black italic mb-8 text-center">ADMIN <span className="text-stl-orange">UPLOAD</span></h1>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-stl-card p-8 rounded-3xl border border-white/10 space-y-6"
      >
        <div>
          <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">Combo Name</label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-stl-blue transition-colors"
            placeholder="e.g. Neon Pulse"
          />
        </div>

        <div>
          <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">Price (₦)</label>
          <input 
            type="number" 
            required
            value={formData.price}
            onChange={e => setFormData({...formData, price: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-stl-blue transition-colors"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">Image</label>
          <div className="flex flex-col gap-4">
            <input 
              type="file" 
              accept="image/*"
              required={!formData.image}
              onChange={handleImageChange}
              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-stl-blue transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-stl-blue file:text-white hover:file:bg-blue-600"
            />
            {formData.image && (
              <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/10">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">Description</label>
          <textarea 
            required
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-stl-blue transition-colors h-32 resize-none"
            placeholder="Describe the vibe..."
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-white text-stl-dark font-black uppercase tracking-widest py-4 rounded-xl hover:bg-stl-blue hover:text-white transition-all flex items-center justify-center gap-2"
        >
          {success ? <Check className="w-6 h-6" /> : <Upload className="w-6 h-6" />}
          {success ? 'Uploaded!' : 'Upload Combo'}
        </button>
      </motion.form>
    </div>
  );
};

export default Admin;
