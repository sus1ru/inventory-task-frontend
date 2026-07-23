import React, { useEffect, useRef } from 'react';
import { FiBell, FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import type { Dispatch, SetStateAction } from "react";


interface NavbarProps {
  title: string;
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}

export const Navbar: React.FC<NavbarProps> = ({ title, setOpenSidebar, openSidebar }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()
const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleLogout(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleLogout);

    return () => {
      document.removeEventListener("mousedown", handleLogout);
    };
  }, []);

  

  function handleClick() {
    setOpen(!open);
  }
  function handleLogout() {
    // Implement your logout logic here
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page after logout
  }
  console.log("open:", open);

  return (
    <header className="relative z-10 h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-30">
      {/* Page Title */}
       <div className='md:hidden cursor-pointer' onClick={()=>setOpenSidebar(prev => !prev)}>
          {
            openSidebar ? 
            <RxCross1 />
            : 
            <RxHamburgerMenu />

          }
        </div>
      <h1 className="text-xl font-bold text-slate-800 tracking-tight">
        {title}
      </h1>

      {/* Action Buttons & Avatar */}
      <div className="flex items-center space-x-4">
        {/* Notifications Icon Button */}
        <button className="relative p-2 rounded-full hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors">
          <FiBell className="w-5 h-5" />
          {/* Notification Indicator Dot */}
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        {/* Settings Icon Button */}
        <button className="p-2 rounded-full hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors">
          <FiSettings className="w-5 h-5" />
        </button>
        {/* Divider */}
        <div className="h-6 w-px bg-slate-200"></div>
        {/* User Profile Avatar */}
        <div className='relative'>
          {
            open && ( <div ref={divRef}className='absolute top-[100%] w-[200px]  -left-[450%] bg-white  shadow-lg rounded-lg  transition-all duration-300 ease-in-out transform origin-top-right  cursor-pointer'>
            <div  onClick={handleLogout} className='   transition-all p-4 duration-300 ease-in-out transform origin-top-right hover:bg-sky-300 hover:text-black cursor-pointer'>
Logout
          </div> 
         <div  onClick={() => navigate("/change-password")} className='  p-4   transition-all duration-300 ease-in-out transform origin-top-right hover:bg-sky-300 hover:text-black cursor-pointer'>
Change Password
          </div> 
          </div>
          )
          }
          
        <button onClick={handleClick} className="flex cursor-pointer items-center space-x-2 focus:outline-none">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
              alt="User Profile"
              className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-sm"
              onError={(e) => {
                // Fallback if image fails to load
                (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix';
              }}
            />
            {/* Active Status Ring (Optional, looks nice) */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
        </button>
        </div>
       
        </div>
    </header>
  );
};
1