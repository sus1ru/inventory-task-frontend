import React from 'react';
import { FiBox, FiAlertTriangle, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import type { Dashboard, Product } from '../types';


interface DashboardViewProps extends Dashboard {
  products: Product[]; // Replace Product[] with the actual type
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  total_products,
  total_categories,
  in_stock,
  low_stock,
  products,
}) => {  // Calculations
  
  const metrics = [
    {
      name: 'Total Products',
      value: total_products,
      icon: FiBox,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Total Categories',
      value: total_categories,
      icon: FiDollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      name: 'Low Stock Alert',
      value: in_stock,
      icon: FiAlertTriangle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      name: 'Out of Stock',
      value: low_stock,
      icon: FiTrendingUp, // using a trending/status indicator or we can swap
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.name} className="bg-white p-6 border border-slate-100 rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl ${m.bgColor} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-6 h-6 ${m.color}`} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{m.name}</p>
                <h4 className="text-xl font-bold text-slate-800 mt-1 leading-tight">{m.value}</h4>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout for Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Items / Quick Overview */}
        <div className="bg-white p-6 border border-slate-100 rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Stock Breakdown by Category</h3>
          <div className="space-y-3.5">
            {['Electronics', 'Peripherals', 'Audio', 'Networking', 'Displays'].map((category) => {
              const catProducts = products.filter(p => p.category === category);
              const count = catProducts.length;
              const totalQty = catProducts.reduce((acc, p) => acc + p.quantity, 0);
              const pct = products.length ? (count / products.length) * 100 : 0;

              return (
                <div key={category} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span>{category} ({count} products)</span>
                    <span>{totalQty} units</span>
                  </div>1
                  {/* Progress bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(pct, 5)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Low Stock Watchlist */}
        <div className="bg-white p-6 border border-slate-100 rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Critical Stock Alerts</h3>
          <div className="divide-y divide-slate-100">
            {products.filter(p => p.status === 'Low Stock' || p.status === 'Out of Stock').length > 0 ? (
              products
                .filter(p => p.status === 'Low Stock' || p.status === 'Out of Stock')
                .map((product) => (
                  <div key={product.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">{product.name}</h4>
                      {/* <p className="text-xs text-slate-400 mt-0.5">SKU: {product.sku}</p> */}
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-medium text-slate-500">{product.quantity} left</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        product.status === 'Low Stock' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-sm text-slate-400 py-6 text-center">All products are healthy. No stock warnings!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
