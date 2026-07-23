import { useState } from 'react';
import type { Product,Dashboard } from '@/types';
import { Navbar } from '@/components/Navbar';
import { DashboardView } from '@/components/DashboardView';
import { Sidebar } from '@/components/Sidebar';
import {
  useGetProductsQuery,
} from '@/store/productsApi';
import { ProductTable } from '@/components/ProductTable';
import { CategoriesView } from '@/components/CategoriesView';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { AddEditProductModal } from '@/components/AddEditProductModal';
import { useGetDashboardQuery } from '@/store/dashboardApi';
import 'react-loading-skeleton/dist/skeleton.css';
import { DashboardSkeleton } from '@/components/DashboardSkeleton';
import { ProductSkeleton } from '@/components/ProductSkeleton';
import { CategoriesSkeleton } from '@/components/CategoriesSkeleton';


function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [openSidebar, SetOpenSidebar] = useState<boolean>(false);

  // RTK Query API Hooks
  const { data: products, isLoading, error, refetch } = useGetProductsQuery(null);
    const { data: dashboardData = {} as Dashboard} = useGetDashboardQuery();
  const productsData : Product [] = products?.results || [];

  // Modal control states
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Handlers for Add / Edit
  const handleOpenAddModal = () => {
    setCurrentProduct(null);
    setIsAddEditOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setCurrentProduct(product);
    setIsAddEditOpen(true);
  };

  // const handleSaveProduct = async (formData: Omit<Product, 'id'> & { id?: string }) => {
  //   try {
  //     if (formData.id) {
  //       // Editing existing product
  //       await updateProduct(formData as Product).unwrap();
  //     } else {
  //       // Adding new product
  //       await addProduct(formData).unwrap();
  //     }
  //     setIsAddEditOpen(false);
  //   } catch (err) {
  //     console.error("Failed to save product via API:", err);
  //     setIsAddEditOpen(false);
  //   }
  // };

  // Handlers for Delete
  const handleOpenDeleteModal = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteOpen(true);
  };

  // Handlers for Category drilldown
  const handleBrowseCategory = (category: number) => {
    console.log('Selected category ID:', category);
    setActiveTab('products');
    setSelectedCategory(category);
  };

  // Helper to determine navbar title
  const getNavbarTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'products':
        return 'Products';
      case 'categories':
        return 'Categories';
      default:
        return 'Products';
    }
  };

  const renderLoadingSkeleton = () => {
  if (activeTab === "dashboard") {
    return <DashboardSkeleton />;
  } 
  else if (activeTab === "products") {
    return <ProductSkeleton />;
  } 
  else if (activeTab === "categories") {
    return <CategoriesSkeleton/>;
  }
  return null;
};

console.log("asdasdta:", openSidebar);
  return (
    <div className="flex min-h-screen bg-slate-50 ">
      {/* Sidebar - Componentized */}
      <Sidebar  open={openSidebar} activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Main Content Space */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title={getNavbarTitle()} setOpenSidebar={SetOpenSidebar} openSidebar={openSidebar} />

        <main className="flex-1 p-8 overflow-y-auto max-w-[1400px] w-full mx-auto">
          {isLoading ? renderLoadingSkeleton()
           : error ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] p-6 bg-red-50/50 border border-red-100 rounded-2xl space-y-4 max-w-md mx-auto mt-12 shadow-sm animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xl">!</div>
              <h3 className="text-lg font-semibold text-slate-800">Failed to load products</h3>
              <p className="text-sm text-slate-500 text-center">
                An error occurred while fetching products from the server.
              </p>
              <button
                onClick={() => refetch()}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition active:scale-[0.98]"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <DashboardView {...dashboardData} products={productsData}  />
              )}
              {activeTab === 'products' && (
                <ProductTable
                onAddProduct={handleOpenAddModal}
                onEditProduct={handleOpenEditModal}
                onDeleteProduct={handleOpenDeleteModal}
                catId={selectedCategory}
                 
                />
              )}

              {activeTab === 'categories' && (
                <CategoriesView
                  products={productsData}
                  onSelectCategory={handleBrowseCategory}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Add / Edit Product Modal */}
      <AddEditProductModal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        // onSave={handleSaveProduct}
        product={currentProduct}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        product={currentProduct}
      />
    </div>
  );
}

export default Home;
