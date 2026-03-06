"use client";

import AdminLayout from "@/components/layout/Admin";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import Skeleton from "@/components/ui/Skeleton";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { Package, Hash, Archive, DollarSign } from "lucide-react";

export default function AdminPage() {
  const { stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Skeleton count={4} className="h-28 rounded-2xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="h-80 rounded-2xl" />
          </div>
          <div className="lg:col-span-1">
            <Skeleton className="h-80 rounded-2xl" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          System Overview
        </h1>
        <p className="text-slate-500 font-medium">
          Welcome back, Admin. Here's a summary of your Stora ecosystem today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatsCard
          title="Total Barang"
          value={stats?.totalItems || 0}
          icon={<Package size={22} />}
          iconBgColor="bg-indigo-50"
          iconColor="text-indigo-600"
        />
        <StatsCard
          title="Total Rak"
          value={stats?.totalRacks || 0}
          icon={<Hash size={22} />}
          iconBgColor="bg-slate-50"
          iconColor="text-slate-600"
        />
        <StatsCard
          title="Stok Tersedia"
          value={stats?.totalStock || 0}
          icon={<Archive size={22} />}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatsCard
          title="Value Assets"
          value={formatCurrency(stats?.totalValue || 0)}
          icon={<DollarSign size={22} />}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <RecentActivity items={stats?.recentItems || []} />
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            <h3 className="font-black text-xl mb-3 tracking-tight">
              Stora Support
            </h3>
            <p className="text-indigo-100 text-sm mb-6 font-medium leading-relaxed">
              Need assistance managing your assets? Our dedicated support team
              is here to help you optimize your operations.
            </p>
            <button className="w-full py-4 bg-white text-indigo-950 font-black rounded-2xl hover:bg-indigo-50 transition-all text-xs uppercase tracking-widest shadow-xl active:scale-95">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
