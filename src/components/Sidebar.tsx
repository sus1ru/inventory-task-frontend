import React from 'react';
import { FiGrid, FiBox, FiLayers } from 'react-icons/fi';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  open: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, open }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: FiGrid },
    { id: 'products', name: 'Products', icon: FiBox },
    { id: 'categories', name: 'Categories', icon: FiLayers },
  ];

  return (
   <>
   {
    open ? (
      < aside className={`fixed z-20 left-0 bg-white top-10 w-[50%]  border-r border-slate-100 flex flex-col h-[95vh]  md:hidden`} >
      {/* Brand Logo Header */}
      < div className="p-6 border-b border-slate-100" >
        <div className="flex items-center space-x-2">
          {/* Logo Icon */}
          <div className="text-blue-600 font-extrabold text-2xl tracking-tight">
            StockFlow
          </div>
        </div>
        <div className="text-[10px] font-bold text-slate-400 tracking-wider mt-0.5 uppercase">
          Inventory Control & MGMT
        </div>
      </div >

      {/* Navigation Links */}
      < nav className="flex-1 p-4 space-y-1" >
        {
          menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`}
              >
                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span>{item.name}</span>
              </button>
            );
          })
        }
      </nav >

      {/* Sidebar Footer / Account Mini-Info (Optional, adds premium feel) */}
      < div className="p-4 border-t border-slate-50 bg-slate-50/50" >
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
            BB
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-700">Bibesh Basnet</div>
            <div className="text-[10px] text-slate-400">Administrator</div>
          </div>
        </div>
      </div >
    </aside >


    ): (
      < aside className="hidden md:block w-[20%] bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0" >
      {/* Brand Logo Header */}
      < div className="p-6 border-b border-slate-100" >
        <div className="flex items-center space-x-2">
          {/* Logo Icon */}
          <div className="text-blue-600 font-extrabold text-2xl tracking-tight">
            StockFlow
          </div>
        </div>
        <div className="text-[10px] font-bold text-slate-400 tracking-wider mt-0.5 uppercase">
          Inventory Control & MGMT
        </div>
      </div >

      {/* Navigation Links */}
      < nav className="flex-1 p-4 space-y-1" >
        {
          menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`}
              >
                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span>{item.name}</span>
              </button>
            );
          })
        }
      </nav >

      {/* Sidebar Footer / Account Mini-Info (Optional, adds premium feel) */}
      < div className="p-4 border-t border-slate-50 bg-slate-50/50" >
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
            BB
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-700">Bibesh Basnet</div>
            <div className="text-[10px] text-slate-400">Administrator</div>
          </div>
        </div>
      </div >
    </aside >

    )
   }
   </>
    
  );
};
