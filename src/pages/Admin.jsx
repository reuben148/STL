import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { motion } from 'framer-motion';
import { Upload, Check, Loader } from 'lucide-react';

const Admin = () => {
  const { addProduct } = useShop();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  // Helper to convert file to Base64 with resizing
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Compress to JPEG at 0.7 quality
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(dataUrl);
        };
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      let imageUrl = formData.image;

      if (imageFile) {
        console.log("Converting image...");
        // Convert to Base64 string instead of uploading to Storage
        imageUrl = await convertToBase64(imageFile);
      }

      console.log("Adding to Firestore...");
      await addProduct({
        ...formData,
        image: imageUrl,
        price: Number(formData.price),
        colors: [],
        createdAt: new Date()
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setFormData({ name: '', price: '', image: '', description: '' });
      setImageFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
      setErrorMsg("Upload failed: " + error.message);
    } finally {
      setLoading(false);
    }
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
        {errorMsg && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 p-4 rounded-xl text-center font-bold">
            {errorMsg}
          </div>
        )}
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
          disabled={loading}
          className="w-full bg-white text-stl-dark font-black uppercase tracking-widest py-4 rounded-xl hover:bg-stl-blue hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader className="w-6 h-6 animate-spin" /> : (success ? <Check className="w-6 h-6" /> : <Upload className="w-6 h-6" />)}
          {loading ? 'Uploading...' : (success ? 'Uploaded!' : 'Upload Combo')}
        </button>
      </motion.form>
    </div>
  );
};

export default Admin;
