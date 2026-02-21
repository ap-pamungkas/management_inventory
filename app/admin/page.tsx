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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Overview Dashboard</h1>
        <p className="text-gray-500">
          Selamat datang kembali! Berikut ringkasan inventaris Anda hari ini.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Barang"
          value={stats?.totalItems || 0}
          icon={<Package size={24} />}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Total Rak"
          value={stats?.totalRacks || 0}
          icon={<Hash size={24} />}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatsCard
          title="Stok Tersedia"
          value={stats?.totalStock || 0}
          icon={<Archive size={24} />}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Nilai Aset"
          value={formatCurrency(stats?.totalValue || 0)}
          icon={<DollarSign size={24} />}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <RecentActivity items={stats?.recentItems || []} />
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-100">
            <h3 className="font-bold text-lg mb-2">Pusat Bantuan</h3>
            <p className="text-blue-100 text-sm mb-4">
              Butuh bantuan mengelola inventaris? Tim kami siap membantu Anda
              kapan saja.
            </p>
            <button className="w-full py-2.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm">
              Hubungi Support
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
