"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, User, LogOut, Settings, ChevronDown, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  onToggle: () => void;
  isOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggle, isOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
      <div className="max-w-7xl mx-auto flex  items-center justify-between">
        {/* Left Side: Sidebar Toggle */}
        <div className="flex cursor-pointer cursor-pointer  items-center gap-4 ">
          <button
            className="p-2 hover:bg-neutral-100 rounded-lg  transition-colors lg:hidden"
            onClick={onToggle}
          >
            <Menu className="w-5 h-5 text-neutral-600" />
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
              <div className="w-8 cursor-pointer h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-shadow">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden cursor-pointer sm:block text-left">
                <p className="text-xs font-semibold text-neutral-900 leading-none">
                  Admin User
                </p>
                <p className="text-[10px] text-neutral-500 mt-0.5">Online</p>
              </div>
              <ChevronDown
                className={`w-4 h-4 cursor-pointer text-neutral-400 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute  right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-neutral-100 py-2 overflow-hidden text-left"
                >
                  <div className="px-4 py-3 border-b border-neutral-50">
                    <p className="text-sm font-bold text-neutral-900">
                      Administrator
                    </p>
                    <p className="text-xs text-neutral-500 truncate mt-0.5">
                      admin@inventory.com
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
