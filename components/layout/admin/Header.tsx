"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, User, LogOut, Settings, ChevronDown, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "@/hooks/useSession";

interface HeaderProps {
  onToggle: () => void;
  isOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggle, isOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user } = useSession();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        toast.success("Logged out successfully");
        router.push("/login");
        router.refresh();
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("An error occurred during logout");
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-40 px-4 py-3">
      <div className="mx-auto flex  items-center justify-between">
        {/* Left Side: Sidebar Toggle */}
        <div className="flex cursor-pointer cursor-pointer   ">
          <button
            className="p-2 hover:bg-neutral-100 rounded-lg cursor-pointer  transition-colors"
            onClick={onToggle}
          >
            <Menu className="w-5 h-5 text-neutral-600 " />
          </button>
        </div>

        {/* Right Side: Profile Dropdown */}
        <div className="flex items-cente r gap-2">
          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1.5 pr-3 hover:bg-neutral-100 rounded-full transition-all group"
            >
              <div className="w-8 cursor-pointer h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-indigo-100 group-hover:shadow-indigo-200 transition-all">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden cursor-pointer sm:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-none">
                  {user?.name || "Loading..."}
                </p>
                <p className="text-[10px] text-slate-500 mt-1 font-medium">
                  {user?.role || "User"}
                </p>
              </div>
              <ChevronDown
                className={`w-4 h-4 cursor-pointer text-slate-400 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 py-2 overflow-hidden text-left"
                >
                  <div className="px-5 py-4 bg-slate-50/50 border-b border-slate-100">
                    <p className="text-sm font-black text-slate-900 tracking-tight">
                      {user?.name?.toUpperCase() || "STORA USER"}
                    </p>
                    <p className="text-xs text-slate-500 truncate mt-1">
                      {user?.username || "loading..."}
                    </p>
                  </div>

                  <div className="py-1">
                    <button className="w-full cursor-pointer flex items-center gap-3 px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors">
                      <User className="w-4 h-4" />
                      Profile Settings
                    </button>
                    <button className="w-full cursor-pointer flex items-center gap-3 px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors">
                      <Settings className="w-4 h-4" />
                      System Preferences
                    </button>
                  </div>

                  <div className="py-1 border-t border-neutral-50">
                    <button
                      onClick={handleLogout}
                      className="w-full cursor-pointer flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
