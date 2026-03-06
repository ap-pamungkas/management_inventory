"use client";

import { Box, Boxes, House, Users, X } from "lucide-react";
import MenuItem from "@/components/ui/MenuItem";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <aside
      className={`sidebar fixed inset-y-0 left-0 w-[280px] z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500 rounded-xl shadow-lg shadow-indigo-500/30">
            <Box className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight italic">
            STORA.
          </h1>
        </div>

        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="mt-4 space-y-1">
        <div className="px-6 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
          Main Menu
        </div>
        <MenuItem
          icon={<House className="w-5 h-5" />}
          label="Dashboard"
          href="/admin"
        />
        <MenuItem
          icon={<Box className="w-5 h-5" />}
          label="Manajemen Barang"
          href="/admin/items"
        />
        <MenuItem
          icon={<Boxes className="w-5 h-5" />}
          label="Manajemen Rak"
          href="/admin/rack"
        />
        <MenuItem
          icon={<Users className="w-5 h-5" />}
          label="Manajemen User"
          href="/admin/users"
        />
      </nav>

      <div className="absolute bottom-8 left-0 w-full px-6">
        <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            System Status
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-300 font-medium">
              Stora Online
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
