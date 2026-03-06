"use client";

import { useState, useEffect } from "react";
import Header from "./admin/Header";
import Sidebar from "./admin/Sidebar";
import { usePathname } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [pathname, isMobile]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Overlay for Mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <Sidebar isOpen={isOpen} />

      <main
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isOpen && !isMobile ? "pl-[280px]" : "pl-0"
        }`}
      >
        <Header onToggle={handleToggle} isOpen={isOpen} />

        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </div>

        <footer className="px-8 py-6 text-center text-xs text-slate-400 border-t border-slate-100 bg-white/50 backdrop-blur-sm mt-auto">
          &copy; {new Date().getFullYear()} Stora - Smart Inventory OS. All
          rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default AdminLayout;
