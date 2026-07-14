import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

import type { Product } from '../types';
import { useAddProductMutation, useUpdateProductMutation } from '@/store/productsApi';
import { useGetCategoriesQuery } from '@/store/categoryApi';

interface AddEditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

export const AddEditProductModal: React.FC<AddEditProductModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [name, setName] = useState('');
    const [id, setId] = useState('');

  const [category, setCategory] = useState(1);
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
    const [updated, setUpdated] = useState(false);

  // const [status, setStatus] = useState<'In Stock' | 'Low Stock' | 'Out of Stock'>('In Stock');
    const [addProducts, { isLoading, error }] = useAddProductMutation();
    const [updateProducts, { isLoading: isUpdating, error: updateError }] = useUpdateProductMutation();
      const { data } = useGetCategoriesQuery();
  const categories = data?.results



  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(Number(product.category));
      setPrice(product.price.toString());
      setQuantity(product.quantity.toString());
      setId(product.id);
      setUpdated(true);
      // setStatus(product.status);
    } else {
      setName('');
      setCategory(1);
      setPrice('');
      setQuantity('');
      setUpdated(false);
      // setStatus('In Stock');
    }
  }, [product, isOpen]);

  // Automatically update status based on quantity
  const handleQuantityChange = (val: string) => {
    setQuantity(val);
    // const qty = parseInt(val, 10);
    // if (isNaN(qty) || qty <= 0) {
    //   setStatus('Out of Stock');
    // } else if (qty <= 10) {
    //   setStatus('Low Stock');
    // } else {
    //   setStatus('In Stock');
    // }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !quantity) {
      alert('Please fill out all fields');
      return;
    }
    if (!updated && name && category && price && quantity) {
      const data = await addProducts({name, category, price: parseFloat(price), quantity: parseInt(quantity, 10)}).unwrap();
      // console.log(data,"data")
      onClose();
    }
    if(updated == true){
      // console.log("data",name, category, price, quantity)
      const data = await updateProducts({id: id, name, category, price: parseFloat(price), quantity: parseInt(quantity, 10)}).unwrap();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden transform transition-all border border-slate-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Product Name
            </label>
            <input
              type="text"
              placeholder="e.g. MacBook Pro M2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
              required
            />
          </div>

          {/* <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              SKU
            </label>
            <input
              type="text"
              placeholder="e.g. LAP-MBP-2023"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
              required
            />
          </div> */}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              >
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Price (Nrs)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="e.g. 2499.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Quantity
              </label>
              <input
                type="number"
                placeholder="e.g. 10"
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                required
              />
            </div>

            {/* <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              >
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div> */}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-500/20"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
