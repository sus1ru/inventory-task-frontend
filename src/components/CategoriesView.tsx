import React, { useEffect } from 'react';
import { FiCpu } from 'react-icons/fi';
import { type Category, type Product } from '../types';
import { useGetCategoriesQuery } from '@/store/categoryApi';

interface CategoriesViewProps {
  products: Product[];
  onSelectCategory: (category: number) => void;
}1

export const CategoriesView: React.FC<CategoriesViewProps> = ({ onSelectCategory }) => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  const {data, error} = useGetCategoriesQuery();

  useEffect(() => {
    if (data?.results) {
      setCategories(data?.results);
    }
  }, [data]);

  if (error) {
  return <p>Something went wrong.</p>;
}

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat) => {
        const Icon = FiCpu;
        const catProducts = cat?.products
        const count = catProducts?.length;
        const totalStock = catProducts?.reduce((acc, p) => acc + (p.quantity || 0), 0);

        return (
          <div
            key={cat?.id}
            className="bg-white border border-slate-100 cursor-pointer rounded-xl p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-md transition-all group"
          >
            <div>
              {/* Category Icon */}
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <Icon className="w-6 h-6" />
              </div>

              {/* Title & Desc */}
              <h3 className="text-md font-bold text-slate-800 mt-4">{cat.name}</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">asdasdasdasdkjaskdhaskjhdajkhdk</p>
            </div>

            {/* Stats list */}
            <div className="border-t border-slate-50 pt-4 mt-6 space-y-2 text-xs font-semibold text-slate-500">
              <div className="flex justify-between">
                <span>Unique Products</span>
                <span className="text-slate-800">{count}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Units</span>
                <span className="text-slate-800">{totalStock}</span>
              </div>
              {/* <div className="flex justify-between">
                <span>Average Price</span>
                <span className="text-slate-800">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(avgPrice)}
                </span>
              </div> */}
            </div>

            {/* Action button */}
            <button
              onClick={() => onSelectCategory(cat?.id)}
              className="mt-6 w-full py-2 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Browse Category Products
            </button>
          </div>
        );
      })}
    </div>
  );
};
