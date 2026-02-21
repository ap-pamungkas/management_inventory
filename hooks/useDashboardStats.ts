"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface DashboardStats {
  totalItems: number;
  totalRacks: number;
  totalStock: number;
  totalValue: number;
  recentItems: any[];
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/dashboard/stats");
      if (!response.ok) throw new Error("Gagal mengambil data statistik");
      const data = await response.json();
      setStats(data);
    } catch (error: any) {
      toast.error(error.message || "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, isLoading, refresh: fetchStats };
};
