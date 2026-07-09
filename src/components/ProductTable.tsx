import React, { useState, useRef, useEffect } from 'react';
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiCpu,
  FiHeadphones,
  FiWifi,
  FiMonitor,
  FiSliders,
  FiChevronDown,
  FiCheck,
} from 'react-icons/fi';
import { MdOutlineKeyboard } from 'react-icons/md';
import type { Category, Product } from '../types';
import { useGetProductsQuery } from '@/store/productsApi';
import { useGetCategoriesQuery } from '@/store/categoryApi';

interface ProductTableProps {
  products: Product[];
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
}

export const ProductTable: React.FC<ProductTableProps> = (
  // products,
  // onAddProduct,
  // onEditProduct,
  // onDeleteProduct,
) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 5;

  // Categories list

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Filter products based on search term & category
  // const filteredProducts = products.filter((product) => {
  //   const matchesSearch =
  //     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     product.id.toLowerCase().includes(searchTerm.toLowerCase());

  //   const matchesCategory = selectedCategory ? product.category === selectedCategory : true;

  //   return matchesSearch && matchesCategory;
  // });
 const query =
  searchTerm || selectedCategory || null;

const {
  data: products,
  isLoading,
  error,
} = useGetProductsQuery(query);
const currentProducts = products?.results || [];
        const { data: categories = []} = useGetCategoriesQuery();

  const currentCategories = categories.results
  const totalItems = currentProducts?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  // const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Helper to render product icons based on category
  const getProductIcon = (category: string) => {
    switch (category) {
      case 'Electronics':
        return <FiCpu className="w-5 h-5 text-blue-600" />;
      case 'Peripherals':
        return <MdOutlineKeyboard className="w-5 h-5 text-blue-600" />;
      case 'Audio':
        return <FiHeadphones className="w-5 h-5 text-blue-600" />;
      case 'Networking':
        return <FiWifi className="w-5 h-5 text-blue-600" />;
      case 'Displays':
        return <FiMonitor className="w-5 h-5 text-blue-600" />;
      default:
        return <FiCpu className="w-5 h-5 text-blue-600" />;
    }
  };

  // Helper to format currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val);
  };


  return ( 
    <div className="space-y-4">
      {/* Search and Filters Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-1 items-center space-x-3 max-w-xl">
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <FiSearch className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search product name, SKU or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]"
            />
          </div>

          {/* Category Filter Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]"
            >
              <FiSliders className="w-4 h-4 text-slate-500" />
              <span className="font-medium text-slate-600">
                {selectedCategoryName ? selectedCategoryName : 'Category'}
              </span>
              <FiChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {isCategoryDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-48 bg-white border border-slate-100 rounded-lg shadow-lg py-1 z-40">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setIsCategoryDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>All Categories</span>
                  {selectedCategory === null && <FiCheck className="w-3.5 h-3.5 text-blue-600" />}
                </button>
                <div className="h-px bg-slate-100 my-1"></div>
                {currentCategories?.map((cat:Category) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setIsCategoryDropdownOpen(false);
                      setSelectedCategoryName(cat.name);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    {selectedCategory === cat.id && <FiCheck className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add Product Button */}
        {/* <button
          onClick={onAddProduct}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all shadow-sm shadow-blue-500/10 active:scale-[0.98]"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Product</span>
        </button> */}
      </div>

      {/* Products Table Card */}
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-4 text12-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentProducts?.length > 0 ? (
                currentProducts?.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/40 transition-colors">
                    {/* Name & SKU */}
                    <td className="px-6 py-4.5 whitespace-nowrap">
                      <div className="flex items-center space-x-3.5">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                          {getProductIcon(product.category)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-800 leading-tight">
                            {product.name}
                          </div>
                          {/* <div className="text-xs text-slate-400 mt-1 font-mono">
                            SKU: {product.sku}
                          </div> */}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4.5 whitespace-nowrap text-sm text-slate-500">
                      {product.category}
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4.5 whitespace-nowrap text-sm font-semibold text-slate-800">
                      {formatCurrency(product.price)}
                    </td>

                    {/* Quantity */}
                    <td className="px-6 py-4.5 whitespace-nowrap text-sm text-slate-500">
                      {product.quantity}
                    </td>

                    {/* Status badge */}
                    <td className="px-6 py-4.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          product.status === 'In Stock'
                            ? 'bg-[#dcfce7] text-[#16a34a]'
                            : product.status === 'Low Stock'
                            ? 'bg-[#fef3c7] text-[#d97706]'
                            : 'bg-red-50 text-red-600'
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>

                    {/* Actions */}
                    {/* <td className="px-6 py-4.5 whitespace-nowrap text-right text-sm">
                      <div className="flex items-center justify-end space-x-3.5">
                        <button
                          onClick={() => onEditProduct(product)}
                          className="text-slate-400 hover:text-blue-600 p-1.5 rounded hover:bg-slate-100/80 transition-colors"
                          title="Edit Product"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(product)}
                          className="text-slate-400 hover:text-red-600 p-1.5 rounded hover:bg-slate-100/80 transition-colors"
                          title="Delete Product"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm">
                    No products found matching the filters... 
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        {totalItems > 0 && (
          <div className="px-6 py-4.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <span className="text-sm text-slate-400">
              Showing {startIndex + 1}-{endIndex} of {totalItems} products
            </span>

            {/* Pagination Controls */}
            <div className="flex items-center space-x-1">
              {/* Prev Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

