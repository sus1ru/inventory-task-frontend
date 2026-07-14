import { useState } from 'react';
import type { Product,Dashboard } from '@/types';
import { Navbar } from '@/components/Navbar';
import { DashboardView } from '@/components/DashboardView';
import { Sidebar } from '@/components/Sidebar';
import {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from '@/store/productsApi';
import { ProductTable } from '@/components/ProductTable';
import { CategoriesView } from '@/components/CategoriesView';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { AddEditProductModal } from '@/components/AddEditProductModal';
import { useGetDashboardQuery } from '@/store/dashboardApi';

// Seed exactly 24 products for realistic mock data
// const INITIAL_PRODUCTS: Product[] = [
//   {
//     id: '1',
//     name: 'MacBook Pro M2',
//     sku: 'LAP-MBP-2023',
//     category: 'Electronics',
//     price: 2499.00,
//     quantity: 124,
//     status: 'In Stock',
//   },
//   {
//     id: '2',
//     name: 'Mechanical Keyboard',
//     sku: 'PER-KB-MX',
//     category: 'Peripherals',
//     price: 159.00,
//     quantity: 8,
//     status: 'Low Stock',
//   },
//   {
//     id: '3',
//     name: 'Noise Canceling Headphones',
//     sku: 'AUD-HP-NC',
//     category: 'Audio',
//     price: 349.99,
//     quantity: 0,
//     status: 'Out of Stock',
//   },
//   {
//     id: '4',
//     name: 'WiFi 6 Mesh Router',
//     sku: 'NET-RTR-W6',
//     category: 'Networking',
//     price: 199.00,
//     quantity: 45,
//     status: 'In Stock',
//   },
//   {
//     id: '5',
//     name: '4K Ultra HD Monitor',
//     sku: 'DSP-4K-27',
//     category: 'Displays',
//     price: 599.00,
//     quantity: 3,
//     status: 'Low Stock',
//   },
//   {
//     id: '6',
//     name: 'iPhone 15 Pro',
//     sku: 'PHO-IPH-15',
//     category: 'Electronics',
//     price: 999.00,
//     quantity: 85,
//     status: 'In Stock',
//   },
//   {
//     id: '7',
//     name: 'iPad Air',
//     sku: 'TAB-IPA-AIR',
//     category: 'Electronics',
//     price: 599.00,
//     quantity: 40,
//     status: 'In Stock',
//   },
//   {
//     id: '8',
//     name: 'Gaming Mouse',
//     sku: 'PER-GMS-X',
//     category: 'Peripherals',
//     price: 79.99,
//     quantity: 110,
//     status: 'In Stock',
//   },
//   {
//     id: '9',
//     name: 'Ergonomic Mouse',
//     sku: 'PER-EMS-2',
//     category: 'Peripherals',
//     price: 99.00,
//     quantity: 7,
//     status: 'Low Stock',
//   },
//   {
//     id: '10',
//     name: 'USB-C Hub',
//     sku: 'PER-UCH-5',
//     category: 'Peripherals',
//     price: 49.00,
//     quantity: 3,
//     status: 'Low Stock',
//   },
//   {
//     id: '11',
//     name: 'Studio Microphone',
//     sku: 'AUD-MIC-ST',
//     category: 'Audio',
//     price: 149.00,
//     quantity: 24,
//     status: 'In Stock',
//   },
//   {
//     id: '12',
//     name: 'Bluetooth Speaker',
//     sku: 'AUD-BTS-GO',
//     category: 'Audio',
//     price: 89.99,
//     quantity: 0,
//     status: 'Out of Stock',
//   },
//   {
//     id: '13',
//     name: 'Soundbar',
//     sku: 'AUD-SND-TV',
//     category: 'Audio',
//     price: 249.00,
//     quantity: 15,
//     status: 'In Stock',
//   },
//   {
//     id: '14',
//     name: 'Gigabit Switch',
//     sku: 'NET-GGB-SW',
//     category: 'Networking',
//     price: 120.00,
//     quantity: 12,
//     status: 'In Stock',
//   },
//   {
//     id: '15',
//     name: 'Ethernet Cable Cat8',
//     sku: 'NET-ETH-C8',
//     category: 'Networking',
//     price: 19.99,
//     quantity: 300,
//     status: 'In Stock',
//   },
//   {
//     id: '16',
//     name: 'Wireless USB Dongle',
//     sku: 'NET-WLS-DG',
//     category: 'Networking',
//     price: 29.99,
//     quantity: 2,
//     status: 'Low Stock',
//   },
//   {
//     id: '17',
//     name: 'Curved Gaming Monitor',
//     sku: 'DSP-CGM-34',
//     category: 'Displays',
//     price: 899.00,
//     quantity: 18,
//     status: 'In Stock',
//   },
//   {
//     id: '18',
//     name: 'Portable Monitor',
//     sku: 'DSP-PRT-15',
//     category: 'Displays',
//     price: 199.00,
//     quantity: 0,
//     status: 'Out of Stock',
//   },
//   {
//     id: '19',
//     name: 'Smart Light Bulb',
//     sku: 'SMH-LTB-10',
//     category: 'Electronics',
//     price: 15.99,
//     quantity: 150,
//     status: 'In Stock',
//   },
//   {
//     id: '20',
//     name: 'Smart Plug',
//     sku: 'SMH-PLG-02',
//     category: 'Electronics',
//     price: 19.99,
//     quantity: 75,
//     status: 'In Stock',
//   },
//   {
//     id: '21',
//     name: 'Wireless Charger',
//     sku: 'PER-WLC-10',
//     category: 'Peripherals',
//     price: 39.99,
//     quantity: 40,
//     status: 'In Stock',
//   },
//   {
//     id: '22',
//     name: 'External SSD 1TB',
//     sku: 'STO-SSD-1T',
//     category: 'Electronics',
//     price: 109.99,
//     quantity: 55,
//     status: 'In Stock',
//   },
//   {
//     id: '23',
//     name: 'MicroSD Card 256GB',
//     sku: 'STO-MSD-256',
//     category: 'Electronics',
//     price: 24.99,
//     quantity: 12,
//     status: 'In Stock',
//   },
//   {
//     id: '24',
//     name: 'Laptop Cooling Pad',
//     sku: 'PER-LCP-01',
//     category: 'Peripherals',
//     price: 34.99,
//     quantity: 18,
//     status: 'In Stock',
//   },
// ];

function Home() {
  const [activeTab, setActiveTab] = useState('products');

  // RTK Query API Hooks
  const { data: products, isLoading, error, refetch } = useGetProductsQuery(null);
    const { data: dashboardData = {} as Dashboard} = useGetDashboardQuery();
  const productsData : Product [] = products?.results || [];
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  // Modal control states
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

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

  const handleConfirmDelete = async () => {
    if (currentProduct) {
      try {
        await deleteProduct(currentProduct.id).unwrap();
        setIsDeleteOpen(false);
        setCurrentProduct(null);
      } catch (err) {
        console.error("Failed to delete product via API:", err);
        setIsDeleteOpen(false);
        setCurrentProduct(null);
      }
    }
  };

  // Handlers for Category drilldown
  const handleBrowseCategory = (category: string) => {
    setActiveTab('products');
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

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - Componentized */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Space */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title={getNavbarTitle()} />

        <main className="flex-1 p-8 overflow-y-auto max-w-[1400px] w-full mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-sm font-medium text-slate-500">Loading products...</p>
            </div>
          ) : error ? (
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
        onConfirm={handleConfirmDelete}
        product={currentProduct}
      />
    </div>
  );
}

export default Home;
